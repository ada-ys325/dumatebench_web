<script setup lang="ts">
import leaderboard from '../data/leaderboard.json'

type Metric = 'passRate' | 'judge' | 'final'
type Score = Record<Metric, number>
const metrics: Array<{ key: Metric; label: string }> = [
  { key: 'passRate', label: 'Pass-rate' },
  { key: 'judge', label: 'Judge' },
  { key: 'final', label: 'Final' }
]

function score(agent: string, model: string, metric: Metric) {
  const row = leaderboard.rows.find((item) => item.agent === agent)
  return (row?.scores as Record<string, Score>)[model][metric]
}

function isBest(model: string, metric: Metric, value: number) {
  return value === Math.max(...leaderboard.rows.map((row) => score(row.agent, model, metric)))
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`
}
</script>

<template>
  <figure class="leaderboard-figure">
    <figcaption>
      Results on 200 DuMateBench tasks. Final is computed as
      <span class="formula">(Pass-rate + Judge) / 2</span>. The best result in each column is shown in bold.
    </figcaption>
    <div class="model-grid">
      <section v-for="model in leaderboard.models" :key="model" class="model-group">
        <h2>{{ model }}</h2>
        <table>
          <thead>
            <tr class="metric-row">
              <th class="agent-column">Agent</th>
              <th v-for="metric in metrics" :key="`${model}-${metric.key}`" :class="{ final: metric.key === 'final' }">{{ metric.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in leaderboard.rows" :key="row.agent" :class="{ dumate: row.agent === 'DuMate' }">
              <th scope="row">{{ row.agent }}</th>
              <td
                v-for="metric in metrics"
                :key="`${model}-${metric.key}`"
                :class="{ best: isBest(model, metric.key, score(row.agent, model, metric.key)), final: metric.key === 'final' }"
              >{{ formatPercent(score(row.agent, model, metric.key)) }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </figure>
</template>

<style scoped>
.leaderboard-figure{width:100%;margin:26px 0 0}
.leaderboard-figure figcaption{max-width:880px;margin:0 0 18px;color:var(--db-text-secondary);font-size:14px;line-height:1.65}
.formula{font-family:var(--vp-font-family-mono);color:var(--db-text);font-size:13px}
.model-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.model-group{overflow:hidden;border:1px solid var(--db-border);border-radius:8px;background:var(--db-bg)}
.model-group h2{margin:0!important;padding:16px 18px!important;border:0!important;border-bottom:1px solid var(--db-border)!important;background:var(--db-bg-soft);color:var(--db-text);font-size:18px!important;line-height:1.2;font-weight:750;text-align:left}
table{width:100%;table-layout:fixed;border-collapse:collapse;font-variant-numeric:tabular-nums}
th,td{padding:13px 12px;border-right:1px solid var(--db-border);border-bottom:1px solid var(--db-border);text-align:right;white-space:nowrap;font-size:13px}
th:last-child,td:last-child{border-right:0}
.metric-row th{background:var(--db-bg-soft);color:var(--db-text-muted);font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;white-space:normal;line-height:1.15}
.metric-row .agent-column{width:38%;text-align:left}
tbody th{text-align:left;font-weight:650;color:var(--db-text);overflow:hidden;text-overflow:ellipsis}
tbody td{color:var(--db-text-secondary)}tbody tr:last-child th,tbody tr:last-child td{border-bottom:0}
.best{font-weight:800;color:var(--db-text)}.final{background:color-mix(in srgb,var(--db-blue-soft) 55%,var(--db-bg))}
.dumate th{color:var(--db-primary);font-weight:800}.dumate td{background:color-mix(in srgb,var(--db-purple-soft) 55%,var(--db-bg))}.dumate td.final{background:color-mix(in srgb,var(--db-purple-soft) 78%,var(--db-bg))}
 :global(.dark) .model-group{border-color:rgba(153,161,190,.22);background:#151821}
 :global(.dark) .model-group h2,:global(.dark) .metric-row th{background:#1a1e29;color:#e8ebf6;border-color:rgba(153,161,190,.22)!important}
 :global(.dark) .metric-row th{color:#9da6bd}
 :global(.dark) tbody th{color:#eef0f7}
 :global(.dark) tbody td{color:#c3c9d9}
 :global(.dark) td.final{background:#242a3a;color:#cbd2e4}
 :global(.dark) .dumate th{color:#aeb5ff}
 :global(.dark) .dumate td{background:#24243d;color:#e0e2f2}
 :global(.dark) .dumate td.final{background:#303050;color:#f0efff}
@media(max-width:900px){.model-grid{grid-template-columns:1fr}}
@media(max-width:520px){.leaderboard-figure figcaption{font-size:13px}.model-grid{gap:14px}.model-group h2{padding:14px!important;font-size:16px!important}th,td{padding:11px 7px;font-size:11px}.metric-row th{font-size:8px}.metric-row .agent-column{width:36%}}
</style>
