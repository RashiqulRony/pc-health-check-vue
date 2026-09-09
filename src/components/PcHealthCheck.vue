<script setup>
import { computed, ref } from 'vue'

const isScanning = ref(false)
const scanProgress = ref(0)
const lastChecked = ref('Today, 8:42 PM')

const checks = ref([
  { name: 'Processor', detail: 'AMD Ryzen 7 7840HS', value: '12% load', status: 'Healthy', icon: 'cpu' },
  { name: 'Memory', detail: '16 GB DDR5 • 9.8 GB available', value: '39% used', status: 'Healthy', icon: 'memory' },
  { name: 'Storage', detail: 'NVMe SSD • 312 GB available', value: '38% used', status: 'Healthy', icon: 'storage' },
  { name: 'Battery', detail: 'Condition is good • 184 cycles', value: '91% health', status: 'Healthy', icon: 'battery' },
])

const issues = ref([
  { title: 'Windows update available', description: 'A security update is ready to install.', action: 'Review update', severity: 'warning' },
  { title: 'Temporary files', description: 'You can safely recover 4.8 GB of space.', action: 'Clean up', severity: 'info' },
])

const score = computed(() => issues.value.length ? 92 : 100)

function runScan() {
  if (isScanning.value) return
  isScanning.value = true
  scanProgress.value = 0
  const timer = window.setInterval(() => {
    scanProgress.value += 4
    if (scanProgress.value >= 100) {
      window.clearInterval(timer)
      scanProgress.value = 100
      isScanning.value = false
      lastChecked.value = 'Just now'
    }
  }, 55)
}
</script>

<template>
  <main class="health-page">
    <div class="ambient ambient-one" />
    <div class="ambient ambient-two" />

    <section class="shell">
      <header class="topbar">
        <a class="brand" href="#" aria-label="PulseCare home">
          <span class="brand-mark">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2.2-5 4.2 10 2.1-5H21" /></svg>
          </span>
          <span>PulseCare</span>
        </a>

        <div class="device-pill">
          <span class="online-dot" />
          <div><strong>RONY-PC</strong><small>Windows 11 Pro</small></div>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 10 4 4 4-4" /></svg>
        </div>
      </header>

      <div class="page-heading">
        <div>
          <p class="eyebrow">SYSTEM OVERVIEW</p>
          <h1>PC Health Check</h1>
          <p>Monitor performance, security, and reliability in one place.</p>
        </div>
        <button class="scan-button" :disabled="isScanning" @click="runScan">
          <svg :class="{ spinning: isScanning }" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" /></svg>
          {{ isScanning ? `Scanning ${scanProgress}%` : 'Run health scan' }}
        </button>
      </div>

      <section class="hero-card">
        <div class="score-wrap">
          <svg class="score-ring" viewBox="0 0 132 132" role="img" :aria-label="`Health score ${score} out of 100`">
            <circle class="ring-track" cx="66" cy="66" r="57" />
            <circle class="ring-value" cx="66" cy="66" r="57" :style="{ strokeDashoffset: 358 - (358 * score / 100) }" />
          </svg>
          <div class="score-number"><strong>{{ score }}</strong><span>/100</span></div>
        </div>

        <div class="hero-copy">
          <div class="status-chip"><span>✓</span> Excellent condition</div>
          <h2>Your PC is running smoothly</h2>
          <p>All critical systems are healthy. We found two small opportunities to keep performance at its best.</p>
          <div class="scan-meta">
            <span><i class="pulse-dot" /> Last checked {{ lastChecked }}</span>
            <span>•</span>
            <span>Next automatic scan in 6 days</span>
          </div>
        </div>

        <div class="hero-stat">
          <span>UPTIME</span>
          <strong>4d 18h</strong>
          <small>Stable session</small>
        </div>
      </section>

      <div v-if="isScanning" class="progress-track"><span :style="{ width: `${scanProgress}%` }" /></div>

      <div class="content-grid">
        <section class="panel systems-panel">
          <div class="panel-heading">
            <div><h3>Core systems</h3><p>Live hardware and resource status</p></div>
            <button class="icon-button" aria-label="More system options">•••</button>
          </div>

          <div class="system-list">
            <article v-for="item in checks" :key="item.name" class="system-row">
              <span class="system-icon" :class="item.icon">
                <svg v-if="item.icon === 'cpu'" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m14 0h4M1 15h4m14 0h4"/></svg>
                <svg v-else-if="item.icon === 'memory'" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10v4m5-4v4m5-4v4M7 18v3m10-3v3"/></svg>
                <svg v-else-if="item.icon === 'storage'" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5m-16 7v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></svg>
                <svg v-else viewBox="0 0 24 24"><rect x="3" y="6" width="17" height="12" rx="2"/><path d="M20 10h2v4h-2M7 9v6m3-6v6"/></svg>
              </span>
              <div class="system-copy"><strong>{{ item.name }}</strong><small>{{ item.detail }}</small></div>
              <span class="system-value">{{ item.value }}</span>
              <span class="healthy"><i />{{ item.status }}</span>
              <svg class="chevron" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
            </article>
          </div>
        </section>

        <aside class="panel temperature-panel">
          <div class="panel-heading"><div><h3>Temperature</h3><p>Current thermal status</p></div><span class="live-tag"><i /> LIVE</span></div>
          <div class="temperature-value"><strong>52</strong><span>°C</span></div>
          <p class="temperature-status">Normal operating range</p>
          <div class="thermal-bar"><span /><i /></div>
          <div class="thermal-labels"><span>Cool</span><span>Warm</span><span>Hot</span></div>
          <div class="temp-details"><span>CPU <strong>54°C</strong></span><span>GPU <strong>49°C</strong></span></div>
        </aside>
      </div>

      <section class="panel attention-panel">
        <div class="panel-heading">
          <div><h3>Needs your attention <span class="count">2</span></h3><p>Recommended actions to improve PC health</p></div>
          <button class="text-button">View all recommendations <span>→</span></button>
        </div>
        <div class="issue-grid">
          <article v-for="issue in issues" :key="issue.title" class="issue-card" :class="issue.severity">
            <span class="issue-icon">{{ issue.severity === 'warning' ? '!' : '↗' }}</span>
            <div><strong>{{ issue.title }}</strong><p>{{ issue.description }}</p></div>
            <button>{{ issue.action }} <span>→</span></button>
          </article>
        </div>
      </section>

      <footer><span>PulseCare Health Engine v2.4.1</span><nav><a href="#">Privacy</a><a href="#">Help center</a><a href="#">Send feedback</a></nav></footer>
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');

* { box-sizing: border-box; }
.health-page { --ink:#172238; --muted:#758096; --line:#e6eaf0; --green:#18a874; --green-dark:#0b8258; --navy:#101b31; position:relative; min-height:100vh; overflow:hidden; background:#f4f7fa; color:var(--ink); font-family:'DM Sans',sans-serif; padding:32px; }
.ambient { position:absolute; border-radius:999px; filter:blur(12px); opacity:.5; pointer-events:none; }
.ambient-one { width:420px; height:420px; right:-180px; top:-160px; background:#d9f7ed; }
.ambient-two { width:300px; height:300px; left:-180px; bottom:40px; background:#e2edff; }
.shell { position:relative; max-width:1280px; margin:auto; }
.topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:54px; }
.brand { display:flex; align-items:center; gap:11px; color:var(--navy); text-decoration:none; font:800 20px 'Manrope',sans-serif; letter-spacing:-.5px; }
.brand-mark { display:grid; place-items:center; width:38px; height:38px; color:white; border-radius:12px; background:linear-gradient(145deg,#17b983,#087c5b); box-shadow:0 8px 22px #12a8754a; }
.brand-mark svg { width:23px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.device-pill { display:flex; align-items:center; gap:10px; min-width:190px; padding:9px 12px; border:1px solid var(--line); border-radius:14px; background:#ffffffc9; box-shadow:0 5px 16px #2635520c; }
.device-pill div { display:flex; flex:1; flex-direction:column; line-height:1.25; }.device-pill strong{font-size:12px}.device-pill small{font-size:11px;color:var(--muted)}
.device-pill>svg { width:16px; fill:none; stroke:#8992a5; stroke-width:2; }.online-dot{width:8px;height:8px;border-radius:50%;background:#1cc98b;box-shadow:0 0 0 4px #1cc98b1c}
.page-heading { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:28px; }
.eyebrow { margin:0 0 9px!important; font-size:11px!important; font-weight:700; letter-spacing:1.7px; color:#1a9b70!important; }
.page-heading h1 { margin:0 0 8px; font:800 clamp(30px,4vw,44px)/1.1 'Manrope'; letter-spacing:-1.8px; }.page-heading p{margin:0;color:var(--muted);font-size:15px}
button { font:600 13px 'DM Sans'; cursor:pointer; }
.scan-button { display:flex; align-items:center; gap:9px; min-width:158px; justify-content:center; border:0; border-radius:12px; padding:13px 17px; color:white; background:var(--navy); box-shadow:0 9px 23px #101b3130; transition:.2s; }.scan-button:hover{transform:translateY(-2px);background:#1b2945}.scan-button:disabled{cursor:wait;opacity:.85}.scan-button svg{width:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.hero-card { display:grid; grid-template-columns:150px 1fr auto; align-items:center; gap:30px; padding:29px 34px; border:1px solid #dfe9e5; border-radius:22px; background:linear-gradient(115deg,#f0fbf7 0%,#fff 62%); box-shadow:0 16px 50px #2635520b; }
.score-wrap{position:relative;width:126px;height:126px}.score-ring{width:100%;transform:rotate(-90deg)}.score-ring circle{fill:none;stroke-width:9}.ring-track{stroke:#dcebe5}.ring-value{stroke:#18ad78;stroke-linecap:round;stroke-dasharray:358;transition:stroke-dashoffset .5s}.score-number{position:absolute;inset:0;display:grid;place-content:center;text-align:center}.score-number strong{font:800 34px 'Manrope'}.score-number span{font-size:11px;color:var(--muted);margin-top:-3px}
.status-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:8px;color:var(--green-dark);background:#dff8ee;font-size:11px;font-weight:700}.status-chip span{display:grid;place-items:center;width:16px;height:16px;border-radius:50%;color:white;background:var(--green)}
.hero-copy h2{margin:10px 0 7px;font:700 23px 'Manrope';letter-spacing:-.6px}.hero-copy>p{max-width:650px;margin:0;color:var(--muted);font-size:13px;line-height:1.55}.scan-meta{display:flex;align-items:center;gap:9px;margin-top:16px;color:#9099aa;font-size:11px}.pulse-dot{display:inline-block;width:6px;height:6px;margin-right:5px;border-radius:50%;background:#20bd85}
.hero-stat{min-width:130px;padding-left:28px;border-left:1px solid var(--line);display:flex;flex-direction:column}.hero-stat span{font-size:9px;font-weight:700;letter-spacing:1.2px;color:#9ba4b2}.hero-stat strong{margin:6px 0 2px;font:700 22px 'Manrope'}.hero-stat small{font-size:11px;color:#22a475}
.progress-track{height:4px;margin:-4px 20px 0;overflow:hidden;border-radius:0 0 8px 8px;background:#deebe7}.progress-track span{display:block;height:100%;background:#16ae78;transition:width .12s}
.content-grid{display:grid;grid-template-columns:2fr .82fr;gap:20px;margin-top:20px}.panel{border:1px solid var(--line);border-radius:18px;background:#fff;box-shadow:0 13px 38px #26355208}.panel-heading{display:flex;align-items:center;justify-content:space-between;padding:21px 23px 17px}.panel-heading h3{margin:0;font:700 16px 'Manrope';letter-spacing:-.3px}.panel-heading p{margin:4px 0 0;color:var(--muted);font-size:11px}.icon-button{border:0;background:transparent;color:#8e97a6;font-size:17px}.system-list{border-top:1px solid var(--line)}.system-row{display:grid;grid-template-columns:42px 1fr auto 85px 14px;align-items:center;gap:14px;padding:14px 22px;border-bottom:1px solid #edf0f4}.system-row:last-child{border-bottom:0}.system-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#f0f5fa;color:#45617e}.system-icon svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.system-icon.memory{color:#6255a4;background:#f2f0fb}.system-icon.storage{color:#287bab;background:#edf6fb}.system-icon.battery{color:#24886a;background:#ecf8f3}.system-copy{display:flex;flex-direction:column}.system-copy strong{font-size:13px}.system-copy small{margin-top:3px;color:var(--muted);font-size:10px}.system-value{font-size:11px;color:#536076}.healthy{display:flex;align-items:center;gap:5px;color:#15966a;font-size:10px;font-weight:700}.healthy i{width:6px;height:6px;border-radius:50%;background:#20bc83}.chevron{width:14px;fill:none;stroke:#aab1bd;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.live-tag{font-size:9px;font-weight:700;color:#149568}.live-tag i{display:inline-block;width:5px;height:5px;margin-right:4px;border-radius:50%;background:#17b47c;box-shadow:0 0 0 3px #17b47c22}.temperature-panel{padding-bottom:18px}.temperature-value{margin-top:5px;text-align:center}.temperature-value strong{font:800 57px 'Manrope';letter-spacing:-3px}.temperature-value span{vertical-align:top;display:inline-block;margin:8px 0 0 4px;color:#657085;font-size:19px}.temperature-status{text-align:center;margin:0;color:#179269;font-size:11px}.thermal-bar{position:relative;height:7px;margin:26px 27px 7px;border-radius:9px;background:linear-gradient(90deg,#25b98b 0 50%,#efbf4e 70%,#e36b5d 100%)}.thermal-bar i{position:absolute;width:13px;height:13px;left:38%;top:50%;border:3px solid white;border-radius:50%;background:#18a978;box-shadow:0 1px 5px #18253d55;transform:translate(-50%,-50%)}.thermal-labels{display:flex;justify-content:space-between;margin:0 27px;color:#9aa2b0;font-size:9px}.temp-details{display:grid;grid-template-columns:1fr 1fr;margin:21px 23px 0;border-top:1px solid var(--line);padding-top:16px}.temp-details span{display:flex;justify-content:space-between;padding:0 13px;color:#8690a1;font-size:10px}.temp-details span+span{border-left:1px solid var(--line)}.temp-details strong{color:#3a465b}
.attention-panel{margin-top:20px}.count{display:inline-grid;place-items:center;width:19px;height:19px;margin-left:5px;border-radius:7px;background:#fff0db;color:#be7618;font:700 10px 'DM Sans'}.text-button{border:0;background:none;color:#167a5d}.text-button span,.issue-card button span{margin-left:5px}.issue-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 22px 22px}.issue-card{display:grid;grid-template-columns:37px 1fr auto;align-items:center;gap:12px;padding:15px;border:1px solid #f1e1c8;border-radius:13px;background:#fffbf4}.issue-card.info{border-color:#dbe7f3;background:#f8fbff}.issue-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;color:#b46d13;background:#ffecd0;font-size:16px;font-weight:800}.issue-card.info .issue-icon{color:#3976a2;background:#e8f3fb}.issue-card strong{font-size:12px}.issue-card p{margin:3px 0 0;color:var(--muted);font-size:10px}.issue-card button{border:0;background:none;color:#9e641b;font-size:10px}.issue-card.info button{color:#36729d}
footer{display:flex;justify-content:space-between;padding:24px 2px 4px;color:#929baa;font-size:10px}footer nav{display:flex;gap:22px}footer a{color:inherit;text-decoration:none}footer a:hover{color:#1a8c69}
.spinning{animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:900px){.health-page{padding:22px}.hero-card{grid-template-columns:130px 1fr}.hero-stat{display:none}.content-grid{grid-template-columns:1fr}.issue-grid{grid-template-columns:1fr}}
@media(max-width:620px){.health-page{padding:18px}.topbar{margin-bottom:36px}.device-pill{min-width:0}.device-pill div,.device-pill>svg{display:none}.page-heading{align-items:flex-start;gap:20px}.page-heading>div>p:not(.eyebrow){display:none}.scan-button{min-width:auto;padding:13px}.scan-button svg{width:18px}.hero-card{grid-template-columns:1fr;text-align:center;padding:25px}.score-wrap{margin:auto}.scan-meta{justify-content:center;flex-wrap:wrap}.content-grid{margin-top:14px}.system-row{grid-template-columns:40px 1fr auto;padding:13px}.system-value,.chevron{display:none}.healthy{grid-column:3}.issue-card{grid-template-columns:37px 1fr}.issue-card button{grid-column:2;text-align:left;padding:0}.attention-panel{margin-top:14px}.text-button{display:none}footer{flex-direction:column;gap:14px}footer nav{gap:14px}}
</style>
