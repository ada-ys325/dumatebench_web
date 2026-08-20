<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const isChinese = ref(false)
let applying = false
const labels: Record<string, [string, string]> = {
  Home: ['Home', '首页'], Leaderboard: ['Leaderboard', '排行榜'], Paper: ['Paper', '论文'], Dataset: ['Dataset', '数据集'], Code: ['Code', '代码'],
  'Research benchmark · DuMate': ['Research benchmark · DuMate', '研究基准 · DuMate'],
  'AI Agent Benchmark for Real-World Work': ['AI Agent Benchmark for Real-World Work', '面向真实工作环境的 AI Agent 基准'],
  'Evaluate agents on realistic tasks and environments.': ['Evaluate agents on realistic tasks and environments.', '评估 Agent 在真实任务和环境中的表现。'],
  'Explore the benchmark': ['Explore the benchmark', '探索基准'], 'View leaderboard': ['View leaderboard', '查看排行榜'],
  'Static, open documentation': ['Static, open documentation', '静态开放文档'], Version: ['Version', '版本'],
  'DuMateBench': ['DuMateBench', 'DuMateBench'], '中文': ['Chinese', '中文'],
  'DuMateBench · Research benchmark site': ['DuMateBench · Research benchmark site', 'DuMateBench · 研究基准网站'],
  '评估 AI Agent 完成真实计算机工作的能力。': ['Evaluate AI agents on real computer work.', '评估 AI Agent 完成真实计算机工作的能力。'],
  'Benchmark structure': ['Benchmark structure', '基准结构'],
  '任务不是单轮文本题，而是一段可复现的工作流程。': ['Tasks are reproducible workflows, not single-turn text prompts.', '任务不是单轮文本题，而是一段可复现的工作流程。'],
  'Capability coverage': ['Capability coverage', '能力覆盖'], '组合式能力分类': ['Compositional capability coverage', '组合式能力分类'],
  'Dataset facts': ['Dataset facts', '数据集信息'], '基准数据集概览': ['Dataset overview', '基准数据集概览'],
  'Public results': ['Public results', '公开结果'], 'Leaderboard preview': ['Leaderboard preview', '排行榜预览'],
  'Resources': ['Resources', '资源'], '从数据集、代码和论文开始。': ['Start with the dataset, code, and paper.', '从数据集、代码和论文开始。'],
  'What DuMateBench evaluates': ['What DuMateBench evaluates', 'DuMateBench 评估什么'],
  'At a glance': ['At a glance', '概览'], 'Official figure pending': ['Official figure pending', '官方数据待发布'],
  'Tasks': ['Tasks', '任务数'], Domains: ['Domains', '领域'], Environments: ['Environments', '环境'], 'Models evaluated': ['Models evaluated', '评估模型'],
  'Example submission': ['Example submission', '示例提交'], 'Your agent here': ['Your agent here', '你的 Agent'], 'Demo data': ['Demo data', '演示数据'], 'Awaiting results': ['Awaiting results', '等待结果'],
  'Open resource': ['Open resource', '打开资源'], 'Link to be announced': ['Link to be announced', '链接待公布'],
  'DuMateBench 是一个面向真实工作任务的交互式 Agent 基准。每个任务包含指令、沙盒工作区、任务资源和评估器，关注 Agent 如何检查环境、使用工具、生成工件并从故障中恢复。': ['DuMateBench is an interactive agent benchmark for real-world work tasks. Each task includes an instruction, sandbox workspace, task resources, and an evaluator, focusing on how agents inspect environments, use tools, produce artifacts, and recover from failures.', 'DuMateBench 是一个面向真实工作任务的交互式 Agent 基准。每个任务包含指令、沙盒工作区、任务资源和评估器，关注 Agent 如何检查环境、使用工具、生成工件并从故障中恢复。'],
  '任务在 Docker 沙盒中运行，评估最终工件，也评估交互过程中的恢复行为。': ['Tasks run in Docker sandboxes; evaluation checks both final artifacts and recovery behavior during interaction.', '任务在 Docker 沙盒中运行，评估最终工件，也评估交互过程中的恢复行为。'],
  '以下能力可以在同一任务中组合出现，并不是互斥的数据子集。': ['These capabilities can be combined in a single task; they are not mutually exclusive subsets.', '以下能力可以在同一任务中组合出现，并不是互斥的数据子集。'],
  '任务结构': ['Task structure', '任务结构'], '评估循环': ['Evaluation loop', '评估循环'],
  '文本与代码': ['Text and code', '文本与代码'], '网络与信息': ['Web and information', '网络与信息'], '文档与表格': ['Documents and spreadsheets', '文档与表格'], '文件与多媒体': ['Files and media', '文件与多媒体'],
  '文本生成、代码编写和软件开发任务。': ['Text generation, coding, and software development tasks.', '文本生成、代码编写和软件开发任务。'],
  '网络检索、信息提取以及网络/API 故障恢复。': ['Web retrieval, information extraction, and network/API failure recovery.', '网络检索、信息提取以及网络/API 故障恢复。'],
  'DOCX、PDF、PPTX、Excel 等跨应用工作流。': ['Cross-application workflows across DOCX, PDF, PPTX, and Excel.', 'DOCX、PDF、PPTX 等跨应用工作流。'],
  'DOCX、PDF、PPTX 等跨应用工作流。': ['Cross-application workflows across DOCX, PDF, PPTX, and Excel.', 'DOCX、PDF、PPTX 等跨应用工作流。'],
  '文件组织、图像、视频、音频生成或编辑。': ['File organization and image, video, and audio generation or editing.', '文件组织、图像、视频、音频生成或编辑。'],
  '文本生成 160 · 代码编写 88': ['Text generation 160 · Code 88', '文本生成 160 · 代码编写 88'],
  '网络检索 86': ['Web retrieval 86', '网络检索 86'],
  'DOCX 阅读 27 · Excel 编辑 18': ['DOCX reading 27 · Excel editing 18', 'DOCX 阅读 27 · Excel 编辑 18'],
  '文件整理 34 · 多媒体 46': ['File organization 34 · Multimedia 46', '文件整理 34 · 多媒体 46'],
  '数据集概览': ['Dataset overview', '数据集概览'], '任务数量': ['Task count', '任务数量'], '大约尺寸': ['Approx. size', '大约尺寸'], '主要语言': ['Primary language', '主要语言'], '执行环境': ['Execution environment', '执行环境'],
  '以上信息来自 DuMateBench 数据集卡。任务能力为组合式标注，具体版本和官方排行榜结果以正式发布为准。': ['These facts come from the DuMateBench dataset card. Capabilities are compositional annotations; official versions and leaderboard results will be announced separately.', '以上信息来自 DuMateBench 数据集卡。任务能力为组合式标注，具体版本和官方排行榜结果以正式发布为准。'],
  '当前条目仍是演示占位数据，不代表官方成绩。': ['These entries are demo placeholders and do not represent official results.', '当前条目仍是演示占位数据，不代表官方成绩。'],
  'Agent 读取任务与工作区': ['Agent reads the task and workspace', 'Agent 读取任务与工作区'], '返回一个 JSON action': ['Returns one JSON action', '返回一个 JSON action'], '运行器在 Docker 中执行': ['Runner executes it in Docker', '运行器在 Docker 中执行'], '评估器检查工件、日志与恢复行为': ['Evaluator checks artifacts, logs, and recovery behavior', '评估器检查工件、日志与恢复行为'], '运行成功不等于任务通过，最终评估结果才是准入依据。': ['A successful run does not imply a pass; the final evaluation determines the result.', '运行成功不等于任务通过，最终评估结果才是准入依据。']
}

// Extended page copy translations. Content and data stay identical; only visible labels change.
Object.assign(labels, {
  'Skip to content': ['Skip to content', '跳转到正文'], Search: ['Search', '搜索'], 'Main Navigation': ['Main Navigation', '主导航'],
  'Switch to dark theme': ['Switch to dark theme', '切换到深色模式'], 'Switch to light theme': ['Switch to light theme', '切换到浅色模式'],
  Overview: ['Overview', '概览'], 'DuMate logo': ['DuMate logo', 'DuMate 标志'],
  'Content marked TBD is awaiting official release information.': ['Content marked TBD is awaiting official release information.', '标记为 TBD 的内容等待正式发布信息。'],
  'BENCHMARK FOCUS': ['BENCHMARK FOCUS', '基准重点'], 'Real-world tasks': ['Real-world tasks', '真实工作任务'], 'Agent capabilities': ['Agent capabilities', 'Agent 能力'], 'Reliable evaluation': ['Reliable evaluation', '可靠评估'], 'Scientific details and official measurements will be published here.': ['Scientific details and official measurements will be published here.', '科学细节和官方测量结果将在此发布。'],
  'A benchmark for agents doing real computer work.': ['A benchmark for agents doing real computer work.', '评估 Agent 完成真实计算机工作的基准。'],
  'DuMateBench evaluates how AI agents inspect environments, use tools, produce artifacts, and recover from failures. Start with the overview, then explore task design and public results through the top navigation.': ['DuMateBench evaluates how AI agents inspect environments, use tools, produce artifacts, and recover from failures. Start with the overview, then explore task design and public results through the top navigation.', 'DuMateBench 评估 AI Agent 如何检查环境、使用工具、生成工件并从故障中恢复。请从概览开始，通过顶部导航了解任务设计和公开结果。'],
  'Everything else has a dedicated page.': ['Everything else has a dedicated page.', '其他内容均有独立页面。'], 'Scope, task design, and evaluation protocol →': ['Scope, task design, and evaluation protocol →', '范围、任务设计和评估协议 →'], 'Reference demo results →': ['Reference demo results →', '参考演示结果 →'], 'Open the released task data →': ['Open the released task data →', '打开已发布的任务数据 →'],
  'Benchmark focus': ['Benchmark focus', '基准重点'], 'Overview · DuMateBench': ['Overview · DuMateBench', '概览 · DuMateBench'], 'Leaderboard · DuMateBench': ['Leaderboard · DuMateBench', '排行榜 · DuMateBench'], 'Paper · DuMateBench': ['Paper · DuMateBench', '论文 · DuMateBench'],
  'DuMateBench is an interactive agent benchmark for real-world computer work. Each task includes an instruction, a sandbox workspace, task resources, and an evaluator. The benchmark focuses on how agents inspect environments, use tools, produce artifacts, and recover from failures.': ['DuMateBench is an interactive agent benchmark for real-world computer work. Each task includes an instruction, a sandbox workspace, task resources, and an evaluator. The benchmark focuses on how agents inspect environments, use tools, produce artifacts, and recover from failures.', 'DuMateBench 是一个面向真实计算机工作的交互式 Agent 基准。每个任务包含指令、沙盒工作区、任务资源和评估器，重点关注 Agent 如何检查环境、使用工具、生成工件并从故障中恢复。'],
  'Tasks run in Docker sandboxes. The evaluator checks the final artifact as well as interaction-time recovery behavior.': ['Tasks run in Docker sandboxes. The evaluator checks the final artifact as well as interaction-time recovery behavior.', '任务在 Docker 沙盒中运行。评估器会检查最终工件以及交互过程中的恢复行为。'],
  'The agent reads the task and workspace.': ['The agent reads the task and workspace.', 'Agent 读取任务和工作区。'], 'The agent returns one JSON action.': ['The agent returns one JSON action.', 'Agent 返回一个 JSON action。'], 'The runner executes the action in Docker.': ['The runner executes the action in Docker.', '运行器在 Docker 中执行该 action。'], 'The evaluator checks artifacts, logs, and recovery behavior.': ['The evaluator checks artifacts, logs, and recovery behavior.', '评估器检查工件、日志和恢复行为。'], 'A successful orchestration run does not by itself imply a pass; the final evaluation result is authoritative.': ['A successful orchestration run does not by itself imply a pass; the final evaluation result is authoritative.', '编排运行成功本身并不代表通过，最终评估结果才是权威依据。'],
  'Each task is distributed as a structured package:': ['Each task is distributed as a structured package:', '每个任务以结构化任务包的形式发布：'], 'The task directory contains task materials and should be executed through the DuMateBench runtime rather than treated as an independent script.': ['The task directory contains task materials and should be executed through the DuMateBench runtime rather than treated as an independent script.', '任务目录包含任务材料，应通过 DuMateBench 运行时执行，而不是作为独立脚本运行。'], 'Capabilities are compositional and may appear together in one task.': ['Capabilities are compositional and may appear together in one task.', '能力是组合式的，可以在同一个任务中共同出现。'],
  Property: ['Property', '属性'], Value: ['Value', '值'], 'Task count': ['Task count', '任务数量'], 'Approx. size': ['Approx. size', '大约大小'], 'Primary language': ['Primary language', '主要语言'], 'Secondary language': ['Secondary language', '第二语言'], 'Execution environment': ['Execution environment', '执行环境'], 'Task format': ['Task format', '任务格式'], Chinese: ['Chinese', '中文'], English: ['English', '英文'], Instruction: ['Instruction', '指令'], workspace: ['workspace', '工作区'], evaluator: ['evaluator', '评估器'], metadata: ['metadata', '元数据'],
  'Capability family': ['Capability family', '能力类别'], Examples: ['Examples', '示例'], 'Reference count': ['Reference count', '参考数量'], 'Text and code': ['Text and code', '文本与代码'], 'Text generation, coding, software development': ['Text generation, coding, software development', '文本生成、代码编写和软件开发'], 'Text 160 · Code 88': ['Text 160 · Code 88', '文本 160 · 代码 88'], 'Web and information': ['Web and information', '网络与信息'], 'Web retrieval, information extraction, network/API recovery': ['Web retrieval, information extraction, network/API recovery', '网络检索、信息提取、网络/API 故障恢复'], 'Web 86': ['Web 86', '网络 86'], 'Documents and spreadsheets': ['Documents and spreadsheets', '文档与表格'], 'DOCX, PDF, PPTX, Excel workflows': ['DOCX, PDF, PPTX, Excel workflows', 'DOCX、PDF、PPTX、Excel 工作流'], 'DOCX reading 27 · Excel editing 18': ['DOCX reading 27 · Excel editing 18', 'DOCX 阅读 27 · Excel 编辑 18'], 'Files and media': ['Files and media', '文件与多媒体'], 'File organization, image, video, audio generation/editing': ['File organization, image, video, audio generation/editing', '文件整理、图像、视频、音频生成或编辑'], 'Files 34 · Multimedia 46': ['Files 34 · Multimedia 46', '文件 34 · 多媒体 46'], Docker: ['Docker', 'Docker'],
  'Action contract': ['Action contract', '动作协议'], 'Each response must contain exactly one next action:': ['Each response must contain exactly one next action:', '每次响应必须且只能包含一个后续动作：'], 'An agent may finish with:': ['An agent may finish with:', 'Agent 可以使用以下内容结束：'], 'The final evaluator may check required artifacts, task-specific requirements, injection failures, recovery from tool or network errors, output locations, and optional LLM-judge criteria.': ['The final evaluator may check required artifacts, task-specific requirements, injection failures, recovery from tool or network errors, output locations, and optional LLM-judge criteria.', '最终评估器可能检查所需工件、任务要求、注入失败、工具或网络错误恢复、输出位置以及可选的 LLM 评判标准。'], 'Official runtime, task environment, and evaluator versions should be used together when reproducing results. The task package and capability coverage are documented above.': ['Official runtime, task environment, and evaluator versions should be used together when reproducing results. The task package and capability coverage are documented above.', '复现结果时应同时使用官方运行时、任务环境和评估器版本。任务包和能力覆盖范围已在上文说明。'],
  'Evaluation protocol': ['Evaluation protocol', '评估协议'], 'Task package': ['Task package', '任务包'], Reproducibility: ['Reproducibility', '可复现性'], 'Copy Code': ['Copy Code', '复制代码'], 'Instruction, workspace, evaluator, metadata': ['Instruction, workspace, evaluator, metadata', '指令、工作区、评估器、元数据'],
  'Results on 200 DuMateBench tasks. Final is computed as': ['Results on 200 DuMateBench tasks. Final is computed as', '200 个 DuMateBench 任务的结果。最终结果计算方式为'], 'Pass-rate': ['Pass-rate', '通过率'], Judge: ['Judge', '评判'], Final: ['Final', '最终结果'], 'The best result in each column is shown in bold.': ['The best result in each column is shown in bold.', '每列最佳结果以粗体显示。'], Agent: ['Agent', 'Agent'], 'Results across five agent systems and four foundation models. See the': ['Results across five agent systems and four foundation models. See the', '五个 Agent 系统和四个基础模型的结果。详见'], 'for task structure and evaluation protocol.': ['for task structure and evaluation protocol.', '了解任务结构和评估协议。'], Metric: ['Metric', '指标'], 'The highest value in every model/metric column is emphasized in bold.': ['The highest value in every model/metric column is emphasized in bold.', '每个模型和指标列中的最高值以粗体显示。'],
  Authors: ['Authors', '作者'], 'Authors:': ['Authors:', '作者：'], Affiliations: ['Affiliations', '所属机构'], 'Affiliations:': ['Affiliations:', '所属机构：'], 'Venue / year': ['Venue / year', '发布渠道 / 年份'], 'Venue / year:': ['Venue / year:', '发布渠道 / 年份：'], Abstract: ['Abstract', '摘要'], Links: ['Links', '链接'], 'Replace this paragraph with the official abstract. No publication or performance details have been inferred.': ['Replace this paragraph with the official abstract. No publication or performance details have been inferred.', '请将此段替换为正式摘要。这里没有推测任何出版或性能信息。'], '[Replace this paragraph with the official abstract. No publication or performance details have been inferred.]': ['[Replace this paragraph with the official abstract. No publication or performance details have been inferred.]', '[请将此段替换为正式摘要。这里没有推测任何出版或性能信息。]'], 'Hugging Face dataset': ['Hugging Face dataset', 'Hugging Face 数据集'], 'Read the benchmark paper and citation details.': ['Read the benchmark paper and citation details.', '阅读基准论文和引用信息。'], 'Open the evaluation repository.': ['Open the evaluation repository.', '打开评估代码仓库。'], 'Open the DuMateBench dataset.': ['Open the DuMateBench dataset.', '打开 DuMateBench 数据集。'], 'Read task structure and evaluation protocol.': ['Read task structure and evaluation protocol.', '阅读任务结构和评估协议。'], 'On this page': ['On this page', '本页内容'], 'DuMateBench: Benchmarking AI Agents in Real-World Work Environments': ['DuMateBench: Benchmarking AI Agents in Real-World Work Environments', 'DuMateBench：真实工作环境中的 AI Agent 基准'], 'Scope, task design, and evaluation protocol': ['Scope, task design, and evaluation protocol', '范围、任务设计和评估协议'], 'Reference demo results': ['Reference demo results', '参考演示结果'], 'Open the released task data': ['Open the released task data', '打开已发布的任务数据'], 'Code:': ['Code:', '代码：'], 'Dataset:': ['Dataset:', '数据集：'], 'PDF:': ['PDF:', 'PDF：'], 'arXiv:': ['arXiv:', 'arXiv：']
})

function applyLanguage() {
  if (applying) return
  applying = true
  document.documentElement.lang = isChinese.value ? 'zh-CN' : 'en-US'
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let current: Node | null
  while ((current = walker.nextNode())) nodes.push(current as Text)
  nodes.forEach((node) => {
    const parent = node.parentElement
    if (!parent || ['PRE', 'CODE', 'SCRIPT', 'STYLE'].includes(parent.tagName) || parent.closest('.language-switch')) return
    const value = node.textContent?.trim() || ''
    if (!isChinese.value && value.includes('等跨应用工作流')) {
      node.textContent = node.textContent?.replace('等跨应用工作流', 'cross-application workflows') || 'cross-application workflows'
      return
    }
    const key = Object.keys(labels).find((name) => value === labels[name][0] || value === labels[name][1])
    if (!key) return
    const next = labels[key][isChinese.value ? 1 : 0]
    if (value !== next) node.textContent = node.textContent?.replace(value, next) || next
    if (value.includes('The best result in each column is shown in bold.')) {
      const replacement = isChinese.value ? '每列最佳结果以粗体显示。' : 'The best result in each column is shown in bold.'
      node.textContent = node.textContent?.replace('The best result in each column is shown in bold.', replacement) || replacement
    }
  })
  const copyLabel = isChinese.value ? '复制代码' : 'Copy Code'
  document.querySelectorAll<HTMLButtonElement>('button').forEach((el) => {
    if ((el.textContent?.trim() === 'Copy Code' || el.textContent?.trim() === '复制代码') && el.textContent.trim() !== copyLabel) el.textContent = copyLabel
  })
  document.querySelectorAll<HTMLElement>('button.copy[title="Copy Code"], button.copy[title="复制代码"]').forEach((el) => { if (el.getAttribute('title') !== copyLabel) el.setAttribute('title', copyLabel) })
  const menuLabel = isChinese.value ? '本页内容' : 'On this page'
  document.querySelectorAll<HTMLElement>('.menu-text').forEach((el) => { if ((el.textContent?.trim() === 'On this page' || el.textContent?.trim() === '本页内容') && el.textContent.trim() !== menuLabel) el.textContent = menuLabel })
  const dark = document.documentElement.classList.contains('dark')
  const themeLabel = isChinese.value
    ? (dark ? '切换到浅色模式' : '切换到深色模式')
    : (dark ? 'Switch to light theme' : 'Switch to dark theme')
  document.querySelectorAll<HTMLElement>('[role="switch"]').forEach((el) => el.setAttribute('aria-label', themeLabel))
  document.querySelectorAll<HTMLElement>('[aria-label="Search"], [aria-label="搜索"]').forEach((el) => el.setAttribute('aria-label', isChinese.value ? '搜索' : 'Search'))
  document.querySelectorAll<HTMLElement>('[aria-label^="Permalink to "], [aria-label="跳转到本节"]').forEach((el) => el.setAttribute('aria-label', isChinese.value ? '跳转到本节' : el.getAttribute('aria-label') || 'Permalink'))
  document.querySelectorAll<HTMLElement>('[title^="Permalink to "]').forEach((el) => { if (isChinese.value) el.setAttribute('title', '跳转到本节') })
  document.querySelectorAll<HTMLElement>('[aria-label="Benchmark focus"], [aria-label="基准重点"]').forEach((el) => el.setAttribute('aria-label', isChinese.value ? '基准重点' : 'Benchmark focus'))
  document.querySelectorAll<HTMLElement>('img[alt="DuMate logo"], img[alt="DuMate 标志"]').forEach((el) => el.setAttribute('alt', isChinese.value ? 'DuMate 标志' : 'DuMate logo'))
  applying = false
}

function setLanguage(chinese: boolean) {
  isChinese.value = chinese
  localStorage.setItem('dumatebench-language', isChinese.value ? 'zh' : 'en')
  applyLanguage()
}

onMounted(() => {
  isChinese.value = localStorage.getItem('dumatebench-language') === 'zh'
  applyLanguage()
  let scheduled = false
  const observer = new MutationObserver(() => {
    if (applying || scheduled) return
    scheduled = true
    requestAnimationFrame(() => { scheduled = false; applyLanguage() })
  })
  observer.observe(document.body, { childList: true, subtree: true })
})
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <div class="language-switch" role="group" aria-label="Language switcher">
        <button type="button" :class="{ active: isChinese }" @click="setLanguage(true)">中文</button>
        <button type="button" :class="{ active: !isChinese }" @click="setLanguage(false)">EN</button>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.language-switch { display: inline-flex; align-items: center; gap: 3px; padding: 3px; margin: 0 12px; border: 1px solid var(--db-border); border-radius: 10px; background: var(--db-bg-soft); }
.language-switch button { border: 0; border-radius: 7px; padding: 7px 12px; min-width: 48px; background: transparent; color: var(--db-text-muted); font: inherit; font-size: 13px; cursor: pointer; transition: .2s ease; }
.language-switch button.active { background: var(--db-bg); color: var(--db-text); box-shadow: 0 0 0 2px #8ce5d1, 0 2px 5px rgba(31, 154, 126, .15); }
.language-switch button:hover:not(.active) { color: var(--db-primary); }
</style>
