---
name: youdao-translate
description: "通用翻译能力基础设施。支持多语言文本翻译，可选领域（general/academic/business/tech/marketing）和风格（normal/concise/formal/natural），支持术语保留和翻译解释。可被其他 Skills 调用作为底层翻译组件，也可直接用于独立翻译任务。当需要翻译文本、调用有道翻译API、或需要高质量翻译能力时触发。"
allowed-tools: "Bash(python3:*)"
---

# Youdao Translate — 通用翻译能力

通用翻译基础设施 Skill，提供高质量多语言翻译能力，支持领域适配、风格控制和术语管理。

## 快速使用

```bash
# 基础翻译（自动检测源语言）
python3 {baseDir}/scripts/translate.py --text "Hello World" --target-lang zh

# 指定源语言和领域
python3 {baseDir}/scripts/translate.py --text "The meeting has been postponed" --source-lang en --target-lang zh --domain business

# 带风格和术语
python3 {baseDir}/scripts/translate.py --text "Our SaaS platform empowers enterprise growth" --target-lang zh --domain tech --style marketing --preserve-terms "SaaS,enterprise"

# 带解释
python3 {baseDir}/scripts/translate.py --text "I'll call it a day" --target-lang zh --need-explanation
```

## 输入参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--text` | string | 必填 | 待翻译文本 |
| `--source-lang` | string | auto | 源语言（auto/en/zh/ja/ko/fr/de/es/ru 等） |
| `--target-lang` | string | 必填 | 目标语言 |
| `--domain` | string | general | 翻译领域：general / academic / business / tech / marketing |
| `--style` | string | normal | 翻译风格：normal / concise / formal / natural |
| `--need-explanation` | flag | false | 是否返回翻译选择解释 |
| `--preserve-terms` | string | null | 保留的术语列表，逗号分隔 |
| `--trace-id` | string | auto | 追踪ID，用于日志和调试 |

## 输出格式（JSON）

```json
{
  "status": "ok",
  "translated_text": "翻译结果",
  "detected_source_lang": "en",
  "target_lang": "zh",
  "domain": "business",
  "style": "formal",
  "terminology": {"SaaS": "SaaS"},
  "explanation": null,
  "usage": null,
  "error_message": null,
  "trace_id": "xxx"
}
```

## 错误码

| status | error_message | 说明 |
|--------|---------------|------|
| `error` | `missing_required_param` | 缺少必填参数 |
| `error` | `unsupported_lang` | 不支持的语言 |
| `error` | `api_error:xxx` | API 调用失败（含原始错误） |
| `error` | `empty_translation` | 翻译结果为空 |
| `error` | `rate_limit` | 触发频率限制 |

## 被其他 Skill 调用

其他 Skill 可通过子进程调用：

```python
import subprocess, json

def translate(text, target_lang, **kwargs):
    cmd = ["python3", "/path/to/scripts/translate.py",
           "--text", text, "--target-lang", target_lang]
    for k, v in kwargs.items():
        cmd.extend([f"--{k}", str(v)])
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    return json.loads(result.stdout)
```

## API 配置

使用有道翻译官方 API（非有道智云转封装版）。待提供 API 凭据后对接。

优先级（从高到低）：
1. 环境变量 `YOUDAO_APP_KEY` + `YOUDAO_APP_SECRET`
2. `~/.openclaw/.env` 中的同名变量
3. 无 API key 时降级为 LLM 翻译（使用当前模型）

降级模式下 domain 和 style 通过 prompt engineering 实现，质量略低于 API 模式。

> **注意：** 当前 API 调用部分基于有道翻译官方接口签名方式，收到具体 API 文档/凭据后需核实 endpoint、签名方式和请求参数格式是否一致。

## 注意事项

- 单次请求文本上限：5000 字符（API 模式）/ 无硬限（LLM 降级模式）
- API 模式支持自动语言检测，LLM 降级模式同样支持
- `preserve_terms` 中的术语不会出现在翻译结果中，保留原文
- `need-explanation` 会增加输出 token，仅在需要调试或学习时使用
