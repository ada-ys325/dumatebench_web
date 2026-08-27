<template>
  <section class="hero site-shell home-hero">
    <div class="ambient" aria-hidden="true" />
    <div class="hero-copy">
      <div class="hero-intro">
        <img class="hero-logo" src="/dumate.png" alt="DuMate logo">
        <div>
          <p class="eyebrow">Research benchmark · DuMate</p>
          <h1><span>DuMate</span>Bench</h1>
          <p class="hero-tagline">AI Agent Benchmark for Real-World Work</p>
          <p class="hero-description">Evaluate agents on realistic tasks and environments.</p>
        </div>
      </div>
      <div class="hero-actions">
        <a class="button button-primary" href="/overview">Explore the benchmark <span>→</span></a>
        <a class="button button-secondary" href="/leaderboard">View leaderboard</a>
      </div>
      <div class="hero-meta">
        <span class="status-dot" /> Static, open documentation <span class="meta-divider" /> Version <strong>TBD</strong>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero{min-height:420px;display:grid;grid-template-columns:minmax(0,1fr);align-items:center;position:relative}.hero-copy{min-width:0;padding:50px 0}.hero-intro{display:flex;align-items:center;gap:28px;min-width:0}.hero-intro>div{min-width:0}.hero-logo{width:112px;height:112px;display:block;object-fit:cover;object-position:center;border-radius:24px;background:transparent;flex:0 0 auto}:global(html:not(.dark)) .hero-logo{mix-blend-mode:multiply}.hero h1{font-size:clamp(54px,6.4vw,90px);line-height:.98;letter-spacing:-.075em;white-space:nowrap;margin:18px 0 14px}.hero h1 span{background:linear-gradient(100deg,var(--db-primary),var(--db-electric-blue));background-clip:text;-webkit-background-clip:text;color:transparent}.hero-tagline{font-size:clamp(20px,2.5vw,30px);font-weight:650;letter-spacing:-.03em;white-space:nowrap;margin:0}.hero-description{max-width:620px;color:var(--db-text-secondary);font-size:18px;line-height:1.7;margin:12px 0 0}.hero-actions{display:flex;gap:12px;margin-top:38px;flex-wrap:wrap}.button{padding:13px 18px;border-radius:12px;text-decoration:none;font-weight:650;transition:.2s ease}.button-primary{background:var(--db-text);color:var(--db-bg)}.button-primary:hover{transform:translateY(-2px);background:var(--db-primary)}.button-secondary{border:1px solid var(--db-border);color:var(--db-text);background:var(--db-bg)}.button-secondary:hover{border-color:var(--db-primary);color:var(--db-primary)}.hero-meta{margin-top:28px;color:var(--db-text-muted);font-size:13px;display:flex;align-items:center;gap:8px}.status-dot{width:8px;height:8px;border-radius:50%;background:#21b896}.meta-divider{height:14px;width:1px;background:var(--db-border);margin:0 4px}
.hero{min-height:420px;display:grid;grid-template-columns:minmax(0,1fr);align-items:center;position:relative}.hero-copy{min-width:0;padding:50px 0}.hero-intro{display:flex;align-items:center;gap:28px;min-width:0}.hero-intro>div{min-width:0}.hero-logo{width:112px;height:112px;display:block;object-fit:cover;object-position:center;border-radius:24px;background:transparent;flex:0 0 auto}:global(html:not(.dark)) .hero-logo{mix-blend-mode:multiply}.hero h1{font-size:clamp(54px,6.4vw,90px);line-height:.98;letter-spacing:-.075em;white-space:nowrap;margin:18px 0 14px}.hero h1 span{background:linear-gradient(100deg,var(--db-primary),var(--db-electric-blue));background-clip:text;-webkit-background-clip:text;color:transparent}.hero-tagline{font-size:clamp(20px,2.5vw,30px);font-weight:650;letter-spacing:-.03em;white-space:nowrap;margin:0}.hero-description{max-width:620px;color:var(--db-text-secondary);font-size:18px;line-height:1.7;margin:12px 0 0}.hero-actions{display:flex;gap:12px;margin-top:38px;flex-wrap:wrap}.button{padding:13px 18px;border-radius:12px;text-decoration:none;font-weight:650;transition:.2s ease}.button-primary{background:var(--db-text);color:var(--db-bg)}.button-primary:hover{transform:translateY(-2px);background:var(--db-primary)}.hero .button-primary:hover,.hero .button-primary:focus-visible{color:#fff!important;text-decoration:none!important;background:#3028c5;box-shadow:0 8px 20px color-mix(in srgb,#3028c5 26%,transparent)}.button-secondary{border:1px solid var(--db-border);color:var(--db-text);background:var(--db-bg)}.button-secondary:hover{border-color:var(--db-primary);color:var(--db-primary)}.hero-meta{margin-top:28px;color:var(--db-text-muted);font-size:13px;display:flex;align-items:center;gap:8px}.status-dot{width:8px;height:8px;border-radius:50%;background:#21b896}.meta-divider{height:14px;width:1px;background:var(--db-border);margin:0 4px}
@media(max-width:760px){.hero{min-height:0;display:block}.hero-copy{padding:46px 0 20px}.hero-intro{align-items:flex-start;gap:16px}.hero-logo{width:72px;height:72px;border-radius:16px}.hero h1{font-size:55px;margin:10px 0}.hero-tagline{font-size:20px}.hero-description{font-size:16px}}
</style>
