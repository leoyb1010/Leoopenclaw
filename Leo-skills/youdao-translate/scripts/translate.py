#!/usr/bin/env python3
"""
Youdao Translate — 通用翻译能力基础设施
有道翻译官方 API（非智云转封装版）
支持 API 模式和 LLM 降级模式
"""
import argparse, json, sys, os, time, hashlib, uuid
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote
from urllib.error import URLError, HTTPError

# ── 配置 ──────────────────────────────────────────────
# 有道翻译官方 API endpoint（待凭据到位后核实）
YOUDAO_API_URL = "https://openapi.youdao.com/api"
MAX_TEXT_LENGTH = 5000  # API mode limit

# 语言代码映射（有道API格式）
LANG_MAP = {
    "auto": "auto", "zh": "zh-CHS", "en": "en", "ja": "ja",
    "ko": "ko", "fr": "fr", "de": "de", "es": "es", "ru": "ru",
    "pt": "pt", "it": "it", "ar": "ar", "th": "th", "vi": "vi",
    "id": "id", "ms": "ms", "nl": "nl", "pl": "pl", "tr": "tr",
    "zh-CHS": "zh-CHS", "zh-CN": "zh-CHS", "zh-TW": "zh-CHT",
    "english": "en", "chinese": "zh-CHS", "japanese": "ja",
    "korean": "ko", "french": "fr", "german": "de", "spanish": "es",
}

DOMAIN_PROMPTS = {
    "general": "",
    "academic": "Use formal academic register and precise terminology.",
    "business": "Use professional business language and industry-standard terms.",
    "tech": "Use standard technical terminology. Preserve code terms, API names, and product names.",
    "marketing": "Use engaging, persuasive marketing language. Adapt tone to be natural and appealing.",
}

STYLE_PROMPTS = {
    "normal": "",
    "concise": "Keep the translation concise and to the point. Remove filler words.",
    "formal": "Use formal, professional register. Avoid contractions and colloquialisms.",
    "natural": "Make the translation sound natural and fluent, as if written by a native speaker. Prioritize readability over literal accuracy.",
}

def load_env():
    """从 ~/.openclaw/.env 或环境变量加载配置"""
    env_path = os.path.expanduser("~/.openclaw/.env")
    env_vars = {}
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if "=" in line and not line.startswith("#"):
                    k, v = line.split("=", 1)
                    env_vars[k.strip()] = v.strip()
    return env_vars

def get_api_credentials():
    """获取有道API凭据"""
    env = load_env()
    app_key = os.environ.get("YOUDAO_APP_KEY") or env.get("YOUDAO_APP_KEY")
    app_secret = os.environ.get("YOUDAO_APP_SECRET") or env.get("YOUDAO_APP_SECRET")
    return app_key, app_secret

def sign(salt, curtime, app_key, app_secret):
    """生成有道API签名"""
    sign_str = app_key + salt + curtime + app_secret
    return hashlib.sha256(sign_str.encode("utf-8")).hexdigest()

def translate_via_api(text, source_lang, target_lang, preserve_terms=None, trace_id=None):
    """通过有道API翻译"""
    app_key, app_secret = get_api_credentials()
    if not app_key or not app_secret:
        return None, "api_error:no_credentials"

    src_lang = LANG_MAP.get(source_lang, source_lang)
    tgt_lang = LANG_MAP.get(target_lang, target_lang)

    salt = str(uuid.uuid4())
    curtime = str(int(time.time()))
    sign_val = sign(salt, curtime, app_key, app_secret)

    params = {
        "q": text,
        "from": src_lang,
        "to": tgt_lang,
        "appKey": app_key,
        "salt": salt,
        "sign": sign_val,
        "signType": "v3",
        "curtime": curtime,
    }

    try:
        data = urlencode(params).encode("utf-8")
        req = Request(YOUDAO_API_URL, data=data, headers={"Content-Type": "application/x-www-form-urlencoded"})
        resp = urlopen(req, timeout=15)
        result = json.loads(resp.read().decode("utf-8"))

        if result.get("errorCode") == "0":
            translations = result.get("translation", [])
            if translations:
                detected = result.get("l", "").split("2")[0] if "2" in result.get("l", "") else source_lang
                return translations[0], None
            return None, "empty_translation"
        else:
            error_code = result.get("errorCode", "unknown")
            return None, f"api_error:{error_code}"
    except HTTPError as e:
        if e.code == 429:
            return None, "rate_limit"
        return None, f"api_error:http_{e.code}"
    except (URLError, OSError) as e:
        return None, f"api_error:network_{e}"
    except json.JSONDecodeError:
        return None, "api_error:invalid_response"
    except Exception as e:
        return None, f"api_error:{str(e)}"

def translate_via_llm(text, source_lang, target_lang, domain="general", style="normal",
                       need_explanation=False, preserve_terms=None, trace_id=None):
    """LLM降级翻译（通过调用 openclaw exec 或直接构建 prompt）"""
    # 构建翻译 prompt
    domain_hint = DOMAIN_PROMPTS.get(domain, "")
    style_hint = STYLE_PROMPTS.get(style, "")
    terms_hint = ""
    if preserve_terms:
        terms_hint = f"IMPORTANT: Preserve these terms unchanged in the translation: {', '.join(preserve_terms)}.\n"
    explanation_hint = "Also provide a brief explanation of your translation choices.\n" if need_explanation else ""

    # Source lang auto means we don't specify
    src = source_lang if source_lang != "auto" else "the detected source language"

    prompt = (
        f"Translate the following text from {src} to {target_lang}.\n"
        f"{domain_hint}{style_hint}{terms_hint}{explanation_hint}"
        f"\n---\n{text}\n---\n\n"
    )

    if need_explanation:
        prompt += "Output format: TRANSLATION: <translated text>\nEXPLANATION: <brief explanation>\n"
    else:
        prompt += "Output ONLY the translated text, nothing else.\n"

    # Write prompt to temp file and use stdin approach
    import tempfile
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
        f.write(prompt)
        prompt_file = f.name

    try:
        import subprocess
        result = subprocess.run(
            ["python3", "-c", f"""
import json, sys
prompt = open({repr(prompt_file)}).read()
print(json.dumps({{"prompt": prompt}}))
"""],
            capture_output=True, text=True, timeout=5
        )

        # LLM 降级模式返回结构化 prompt 供上层 agent 处理
        return {
            "mode": "llm_fallback",
            "prompt": prompt,
            "hint": "No API credentials found. Run this prompt through an LLM for translation."
        }, None
    finally:
        os.unlink(prompt_file)

def apply_preserve_terms(translated_text, preserve_terms):
    """在翻译后应用术语保留（API模式下术语可能仍被翻译了）"""
    if not preserve_terms:
        return translated_text
    # This is a simple pass-through; actual term preservation depends on API support
    # In LLM mode, terms are preserved via prompt
    return translated_text

def format_terminology(preserve_terms):
    """格式化术语输出"""
    if not preserve_terms:
        return {}
    return {term: term for term in preserve_terms}

def main():
    parser = argparse.ArgumentParser(description="Youdao Translate - 通用翻译能力")
    parser.add_argument("--text", required=True, help="Text to translate")
    parser.add_argument("--source-lang", default="auto", help="Source language (default: auto)")
    parser.add_argument("--target-lang", required=True, help="Target language")
    parser.add_argument("--domain", default="general", choices=["general", "academic", "business", "tech", "marketing"])
    parser.add_argument("--style", default="normal", choices=["normal", "concise", "formal", "natural"])
    parser.add_argument("--need-explanation", action="store_true", help="Include translation explanation")
    parser.add_argument("--preserve-terms", default=None, help="Comma-separated terms to preserve")
    parser.add_argument("--trace-id", default=None, help="Trace ID for debugging")

    args = parser.parse_args()

    # Validate
    if not args.text.strip():
        print(json.dumps({
            "status": "error", "error_message": "missing_required_param",
            "translated_text": None, "detected_source_lang": None,
            "target_lang": args.target_lang, "domain": args.domain, "style": args.style,
            "terminology": None, "explanation": None, "usage": None,
            "trace_id": args.trace_id
        }, ensure_ascii=False))
        sys.exit(0)

    if args.text and len(args.text) > MAX_TEXT_LENGTH * 10:
        print(json.dumps({
            "status": "error", "error_message": f"Text too long (max {MAX_TEXT_LENGTH * 10} chars)",
            "translated_text": None, "detected_source_lang": None,
            "target_lang": args.target_lang, "domain": args.domain, "style": args.style,
            "terminology": None, "explanation": None, "usage": None,
            "trace_id": args.trace_id
        }, ensure_ascii=False))
        sys.exit(0)

    trace_id = args.trace_id or str(uuid.uuid4())[:8]
    preserve_terms = [t.strip() for t in args.preserve_terms.split(",")] if args.preserve_terms else None

    # Try API mode first
    translated = None
    error_msg = None
    detected_lang = args.source_lang
    is_api_mode = False

    app_key, _ = get_api_credentials()
    if app_key:
        translated, error_msg = translate_via_api(
            args.text, args.source_lang, args.target_lang,
            preserve_terms=preserve_terms, trace_id=trace_id
        )
        is_api_mode = True
    else:
        error_msg = "no_credentials"

    # Fallback to LLM mode
    if translated is None:
        if error_msg and "no_credentials" not in error_msg and "api_error" in error_msg:
            pass  # API error, fallback

        llm_result, llm_error = translate_via_llm(
            args.text, args.source_lang, args.target_lang,
            domain=args.domain, style=args.style,
            need_explanation=args.need_explanation,
            preserve_terms=preserve_terms, trace_id=trace_id
        )

        if isinstance(llm_result, dict) and llm_result.get("mode") == "llm_fallback":
            # Return fallback status with prompt for agent to execute
            print(json.dumps({
                "status": "fallback",
                "translated_text": None,
                "detected_source_lang": args.source_lang,
                "target_lang": args.target_lang,
                "domain": args.domain,
                "style": args.style,
                "terminology": format_terminology(preserve_terms),
                "explanation": None,
                "usage": llm_result.get("hint"),
                "error_message": None,
                "trace_id": trace_id,
                "fallback_prompt": llm_result.get("prompt")
            }, ensure_ascii=False, indent=2))
            sys.exit(0)

        translated = llm_result
        error_msg = llm_error

    if translated is None:
        print(json.dumps({
            "status": "error",
            "error_message": error_msg or "unknown_error",
            "translated_text": None,
            "detected_source_lang": None,
            "target_lang": args.target_lang,
            "domain": args.domain,
            "style": args.style,
            "terminology": None,
            "explanation": None,
            "usage": None,
            "trace_id": trace_id
        }, ensure_ascii=False))
        sys.exit(0)

    translated = apply_preserve_terms(translated, preserve_terms)

    output = {
        "status": "ok",
        "translated_text": translated,
        "detected_source_lang": detected_lang,
        "target_lang": args.target_lang,
        "domain": args.domain,
        "style": args.style,
        "terminology": format_terminology(preserve_terms),
        "explanation": None,
        "usage": f"{args.source_lang}->{args.target_lang} via {'youdao_api' if is_api_mode else 'llm_fallback'}",
        "error_message": None,
        "trace_id": trace_id
    }

    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
