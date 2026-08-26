<HomeHero />

<main class="site-shell">
<section class="home-section home-intro">
<div class="section-heading"><p class="eyebrow">DuMateBench</p><h2>A benchmark for compositional computer work.</h2><p>DuMateBench evaluates whether autonomous agents can coordinate tools, produce artifacts, and recover from failures across realistic end-to-end workflows.</p></div>
<div class="home-links"><a href="/overview"><strong>Overview</strong><span>Scope, task design, and evaluation protocol →</span></a><a href="/leaderboard"><strong>Leaderboard</strong><span>Results across five agents and four base models →</span></a><a href="https://huggingface.co/datasets/Annihi/dumate_bench"><strong>Dataset</strong><span>Open the released task data →</span></a></div>
</section>

<section class="home-section home-contributions">
<div class="section-heading"><p class="eyebrow">Why DuMateBench</p><h2>Three contributions define the benchmark.</h2><p>The benchmark is designed around the gap between clean, isolated demos and the messy, multi-step work agents must complete in practice.</p></div>
<div class="contribution-grid">
<article><span class="contribution-index">01</span><h3>Real-session compositional workflows</h3><p>200 executable tasks are reconstructed from anonymized, privacy-screened multi-turn sessions, preserving interaction history and workspace state across 8 broad scenarios and 17 fine-grained task types.</p></article>
<article><span class="contribution-index">02</span><h3>Reproducible complexity</h3><p>Isolated Docker environments model insufficient tools or resources, unstable network and tool behavior, and noisy workspaces with distracting data.</p></article>
<article><span class="contribution-index">03</span><h3>Comprehensive, diagnostic evaluation</h3><p>Five agent frameworks and four base models form 20 configurations, measuring end-to-end performance, workspace-noise robustness, efficiency, and failure modes.</p></article>
</div>
</section>

<section class="home-section home-scope">
<div class="section-heading"><p class="eyebrow">Benchmark scope</p><h2>Built for end-to-end agent evaluation.</h2></div>
<div class="scope-strip"><div><strong>200</strong><span>Executable tasks</span></div><div><strong>8</strong><span>Broad scenarios</span></div><div><strong>17</strong><span>Fine-grained task types</span></div><div><strong>20</strong><span>Agent-model configurations</span></div></div>
</section>

<section class="home-section"><div class="section-heading"><p class="eyebrow">Resources</p><h2>Everything else has a dedicated page.</h2></div><ResourceCards /></section>
</main>

<style>
.home-intro{padding-bottom:38px}.home-links{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.home-links a{display:flex;flex-direction:column;gap:10px;padding:22px;border:1px solid var(--db-border);border-radius:var(--db-radius-md);background:var(--db-bg-soft);color:var(--db-text);text-decoration:none;transition:.2s ease}.home-links a:hover{border-color:var(--db-primary);transform:translateY(-2px)}.home-links strong{font-size:19px}.home-links span{color:var(--db-text-secondary);font-size:13px;line-height:1.5}.contribution-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.contribution-grid article{padding:25px;border:1px solid var(--db-border);border-radius:var(--db-radius-md);background:var(--db-bg)}.contribution-index{color:var(--db-primary);font-size:12px;font-weight:750;letter-spacing:.1em}.contribution-grid h3{font-size:20px;margin:22px 0 10px}.contribution-grid p{color:var(--db-text-secondary);font-size:14px;line-height:1.65;margin:0}.scope-strip{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--db-border);border-radius:var(--db-radius-md);overflow:hidden;background:var(--db-bg-soft)}.scope-strip div{padding:22px;border-right:1px solid var(--db-border)}.scope-strip div:last-child{border-right:0}.scope-strip strong,.scope-strip span{display:block}.scope-strip strong{font-size:34px;letter-spacing:-.04em;color:var(--db-primary)}.scope-strip span{margin-top:8px;color:var(--db-text-secondary);font-size:13px;line-height:1.4}@media(max-width:900px){.contribution-grid{grid-template-columns:1fr}.scope-strip{grid-template-columns:repeat(2,1fr)}.scope-strip div:nth-child(2){border-right:0}.scope-strip div:nth-child(-n+2){border-bottom:1px solid var(--db-border)}}@media(max-width:760px){.home-links{grid-template-columns:1fr}.scope-strip{grid-template-columns:1fr}.scope-strip div,.scope-strip div:nth-child(2){border-right:0;border-bottom:1px solid var(--db-border)}.scope-strip div:last-child{border-bottom:0}}
</style>
