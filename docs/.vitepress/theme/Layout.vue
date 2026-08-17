<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const isChinese = ref(false)
let applying = false
const labels: Record<string, [string, string]> = {
  Home: ['Home', '首页'], Leaderboard: ['Leaderboard', '排行榜'], Paper: ['Paper', '论文'], Dataset: ['Dataset', '数据集'], Code: ['Code', '代码'], Skills: ['Skills', '技能包'],
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
    if (!parent || ['PRE', 'CODE', 'TABLE', 'SCRIPT', 'STYLE'].includes(parent.tagName) || parent.closest('.language-switch')) return
    const value = node.textContent?.trim() || ''
    if (!isChinese.value && value.includes('等跨应用工作流')) {
      node.textContent = node.textContent?.replace('等跨应用工作流', 'cross-application workflows') || 'cross-application workflows'
      return
    }
    const key = Object.keys(labels).find((name) => value === labels[name][0] || value === labels[name][1])
    if (!key) return
    const next = labels[key][isChinese.value ? 1 : 0]
    if (value !== next) node.textContent = node.textContent?.replace(value, next) || next
  })
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
  const observer = new MutationObserver(() => { if (!applying) applyLanguage() })
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
