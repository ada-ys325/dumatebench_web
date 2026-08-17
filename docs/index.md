<HomeHero />

<main class="site-shell">

<section class="home-section" id="overview">
<div class="section-heading"><p class="eyebrow">DuMateBench</p><h2>评估 AI Agent 完成真实计算机工作的能力。</h2><p>DuMateBench 是一个面向真实工作任务的交互式 Agent 基准。每个任务包含指令、沙盒工作区、任务资源和评估器，关注 Agent 如何检查环境、使用工具、生成工件并从故障中恢复。</p></div>
<MetricCards />
</section>

<section class="home-section" id="benchmark">
<div class="section-heading"><p class="eyebrow">Benchmark structure</p><h2>任务不是单轮文本题，而是一段可复现的工作流程。</h2><p>任务在 Docker 沙盒中运行，评估最终工件，也评估交互过程中的恢复行为。</p></div>
<div class="benchmark-grid"><article><span class="feature-index">01 · TASK PACKAGE</span><h3>任务结构</h3><pre><code>task_1/
├── instruction.md
├── task.yaml
├── task_type_feature.json
├── workspace_seed/
├── evaluator/
└── web_reference/</code></pre></article><article><span class="feature-index">02 · ACTION LOOP</span><h3>评估循环</h3><ol><li>Agent 读取任务与工作区</li><li>返回一个 JSON action</li><li>运行器在 Docker 中执行</li><li>评估器检查工件、日志与恢复行为</li></ol><p class="muted-note">运行成功不等于任务通过，最终评估结果才是准入依据。</p></article></div>
</section>

<section class="home-section">
<div class="section-heading"><p class="eyebrow">Capability coverage</p><h2>组合式能力分类</h2><p>以下能力可以在同一任务中组合出现，并不是互斥的数据子集。</p></div>
<div class="category-grid"><article><span class="category-mark purple"/><h3>文本与代码</h3><p>文本生成、代码编写和软件开发任务。</p><strong>文本生成 160 · 代码编写 88</strong></article><article><span class="category-mark blue"/><h3>网络与信息</h3><p>网络检索、信息提取以及网络/API 故障恢复。</p><strong>网络检索 86</strong></article><article><span class="category-mark cyan"/><h3>文档与表格</h3><p>DOCX、PDF、PPTX、Excel 等跨应用工作流。</p><strong>DOCX 阅读 27 · Excel 编辑 18</strong></article><article><span class="category-mark slate"/><h3>文件与多媒体</h3><p>文件组织、图像、视频、音频生成或编辑。</p><strong>文件整理 34 · 多媒体 46</strong></article></div>
</section>

<section class="home-section">
<div class="section-heading"><p class="eyebrow">Dataset facts</p><h2>基准数据集概览</h2></div>
<div class="facts"><div><span>任务数量</span><strong>200</strong></div><div><span>大约尺寸</span><strong>3.8 GB</strong></div><div><span>主要语言</span><strong>中文</strong></div><div><span>执行环境</span><strong>Docker</strong></div></div>
<p class="muted-note">以上信息来自 DuMateBench 数据集卡。任务能力为组合式标注，具体版本和官方排行榜结果以正式发布为准。</p>
</section>

<section class="home-section">
<div class="section-heading"><p class="eyebrow">Public results</p><h2>Leaderboard preview</h2><p class="muted-note">当前条目仍是演示占位数据，不代表官方成绩。</p></div>
<LeaderboardTable compact />
<p style="margin-top:18px"><a href="/leaderboard">查看排行榜 →</a></p>
</section>

<section class="home-section">
<div class="section-heading"><p class="eyebrow">Resources</p><h2>从数据集、代码和论文开始。</h2></div>
<ResourceCards />
</section>
</main>

<style>
.benchmark-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.benchmark-grid article{padding:28px;border:1px solid var(--db-border);border-radius:var(--db-radius-md);background:var(--db-bg)}.benchmark-grid h3{font-size:24px;margin:22px 0 16px}.benchmark-grid pre{margin:0;background:var(--db-bg-soft);padding:18px;border-radius:10px;overflow:auto;font-size:13px;line-height:1.6}.benchmark-grid ol{margin:0;padding-left:22px;color:var(--db-text-secondary);line-height:2}.benchmark-grid li::marker{color:var(--db-primary);font-weight:700}.category-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.category-grid article{padding:25px;border:1px solid var(--db-border);border-radius:var(--db-radius-md);background:var(--db-bg-soft)}.category-mark{display:block;width:34px;height:5px;border-radius:99px;margin-bottom:24px}.category-mark.purple{background:var(--db-primary)}.category-mark.blue{background:var(--db-electric-blue)}.category-mark.cyan{background:#21b896}.category-mark.slate{background:#757b91}.category-grid h3{margin:0 0 8px}.category-grid p{color:var(--db-text-secondary);font-size:13px;line-height:1.5;min-height:58px}.category-grid strong{font-size:12px;color:var(--db-primary)}.facts{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.facts div{padding:23px;border:1px solid var(--db-border);border-radius:var(--db-radius-md);background:var(--db-bg-soft)}.facts span{display:block;color:var(--db-text-muted);font-size:13px}.facts strong{display:block;font-size:25px;margin-top:14px}@media(max-width:900px){.category-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:760px){.benchmark-grid{grid-template-columns:1fr}.facts{grid-template-columns:repeat(2,1fr)}}@media(max-width:500px){.category-grid{grid-template-columns:1fr}}
</style>
