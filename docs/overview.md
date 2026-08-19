# Overview

DuMateBench is an interactive agent benchmark for real-world computer work. Each task includes an instruction, a sandbox workspace, task resources, and an evaluator. The benchmark focuses on how agents inspect environments, use tools, produce artifacts, and recover from failures.

## Dataset facts

| Property | Value |
| --- | --- |
| Task count | 200 |
| Approx. size | 3.8 GB |
| Primary language | Chinese |
| Secondary language | English |
| Execution environment | Docker |
| Task format | Instruction, workspace, evaluator, metadata |

## Evaluation protocol

Tasks run in Docker sandboxes. The evaluator checks the final artifact as well as interaction-time recovery behavior.

1. The agent reads the task and workspace.
2. The agent returns one JSON action.
3. The runner executes the action in Docker.
4. The evaluator checks artifacts, logs, and recovery behavior.

A successful orchestration run does not by itself imply a pass; the final evaluation result is authoritative.

## Task package

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

## Capability coverage

Capabilities are compositional and may appear together in one task.

| Capability family | Examples | Reference count |
| --- | --- | ---: |
| Text and code | Text generation, coding, software development | Text 160 · Code 88 |
| Web and information | Web retrieval, information extraction, network/API recovery | Web 86 |
| Documents and spreadsheets | DOCX, PDF, PPTX, Excel workflows | DOCX reading 27 · Excel editing 18 |
| Files and media | File organization, image, video, audio generation/editing | Files 34 · Multimedia 46 |

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

Official runtime, task environment, and evaluator versions should be used together when reproducing results. The task package and capability coverage are documented above.
