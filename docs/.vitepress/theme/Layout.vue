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
  'DuMateBench': ['DuMateBench', 'DuMateBench'], Partial: ['Partial', '部分通过率'], '中文': ['Chinese', '中文'],
  'DuMateBench · Research benchmark site': ['DuMateBench · Research benchmark site', 'DuMateBench · 研究基准网站'],
  '评估 AI Agent 完成真实计算机工作的能力。': ['Evaluate AI agents on real computer work.', '评估 AI Agent 完成真实计算机工作的能力。'],
  'Benchmark structure': ['Benchmark structure', '基准结构'],
  '任务不是单轮文本题，而是一段可复现的工作流程。': ['Tasks are reproducible workflows, not single-turn text prompts.', '任务不是单轮文本题，而是一段可复现的工作流程。'],
  'Capability coverage': ['Capability coverage', '能力覆盖'], '组合式能力分类': ['Compositional capability coverage', '组合式能力分类'],
  'Dataset facts': ['Dataset facts', '数据集信息'], '基准数据集概览': ['Dataset overview', '基准数据集概览'],
  'Public results': ['Public results', '公开结果'], 'Leaderboard preview': ['Leaderboard preview', '排行榜预览'],
  'Resources': ['Resources', '资源'], '从数据集、代码和论文开始。': ['Start with the dataset, code, and paper.', '从数据集、代码和论文开始。'],
  'What DuMateBench evaluates': ['What DuMateBench evaluates', 'DuMateBench 评估什么'],
  'Official figure pending': ['Official figure pending', '官方数据待发布'],
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
  'Partial is the deterministic checklist pass rate, Judge is the artifact-specific quality score, and Final combines them as': ['Partial is the deterministic checklist pass rate, Judge is the artifact-specific quality score, and Final combines them as', 'Partial 是确定性检查清单通过率，Judge 是面向具体工件的质量分数，Final 将二者组合为'],
  Authors: ['Authors', '作者'], 'Authors:': ['Authors:', '作者：'], Affiliations: ['Affiliations', '所属机构'], 'Affiliations:': ['Affiliations:', '所属机构：'], 'Venue / year': ['Venue / year', '发布渠道 / 年份'], 'Venue / year:': ['Venue / year:', '发布渠道 / 年份：'], Abstract: ['Abstract', '摘要'], Links: ['Links', '链接'], 'Replace this paragraph with the official abstract. No publication or performance details have been inferred.': ['Replace this paragraph with the official abstract. No publication or performance details have been inferred.', '请将此段替换为正式摘要。这里没有推测任何出版或性能信息。'], '[Replace this paragraph with the official abstract. No publication or performance details have been inferred.]': ['[Replace this paragraph with the official abstract. No publication or performance details have been inferred.]', '[请将此段替换为正式摘要。这里没有推测任何出版或性能信息。]'], 'Hugging Face dataset': ['Hugging Face dataset', 'Hugging Face 数据集'], 'Read the benchmark paper and citation details.': ['Read the benchmark paper and citation details.', '阅读基准论文和引用信息。'], 'Open the evaluation repository.': ['Open the evaluation repository.', '打开评估代码仓库。'], 'Open the DuMateBench dataset.': ['Open the DuMateBench dataset.', '打开 DuMateBench 数据集。'], 'Read task structure and evaluation protocol.': ['Read task structure and evaluation protocol.', '阅读任务结构和评估协议。'], 'On this page': ['On this page', '本页内容'], 'DuMateBench: Benchmarking AI Agents in Real-World Work Environments': ['DuMateBench: Benchmarking AI Agents in Real-World Work Environments', 'DuMateBench：真实工作环境中的 AI Agent 基准'], 'Scope, task design, and evaluation protocol': ['Scope, task design, and evaluation protocol', '范围、任务设计和评估协议'], 'Reference demo results': ['Reference demo results', '参考演示结果'], 'Open the released task data': ['Open the released task data', '打开已发布的任务数据'], 'Code:': ['Code:', '代码：'], 'Dataset:': ['Dataset:', '数据集：'], 'PDF:': ['PDF:', 'PDF：'], 'arXiv:': ['arXiv:', 'arXiv：']
})

Object.assign(labels, {
  'A benchmark for compositional computer work.': ['A benchmark for compositional computer work.', '面向组合式计算机工作的基准。'],
  'DuMateBench evaluates whether autonomous agents can coordinate tools, produce artifacts, and recover from failures across realistic end-to-end workflows.': ['DuMateBench evaluates whether autonomous agents can coordinate tools, produce artifacts, and recover from failures across realistic end-to-end workflows.', 'DuMateBench 评估自主 Agent 是否能在真实端到端工作流中协调工具、生成工件并从故障中恢复。'],
  'Results across five agents and four base models →': ['Results across five agents and four base models →', '五个 Agent 和四个基础模型的结果 →'],
  'Why DuMateBench': ['Why DuMateBench', '为什么需要 DuMateBench'],
  'Three contributions define the benchmark.': ['Three contributions define the benchmark.', '三项贡献定义了这个基准。'],
  'The benchmark is designed around the gap between clean, isolated demos and the messy, multi-step work agents must complete in practice.': ['The benchmark is designed around the gap between clean, isolated demos and the messy, multi-step work agents must complete in practice.', '这个基准关注干净、孤立的演示环境与 Agent 在真实实践中必须完成的复杂多步骤工作之间的差距。'],
  'Real-session workflows': ['Real-session workflows', '真实会话工作流'],
  'Real-session compositional workflows': ['Real-session compositional workflows', '真实会话组合式工作流'],
  '200 executable tasks are reconstructed from anonymized, privacy-screened user sessions, preserving relevant interaction history and workspace state.': ['200 executable tasks are reconstructed from anonymized, privacy-screened user sessions, preserving relevant interaction history and workspace state.', '200 个可执行任务由匿名且经过隐私筛选的用户会话重建而来，并保留相关交互历史和工作区状态。'],
  '200 executable tasks are reconstructed from anonymized, privacy-screened multi-turn sessions, preserving interaction history and workspace state across 8 broad scenarios and 17 fine-grained task types.': ['200 executable tasks are reconstructed from anonymized, privacy-screened multi-turn sessions, preserving interaction history and workspace state across 8 broad scenarios and 17 fine-grained task types.', '200 个可执行任务由匿名且经过隐私筛选的多轮会话重建而来，并在 8 个高层场景和 17 个细粒度任务类型中保留交互历史与工作区状态。'],
  'Reproducible complexity': ['Reproducible complexity', '可复现的复杂环境'],
  'Isolated Docker environments model insufficient tools or resources, unstable network and tool behavior, and noisy workspaces with distracting data.': ['Isolated Docker environments model insufficient tools or resources, unstable network and tool behavior, and noisy workspaces with distracting data.', '隔离的 Docker 环境模拟工具或资源不足、不稳定的网络和工具行为，以及包含干扰数据的嘈杂工作区。'],
  'Diagnostic evaluation': ['Diagnostic evaluation', '诊断式评估'],
  'Comprehensive, diagnostic evaluation': ['Comprehensive, diagnostic evaluation', '全面且具有诊断性的评估'],
  'Deterministic checklists and artifact-specific LLM judges measure completion, output quality, robustness, efficiency, and failure modes.': ['Deterministic checklists and artifact-specific LLM judges measure completion, output quality, robustness, efficiency, and failure modes.', '确定性检查清单和面向具体工件的 LLM 评判共同衡量任务完成度、输出质量、鲁棒性、效率和失败模式。'],
  'Five agent frameworks and four base models form 20 configurations, measuring end-to-end performance, workspace-noise robustness, efficiency, and failure modes.': ['Five agent frameworks and four base models form 20 configurations, measuring end-to-end performance, workspace-noise robustness, efficiency, and failure modes.', '五个 Agent 框架和四个基础模型组成 20 个配置，用于衡量端到端性能、工作区噪声下的鲁棒性、效率和失败模式。'],
  'Benchmark scope': ['Benchmark scope', '基准范围'],
  'Built for end-to-end agent evaluation.': ['Built for end-to-end agent evaluation.', '面向端到端 Agent 评估。'],
  'Executable tasks': ['Executable tasks', '可执行任务'],
  'Broad scenarios': ['Broad scenarios', '高层场景'],
  'Fine-grained task types': ['Fine-grained task types', '细粒度任务类型'],
  'Agent-model configurations': ['Agent-model configurations', 'Agent-模型配置'],
  'DuMateBench is a benchmark for autonomous agents completing compositional workflows in realistic computer environments. It focuses on cross-capability work that coordinates multiple productivity tools under imperfect conditions, combining real-session context, controlled environmental complexity, and artifact-aware evaluation to measure whether an agent can complete useful work from instruction to verified output.': ['DuMateBench is a benchmark for autonomous agents completing compositional workflows in realistic computer environments. It focuses on cross-capability work that coordinates multiple productivity tools under imperfect conditions, combining real-session context, controlled environmental complexity, and artifact-aware evaluation to measure whether an agent can complete useful work from instruction to verified output.', 'DuMateBench 是一个评估自主 Agent 在真实计算机环境中完成组合式工作流的基准。它聚焦于不完美环境下协调多个生产力工具的跨能力工作，并结合真实会话上下文、受控环境复杂性和面向工件的评估，衡量 Agent 能否从指令开始完成有用工作并产出经过验证的结果。'],
  'Many existing benchmarks isolate one application or capability and run in clean, stable environments. Real user requests instead combine tools and capabilities, while missing dependencies, transient failures, and distracting files can change how a workflow succeeds. DuMateBench is designed to expose these interactions.': ['Many existing benchmarks isolate one application or capability and run in clean, stable environments. Real user requests instead combine tools and capabilities, while missing dependencies, transient failures, and distracting files can change how a workflow succeeds. DuMateBench is designed to expose these interactions.', '许多现有基准只隔离单个应用或能力，并在干净、稳定的环境中运行。真实用户请求往往会组合多种工具和能力，而缺失依赖、瞬时故障和干扰文件都会改变工作流的完成方式。DuMateBench 旨在呈现这些交互影响。'],
  'Real-session benchmark for compositional workflows': ['Real-session benchmark for compositional workflows', '面向组合式工作流的真实会话基准'],
  'DuMateBench contains 200 executable tasks reconstructed from anonymized, privacy-screened real-user sessions. Relevant interaction history, persistent configurations, and workspace state are preserved. Human verification retains tasks that are faithful, well-specified, solvable, free of solution leakage, and independently evaluable. Workflows can span multiple scenarios and task types, combining content generation with coding, document manipulation, or web retrieval.': ['DuMateBench contains 200 executable tasks reconstructed from anonymized, privacy-screened real-user sessions. Relevant interaction history, persistent configurations, and workspace state are preserved. Human verification retains tasks that are faithful, well-specified, solvable, free of solution leakage, and independently evaluable. Workflows can span multiple scenarios and task types, combining content generation with coding, document manipulation, or web retrieval.', 'DuMateBench 包含 200 个由匿名且经过隐私筛选的真实用户会话重建的可执行任务。任务保留相关交互历史、持久化配置和工作区状态，并通过人工核验筛选出忠实、定义清晰、可解决、没有解题泄漏且可独立评估的任务。工作流可以跨越多个场景和任务类型，将内容生成与代码编写、文档处理或网络检索结合起来。'],
  'Reproducible complex work environments': ['Reproducible complex work environments', '可复现的复杂工作环境'],
  'Each task runs in an isolated Docker container under one of three conditions: Insufficient environments with missing tools, dependencies, or resources; Unstable environments with transient network or tool failures; and Noisy environments with distracting files or noisy data.': ['Each task runs in an isolated Docker container under one of three conditions: Insufficient environments with missing tools, dependencies, or resources; Unstable environments with transient network or tool failures; and Noisy environments with distracting files or noisy data.', '每个任务都在隔离的 Docker 容器中运行，并处于三种条件之一：缺少工具、依赖或资源的不足环境；存在瞬时网络或工具故障的不稳定环境；包含干扰文件或嘈杂数据的噪声环境。'],
  'Comprehensive and diagnostic evaluation': ['Comprehensive and diagnostic evaluation', '全面且具有诊断性的评估'],
  'We evaluate five agent frameworks paired with four base models, yielding 20 agent-model configurations. The benchmark reports strict task completion alongside robustness to workspace noise, efficiency, and failure-mode analyses. Trace-level analysis supports diagnosis of execution planning, failure recovery, artifact verification, and agent-model interactions.': ['We evaluate five agent frameworks paired with four base models, yielding 20 agent-model configurations. The benchmark reports strict task completion alongside robustness to workspace noise, efficiency, and failure-mode analyses. Trace-level analysis supports diagnosis of execution planning, failure recovery, artifact verification, and agent-model interactions.', '我们评估五个 Agent 框架与四个基础模型的组合，共得到 20 个 Agent-模型配置。基准除了报告严格任务完成度，还分析工作区噪声下的鲁棒性、效率和失败模式，并通过轨迹级分析诊断执行规划、故障恢复、工件验证和 Agent-模型交互。'],
  'Environment conditions': ['Environment conditions', '环境条件'],
  'Execution environment': ['Execution environment', '执行环境'],
  'Task construction': ['Task construction', '任务构建'],
  'Tasks are reconstructed from real multi-turn sessions and validated before release. The reconstruction preserves the user-visible context, persistent settings, and initial workspace needed to make the request meaningful without exposing the original user or solution.': ['Tasks are reconstructed from real multi-turn sessions and validated before release. The reconstruction preserves the user-visible context, persistent settings, and initial workspace needed to make the request meaningful without exposing the original user or solution.', '任务由真实多轮会话重建，并在发布前经过验证。重建过程保留使请求具有实际意义所需的用户可见上下文、持久化设置和初始工作区，同时不暴露原始用户或解决方案。'],
  'Environmental complexity': ['Environmental complexity', '环境复杂性'],
  Condition: ['Condition', '条件'], 'What it represents': ['What it represents', '代表内容'],
  Contributions: ['Contributions', '贡献'],
  Insufficient: ['Insufficient', '不足'], 'Missing tools or dependencies, constrained resources, and limited preinstalled capabilities': ['Missing tools or dependencies, constrained resources, and limited preinstalled capabilities', '缺少工具或依赖、资源受限以及预装能力有限'],
  Unstable: ['Unstable', '不稳定'], 'Transient network, API, OCR, or tool failures that require recovery': ['Transient network, API, OCR, or tool failures that require recovery', '需要 Agent 恢复的瞬时网络、API、OCR 或工具故障'],
  Noisy: ['Noisy', '噪声'], 'Historical, duplicate, irrelevant, outdated, or conflicting files and data': ['Historical, duplicate, irrelevant, outdated, or conflicting files and data', '历史、重复、无关、过时或相互冲突的文件和数据'],
  'Insufficient, Unstable, Noisy': ['Insufficient, Unstable, Noisy', '不足、不稳定、噪声'], 'Isolated Docker containers': ['Isolated Docker containers', '隔离的 Docker 容器'],
  'These conditions are instantiated in isolated Docker containers so that reliability can be evaluated under controlled and repeatable constraints.': ['These conditions are instantiated in isolated Docker containers so that reliability can be evaluated under controlled and repeatable constraints.', '这些条件在隔离的 Docker 容器中实例化，使 Agent 的可靠性能够在受控且可重复的约束下进行评估。'],
  'A workflow can combine several of the following families:': ['A workflow can combine several of the following families:', '一个工作流可以组合以下多个能力类别：'],
  'Capabilities are compositional and may appear together in one task. A workflow can combine several of the following families:': ['Capabilities are compositional and may appear together in one task. A workflow can combine several of the following families:', '能力是组合式的，可以在同一个任务中共同出现。一个工作流可以组合以下多个能力类别：'],
  'Every agent-model configuration receives the same task instruction and initial workspace. The evaluator and reference files remain inaccessible during execution. After the run or timeout, the final workspace state is preserved for evaluation.': ['Every agent-model configuration receives the same task instruction and initial workspace. The evaluator and reference files remain inaccessible during execution. After the run or timeout, the final workspace state is preserved for evaluation.', '每个 Agent-模型配置都会收到相同的任务指令和初始工作区。执行期间 Agent 无法访问评估器和参考文件。运行结束或超时后，最终工作区状态会被保留用于评估。'],
  'The evaluator checks required artifacts and recovery behavior.': ['The evaluator checks required artifacts and recovery behavior.', '评估器检查所需工件和恢复行为。'],
  'The deterministic evaluator computes the partial pass rate': ['The deterministic evaluator computes the partial pass rate', '确定性评估器计算部分通过率'],
  ', the fraction of checklist requirements that are satisfied. An artifact-specific LLM judge computes': [', the fraction of checklist requirements that are satisfied. An artifact-specific LLM judge computes', '，即满足的检查清单要求所占的比例。面向具体工件的 LLM 评判器计算'],
  'for correctness, completeness, and quality. The reported final score is': ['for correctness, completeness, and quality. The reported final score is', '，从正确性、完整性和质量三个方面。报告的最终结果为'],
  'Official runtime, task environment, and evaluator versions should be used together when reproducing results. The task package, environment condition, and capability coverage should be recorded alongside each run.': ['Official runtime, task environment, and evaluator versions should be used together when reproducing results. The task package, environment condition, and capability coverage should be recorded alongside each run.', '复现结果时应同时使用官方运行时、任务环境和评估器版本。每次运行都应同时记录任务包、环境条件和能力覆盖范围。'],
  'The deterministic evaluator computes the partial pass rate `P`, the fraction of checklist requirements that are satisfied.': ['The deterministic evaluator computes the partial pass rate `P`, the fraction of checklist requirements that are satisfied.', '确定性评估器计算部分通过率 `P`，即满足的检查清单要求所占的比例。'],
  'An artifact-specific LLM judge computes `J` for correctness, completeness, and quality.': ['An artifact-specific LLM judge computes `J` for correctness, completeness, and quality.', '面向具体工件的 LLM 评判器从正确性、完整性和质量三个方面计算 `J`。'],
  'The reported final score is `F = 0.3P + 0.7J`.': ['The reported final score is `F = 0.3P + 0.7J`.', '报告的最终结果为 `F = 0.3P + 0.7J`。'],
  'The task package, environment condition, and capability coverage should be recorded alongside each run.': ['The task package, environment condition, and capability coverage should be recorded alongside each run.', '每次运行都应同时记录任务包、环境条件和能力覆盖范围。'],
  Limitations: ['Limitations', '局限性'],
  'Task difficulty and capability combinations vary across the benchmark. Agent performance also depends on the runtime, base model, tool-use behavior, external services, and execution budget. Leaderboard results should therefore be interpreted together with the benchmark version and evaluation protocol.': ['Task difficulty and capability combinations vary across the benchmark. Agent performance also depends on the runtime, base model, tool-use behavior, external services, and execution budget. Leaderboard results should therefore be interpreted together with the benchmark version and evaluation protocol.', '基准中的任务难度和能力组合各不相同。Agent 表现还取决于运行时、基础模型、工具使用行为、外部服务和执行预算。因此，排行榜结果应结合基准版本和评估协议一起解读。'],
  'Last updated:': ['Last updated:', '最后更新：'],
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
    if (value.includes('The best result in each column is shown in bold.')) {
      const next = node.textContent?.replace('The best result in each column is shown in bold.', isChinese.value ? '每列最佳结果以粗体显示。' : 'The best result in each column is shown in bold.') || ''
      node.textContent = isChinese.value ? next.replace('. 每列', '。每列') : next
      return
    }
    if (value.includes('每列最佳结果以粗体显示。')) {
      const next = node.textContent?.replace('每列最佳结果以粗体显示。', isChinese.value ? '每列最佳结果以粗体显示。' : 'The best result in each column is shown in bold.') || ''
      node.textContent = isChinese.value ? next.replace('. 每列', '。每列') : next.replace('。The best', '. The best')
      return
    }
    const key = Object.keys(labels).find((name) => value === labels[name][0] || value === labels[name][1])
    if (!key) return
    const next = labels[key][isChinese.value ? 1 : 0]
    if (value !== next) node.textContent = node.textContent?.replace(value, next) || next
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
  document.querySelectorAll<HTMLElement>('[aria-label^="Permalink to "], [aria-label="跳转到本节"]').forEach((el) => el.setAttribute('aria-label', isChinese.value ? '跳转到本节' : 'Permalink to section'))
  document.querySelectorAll<HTMLElement>('[title^="Permalink to "], [title="跳转到本节"]').forEach((el) => el.setAttribute('title', isChinese.value ? '跳转到本节' : 'Permalink to section'))
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
.language-switch { display: inline-flex; align-items: center; gap: 3px; padding: 3px; margin: 0 12px; border: 1px solid color-mix(in srgb, var(--db-primary) 20%, transparent); border-radius: 10px; background: var(--db-blue-soft); }
.language-switch button { border: 0; border-radius: 7px; padding: 7px 12px; min-width: 48px; background: transparent; color: var(--db-primary); font: inherit; font-size: 13px; cursor: pointer; transition: .2s ease; }
.language-switch button.active { background: var(--db-primary); color: #fff; box-shadow: 0 2px 8px color-mix(in srgb, var(--db-primary) 28%, transparent); }
.language-switch button:hover:not(.active) { background: color-mix(in srgb, var(--db-primary) 10%, transparent); color: var(--db-primary-hover); }
</style>
