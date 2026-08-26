# Leaderboard

Results across five agent systems and four foundation models. See the [Overview](/overview) for task structure and evaluation protocol.

<LeaderboardTable />

<p class="leaderboard-note">Results on 200 DuMateBench tasks. Final is computed as <code>0.3 × Partial + 0.7 × Judge</code>. The best result in each column is shown in bold.</p>

## Metric

Partial is the deterministic checklist pass rate, Judge is the artifact-specific quality score, and Final combines them as `Final = 0.3 × Partial + 0.7 × Judge`.

<style>
.leaderboard-note{max-width:880px;margin:14px 0 22px;color:var(--db-text-secondary);font-size:14px;line-height:1.65}
.leaderboard-note code{font-family:var(--vp-font-family-mono);color:var(--db-text);font-size:13px}
</style>
