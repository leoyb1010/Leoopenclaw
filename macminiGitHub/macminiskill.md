# macmini 技能与系统状态完整报告

生成时间：2026-04-11 13:00 (Asia/Shanghai)
生成方式：基于当前机器实时检查结果，不是静态猜测

---

## 1. 当前系统状态

### 1.1 OpenClaw 运行状态
- OS: macOS 26.3.1 (arm64)
- Node: 24.13.1
- Dashboard: http://127.0.0.1:18789/
- Channel: stable
- Gateway: 本地运行，状态正常，可达
- Gateway service: LaunchAgent installed / loaded / running
- Node service: 未安装
- Agents: 1
- Sessions: 3 active
- 默认主会话模型: gpt-5.4
- Heartbeat: 30m (main)
- Update: 有可用更新，版本提示为 `2026.4.10`

### 1.2 通道状态
- Feishu: **ON / OK / configured**

### 1.3 安全审计摘要
当前没有 critical，但有 5 个 warn，1 个 info。

主要问题：
1. `gateway.trustedProxies` 未配置，如果以后挂反向代理，需要补可信代理配置
2. `gateway.controlUi.allowInsecureAuth=true` 已启用，属于调试型风险配置
3. 存在危险配置标志启用
4. `gateway.nodes.denyCommands` 有部分规则无效
5. Feishu doc create 具备给请求者授权的能力，需要注意权限边界

### 1.4 当前总体判断
- **系统本体是在线可用的**
- **Feishu 通道已就绪**
- **GitHub CLI 已安装且已登录**（前面已验证）
- **技能层是“数量足够多，但完整度不一致”**

---

## 2. 技能总览

### 2.1 总数
- Total: **127**
- Eligible: **91**
- Disabled: **0**
- Blocked by allowlist: **0**
- Missing requirements: **36**

### 2.2 结论
当前不是“技能缺失”，而是：
- 技能装了很多
- 其中 **91 个当前可用**
- **36 个缺依赖或缺配置**

这说明系统已经有很强的扩展能力，但配置质量参差不齐。

---

## 3. 当前可用技能清单（按实际检查结果）

以下技能被 `openclaw skills check` 判定为 **可以使用**：

- feishu-doc
- feishu-drive
- feishu-perm
- feishu-wiki
- tavily
- 1password
- apple-notes
- apple-reminders
- clawhub
- gh-issues
- github
- gog
- healthcheck
- mcporter
- node-connect
- skill-creator
- tmux
- video-frames
- weather
- a-stock-analysis
- agent-reach
- self-reflection
- ai-image-generation
- ai-social-media-content
- ai-video-generation
- aliyun-qwen-image
- aliyun-qwen-tts-voice-clone
- aliyun-wan-video
- aminer-data-search
- architecture-designer
- autoglm-browser-agent
- autoglm-deepresearch
- autoglm-generate-image
- autoglm-open-link
- autoglm-search-image
- autoglm-websearch
- automation-workflows
- backtest-expert
- blog-writer
- brainstorming
- business-analytics-reporter
- clawdefender
- Code
- competitor-research
- content-strategy
- copywriting
- daily-stock-report
- data-and-funnel-analytics
- discount-marketing-strategy
- email-marketing
- email-sequence
- executing-plans
- feishu-chat-history
- feishu-cron-reminder
- feishu-screenshot
- feishu-send-file
- feishu-voice
- FFmpeg Video Editor
- find-skills
- frontend-design
- git-essentials
- imagegen
- infographic
- interview-designer
- logo-design-guide
- Market Research
- Memory
- multi-search-engine
- notebooklm
- obsidian-ontology-sync
- opencode-controller
- p-image
- ppt-visual
- proactive-self-improving-agent
- research-paper-writer
- security-auditor
- Self-Improving Agent (With Self-Reflection)
- SEO (Site Audit + Content Writer + Competitor Analysis)
- seo-content-writer
- skill-vetter
- social-content
- social-media-carousel
- Social Media Scheduler
- speech-to-text
- supabase-postgres-best-practices
- tavily-search
- tavily-web-search-wrapper
- ui-ux-pro-max
- web-design-guidelines
- writing-plans
- x-monitor

---

## 4. 当前缺依赖/缺配置技能

以下技能被判定为 **缺少依赖或配置不完整**：

- bear-notes (bins: grizzly)
- blogwatcher (bins: blogwatcher)
- blucli (bins: blu)
- bluebubbles (config: channels.bluebubbles)
- camsnap (bins: camsnap)
- coding-agent (anyBins: claude, codex, opencode, pi)
- discord (config: channels.discord.token)
- eightctl (bins: eightctl)
- gemini (bins: gemini)
- gifgrep (bins: gifgrep)
- goplaces (bins: goplaces; env: GOOGLE_PLACES_API_KEY)
- himalaya (bins: himalaya)
- imsg (bins: imsg)
- model-usage (bins: codexbar)
- nano-pdf (bins: nano-pdf)
- notion (env: NOTION_API_KEY)
- obsidian (bins: obsidian-cli)
- openai-whisper (bins: whisper)
- openai-whisper-api (env: OPENAI_API_KEY)
- openhue (bins: openhue)
- oracle (bins: oracle)
- ordercli (bins: ordercli)
- peekaboo (bins: peekaboo)
- sag (bins: sag; env: ELEVENLABS_API_KEY)
- session-logs (bins: rg)
- sherpa-onnx-tts (env: SHERPA_ONNX_RUNTIME_DIR, SHERPA_ONNX_MODEL_DIR)
- slack (config: channels.slack)
- songsee (bins: songsee)
- sonoscli (bins: sonos)
- spotify-player (anyBins: spogo, spotify_player)
- summarize (bins: summarize)
- things-mac (bins: things)
- trello (env: TRELLO_API_KEY, TRELLO_TOKEN)
- voice-call (config: plugins.entries.voice-call.enabled)
- wacli (bins: wacli)
- xurl (bins: xurl)

### 4.1 缺失原因分类

#### A. 缺本地 CLI / bin
典型：
- bear-notes
- blogwatcher
- blucli
- camsnap
- gemini
- gifgrep
- himalaya
- imsg
- nano-pdf
- obsidian
- openai-whisper
- openhue
- oracle
- ordercli
- peekaboo
- session-logs
- songsee
- sonoscli
- summarize
- things-mac
- wacli
- xurl

#### B. 缺环境变量 / API Key
典型：
- goplaces
- notion
- openai-whisper-api
- sag
- sherpa-onnx-tts
- trello

#### C. 缺渠道或插件配置
典型：
- bluebubbles
- discord
- slack
- voice-call

#### D. 缺可选多实现之一
典型：
- coding-agent
- spotify-player

---

## 5. 重复技能排查结果

已确认存在重复技能，说明同一个技能在多个来源共存，或者同名多版本并存。

### 5.1 明确重复项

1. `1password` ×2
- `~/.agents/skills/1password-1.0.1/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/skills/1password/SKILL.md`

2. `content-strategy` ×2
- `~/.agents/skills/content-strategy-0.1.0/SKILL.md`
- `~/.agents/skills/content-strategy/SKILL.md`

3. `feishu-doc` ×2
- `~/.agents/skills/feishu-doc-1.2.7/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/dist/extensions/feishu/skills/feishu-doc/SKILL.md`

4. `feishu-drive` ×2
- `~/.agents/skills/feishu-drive-1.0.0/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/dist/extensions/feishu/skills/feishu-drive/SKILL.md`

5. `feishu-perm` ×2
- `~/.agents/skills/feishu-perm/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/dist/extensions/feishu/skills/feishu-perm/SKILL.md`

6. `gog` ×2
- `~/.agents/skills/gog/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/skills/gog/SKILL.md`

7. `seo-content-writer` ×2
- `~/.agents/skills/seo-content-writer-2.0.0/SKILL.md`
- `~/.agents/skills/seo-content-writer/SKILL.md`

8. `session-logs` ×2
- `~/.agents/skills/session-logs-1.0.0/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/skills/session-logs/SKILL.md`

9. `skill-creator` ×2
- `~/.agents/skills/skill-creator-0.1.0/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/skills/skill-creator/SKILL.md`

10. `tmux` ×2
- `~/.agents/skills/tmux-1.0.0/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/skills/tmux/SKILL.md`

11. `video-frames` ×2
- `~/.agents/skills/video-frames-1.0.0/SKILL.md`
- `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/skills/video-frames/SKILL.md`

### 5.2 重复技能是否有冲突

#### 明显重复且内容高度一致
这些大概率只是不同来源复制，风险较低，但会造成维护混乱：
- 1password
- tmux
- video-frames
- session-logs

#### 重复但说明内容存在差异
这些需要人工定主版本：
- feishu-doc
- feishu-drive
- feishu-perm
- seo-content-writer
- content-strategy
- skill-creator
- gog

### 5.3 抽样差异判断

#### feishu-doc
- 用户版更偏完整文档工作流，强调长文档 chunk append
- 内置版更偏工具动作说明，强调 action/read/write/append/block 用法
- **结论**：不是坏重复，但确实存在“双版本说明并存”

#### tmux
- 用户版偏实操和 clawdbot 风格的 socket/session 习惯
- 内置版偏 OpenClaw 通用说明和场景边界
- **结论**：内容相近，但语境不同，属于功能同名、文档风格不同

#### seo-content-writer
- 一个版本是 `2.0.0`
- 一个版本是 `6.0.0`
- **结论**：这是典型多版本并存，建议保留高版本并清理旧版

---

## 6. 配置完整性判断

### 6.1 已明确完整或接近完整

#### Feishu 体系
当前最完整。
依据：
- OpenClaw status 显示 Feishu channel = ON / OK / configured
- 长期记忆中已记录 Feishu app 已配置、消息权限已批准
- 相关技能 `feishu-doc / drive / perm / wiki` 均显示可用

#### GitHub 体系
当前可用度高。
依据：
- `gh` 已安装
- `gh auth status` 已登录 `leoyb1010`
- `github` 技能被判定可用
- 实际已完成 GitHub 文件上传

#### Tavily 体系
当前可用。
依据：
- `tavily` 与 `tavily-search` 均在可用列表
- 技能文档写明已通过 mcporter 配置

### 6.2 部分完整

#### 1Password
- 技能显示可用
- 但要真正调用 secret，还需要确认 `op signin` 在 tmux 内跑通
- **结论**：理论可用，未做实操验证

#### Apple Notes / Apple Reminders
- 技能显示可用
- 但未实测过 CLI 的真实返回
- **结论**：大概率可用，但未做端到端验证

#### gog / notebooklm / obsidian-ontology-sync / 各类 AI 生成技能
- 系统未报缺依赖
- 但未逐个执行 smoke test
- **结论**：处于“检查通过，未逐项验活”状态

### 6.3 明确不完整
以下体系当前配置明确不完整：
- Notion
- Slack
- Discord
- Trello
- OpenAI Whisper API
- BlueBubbles
- Voice Call
- Obsidian CLI 体系
- 本地媒体与设备类一批技能

---

## 7. 重点技能说明与依赖状态

下面这部分不是全量 127 个逐字抄 SKILL.md，而是给出当前最重要、最值得用的技能摘要，包含用途、依赖、状态。

### 7.1 feishu-doc
- 用途：读写飞书文档、Wiki、Sheet、Bitable
- 关键能力：read / create / write / append / blocks
- 依赖：Feishu 鉴权配置
- 当前状态：**可用**
- 备注：当前环境中最成熟的能力之一

### 7.2 feishu-drive
- 用途：飞书云空间文件管理
- 依赖：Feishu 鉴权配置
- 当前状态：**可用**

### 7.3 feishu-perm
- 用途：飞书权限管理
- 依赖：Feishu 鉴权配置
- 当前状态：**可用**

### 7.4 feishu-wiki
- 用途：飞书 Wiki 读写或结构访问
- 依赖：Feishu 鉴权配置
- 当前状态：**可用**

### 7.5 github
- 用途：通过 `gh` 处理 GitHub issues、PR、CI、API 查询
- 依赖：`gh` + 登录认证
- 当前状态：**可用，且已实测成功上传文件**

### 7.6 gh-issues
- 用途：拉 GitHub issues，并可进一步驱动修复/PR 流程
- 依赖：`gh`
- 当前状态：**可用**

### 7.7 weather
- 用途：天气和天气预报
- 依赖：`curl`
- 当前状态：**可用**

### 7.8 tmux
- 用途：控制 tmux 会话，适合交互式 CLI
- 依赖：`tmux`
- 当前状态：**可用**
- 备注：存在重复版本

### 7.9 1password
- 用途：通过 `op` 管理 1Password secret
- 依赖：`op` + tmux + 登录态
- 当前状态：**检查通过，但未实测 secret 操作**
- 备注：必须在 tmux 中使用

### 7.10 tavily / tavily-search
- 用途：联网搜索、网页提取、研究
- 依赖：Tavily 配置
- 当前状态：**可用**

### 7.11 Code
- 用途：代码任务工作流规范
- 依赖：无明显额外系统依赖
- 当前状态：**可用**
- 备注：偏方法论，不是外部服务类技能

### 7.12 skill-creator
- 用途：创建或改进技能
- 依赖：无明显硬依赖
- 当前状态：**可用**
- 备注：存在重复来源

### 7.13 session-logs
- 用途：搜索/分析历史会话日志
- 依赖：`rg`
- 当前状态：**不可用，缺 `rg`**
- 备注：虽然有用户版和系统版两个说明，但底层依赖没齐

### 7.14 notion
- 用途：Notion 页面、数据库、block 管理
- 依赖：`NOTION_API_KEY`
- 当前状态：**不可用，配置不完整**

### 7.15 slack
- 用途：Slack 消息和交互操作
- 依赖：channels.slack 配置
- 当前状态：**不可用，配置不完整**

### 7.16 discord
- 用途：Discord 通道操作
- 依赖：channels.discord.token
- 当前状态：**不可用，配置不完整**

### 7.17 coding-agent
- 用途：代理 Codex / Claude Code / Pi 等外部 coding agent
- 依赖：任一相关 agent CLI 存在
- 当前状态：**不可用，缺依赖**

---

## 8. boss 视角下的最终结论

### 8.1 当前真正能打的能力
这台机器现在最稳、最值得直接拿来做事的是：
- **Feishu 全家桶**
- **GitHub**
- **Tavily 联网搜索/研究**
- **tmux / 基础工程流**
- **代码/内容/研究类多数用户技能**

### 8.2 当前主要问题
不是技能少，而是三个问题：
1. **重复技能存在，版本治理混乱**
2. **36 个技能缺依赖或缺配置**
3. **很多技能只是“检查通过”，还没做真实 smoke test**

### 8.3 现在最该做的，不是继续加技能
最该做的是三件事：
1. **定主版本，清理重复技能**
2. **补高价值缺依赖**，优先：session-logs、notion、openai-whisper-api、slack、discord
3. **做前 20 个高频技能的最小可用验证**，把“能装”变成“能打”

---

## 9. 建议的下一步执行清单

### 方案 A，直接修复关键缺项
优先修：
- session-logs → 装 `rg`
- notion → 配 `NOTION_API_KEY`
- openai-whisper-api → 配 `OPENAI_API_KEY`
- slack / discord → 补 channel 配置
- coding-agent → 明确要走哪套 agent CLI

### 方案 B，直接做技能治理
我可以继续输出一份：
- 《重复技能治理方案》
- 逐项标出：保留谁，删除谁，为什么

### 方案 C，做高频技能验活表
我可以继续逐个跑 smoke test，生成：
- 技能名
- 是否真能跑
- 最小成功样例
- 当前报错
- 修复建议

---

## 10. 本报告的可信度说明
本报告基于以下事实来源：
- `openclaw status`
- `openclaw skills check`
- 实际技能目录扫描
- 重复技能路径核对
- 抽样读取多个 SKILL.md
- 已实际验证 GitHub 能上传文件

因此，这份报告的结论属于：
- **系统状态：高可信**
- **依赖缺失：高可信**
- **重复技能存在：高可信**
- **所有技能都能否真正跑通：中等可信，需要继续 smoke test 才能定案**
