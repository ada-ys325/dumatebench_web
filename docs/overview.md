# Overview

DuMateBench is a benchmark for autonomous agents completing compositional workflows in realistic computer environments. It focuses on cross-capability work that coordinates multiple productivity tools under imperfect conditions, combining real-session context, controlled environmental complexity, and artifact-aware evaluation to measure whether an agent can complete useful work from instruction to verified output.

## Why DuMateBench

Many existing benchmarks isolate one application or capability and run in clean, stable environments. Real user requests instead combine tools and capabilities, while missing dependencies, transient failures, and distracting files can change how a workflow succeeds. DuMateBench is designed to expose these interactions.

## Contributions

### Real-session benchmark for compositional workflows

DuMateBench contains 200 executable tasks reconstructed from anonymized, privacy-screened real-user sessions. Relevant interaction history, persistent configurations, and workspace state are preserved. Human verification retains tasks that are faithful, well-specified, solvable, free of solution leakage, and independently evaluable. Workflows can span multiple scenarios and task types, combining content generation with coding, document manipulation, or web retrieval.

### Reproducible complex work environments

Each task runs in an isolated Docker container under one of three conditions: Insufficient environments with missing tools, dependencies, or resources; Unstable environments with transient network or tool failures; and Noisy environments with distracting files or noisy data.

### Comprehensive and diagnostic evaluation

We evaluate five agent frameworks paired with four base models, yielding 20 agent-model configurations. The benchmark reports strict task completion alongside robustness to workspace noise, efficiency, and failure-mode analyses. Trace-level analysis supports diagnosis of execution planning, failure recovery, artifact verification, and agent-model interactions.

## Benchmark scope

| Property | Value |
| --- | --- |
| Executable tasks | 200 |
| Broad scenarios | 8 |
| Fine-grained task types | 17 |
| Agent-model configurations | 20 |
| Environment conditions | Insufficient, Unstable, Noisy |
| Execution environment | Isolated Docker containers |

## Task construction

Tasks are reconstructed from real multi-turn sessions and validated before release. The reconstruction preserves the user-visible context, persistent settings, and initial workspace needed to make the request meaningful without exposing the original user or solution.

Each task is distributed as a structured package:

```text
task_1/
├── instruction.md
├── task.yaml
├── task_type_feature.json
├── workspace_seed/
├── evaluator/
└── web_reference/
```

The task directory contains task materials and should be executed through the DuMateBench runtime rather than treated as an independent script.

## Environmental complexity

| Condition | What it represents |
| --- | --- |
| Insufficient | Missing tools or dependencies, constrained resources, and limited preinstalled capabilities |
| Unstable | Transient network, API, OCR, or tool failures that require recovery |
| Noisy | Historical, duplicate, irrelevant, outdated, or conflicting files and data |

These conditions are instantiated in isolated Docker containers so that reliability can be evaluated under controlled and repeatable constraints.

## Capability coverage

Capabilities are compositional and may appear together in one task. A workflow can combine several of the following families:

| Capability family | Examples | Reference count |
| --- | --- | ---: |
| Text and code | Text generation, coding, software development | Text 160 · Code 88 |
| Web and information | Web retrieval, information extraction, network/API recovery | Web 86 |
| Documents and spreadsheets | DOCX, PDF, PPTX, Excel workflows | DOCX reading 27 · Excel editing 18 |
| Files and media | File organization, image, video, audio generation/editing | Files 34 · Multimedia 46 |

## Evaluation protocol

Every agent-model configuration receives the same task instruction and initial workspace. The evaluator and reference files remain inaccessible during execution. After the run or timeout, the final workspace state is preserved for evaluation.

1. The agent reads the task and workspace.
2. The agent returns one JSON action.
3. The runner executes the action in Docker.
4. The evaluator checks required artifacts and recovery behavior.

The deterministic evaluator computes the partial pass rate `P`, the fraction of checklist requirements that are satisfied. An artifact-specific LLM judge computes `J` for correctness, completeness, and quality. The reported final score is `F = 0.3P + 0.7J`.

A successful orchestration run does not by itself imply a pass; the final evaluation result is authoritative.

## Action contract

Each response must contain exactly one next action:

```json
{
  "command": "find /workspace -maxdepth 3 -type f",
  "reason": "Inspect the available workspace files"
}
```

An agent may finish with:

```json
{
  "finish": true,
  "reason": "The requested artifact has been verified"
}
```

The final evaluator may check required artifacts, task-specific requirements, injection failures, recovery from tool or network errors, output locations, and optional LLM-judge criteria.

## Reproducibility

Official runtime, task environment, and evaluator versions should be used together when reproducing results. The task package, environment condition, and capability coverage should be recorded alongside each run.

## Limitations

Task difficulty and capability combinations vary across the benchmark. Agent performance also depends on the runtime, base model, tool-use behavior, external services, and execution budget. Leaderboard results should therefore be interpreted together with the benchmark version and evaluation protocol.
