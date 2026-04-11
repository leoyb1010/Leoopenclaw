# 当前技能清单与状态报告

生成时间：2026-04-11 12:54 (Asia/Shanghai)

## 一、概览

当前系统同时存在两类技能来源：

1. **用户侧已安装技能**，主要位于 `~/.agents/skills/`
2. **OpenClaw 自带技能**，主要位于 `~/.npm-global/lib/node_modules/@qingchencloud/openclaw-zh/`

整体判断：
- 技能覆盖面很广，涵盖办公、检索、代码、内容、设计、自动化、金融分析等方向
- **Feishu 相关能力当前最成熟，且已有配置可直接使用**
- 部分系统技能仍存在缺失依赖、未配置 API Key、未启用渠道、未安装本地 CLI 等问题
- 有少量技能存在**重复来源或多版本并存**，后续建议做一次去重和优先级梳理

---

## 二、当前发现的技能来源

### 1. 用户侧技能（`~/.agents/skills/`）

已发现的技能包括但不限于：

- 1password
- a-stock-analysis
- agent-reach
- agent-self-reflection
- ai-image-generation
- ai-social-media-content
- ai-video-generation
- aliyun-qwen-image
- aliyun-qwen-tts-voice-clone
- aliyun-wan-video
- aminer-open-academic
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
- debug-pro
- discount-marketing-strategy
- email-marketing
- email-sequence
- executing-plans
- feishu-chat-history
- feishu-cron-reminder
- feishu-doc
- feishu-drive
- feishu-perm
- feishu-screenshot
- feishu-send-file
- feishu-voice
- FFmpeg Video Editor
- find-skills
- frontend-design
- git-essentials
- gog
- imagegen
- infographic
- interview-designer
- logo-design-guide
- market-research
- memory
- multi-search-engine
- notebooklm
- obsidian-ontology-sync
- opencode-controller
- p-image
- ppt-visual
- proactive-self-improving-agent
- research-paper-writer
- security-auditor
- self-improving
- SEO
- seo-content-writer
- session-logs
- skill-creator
- skill-vetter
- social-content
- social-media-carousel
- Social Media Scheduler
- speech-to-text
- supabase-postgres-best-practices
- tavily-search
- tavily-web-search-wrapper
- test-runner
- tmux
- ui-ux-pro-max
- video-frames
- web-design-guidelines
- writing-plans
- x-monitor

### 2. OpenClaw 自带技能（部分）

已发现的技能包括但不限于：

- 1password
- apple-notes
- apple-reminders
- bear-notes
- blogwatcher
- blucli
- bluebubbles
- camsnap
- canvas
- clawhub
- coding-agent
- discord
- eightctl
- gemini
- gh-issues
- github
- gifgrep
- gog
- goplaces
- healthcheck
- himalaya
- imsg
- mcporter
- model-usage
- nano-pdf
- node-connect
- notion
- obsidian
- openai-whisper
- openai-whisper-api
- openhue
- oracle
- ordercli
- peekaboo
- sag
- session-logs
- sherpa-onnx-tts
- slack
- songsee
- sonoscli
- spotify-player
- summarize
- taskflow
- taskflow-inbox-triage
- things-mac
- tmux
- trello
- video-frames
- voice-call
- wacli
- weather
- xurl

另外还发现一些扩展型技能：
- acp-router
- diffs
- feishu-wiki
- tavily
- prose
- qqbot-channel
- qqbot-media
- qqbot-remind
- wiki-maintainer
- obsidian-vault-maintainer
- tlon-skill

---

## 三、状态结论

本次状态判断主要依据：
- `openclaw skills check` 的检查结果
- 技能目录实际存在情况
- 已知长期配置记忆（如 Feishu）

### 1. 当前大概率可用或未发现明显缺依赖的技能

以下技能未在本次检查中被标记为缺失依赖，通常表示当前环境至少没有发现显式缺件：

- 1password
- a-stock-analysis
- agent-reach
- ai-image-generation
- ai-social-media-content
- ai-video-generation
- aliyun-qwen-image
- aliyun-qwen-tts-voice-clone
- aliyun-wan-video
- aminer-open-academic
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
- feishu-doc
- feishu-drive
- feishu-perm
- feishu-screenshot
- feishu-send-file
- feishu-voice
- FFmpeg Video Editor
- find-skills
- frontend-design
- git-essentials
- gog
- imagegen
- infographic
- interview-designer
- logo-design-guide
- market-research
- memory
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

### 2. 当前明确缺少依赖或配置的技能

`openclaw skills check` 直接报告以下技能存在依赖缺失或配置不足：

- bear-notes
- blogwatcher
- blucli
- bluebubbles
- camsnap
- coding-agent
- discord
- eightctl
- gemini
- gifgrep
- goplaces
- himalaya
- imsg
- model-usage
- nano-pdf
- notion
- obsidian
- openai-whisper
- openai-whisper-api
- openhue
- oracle
- ordercli
- peekaboo
- sag
- session-logs
- sherpa-onnx-tts
- slack
- songsee
- sonoscli
- spotify-player
- summarize
- things-mac
- trello
- voice-call
- wacli
- xurl

### 3. 缺失项类型归纳

本次缺失项大致分为以下几类：

- **本地命令行工具未安装**
  - 例如：`gh`、`op`、`rg`、`curl`、`whisper`、`nano-pdf` 等
- **环境变量/API Key 未配置**
  - 例如：`NOTION_API_KEY`、`OPENAI_API_KEY`、`TRELLO_API_KEY` 等
- **渠道级配置未启用**
  - 例如：Slack、Discord、语音通话插件
- **依赖本地应用或服务未就绪**
  - 例如：BlueBubbles、Spotify、Sonos、Things、Obsidian CLI

---

## 四、重点技能说明摘录

以下为本次抽样读取的技能使用说明摘要。

### 1. 1password

**用途**：
- 安装并使用 1Password CLI (`op`)
- 登录账户、读取密钥、进行安全注入

**关键说明**：
- 必须在 **tmux 会话** 中运行 `op`
- 先执行 `op signin`，再执行 `op whoami`
- 不应将密钥打印到日志、聊天或代码中

**状态判断**：
- 未被检查器标记为缺失依赖
- 但真正使用前，仍需确认 `op` 可执行、桌面应用联动已开启且账户已登录

### 2. feishu-doc

**用途**：
- 读取和写入飞书 Doc、Wiki、Sheet、Bitable
- 支持 create / write / append / blocks 操作

**关键说明**：
- 长文档应分块追加，避免一次性整篇写入
- 依赖 Feishu 应用鉴权配置
- 可用于自动生成文档、更新报告、持续追加内容

**状态判断**：
- 当前是本环境中最成熟的一组能力之一
- 已知 Feishu 应用配置存在，消息接收权限已获批准

### 3. tavily-search

**用途**：
- 网络搜索
- 页面内容提取
- 网站爬取
- 深度研究

**关键说明**：
- 已通过 mcporter 配置 Tavily MCP
- 支持 `search`、`extract`、`crawl`、`map`
- 适合做联网资料检索和研究任务

**状态判断**：
- 当前看起来可用
- 适合后续用来做实时信息收集和研究型任务

### 4. Code

**用途**：
- 为代码任务提供结构化工作流
- 强调先规划、再执行、再验证

**关键说明**：
- 编码前先拆步骤
- 每个阶段都要有验证动作
- 只记录用户明确要求保存的偏好
- 更偏“工作流规范”，而不是一键代做全部开发

**状态判断**：
- 可作为代码任务方法论技能使用
- 不依赖额外网络或外部服务

### 5. weather

**用途**：
- 查询天气与天气预报

**关键说明**：
- 适合当前天气、未来天气、出行天气规划
- 不适合历史气候分析、极端天气预警、专业气象研判
- 依赖 `curl`

**状态判断**：
- 说明完整
- 但具体能否使用要看 `curl` 是否在运行环境可用

### 6. github

**用途**：
- 通过 `gh` CLI 查询和操作 GitHub
- issue、PR、CI、评论、日志查看等

**关键说明**：
- 适合 GitHub 仓库运营与协作
- 不适合复杂网页 UI 手工流程
- 使用前需要完成 `gh auth login`

**状态判断**：
- 技能说明完备
- 真正可用性取决于 `gh` 是否安装及是否已认证

---

## 五、重复或重叠技能观察

当前环境存在若干重复或重叠来源：

- `1password` 同时存在用户安装版与系统版
- `gog` 同时存在用户安装版与系统版
- `tmux` 同时存在用户安装版与系统版
- `video-frames` 同时存在用户安装版与系统版
- `session-logs` 同时存在用户安装版与系统版
- `skill-creator` 同时存在用户安装版与系统版
- `content-strategy` 存在多处目录
- `seo-content-writer` 存在多处目录

**影响**：
- 不一定马上出问题
- 但可能导致后续使用时版本来源不清晰、说明不一致、维护困难

**建议**：
- 给每个重复技能明确一个“主版本”
- 其他版本标记为备用或待移除

---

## 六、优先级建议

### 第一优先级，建议保留并重点维护

这些技能要么当前已知配置成熟，要么用途广、复用率高：

- feishu-doc
- feishu-drive
- feishu-perm
- feishu-chat-history
- feishu-cron-reminder
- tavily-search
- tavily-web-search-wrapper
- Code
- git-essentials
- security-auditor
- tmux
- notebooklm
- weather
- github

### 第二优先级，建议按需补依赖

这些技能很有用，但依赖未补齐：

- github / gh-issues
- notion
- obsidian
- openai-whisper / openai-whisper-api
- session-logs
- summarize
- coding-agent
- slack
- discord
- trello

### 第三优先级，建议后续评估是否真的需要

这类技能偏场景化或较少使用，可等核心能力稳定后再处理：

- sonoscli
- spotify-player
- things-mac
- bluebubbles
- bear-notes
- ordercli
- openhue
- songsee
- wacli
- xurl

---

## 七、后续建议动作

建议按以下顺序继续：

1. **做一次“技能去重”**
   - 明确每个重复技能的主版本
   - 标注备用版本或废弃版本

2. **做一次“高频技能可用性体检”**
   - 重点检查 Feishu、Tavily、GitHub、Notion、Weather、tmux、session-logs
   - 逐个确认：命令是否存在、认证是否完成、是否能跑通最小示例

3. **修复关键缺依赖**
   - 先补最常用能力，不要一次性全装
   - 优先补：`gh`、`rg`、`curl`、Whisper、Notion API、Slack/Discord 配置

4. **建立一个长期维护表**
   - 字段建议：技能名、来源、用途、依赖、状态、主版本、备注

---

## 八、本次结论

一句话总结：

> 当前系统的技能生态已经很丰富，其中 Feishu、Tavily、代码工作流、研究写作类能力比较成型；但部分系统技能仍停留在“已安装说明、未完成依赖”的状态，下一步最值得做的是去重、体检、补关键依赖。

---

## 附：本次检查中明确看到的缺依赖项

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
