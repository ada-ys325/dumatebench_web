<script setup lang="ts">
import { computed, ref } from 'vue'
import leaderboard from '../data/leaderboard.json'

type Metric = 'partial' | 'judge' | 'final'
type Score = Record<Metric, number>
type LeaderboardRow = (typeof leaderboard.rows)[number]
type Model = (typeof leaderboard.models)[number]
type ViewMode = 'harness' | 'model'

const metrics: Array<{ key: Metric; label: string }> = [
  { key: 'partial', label: 'Partial' },
  { key: 'judge', label: 'Judge' },
  { key: 'final', label: 'Final' }
]

const viewMode = ref<ViewMode>('harness')
const selectedModel = ref<Model>(leaderboard.models[0])
const selectedHarness = ref<LeaderboardRow['agent']>(leaderboard.rows[0].agent)

function scoresFor(row: LeaderboardRow): Score {
  return row.scores[selectedModel.value as keyof typeof row.scores] as Score
}

const selectedHarnessRow = computed(() => {
  return leaderboard.rows.find((row) => row.agent === selectedHarness.value) ?? leaderboard.rows[0]
})

function scoresForModel(model: Model): Score {
  return selectedHarnessRow.value.scores[model] as Score
}

const selectedRows = computed(() => {
  return [...leaderboard.rows].sort((a, b) => scoresFor(b).final - scoresFor(a).final)
})

const selectedModelRows = computed(() => {
  return [...leaderboard.models].sort((a, b) => scoresForModel(b).final - scoresForModel(a).final)
})

function isBestHarness(metric: Metric, value: number) {
  return value === Math.max(...leaderboard.rows.map((row) => scoresFor(row)[metric]))
}

function isBestModel(metric: Metric, value: number) {
  return value === Math.max(...leaderboard.models.map((model) => scoresForModel(model)[metric]))
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`
}
</script>

<template>
  <figure class="leaderboard-figure site-shell">
    <div class="leaderboard-card">
      <header class="leaderboard-heading">
        <div class="model-title">
          <span class="model-kicker">{{ viewMode === 'harness' ? 'Base model' : 'Harness' }}</span>
          <div v-if="viewMode === 'harness'" class="model-switcher inline-switcher" role="tablist" aria-label="Base model">
            <button
              v-for="model in leaderboard.models"
              :key="model"
              type="button"
              role="tab"
              :aria-selected="selectedModel === model"
              :class="{ active: selectedModel === model }"
              @click="selectedModel = model"
            >
              {{ model }}
            </button>
          </div>
          <div v-else class="model-switcher inline-switcher" role="tablist" aria-label="Harness">
            <button
              v-for="row in leaderboard.rows"
              :key="row.agent"
              type="button"
              role="tab"
              :aria-selected="selectedHarness === row.agent"
              :class="{ active: selectedHarness === row.agent }"
              @click="selectedHarness = row.agent"
            >
              {{ row.agent }}
            </button>
          </div>
        </div>
        <div class="heading-tools">
          <div class="view-switcher" role="tablist" aria-label="Leaderboard view">
            <button
              type="button"
              role="tab"
              :aria-selected="viewMode === 'harness'"
              :class="{ active: viewMode === 'harness' }"
              @click="viewMode = 'harness'"
            >
              View by harness
            </button>
            <button
              type="button"
              role="tab"
              :aria-selected="viewMode === 'model'"
              :class="{ active: viewMode === 'model' }"
              @click="viewMode = 'model'"
            >
              View by base model
            </button>
          </div>
          <div class="metric-legend" aria-label="Metrics">
            <span v-for="metric in metrics" :key="metric.key" class="legend-item">
              <i class="legend-dot" :class="`metric-${metric.key}`" aria-hidden="true" />
              {{ metric.label }}
            </span>
          </div>
        </div>
      </header>

      <div v-if="viewMode === 'harness'" class="score-list">
        <article
          v-for="(row, index) in selectedRows"
          :key="row.agent"
          class="score-row"
          :class="{ dumate: row.agent === 'DuMate' }"
        >
          <div class="rank" :aria-label="`Rank ${index + 1}`">{{ index + 1 }}</div>
          <div class="harness-name">
            <strong>{{ row.agent }}</strong>
            <span v-if="row.agent === 'DuMate'" class="featured-badge">DuMate</span>
          </div>
          <div class="metric-stack">
            <div v-for="metric in metrics" :key="metric.key" class="metric-line">
              <span class="metric-label">{{ metric.label }}</span>
              <div
                class="metric-track"
                role="progressbar"
                :aria-label="`${row.agent} ${metric.label}`"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-valuenow="Math.round(scoresFor(row)[metric.key] * 1000) / 10"
              >
                <span
                  class="metric-fill"
                  :class="[`metric-${metric.key}`, { best: isBestHarness(metric.key, scoresFor(row)[metric.key]) }]"
                  :style="{ width: `${scoresFor(row)[metric.key] * 100}%` }"
                />
              </div>
              <strong class="metric-value" :class="{ best: isBestHarness(metric.key, scoresFor(row)[metric.key]) }">
                {{ formatPercent(scoresFor(row)[metric.key]) }}
              </strong>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="score-list">
        <article
          v-for="(model, index) in selectedModelRows"
          :key="model"
          class="score-row model-score-row"
        >
          <div class="rank" :aria-label="`Rank ${index + 1}`">{{ index + 1 }}</div>
          <div class="harness-name">
            <strong>{{ model }}</strong>
          </div>
          <div class="metric-stack">
            <div v-for="metric in metrics" :key="metric.key" class="metric-line">
              <span class="metric-label">{{ metric.label }}</span>
              <div
                class="metric-track"
                role="progressbar"
                :aria-label="`${model} ${metric.label}`"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-valuenow="Math.round(scoresForModel(model)[metric.key] * 1000) / 10"
              >
                <span
                  class="metric-fill"
                  :class="[`metric-${metric.key}`, { best: isBestModel(metric.key, scoresForModel(model)[metric.key]) }]"
                  :style="{ width: `${scoresForModel(model)[metric.key] * 100}%` }"
                />
              </div>
              <strong class="metric-value" :class="{ best: isBestModel(metric.key, scoresForModel(model)[metric.key]) }">
                {{ formatPercent(scoresForModel(model)[metric.key]) }}
              </strong>
            </div>
          </div>
        </article>
      </div>
    </div>

  </figure>
</template>

<style scoped>
.leaderboard-figure {
  width: 100%;
  max-width: 760px;
  margin: 26px 0 0;
}

.leaderboard-card {
  overflow: hidden;
  border: 1px solid var(--db-border);
  border-radius: 16px;
  background: var(--db-bg);
  box-shadow: 0 10px 30px rgba(29, 35, 66, 0.05);
}

.leaderboard-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--db-border);
  background: color-mix(in srgb, var(--db-bg-soft) 62%, var(--db-bg));
}

.model-title {
  display: flex;
  align-items: baseline;
  flex: 1 1 auto;
  flex-wrap: wrap;
  min-width: 0;
  gap: 10px;
}

.model-kicker {
  display: inline-block;
  margin: 0;
  white-space: nowrap;
  color: var(--db-text-muted);
  font-size: 11px;
  font-weight: 750;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.leaderboard-heading h2 {
  margin: 0;
  color: var(--db-text);
  font-size: clamp(19px, 2.2vw, 23px);
  font-weight: 780;
  letter-spacing: -.03em;
}

.metric-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 14px 18px;
  color: var(--db-text-secondary);
  font-size: 12px;
  font-weight: 650;
}

.heading-tools {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 0;
}

.view-switcher {
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--db-border);
  border-radius: 10px;
  background: var(--db-bg);
}

.view-switcher button {
  min-height: 28px;
  border: 0;
  border-radius: 7px;
  padding: 5px 9px;
  color: var(--db-text-secondary);
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  transition: color .18s ease, background-color .18s ease;
}

.view-switcher button:hover,
.view-switcher button:focus-visible {
  color: var(--db-primary);
  outline: none;
  background: var(--db-blue-soft);
}

.view-switcher button.active {
  color: #fff;
  background: var(--db-primary);
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.legend-dot.metric-partial { color: var(--db-electric-blue); }
.legend-dot.metric-judge { color: #7d64db; }
.legend-dot.metric-final { color: #2eb89a; }

.score-list {
  display: flex;
  flex-direction: column;
}

.score-row {
  display: grid;
  grid-template-columns: 30px minmax(130px, 170px) minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  min-height: 92px;
  padding: 10px 18px;
  border-bottom: 1px solid var(--db-border);
  transition: background-color .18s ease;
}

.score-row:last-child { border-bottom: 0; }
.score-row:hover { background: color-mix(in srgb, var(--db-blue-soft) 42%, var(--db-bg)); }
.score-row.dumate { background: color-mix(in srgb, var(--db-purple-soft) 38%, var(--db-bg)); }
.score-row.dumate:hover { background: color-mix(in srgb, var(--db-purple-soft) 58%, var(--db-bg)); }

.rank {
  color: var(--db-text-muted);
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.score-row:first-child .rank {
  color: var(--db-primary);
  font-weight: 800;
}

.harness-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  min-width: 0;
}

.harness-name strong {
  overflow: hidden;
  color: var(--db-text);
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score-row.dumate .harness-name strong { color: var(--db-primary); }

.featured-badge {
  border: 1px solid color-mix(in srgb, var(--db-primary) 18%, transparent);
  border-radius: 999px;
  padding: 3px 7px;
  color: var(--db-primary);
  background: var(--db-purple-soft);
  font-size: 10px;
  font-weight: 750;
  letter-spacing: .03em;
}

.metric-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.metric-line {
  display: grid;
  grid-template-columns: 58px minmax(80px, 1fr) 52px;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.metric-label {
  color: var(--db-text-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .02em;
  text-transform: uppercase;
}

.metric-track {
  position: relative;
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--db-text-muted) 17%, var(--db-bg));
}

.metric-fill {
  display: block;
  height: 100%;
  min-width: 3px;
  border-radius: inherit;
  transition: width .3s ease;
}

.metric-fill.metric-partial { background: var(--db-electric-blue); }
.metric-fill.metric-judge { background: #7d64db; }
.metric-fill.metric-final { background: #2eb89a; }
.metric-fill.best { filter: saturate(1.15) brightness(.94); }

.metric-value {
  color: var(--db-text-secondary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.metric-value.best {
  color: var(--db-text);
  font-weight: 800;
}

.model-switcher {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  max-width: 100%;
  margin: 14px auto 0;
  padding: 4px;
  border: 1px solid var(--db-border);
  border-radius: 999px;
  background: var(--db-bg);
  box-shadow: 0 8px 24px rgba(29, 35, 66, 0.06);
}

.inline-switcher {
  flex: 0 1 auto;
  margin: 0;
  box-shadow: none;
}

.model-switcher button {
  min-height: 32px;
  border: 0;
  border-radius: 999px;
  padding: 6px 13px;
  color: var(--db-text-secondary);
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  transition: color .18s ease, background-color .18s ease, box-shadow .18s ease;
}

.model-switcher button:hover,
.model-switcher button:focus-visible {
  color: var(--db-primary);
  outline: none;
  background: var(--db-blue-soft);
}

.model-switcher button.active {
  color: #fff;
  background: var(--db-primary);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--db-primary) 28%, transparent);
}

:global(.dark) .leaderboard-card,
:global(.dark) .model-switcher {
  border-color: rgba(153, 161, 190, .2);
  background: #171b26;
  box-shadow: 0 12px 30px rgba(0, 0, 0, .16);
}

:global(.dark) .leaderboard-heading {
  border-color: rgba(153, 161, 190, .18);
  background: #1d2230;
}

:global(.dark) .view-switcher { border-color: rgba(153, 161, 190, .2); background: #171b26; }
:global(.dark) .view-switcher button:hover,
:global(.dark) .view-switcher button:focus-visible { background: #28264f; }

:global(.dark) .score-row { border-color: rgba(153, 161, 190, .16); }
:global(.dark) .score-row:hover { background: #1d2230; }
:global(.dark) .score-row.dumate { background: #171b26; }
:global(.dark) .score-row.dumate:hover { background: #1d2230; }
:global(.dark) .score-row.dumate .harness-name strong { color: #b8bee1; }
:global(.dark) .metric-track { background: #303644; }
:global(.dark) .metric-value.best { color: #f0f2fb; }
:global(.dark) .featured-badge { border-color: #363c50; color: #aeb6df; background: #242934; }
:global(.dark) .model-switcher button:hover,
:global(.dark) .model-switcher button:focus-visible { background: #28264f; }

@media (max-width: 760px) {
  .leaderboard-figure { max-width: 100%; }
  .leaderboard-card { border-radius: 13px; }
  .leaderboard-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    padding: 12px 16px;
  }
  .heading-tools { width: 100%; align-items: flex-start; }
  .view-switcher { width: 100%; }
  .view-switcher button { flex: 1 1 0; }
  .model-title { width: 100%; align-items: flex-start; }
  .inline-switcher { width: 100%; }
  .metric-legend { justify-content: flex-start; }
  .score-row {
    grid-template-columns: 26px minmax(0, 1fr);
    gap: 10px;
    min-height: 0;
    padding: 14px 18px;
  }
  .metric-stack { grid-column: 2; }
  .harness-name strong { font-size: 16px; }
  .metric-line { grid-template-columns: 56px minmax(70px, 1fr) 48px; gap: 7px; }
  .model-switcher button { flex: 1 1 44%; }
}
</style>
