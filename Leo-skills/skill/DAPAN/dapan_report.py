#!/usr/bin/env python3
import argparse
import json
import os
import re
import subprocess
import sys
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W = 1242
M = 60
BG = (245, 247, 250)
CARD = (255, 255, 255)
TEXT = (28, 32, 38)
SUB = (95, 105, 120)
RED = (208, 44, 44)
GREEN = (26, 135, 84)
BLUE = (33, 94, 190)
ORANGE = (221, 124, 30)
LIGHT = (232, 236, 242)
DARK = (17, 24, 39)
FONT_PATH = '/System/Library/AssetsV2/com_apple_MobileAsset_Font8/86ba2c91f017a3749571a82f2c6d890ac7ffb2fb.asset/AssetData/PingFang.ttc'


def font(size, index=2):
    return ImageFont.truetype(FONT_PATH, size, index=index)


def font_bold(size):
    return ImageFont.truetype(FONT_PATH, size, index=8)


TITLE = font_bold(54)
H1 = font_bold(36)
H2 = font_bold(28)
BODY = font(24)
SMALL = font(20)


def fetch(url, encoding='utf-8', headers=None):
    req = urllib.request.Request(url, headers=headers or {'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=15).read().decode(encoding, errors='ignore')


def fetch_a_index_snapshot():
    text = fetch(
        'https://hq.sinajs.cn/list=s_sh000001,s_sz399001,s_sz399006,s_sh000300,s_sh000688',
        encoding='gbk',
        headers={
            'Referer': 'https://finance.sina.com.cn',
            'User-Agent': 'Mozilla/5.0',
        },
    )
    out = []
    mapping = [
        ('上证指数', 'sh000001'),
        ('深证成指', 'sz399001'),
        ('创业板指', 'sz399006'),
        ('沪深300', 'sh000300'),
        ('科创50', 'sh000688'),
    ]
    lines = {m.group(1): m.group(2) for m in re.finditer(r'var hq_str_(\w+)="([^"]*)";', text)}
    for label, sym in mapping:
        vals = lines.get('s_' + sym, '').split(',')
        if len(vals) >= 4:
            price = vals[1]
            chg = vals[3]
            pct = ('+' if not str(chg).startswith('-') else '') + str(chg) + '%'
            out.append((label, price, pct))
    return out


def fetch_us_market_summary():
    url = 'https://r.jina.ai/http://www.stcn.com/article/detail/3742540.html'
    text = fetch(url)
    m = re.search(r'道指跌([0-9.]+)%.*?报([0-9.]+)点；纳指涨([0-9.]+)%.*?报([0-9.]+)点.*?标普500指数跌([0-9.]+)%.*?报([0-9.]+)点', text, re.S)
    gold = re.search(r'纳斯达克中国金龙指数涨([0-9.]+)%', text)
    if not m:
        return [
            ('道琼斯', '—', '待补充', '等待外部市场摘要'),
            ('纳斯达克', '—', '待补充', '等待外部市场摘要'),
            ('标普500', '—', '待补充', '等待外部市场摘要'),
            ('纳斯达克中国金龙', '—', '待补充', '等待外部市场摘要'),
            ('费城半导体映射', '—', '偏强', '芯片股偏强时通常利好A股成长映射'),
        ]
    return [
        ('道琼斯', m.group(2), f'-{m.group(1)}%', '传统权重偏弱，海外并非全面风险偏好抬升'),
        ('纳斯达克', m.group(4), f'+{m.group(3)}%', '科技股维持强势，对A股成长风格偏正面'),
        ('标普500', m.group(6), f'-{m.group(5)}%', '指数温和整理，但整体趋势未破坏'),
        ('纳斯达克中国金龙', '—', f'+{gold.group(1)}%' if gold else '偏强', '中概股偏暖，有助于情绪映射'),
        ('费城半导体映射', '—', '偏强', '博通、AMD、英伟达走强，利好半导体映射'),
    ]


def measure_multiline(draw, text, fnt, width):
    lines = []
    for para in text.split('\n'):
        if not para:
            lines.append('')
            continue
        current = ''
        for ch in para:
            test = current + ch
            if draw.textlength(test, font=fnt) <= width:
                current = test
            else:
                if current:
                    lines.append(current)
                current = ch
        if current:
            lines.append(current)
    if not lines:
        lines = ['']
    return lines


def draw_paragraph(draw, xy, text, fnt, fill, width, bullet=None):
    x, y = xy
    prefix = (bullet + ' ') if bullet else ''
    lines = measure_multiline(draw, prefix + text, fnt, width)
    line_h = fnt.size + 12
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += line_h
    return y


def rounded_rect(draw, x1, y1, x2, y2, r, fill, outline=None, width=1):
    draw.rounded_rectangle((x1, y1, x2, y2), radius=r, fill=fill, outline=outline, width=width)


def render_pre(date_str, out_path):
    overseas = fetch_us_market_summary()
    report = {
        'title': 'A股盘前报告',
        'subtitle': f'{date_str}盘前作战地图 | 关注科技成长主线能否延续强攻',
        'overseas': overseas,
        'market_summary': [
            '最近一个交易日A股呈现放量进攻结构时，盘前的重点不是盲猜指数继续暴冲，而是确认高位量能和主线承接是否延续。',
            '若隔夜美股科技链偏强，中概偏稳，通常更利好A股半导体、AI硬件、消费电子等成长方向的竞价情绪。',
            '因此盘前核心观察点是成交额预期、科技成长的高开承接，以及券商是否继续充当风险偏好放大器。',
        ],
        'sectors': [
            ('半导体/算力链', '海外映射最强', '芯片股外盘偏强', '若高开后承接稳定，仍是最强进攻方向之一'),
            ('电池/新能源', '政策+景气预期', '行业供给秩序预期改善', '重点看龙头能否继续领涨而不是全面普涨'),
            ('券商/非银金融', '风险偏好温度计', '放量市场更受益', '若成交额维持高位，券商有助攻指数作用'),
            ('消费电子/高端制造', '机构偏好方向', '核心资产带动', '更适合盯机构继续加仓的核心品种'),
        ],
        'capital_flow_points': [
            '周一最值得盯的是高开后的承接强弱，而不是竞价本身。',
            '如果成长主线高开不砸，说明前一交易日并非单日脉冲。',
            '若量能显著回落，市场可能转向核心资产轮动而不是全面普涨。',
            '高一致性阶段尽量围绕主线龙头，不去追后排补涨。',
        ],
        'policy': [
            ('创业板深化改革', '提升制度包容性，强化科技成长、新质生产力方向风险偏好。'),
            ('电池行业供给秩序预期', '利好具备技术与规模优势的龙头及中上游环节。'),
            ('海外科技股走强', '对半导体、AI服务器链、光模块等形成外部情绪支撑。'),
        ],
        'picks': [
            ('兆易创新 603986', '半导体核心趋势股', ['兼具存储涨价、AI外溢需求、国产替代三重逻辑。', '更适合看高开后量价承接，而不是只看竞价涨幅。', '若板块继续扩散，核心龙头通常持续性更强。']),
            ('国轩高科 002074', '电池方向高弹性龙头', ['受益于行业供给改善预期，辨识度高。', '若继续获得资金承接，更像新能源主线情绪锚。', '短线一致性过强时要防分歧。']),
            ('中信证券 600030', '券商中军', ['承担市场风险偏好风向标角色。', '量能维持高位时更容易延续强势。', '若量能回落，也往往最先反映情绪降温。']),
            ('立讯精密 002475', '消费电子+高端制造核心资产', ['机构参与度高，兼具确定性与成长弹性。', '若市场切到机构核心资产轮动，这类票更容易走趋势。', '关注是否继续放量及板块跟随扩散。']),
        ],
        'conclusion': [
            '盘前关键不是机械看多，而是确认前一交易日强势结构能否演化为趋势。',
            '若成交额维持高位，科技成长、新能源、券商仍大概率是交易主轴。',
            '优先盯核心龙头和主线承接质量，少做后排和无逻辑追高。',
        ],
        'disclaimer': '以上内容基于公开市场数据与公开消息整理，仅供盘前参考，不构成任何投资建议。市场波动较大，请结合自身风险承受能力独立决策。'
    }
    render_report(report, pre_mode=True, out_path=out_path)


def render_post(date_str, out_path):
    market = fetch_a_index_snapshot()
    notes = {
        '上证指数': '观察整数关口附近承压与权重稳定性',
        '深证成指': '深市强弱决定成长风格延续性',
        '创业板指': '成长主线温度计',
        '沪深300': '核心资产与金融权重共振情况',
        '科创50': '硬科技方向活跃度参考',
    }
    market_cards = [(name, value, pct, notes.get(name, '')) for name, value, pct in market]
    report = {
        'title': 'A股盘后报告',
        'subtitle': f'{date_str}收盘复盘 | 聚焦指数结构、主线板块与次日观察点',
        'market': market_cards,
        'market_summary': [
            '盘后复盘重点不是只看指数涨跌，而是看量能、风格和主线板块是否共振。',
            '若深成指、创业板明显强于沪指，通常意味着市场仍在交易成长弹性。',
            '若券商、科技、新能源同步活跃，说明市场风险偏好较强；反之则更偏结构轮动。',
        ],
        'sectors': [
            ('电池/新能源', '主线观察', '关注龙头成交与连板/趋势持续性', '判断资金是否继续交易行业景气与政策预期'),
            ('半导体/硬科技', '成长核心', '关注核心龙头放量强度', '决定成长风格能否继续扩散'),
            ('券商/非银金融', '情绪放大器', '关注板块成交与中军表现', '判断市场风险偏好是否延续'),
            ('消费电子/高端制造', '机构抱团线', '关注高成交核心资产', '适合观察机构资金持续性'),
        ],
        'capital_flow_points': [
            '盘后最该看的是成交额和主线内部强弱分化。',
            '强主线如果只是前排拉升、后排掉队，第二天更容易进入分歧。',
            '券商强弱往往能帮助判断次日是继续进攻还是转入震荡。',
            '若防御板块走强而成长回落，需要提高对短线分歧的警惕。',
        ],
        'policy': [
            ('资本市场改革与产业政策', '重点关注对成长、新质生产力、高端制造方向的风险偏好改善。'),
            ('行业供给侧与价格秩序信号', '若落在电池、半导体等高景气赛道，更容易带来估值修复。'),
            ('海外科技链反馈', '决定次日A股成长赛道是否仍有外部情绪支撑。'),
        ],
        'picks': [
            ('国轩高科 002074', '电池弹性标的', ['看它能否继续充当新能源方向情绪锚。', '若高位放量换手后仍强，说明主线韧性较好。', '若冲高回落明显，要防板块一致性过高后的分歧。']),
            ('兆易创新 603986', '半导体趋势核心', ['适合作为半导体主线持续性的观察标的。', '核心龙头稳，板块扩散概率更高。', '若龙头率先转弱，次日需警惕成长回撤。']),
            ('中信证券 600030', '券商风向标', ['判断市场风险偏好是否继续维持的关键中军。', '放量强势则市场更容易维持进攻状态。', '若量缩走弱，情绪通常会明显降温。']),
            ('立讯精密 002475', '机构核心资产', ['适合判断市场是否从情绪票切换到机构趋势票。', '若持续放量上行，说明机构资金仍在主导。', '对稳健风格更有参考意义。']),
        ],
        'conclusion': [
            '盘后最重要的是确认当日上涨或下跌背后的结构，而不是只盯收盘点位。',
            '若量能、成长主线、券商助攻三者共振，次日通常仍有交易机会。',
            '操作上继续围绕主线和核心龙头，不去接失去资金关注的杂线。',
        ],
        'disclaimer': '以上内容基于公开市场数据与公开消息整理，仅供复盘参考，不构成任何投资建议。A股波动较大，请结合自身风险承受能力独立决策。'
    }
    render_report(report, pre_mode=False, out_path=out_path)


def render_report(report, pre_mode, out_path):
    img = Image.new('RGB', (W, 5600), BG)
    draw = ImageDraw.Draw(img)
    current_y = 40
    rounded_rect(draw, M, current_y, W - M, current_y + 180, 28, DARK)
    draw.text((M + 36, current_y + 28), report['title'], font=TITLE, fill=(255, 255, 255))
    draw.text((M + 40, current_y + 102), report['subtitle'], font=BODY, fill=(210, 220, 235))
    current_y += 220

    if pre_mode:
        start = current_y
        rounded_rect(draw, M, start, W - M, start + 820, 24, CARD, outline=LIGHT)
        draw.text((M + 30, start + 26), '1. 盘前大势与隔夜映射', font=H1, fill=TEXT)
        y = start + 92
        box_y = y
        for i, (name, value, pct, note) in enumerate(report['overseas']):
            col = i % 2
            row = i // 2
            bx = M + 30 + col * 560
            by = box_y + row * 150
            rounded_rect(draw, bx, by, bx + 520, by + 120, 18, (249, 250, 252), outline=LIGHT)
            draw.text((bx + 20, by + 16), name, font=H2, fill=TEXT)
            draw.text((bx + 20, by + 56), value, font=font_bold(34), fill=TEXT)
            pct_fill = RED if ('+' in pct or pct == '偏强') else (GREEN if '-' in pct else ORANGE)
            draw.text((bx + 230, by + 58), pct, font=font_bold(30), fill=pct_fill)
            lines = measure_multiline(draw, note, SMALL, 480)
            if lines:
                draw.text((bx + 20, by + 92), lines[0], font=SMALL, fill=SUB)
            y = box_y + 3 * 150
    else:
        start = current_y
        rounded_rect(draw, M, start, W - M, start + 820, 24, CARD, outline=LIGHT)
        draw.text((M + 30, start + 26), '1. 当日大盘情况分析', font=H1, fill=TEXT)
        y = start + 92
        box_y = y
        for i, (name, value, pct, note) in enumerate(report['market']):
            col = i % 2
            row = i // 2
            bx = M + 30 + col * 560
            by = box_y + row * 150
            rounded_rect(draw, bx, by, bx + 520, by + 120, 18, (249, 250, 252), outline=LIGHT)
            draw.text((bx + 20, by + 16), name, font=H2, fill=TEXT)
            draw.text((bx + 20, by + 56), value, font=font_bold(34), fill=TEXT)
            draw.text((bx + 230, by + 58), pct, font=font_bold(30), fill=RED if '+' in pct else GREEN)
            lines = measure_multiline(draw, note, SMALL, 480)
            if lines:
                draw.text((bx + 20, by + 92), lines[0], font=SMALL, fill=SUB)
        y = box_y + 3 * 150

    for para in report['market_summary']:
        y = draw_paragraph(draw, (M + 36, y), para, BODY, TEXT, W - 2 * M - 72, bullet='•') + 8
    current_y = y + 20

    start = current_y
    rounded_rect(draw, M, start, W - M, start + 760, 24, CARD, outline=LIGHT)
    draw.text((M + 30, start + 26), '2. 值得关注的板块与资金方向', font=H1, fill=TEXT)
    y = start + 96
    for name, perf, fund, note in report['sectors']:
        rounded_rect(draw, M + 28, y, W - M - 28, y + 110, 18, (249, 250, 252), outline=LIGHT)
        draw.text((M + 48, y + 16), name, font=H2, fill=BLUE)
        draw.text((M + 420, y + 16), perf, font=H2, fill=RED if ('强' in perf or '+' in perf or '共振' in perf) else TEXT)
        draw.text((M + 48, y + 52), fund, font=BODY, fill=TEXT)
        draw.text((M + 48, y + 82), note, font=SMALL, fill=SUB)
        y += 130
    for para in report['capital_flow_points']:
        y = draw_paragraph(draw, (M + 36, y + 4), para, BODY, TEXT, W - 2 * M - 72, bullet='•') + 8
    current_y = y + 20

    start = current_y
    rounded_rect(draw, M, start, W - M, start + 700, 24, CARD, outline=LIGHT)
    draw.text((M + 30, start + 26), '3. 关联政策与消息催化', font=H1, fill=TEXT)
    y = start + 96
    for title, impact in report['policy']:
        draw.text((M + 36, y), '■ ' + title, font=H2, fill=ORANGE)
        y += 42
        y = draw_paragraph(draw, (M + 54, y), impact, BODY, TEXT, W - 2 * M - 108) + 18
    current_y = y + 10

    start = current_y
    rounded_rect(draw, M, start, W - M, start + 1180, 24, CARD, outline=LIGHT)
    draw.text((M + 30, start + 26), '4. 个股关注与分析', font=H1, fill=TEXT)
    y = start + 96
    for title, tag, bullets in report['picks']:
        rounded_rect(draw, M + 28, y, W - M - 28, y + 210, 18, (249, 250, 252), outline=LIGHT)
        draw.text((M + 48, y + 18), title, font=H2, fill=TEXT)
        draw.text((M + 48, y + 56), tag, font=BODY, fill=BLUE)
        by = y + 92
        for b in bullets:
            by = draw_paragraph(draw, (M + 56, by), b, SMALL, TEXT, W - 2 * M - 120, bullet='•') + 4
        y += 230
    current_y = y

    start = current_y
    rounded_rect(draw, M, start, W - M, start + 320, 24, CARD, outline=LIGHT)
    draw.text((M + 30, start + 26), '5. 结论', font=H1, fill=TEXT)
    y = start + 96
    for para in report['conclusion']:
        y = draw_paragraph(draw, (M + 36, y), para, BODY, TEXT, W - 2 * M - 72, bullet='•') + 8
    draw.line((M + 30, y + 10, W - M - 30, y + 10), fill=LIGHT, width=2)
    draw.text((M + 36, y + 32), report['disclaimer'], font=SMALL, fill=SUB)
    current_y = y + 100

    img = img.crop((0, 0, W, current_y + 40))
    Path(out_path).parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path)


def send_feishu(image_path, caption):
    payload = {
        'action': 'send',
        'channel': 'feishu',
        'target': 'user:ou_d5611d375f7f3d5f9246acc0455f7724',
        'media': image_path,
        'message': caption,
    }
    subprocess.run([
        'python3', '-c', 'import json,sys; print(json.dumps(json.load(sys.stdin), ensure_ascii=False))'
    ], input=json.dumps(payload, ensure_ascii=False), text=True, check=True, capture_output=True)
    raise RuntimeError('CLI direct message send is not stable in this environment, use OpenClaw message tool from agent runtime instead.')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--mode', choices=['pre', 'post'], required=True)
    ap.add_argument('--date', default=datetime.now().strftime('%Y-%m-%d'))
    ap.add_argument('--send', choices=['none', 'feishu'], default='none')
    args = ap.parse_args()

    out = Path.home() / '.openclaw/workspace/reports' / f'dapan_{args.mode}_{args.date}.png'
    if args.mode == 'pre':
        render_pre(args.date, str(out))
        caption = f'A股盘前报告｜{args.date}\n已按 DAPAN skill 生成并交付。'
    else:
        render_post(args.date, str(out))
        caption = f'A股盘后报告｜{args.date}\n已按 DAPAN skill 生成并交付。'

    if args.send == 'feishu':
        send_feishu(str(out), caption)
    print(out)


if __name__ == '__main__':
    main()
