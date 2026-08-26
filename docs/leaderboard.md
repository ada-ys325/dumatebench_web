# Leaderboard

Results across five agent systems and four foundation models. See the [Overview](/overview) for task structure and evaluation protocol.

<LeaderboardTable />

<p class="leaderboard-note">Results on 200 DuMateBench tasks. Final is computed as <code>0.3 × Partial + 0.7 × Judge</code>. The best result in each column is shown in bold.</p>

## Metric

The leaderboard reports three task-level metrics, and macro-averages each metric across tasks.

| Metric | Symbol | Computation | What it captures |
| --- | --- | --- | --- |
| Partial pass rate | `P` | Mean of satisfied atomic checks | Deterministic requirement coverage |
| Judge score | `J` | Macro-average over supported target artifacts | Artifact correctness, completeness, and quality |
| Final score | `F` | `0.3P + 0.7J` | Weighted benchmark result |

### Partial pass rate (P)

Each task is associated with a set of atomic checks generated from the task requirements and reviewed by human annotators.

| Check dimension | Examples of what is checked |
| --- | --- |
| Output existence and location | Required artifacts are present at the expected paths. |
| Format validity | File types, schemas, and parsable structures are valid. |
| Required or forbidden content | Required facts, fields, and constraints are satisfied. |
| Document structure | Headings, sections, layout, and organization meet the task requirements. |
| Spreadsheet values and formulas | Cell values, formulas, ranges, and calculated outputs are correct. |
| Protected-file integrity | Files that should remain unchanged are preserved. |

The task-level Partial pass rate is the proportion of atomic checks that are satisfied:

$$
P_t = \frac{1}{n_t}\sum_{i=1}^{n_t} c_{t,i},
\qquad c_{t,i}\in\{0,1\}.
$$

A task is considered complete only when all of its deterministic checks pass. Partial pass rate therefore gives credit for progress while keeping full completion strict.

### Judge score (J)

An artifact-specific LLM judge evaluates semantic, organizational, and perceptual properties that fixed checks cannot capture.

| Scoring element | Protocol |
| --- | --- |
| Rubric structure | Each reviewed rubric contains 3–16 atomic criteria with normalized weights. |
| Anchored levels | Each criterion is scored on an anchored 0–4 scale. |
| Evidence | The judge records a score and supporting evidence for every criterion. |
| Cannot assess | A criterion marked as cannot_assess contributes no positive score. |
| Missing artifact | A missing expected artifact receives a score of zero. |
| No artifact-specific judge | The deterministic score is used as the task score when no judge applies by design. |

The task-level Judge score is the macro-average over supported target artifacts. A missing expected artifact receives a score of zero. When no artifact-specific judge applies by design, the deterministic score is used as the task score.

### Final score (F)

The Final score gives 30% weight to deterministic requirement coverage and 70% weight to artifact quality:

| Component | Weight | Meaning |
| --- | ---: | --- |
| Partial pass rate `P` | 30% | Deterministic requirement coverage |
| Judge score `J` | 70% | Artifact-specific quality |

$$
F_t = 0.3P_t + 0.7J_t.
$$

The benchmark reports P, J, and F separately, then macro-averages each metric across the 200 tasks.

The macro-average is defined as:

$$
\overline{M} = \frac{1}{200}\sum_{t=1}^{200} M_t,
\qquad M\in\{P,J,F\}.
$$

<style>
.leaderboard-note{max-width:880px;margin:14px 0 22px;color:var(--db-text-secondary);font-size:14px;line-height:1.65}
.leaderboard-note code{font-family:var(--vp-font-family-mono);color:var(--db-text);font-size:13px}
/* The metric tables use restrained pastel accents so the rules are easy to scan. */
body:has(.leaderboard-figure) .vp-doc table{display:table;width:100%;margin:20px 0 26px;border:1px solid rgba(20,24,40,.09);border-radius:14px;border-spacing:0;overflow:hidden;background:#fff;box-shadow:0 8px 22px rgba(42,40,110,.04);font-size:14px}
body:has(.leaderboard-figure) .vp-doc table th,body:has(.leaderboard-figure) .vp-doc table td{border:0;border-bottom:1px solid rgba(20,24,40,.07);padding:12px 14px;line-height:1.5}
body:has(.leaderboard-figure) .vp-doc table th{color:#2f3760;font-size:12px;font-weight:750;letter-spacing:.02em}
body:has(.leaderboard-figure) .vp-doc table td{color:var(--db-text-secondary)}
body:has(.leaderboard-figure) .vp-doc table tbody tr:last-child td{border-bottom:0}
body:has(.leaderboard-figure) .vp-doc table tbody tr:nth-child(even){background:rgba(246,248,255,.72)}
body:has(.leaderboard-figure) .vp-doc table:nth-of-type(1) thead{background:#edf0ff}
body:has(.leaderboard-figure) .vp-doc table:nth-of-type(2) thead{background:#f1edff}
body:has(.leaderboard-figure) .vp-doc table:nth-of-type(3) thead{background:#eaf9f5}
body:has(.leaderboard-figure) .vp-doc table:nth-of-type(4) thead{background:#fff2e8}
body:has(.leaderboard-figure) .vp-doc table:nth-of-type(2) tbody tr:nth-child(even){background:#fbf9ff}
body:has(.leaderboard-figure) .vp-doc table:nth-of-type(3) tbody tr:nth-child(even){background:#f5fdfb}
body:has(.leaderboard-figure) .vp-doc table:nth-of-type(4) tbody tr:nth-child(even){background:#fffaf5}
body:has(.leaderboard-figure) .vp-doc mjx-container[display="true"]{margin:22px 0!important;padding:14px 18px;border:1px solid rgba(89,108,255,.12);border-radius:12px;background:#f7f8ff;overflow-x:auto;overflow-y:hidden}
html.dark body:has(.leaderboard-figure) .vp-doc table{border-color:rgba(153,161,190,.2);background:#171b26;box-shadow:none}
html.dark body:has(.leaderboard-figure) .vp-doc table th,html.dark body:has(.leaderboard-figure) .vp-doc table td{border-color:rgba(153,161,190,.14)}
html.dark body:has(.leaderboard-figure) .vp-doc table th{color:#e5e8f4}
html.dark body:has(.leaderboard-figure) .vp-doc table td{color:#c4cada}
html.dark body:has(.leaderboard-figure) .vp-doc table tbody tr:nth-child(even){background:#1d2230}
html.dark body:has(.leaderboard-figure) .vp-doc table:nth-of-type(1) thead{background:#282d4a}
html.dark body:has(.leaderboard-figure) .vp-doc table:nth-of-type(2) thead{background:#302c4d}
html.dark body:has(.leaderboard-figure) .vp-doc table:nth-of-type(3) thead{background:#233e3c}
html.dark body:has(.leaderboard-figure) .vp-doc table:nth-of-type(4) thead{background:#493631}
html.dark body:has(.leaderboard-figure) .vp-doc mjx-container[display="true"]{border-color:rgba(126,143,255,.22);background:#20263a}
@media(max-width:760px){body:has(.leaderboard-figure) .vp-doc table{font-size:13px}body:has(.leaderboard-figure) .vp-doc table th,body:has(.leaderboard-figure) .vp-doc table td{padding:10px 11px}}
</style>
