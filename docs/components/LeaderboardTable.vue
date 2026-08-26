<script setup lang="ts">
import { ref } from 'vue'
import leaderboard from '../data/leaderboard.json'

type Metric = 'partial' | 'judge' | 'final'
type Score = Record<Metric, number>

const metrics: Array<{ key: Metric; label: string }> = [
  { key: 'partial', label: 'Partial' },
  { key: 'judge', label: 'Judge' },
  { key: 'final', label: 'Final' }
]

const activeModel = ref<string | null>(null)

function score(agent: string, model: string, metric: Metric) {
  const row = leaderboard.rows.find((item) => item.agent === agent)
  return (row?.scores as Record<string, Score>)[model][metric]
}

function isBest(model: string, metric: Metric, value: number) {
  return value === Math.max(...leaderboard.rows.map((row) => score(row.agent, model, metric)))
}

function modelClass(model: string) {
  return {
    'model-active': activeModel.value === model,
    'model-muted': Boolean(activeModel.value && activeModel.value !== model)
  }
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`
}
</script>

<template>
  <figure class="leaderboard-figure site-shell">
    <div class="table-frame" @mouseleave="activeModel = null">
      <div class="table-wrap">
        <table>
          <colgroup>
            <col class="agent-column" />
            <template v-for="model in leaderboard.models" :key="`${model}-columns`">
              <col v-for="metric in metrics" :key="`${model}-${metric.key}-column`" />
            </template>
          </colgroup>
          <thead>
            <tr class="model-row">
              <th class="agent-heading" rowspan="2" scope="col">Agent</th>
              <th
                v-for="model in leaderboard.models"
                :key="model"
                class="model-heading"
                :class="modelClass(model)"
                :colspan="metrics.length"
                scope="colgroup"
                @mouseenter="activeModel = model"
              >
                {{ model }}
              </th>
            </tr>
            <tr class="metric-row">
              <template v-for="model in leaderboard.models" :key="`${model}-metrics`">
                <th
                  v-for="metric in metrics"
                  :key="`${model}-${metric.key}`"
                  class="metric-heading"
                  :class="[modelClass(model), { final: metric.key === 'final' }]"
                  scope="col"
                  @mouseenter="activeModel = model"
                >
                  {{ metric.label }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in leaderboard.rows" :key="row.agent" :class="{ dumate: row.agent === 'DuMate' }">
              <th class="agent-name" scope="row">{{ row.agent }}</th>
              <template v-for="model in leaderboard.models" :key="`${row.agent}-${model}`">
                <td
                  v-for="metric in metrics"
                  :key="`${row.agent}-${model}-${metric.key}`"
                  :class="[modelClass(model), { best: isBest(model, metric.key, score(row.agent, model, metric.key)), final: metric.key === 'final' }]"
                  @mouseenter="activeModel = model"
                >
                  {{ formatPercent(score(row.agent, model, metric.key)) }}
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.leaderboard-figure{width:100%;margin:26px 0 0}
.table-frame{border:1px solid var(--db-border);border-radius:12px;background:var(--db-bg);overflow:hidden}
.table-wrap{overflow-x:auto}
table{width:100%;min-width:1080px;table-layout:fixed;border-collapse:collapse;font-variant-numeric:tabular-nums}
.agent-column{width:15%}
th,td{padding:14px 12px;border-right:1px solid var(--db-border);border-bottom:1px solid var(--db-border);text-align:right;white-space:nowrap;font-size:13px;transition:background-color .2s ease,color .2s ease,opacity .2s ease}
th:last-child,td:last-child{border-right:0}
.model-row th{height:62px;background:var(--db-bg-soft);color:var(--db-text);font-size:18px;font-weight:800;letter-spacing:-.02em}
.model-row .agent-heading{background:var(--db-bg-soft);text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--db-text-muted)}
.model-heading{position:relative;text-align:center;cursor:default}
.model-heading::after{content:"";position:absolute;inset:9px 8px;border:1px solid transparent;border-radius:8px;pointer-events:none;transition:border-color .2s ease,background-color .2s ease}
.model-heading.model-active{color:var(--db-primary);background:var(--db-blue-soft)}
.model-heading.model-active::after{border-color:color-mix(in srgb,var(--db-primary) 42%,transparent);background:color-mix(in srgb,var(--db-primary) 6%,transparent)}
.metric-row th{height:47px;background:var(--db-bg-soft);color:var(--db-text-muted);font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;white-space:normal;line-height:1.15}
.metric-row .final{background:color-mix(in srgb,var(--db-blue-soft) 55%,var(--db-bg))}
.metric-heading{cursor:default}
.metric-heading.model-active{color:var(--db-primary);background:color-mix(in srgb,var(--db-blue-soft) 82%,var(--db-bg))}
.agent-name{text-align:left;font-weight:650;color:var(--db-text);overflow:hidden;text-overflow:ellipsis}
tbody td{color:var(--db-text-secondary)}tbody tr:last-child th,tbody tr:last-child td{border-bottom:0}
.best{font-weight:800;color:var(--db-text)}
tbody td.final{background:color-mix(in srgb,var(--db-blue-soft) 55%,var(--db-bg))}
.dumate .agent-name{color:var(--db-primary);font-weight:800}
.dumate td{background:color-mix(in srgb,var(--db-purple-soft) 55%,var(--db-bg))}
.dumate td.final{background:color-mix(in srgb,var(--db-purple-soft) 78%,var(--db-bg))}
.model-muted{opacity:.3}
.model-active{opacity:1}
:global(.dark) .table-frame{border-color:rgba(153,161,190,.22);background:#151821}
:global(.dark) .model-row th,:global(.dark) .metric-row th{background:#1a1e29;color:#e8ebf6;border-color:rgba(153,161,190,.22)}
:global(.dark) .model-row .agent-heading,:global(.dark) .metric-row th{color:#9da6bd}
:global(.dark) .model-heading.model-active{background:#28264f;color:#b8b6ff}
:global(.dark) .model-heading.model-active::after{border-color:#6965e8;background:rgba(89,108,255,.12)}
:global(.dark) .metric-heading.model-active{background:#242341;color:#b8b6ff}
:global(.dark) .agent-name{color:#eef0f7}
:global(.dark) tbody td{color:#c3c9d9}
:global(.dark) tbody td.final{background:#242a3a;color:#cbd2e4}
:global(.dark) .dumate .agent-name{color:#aeb5ff}
:global(.dark) .dumate td{background:#24243d;color:#e0e2f2}
:global(.dark) .dumate td.final{background:#303050;color:#f0efff}
@media(max-width:760px){.table-frame{border-radius:10px}table{min-width:1040px}th,td{padding:12px 10px;font-size:12px}.model-row th{height:56px;font-size:16px}.metric-row th{height:42px;font-size:9px}}
</style>
