---
name: DAPAN
description: 固定生成并投递A股盘前/盘后长图报告。用于每日大盘盘前报告、盘后复盘，以及配套飞书图片交付。
license: MIT
metadata:
  author: jarvis
  version: "1.0.0"
---

# DAPAN

把 A 股日报固定成一个可复用技能，统一生成两类交付：

- **盘前报告**：工作日 08:20 前后使用，输出当日盘前作战图
- **盘后报告**：工作日 16:20 前后使用，输出当日收盘复盘图

## 入口

使用脚本：`scripts/dapan_report.py`

### 盘前

```bash
python3 ~/.agents/skills/DAPAN/scripts/dapan_report.py --mode pre --date 2026-04-13 --send feishu
```

### 盘后

```bash
python3 ~/.agents/skills/DAPAN/scripts/dapan_report.py --mode post --date 2026-04-13 --send feishu
```

## 输出

默认落地到：

- `~/.openclaw/workspace/reports/dapan_pre_YYYY-MM-DD.png`
- `~/.openclaw/workspace/reports/dapan_post_YYYY-MM-DD.png`

## 当前交付约束

- 保持和 2026-04-10 / 2026-04-13 已交付长图相同的大框架
- 优先走 OpenClaw 一线消息工具链发飞书
- 内容基于公开市场数据与公开消息整理，不构成投资建议

## 定时任务建议

- `20 8 * * 1-5` 盘前
- `20 16 * * 1-5` 盘后

## 注意

- 盘前报告以最近一个交易日 A 股收盘 + 隔夜美股/中概/芯片映射 + 周末/当日公开政策消息为核心
- 盘后报告以当日 A 股收盘数据、主线板块、资金风格、政策催化、次日观察点为核心
- 若个别东方财富接口失效，优先回退新浪指数和个股快照数据
