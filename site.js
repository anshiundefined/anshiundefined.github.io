/* Meetanshi Gaba · portfolio */
(() => {
const root = document.documentElement, page = document.body.dataset.page || "home";
const EMAIL = "meetanshi01@gmail.com", GHU = "https://github.com/anshiundefined", LI = "https://www.linkedin.com/in/meetanshigaba";
const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
if (store.get("theme")) root.dataset.theme = store.get("theme");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- nav + footer ---------- */
const L = (h, t, k) => `<a href="${h}" class="${page === k ? "on" : ""}">${t}</a>`;
const nav = document.createElement("header"); nav.className = "nav";
nav.innerHTML = `<div class="wrap"><a class="home-link" href="index.html">Meetanshi <i>Gaba</i></a>
  <nav class="nav-links" id="links">${L("work.html", "Work", "work")}${L("research.html", "Research", "research")}${L("about.html", "About", "about")}${L("cv.html", "CV", "cv")}</nav>
  <div style="display:flex;align-items:center;gap:8px"><button id="theme" aria-label="Switch light or dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button><button class="burger" id="burger" aria-expanded="false">Menu</button></div></div>`;
document.body.prepend(nav);
document.getElementById("burger").onclick = e => { const l = document.getElementById("links"); l.classList.toggle("open"); e.target.setAttribute("aria-expanded", l.classList.contains("open")); };
document.getElementById("theme").onclick = () => { root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"; store.set("theme", root.dataset.theme); };
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });
const foot = document.getElementById("foot");
if (foot) foot.innerHTML = `<footer class="foot"><div class="wrap"><p class="big">Have an interesting question? <a href="mailto:${EMAIL}">Say hello</a>.</p>
  <div class="small"><a href="mailto:${EMAIL}">${EMAIL}</a><a href="${LI}" target="_blank" rel="noopener">LinkedIn ↗</a><a href="${GHU}" target="_blank" rel="noopener">GitHub ↗</a><a href="Meetanshi_Gaba_CV.pdf" download>Download CV ↓</a></div>
  <div class="copy">© ${new Date().getFullYear()} Meetanshi Gaba · Pune / Chandigarh, India</div></div></footer>`;

/* ---------- tooltip ---------- */
const tip = document.createElement("div"); tip.id = "tip"; document.body.append(tip);
document.addEventListener("pointermove", e => { const t = e.target.closest && e.target.closest("[data-tip]");
  if (!t) { tip.classList.remove("show"); return; }
  tip.innerHTML = t.dataset.tip; tip.classList.add("show");
  const w = tip.offsetWidth, x = Math.min(innerWidth - w - 10, e.clientX + 14), y = e.clientY - tip.offsetHeight - 12;
  tip.style.left = x + "px"; tip.style.top = (y < 8 ? e.clientY + 18 : y) + "px"; });

/* ---------- chart helpers ---------- */
const W = 520, H = 250, M = { l: 44, r: 16, t: 16, b: 30 };
const X = (v, a, b) => M.l + (v - a) / (b - a) * (W - M.l - M.r), Y = (v, a, b) => H - M.b - (v - a) / (b - a) * (H - M.t - M.b);
const P = pts => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join("");
const T = (x, y, s, c = "", a = "start") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${s}</text>`;
const gridY = (ts, a, b, f) => ts.map(t => `<line class="ax" x1="${M.l}" x2="${W - M.r}" y1="${Y(t, a, b)}" y2="${Y(t, a, b)}"/>${T(M.l - 8, Y(t, a, b) + 3, f(t), "", "end")}`).join("");
const fit = (xs, ys) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0; xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; }); const b = sxy / sxx; return [my - b * mx, b]; };
const pct = r => r.style.setProperty("--p", ((r.value - r.min) / (r.max - r.min) * 100) + "%");
const C = window.CHARTS;

/* each viz: {head, cap, ctl?:{label,min,max,step,val}, draw(v)->{svg, ro}} */
const VIZ = {
  "anti-incumbency-india": { head: "Vote margin vs winning again", ctl: { label: "Window around zero", min: 0, max: 4, step: 1, val: 2 },
    cap: "Each dot is a 1-point margin bin. Hover a dot for its value.",
    draw(v) { const d = C.rd, bw = DESK.rdBW[v], hw = bw[0], a = .24, b = .48;
      let s = `<rect x="${X(-hw, -20, 20)}" y="${M.t}" width="${X(hw, -20, 20) - X(-hw, -20, 20)}" height="${H - M.t - M.b}" fill="var(--blush)" rx="4"/>` + gridY([.3, .4], a, b, t => t * 100 + "%");
      [-20, -10, 0, 10, 20].forEach(t => s += T(X(t, -20, 20), H - 10, (t > 0 ? "+" : "") + t, "", "middle"));
      s += `<line class="zero" x1="${X(0, -20, 20)}" x2="${X(0, -20, 20)}" y1="${M.t}" y2="${H - M.b}"/>`;
      const L = [], R = []; d.x.forEach((x, i) => (x < 0 ? L : R).push([x, d.y[i]]));
      [[L, "ink", -20, 0], [R, "acc", 0, 20]].forEach(([arr, c, x0, x1]) => { const [k, m] = fit(arr.map(p => p[0]), arr.map(p => p[1])); s += `<path class="ln ${c}" d="${P([[X(x0, -20, 20), Y(k + m * x0, a, b)], [X(x1, -20, 20), Y(k + m * x1, a, b)]])}" opacity=".5"/>`; });
      d.x.forEach((x, i) => { const inb = Math.abs(x) <= hw; s += `<circle class="dot ${inb ? (x < 0 ? "ink" : "acc") : "mut"}" cx="${X(x, -20, 20)}" cy="${Y(d.y[i], a, b)}" r="${inb ? 5 : 4}" data-tip="margin ${x > 0 ? "+" : ""}${x.toFixed(1)} pp<br>party wins again: ${(d.y[i] * 100).toFixed(1)}%"/>`; });
      s += T(M.l + 4, M.t + 12, "lost narrowly") + T(W - M.r - 4, M.t + 12, "won narrowly", "acc", "end") + T(W / 2, H + 4, "vote margin in the last election (pp)", "", "middle");
      return { svg: s, ro: `Inside ±${hw} pp, narrowly winning changes the chance of holding the seat by <b>${bw[1].toFixed(1)} pp</b>` }; } },
  "hit-half-life": { head: "How long hits stay in the Top 40", ctl: { label: "Weeks in the Top 40", min: 1, max: 30, step: 1, val: 6 },
    cap: "Kaplan-Meier survival by era. Hover a line to see which era it is.",
    draw(v) { const d = C.km, a = 0, b = 1, keys = [["Radio & sales (–1990)", "ink", "before 1991"], ["SoundScan (1991–2004)", "mut", "1991 to 2004"], ["Downloads (2005–12)", "mut", "2005 to 2012"], ["Streaming (2013–)", "acc", "streaming era, 2013 on"]];
      let s = gridY([0, .5, 1], a, b, t => t * 100 + "%"); [0, 10, 20, 30].forEach(t => s += T(X(t, 0, 30), H - 10, t, "", "middle"));
      keys.forEach(([k, c, n]) => { let p = ""; d[k].forEach((val, i) => p += i ? `H${X(i, 0, 30).toFixed(1)}V${Y(val, a, b).toFixed(1)}` : `M${X(0, 0, 30)},${Y(val, a, b)}`); s += `<path class="ln ${c}" d="${p}" stroke-width="${c === "mut" ? 1.6 : 2.6}"/><path d="${p}" fill="none" stroke="transparent" stroke-width="12" data-tip="${n}"/>`; });
      s += `<line class="zero" x1="${X(v, 0, 30)}" x2="${X(v, 0, 30)}" y1="${M.t}" y2="${H - M.b}" style="stroke:var(--pink)"/>`;
      const r = d["Radio & sales (–1990)"][v], st = d["Streaming (2013–)"][v];
      s += `<circle class="dot ink" cx="${X(v, 0, 30)}" cy="${Y(r, a, b)}" r="5.5"/><circle class="dot acc" cx="${X(v, 0, 30)}" cy="${Y(st, a, b)}" r="5.5"/>` + T(W / 2, H + 4, "weeks spent in the Top 40", "", "middle");
      return { svg: s, ro: `After ${v} week${v > 1 ? "s" : ""}: <span class="mut">before 1991</span> ${Math.round(r * 100)}% still there, <span class="pink">streaming era</span> <b>${Math.round(st * 100)}%</b>` }; } },
  "caste-monetary-transmission": { head: "The wasted multiplier by SC/ST share", ctl: { label: "SC/ST population share", min: 5, max: 95, step: .5, val: 35.5 },
    cap: "Line is the estimate, shaded band the 95% interval. Grey dashes mark the average state.",
    draw(v) { const q = DESK.caste, a = 0, b = 3.6; let s = gridY([0, 1, 2, 3], a, b, t => t + " pp");
      [0, 25, 50, 75, 100].forEach(t => s += T(X(t, 0, 100), H - 10, t + "%", "", "middle"));
      const lo = [], hi = []; for (let x = 0; x <= 100; x += 2) { lo.push([X(x, 0, 100), Y(-q.hi * x, a, b)]); hi.push([X(x, 0, 100), Y(-q.lo * x, a, b)]); }
      s += `<path fill="var(--blush)" d="${P(hi)}L${lo.reverse().map(p => p.join(",")).join("L")}Z"/><path class="ln acc" d="${P([[X(0, 0, 100), Y(0, a, b)], [X(100, 0, 100), Y(-q.b * 100, a, b)]])}"/>`;
      s += `<line class="zero" x1="${X(q.mean, 0, 100)}" x2="${X(q.mean, 0, 100)}" y1="${M.t}" y2="${H - M.b}"/>` + T(X(q.mean, 0, 100) + 6, M.t + 10, "average state");
      s += `<circle class="dot acc" cx="${X(v, 0, 100)}" cy="${Y(-q.b * v, a, b)}" r="7" data-tip="${v}% SC/ST share<br>${(-q.b * v).toFixed(2)} pp"/>` + T(W / 2, H + 4, "state's SC/ST population share", "", "middle");
      return { svg: s, ro: `At ${v}% SC/ST share, the credit response to a 1 pp repo move differs by <b>${(-q.b * v).toFixed(2)} pp</b> <span class="mut">(95% CI ${(-q.hi * v).toFixed(2)} to ${(-q.lo * v).toFixed(2)})</span>` }; } },
  "fed-behind-the-curve": { head: "Average gap to each benchmark, 2021 to 2022", cap: "How far below each benchmark the actual rate was. Hover a bar.",
    draw() { const d = C.fed, l = 150, rh = (H - M.t - 10) / d.length; let s = "";
      d.forEach(([n, v], i) => { const y = M.t + i * rh, w = v / 8 * (W - l - 60); s += T(l - 10, y + rh / 2 + 4, n, i === 0 ? "acc" : "lab", "end") + `<rect class="bar ${i === 0 ? "acc" : "mut"}" x="${l}" y="${y + rh * .2}" width="${w}" height="${rh * .6}" rx="3" data-tip="${n}: ${v.toFixed(2)} pp above the actual rate"/>` + T(l + w + 8, y + rh / 2 + 4, v.toFixed(1) + " pp", i === 0 ? "acc" : ""); });
      return { svg: s }; } },
  "burgernomics": { head: "How a burger misvaluation closes", cap: "Pink: burger prices catching up. Dark: the exchange rate, which moves the wrong way. Hover a bar.",
    draw() { const d = C.burger, a = -12, b = 30, gw = (W - M.l - M.r) / 4; let s = gridY([-10, 0, 10, 20, 30], a, b, t => t + "%");
      d.h.forEach((h, i) => { const x = M.l + i * gw + gw * .2, bw = gw * .28;
        const bar = (v, xx, c, n) => `<rect class="bar ${c}" x="${xx}" y="${Math.min(Y(0, a, b), Y(v, a, b))}" width="${bw}" height="${Math.abs(Y(v, a, b) - Y(0, a, b))}" rx="2" data-tip="after ${h} year${h > 1 ? "s" : ""}: ${n} ${v > 0 ? "+" : ""}${v}%"/>`;
        s += bar(d.fx[i], x, "ink", "exchange rate") + bar(d.price[i], x + bw + 4, "acc", "burger prices") + T(x + bw, H - 10, h + (h > 1 ? " years" : " year"), "", "middle"); });
      return { svg: s }; } },
  "ipl-hot-hand": { head: "Extra chance of a boundary on the next ball", cap: "Each bar adds controls to the one before. Hover a bar.",
    draw() { const d = C.ipl, a = -.5, b = 4, gw = (W - M.l - M.r) / 4, labs = ["raw data", "+ skill and context", "the batter", "the bowler"], c = ["mut", "mut", "ink", "acc"]; let s = gridY([0, 1, 2, 3, 4], a, b, t => "+" + t);
      d.forEach(([n, v], i) => { const x = M.l + i * gw + gw * .22, bw = gw * .56, y0 = Y(0, a, b), y1 = Y(v, a, b);
        s += `<rect class="bar ${c[i]}" x="${x}" y="${Math.min(y0, y1)}" width="${bw}" height="${Math.max(2, Math.abs(y1 - y0))}" rx="3" data-tip="${n}: ${v > 0 ? "+" : ""}${v.toFixed(2)} pp"/>` + T(x + bw / 2, Math.min(y0, y1) - 7, (v > 0 ? "+" : "") + v.toFixed(1), i === 3 ? "acc" : "", "middle") + T(x + bw / 2, H - 10, labs[i], i === 3 ? "acc" : "", "middle"); });
      return { svg: s }; } },
  "hosting-dividend": { head: "Host GDP per capita vs a synthetic twin", cap: "Filled dot: p < 0.10. Hover a host for details.",
    draw() { const d = C.hosting, a = -40, b = 60, l = 80, rh = (H - M.t - M.b) / d.length, XX = v => l + (Math.min(v, b) - a) / (b - a) * (W - l - 40);
      let s = `<line class="zero" x1="${XX(0)}" x2="${XX(0)}" y1="${M.t}" y2="${H - M.b}"/>`; [-40, -20, 0, 20, 40, 60].forEach(t => s += T(XX(t), H - 10, (t > 0 ? "+" : "") + t + "%", "", "middle"));
      d.forEach(([n, v, p], i) => { const y = M.t + i * rh + rh / 2; s += T(l - 10, y + 4, n, n === "India" ? "acc" : "lab", "end") + `<line class="ax" x1="${XX(0)}" x2="${XX(v)}" y1="${y}" y2="${y}"/>` +
        `<circle class="${p < .1 ? "dot acc" : "ring"}" cx="${XX(v)}" cy="${y}" r="5" data-tip="${n}: ${v > 0 ? "+" : ""}${v.toFixed(1)}% vs synthetic twin<br>placebo p = ${p.toFixed(2)}"/>` + (v > b ? T(XX(v) + 10, y + 4, "+126% →") : ""); });
      return { svg: s }; } },
  "say-sound-gap": { head: "Sound and words, drifting apart", ctl: { label: "Say-sound gap", min: 0, max: 100, step: 1, val: 55 }, cap: "An illustration: pink is how a song sounds, dark is what it says.", live: true,
    draw(v, t = 0) { const n = 140, mid = H / 2, g = v / 100; let a = [], w = [];
      for (let i = 0; i <= n; i++) { const x = M.l + i / n * (W - M.l - M.r), u = i / n * Math.PI * 5 + t;
        a.push([x, mid - 16 - 40 * Math.sin(u) * (0.6 + .4 * Math.sin(u / 3))]); w.push([x, mid - 16 - 40 * Math.sin(u + g * 2.6) * (0.6 + .4 * Math.cos(u / 2.2 + g * 2)) + g * 44]); }
      const s = `<path class="ln acc" d="${P(a)}" stroke-width="2.6"/><path class="ln ink" d="${P(w)}" opacity=".75"/>` + T(M.l, M.t, "how it sounds", "acc") + T(M.l, H - 6, "what it says");
      return { svg: s, ro: v < 20 ? "Sound and lyrics <b>agree</b>" : v < 60 ? "Sound and lyrics are <b>drifting apart</b>" : "A happy-sounding song with <b>sad words</b>" }; } },
};
const mountViz = (el, r) => { const V = VIZ[r]; if (!V) return;
  el.innerHTML = `<div class="vh"><span>${V.head}</span><span class="try">${V.live ? "drag the slider" : V.ctl ? "drag the slider · hover the chart" : "hover the chart"}</span></div><svg viewBox="0 0 ${W} ${H + 10}" role="img" aria-label="${V.head}"></svg>${V.ctl ? `<div class="ctl"><label>${V.ctl.label}</label><input type="range" min="${V.ctl.min}" max="${V.ctl.max}" step="${V.ctl.step}" value="${V.ctl.val}"><div class="ro"></div></div>` : ""}<div class="cap">${V.cap}</div>`;
  const svg = el.querySelector("svg"), rng = el.querySelector("input"), ro = el.querySelector(".ro");
  let t = 0; const paint = () => { const o = V.draw(rng ? +rng.value : 0, t); svg.innerHTML = o.svg; if (ro && o.ro) ro.innerHTML = o.ro; };
  if (rng) { pct(rng); rng.addEventListener("input", () => { pct(rng); paint(); }); }
  paint();
  if (V.live && !reduce) { const loop = () => { t += .02; paint(); requestAnimationFrame(loop); }; requestAnimationFrame(loop); } };

/* ---------- project blocks ---------- */
const byRepo = r => PROJECTS.find(p => p.r === r);
const block = (p, i) => { const v = VIEWS[p.r];
  return `<article class="pblock rv" id="${p.r}" data-tags="${p.tags.join(" ")}"><div>
    <div class="meta"><span>${String(i + 1).padStart(2, "0")}</span><span>${p.tl}</span><span class="st">${p.real ? "results in" : "running"}</span></div>
    <h3>${p.t}</h3><p class="q">${p.q}</p>
    <div class="stat"><b>${v.stat}</b><span>${v.statLab}</span></div>
    <p class="plain">${v.words}</p>
    <details><summary>The detail</summary><p>${p.f}</p></details>
    <div class="tools">${p.m}</div>
    <div class="links"><a href="${GH}${p.r}" target="_blank" rel="noopener">Code and data ↗</a>${p.fig ? `<a class="sec" href="${RAW}${p.r}/main/${p.fig}" target="_blank" rel="noopener">Full chart ↗</a>` : ""}</div></div>
    <div class="vcol"><div class="viz" data-r="${p.r}"></div></div></article>`; };
const list = document.getElementById("projects");
if (list) {
  const pick = list.dataset.pick ? list.dataset.pick.split(",") : null;
  const ps = pick ? pick.map(byRepo) : PROJECTS;
  list.innerHTML = ps.map(block).join("");
  list.querySelectorAll(".viz").forEach(el => mountViz(el, el.dataset.r));
}
const f = document.getElementById("filters");
if (f) f.onclick = e => { const b = e.target.closest("button"); if (!b) return; f.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
  document.querySelectorAll(".pblock").forEach(c => c.classList.toggle("hide", b.dataset.f !== "all" && !c.dataset.tags.includes(b.dataset.f))); };

/* ---------- portrait (home only) ---------- */
const c = document.getElementById("field");
if (c) (() => {
  const ctx = c.getContext("2d"), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W2, H2, pts = [], mouse = { x: -1e4, y: -1e4 }, t0 = performance.now();
  const col = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  function targets() { const o = document.createElement("canvas"); o.width = W2; o.height = H2; const g = o.getContext("2d");
    g.fillStyle = "#000"; g.textAlign = "center"; g.textBaseline = "middle"; g.font = `italic ${Math.floor(W2 * .62)}px Fraunces, Georgia, serif`;
    g.fillText("mg", W2 / 2, H2 * .46); const d = g.getImageData(0, 0, W2, H2).data, out = [], s = Math.max(4, Math.floor(W2 / 95));
    for (let y = 0; y < H2; y += s) for (let x = 0; x < W2; x += s) if (d[(y * W2 + x) * 4 + 3] > 128) out.push([x, y]); return out; }
  function init() { const r = c.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1); W2 = Math.floor(r.width); H2 = Math.floor(r.height);
    c.width = W2 * dpr; c.height = H2 * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); const tg = targets(), n = Math.min(2000, tg.length + 400);
    pts = Array.from({ length: n }, (_, i) => { const t = tg[i]; return { x: Math.random() * W2, y: Math.random() * H2, vx: 0, vy: 0, tx: t ? t[0] : null, ty: t ? t[1] : null, ph: Math.random() * 6.28, hot: Math.random() < .07 }; }); }
  function frame(now) { const t = (now - t0) / 1000, ink = col("--ink"), acc = col("--pink"); ctx.clearRect(0, 0, W2, H2);
    for (const p of pts) { let ax, ay; if (p.tx !== null) { ax = (p.tx - p.x) * .018; ay = (p.ty - p.y) * .018; }
      else { ax = Math.cos(t * .3 + p.ph + p.y * .01) * .06; ay = Math.sin(t * .25 + p.ph + p.x * .01) * .06; if (p.x < 0) p.x = W2; if (p.x > W2) p.x = 0; if (p.y < 0) p.y = H2; if (p.y > H2) p.y = 0; }
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy, R = W2 * .16;
      if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 2.4; ax += dx / d * f; ay += dy / d * f; }
      p.vx = (p.vx + ax) * .86; p.vy = (p.vy + ay) * .86; p.x += p.vx; p.y += p.vy;
      ctx.fillStyle = p.hot ? acc : ink; ctx.globalAlpha = p.tx !== null ? .9 : .28; const s = p.tx !== null ? 1.5 : 1;
      ctx.fillRect(p.x + Math.sin(t * 1.3 + p.ph) * .4, p.y + Math.cos(t * 1.1 + p.ph) * .4, s, s); }
    ctx.globalAlpha = 1; if (!reduce) requestAnimationFrame(frame); }
  c.addEventListener("pointermove", e => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  c.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });
  c.addEventListener("click", () => pts.forEach(p => { p.vx += (Math.random() - .5) * 40; p.vy += (Math.random() - .5) * 40; }));
  (document.fonts ? document.fonts.load("italic 200px Fraunces").catch(() => 0) : Promise.resolve()).then(() => { init(); if (reduce) { pts.forEach(p => { if (p.tx !== null) { p.x = p.tx; p.y = p.ty; } }); frame(performance.now()); } else requestAnimationFrame(frame); });
  let to; addEventListener("resize", () => { clearTimeout(to); to = setTimeout(init, 200); });
})();

/* ---------- counters ---------- */
const counters = document.querySelectorAll("[data-count]");
const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target, n = +el.dataset.count, suf = el.dataset.suf || ""; cio.unobserve(el);
  if (reduce) { el.textContent = n.toLocaleString("en-IN") + suf; return; }
  const t0 = performance.now(), dur = 1400; const step = now => { const k = Math.min(1, (now - t0) / dur), v = Math.round(n * (1 - Math.pow(1 - k, 3)));
    el.textContent = v.toLocaleString("en-IN") + suf; if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }), { threshold: .5 });
counters.forEach(c => cio.observe(c));

/* ---------- timeline ---------- */
const tl = document.getElementById("timeline");
if (tl && window.TIMELINE) {
  const rows = ["Education", "Work", "Internships"], col = { Education: "var(--ink)", Work: "var(--pink)", Internships: "#d08a2c" };
  const y0 = 2019.3, y1 = 2027.6, tw = 900, rh = 38, l = 96, top = 10, NOW = 2026.74;
  const TX = v => l + (v - y0) / (y1 - y0) * (tw - l - 10);
  let s = "";
  for (let y = 2020; y <= 2027; y++) s += `<line class="ax" x1="${TX(y)}" x2="${TX(y)}" y1="${top}" y2="${top + rows.length * rh}"/><text class="yr" x="${TX(y)}" y="${top + rows.length * rh + 16}" text-anchor="middle">${y}</text>`;
  rows.forEach((r, i) => s += `<text class="row" x="0" y="${top + i * rh + rh / 2 + 4}">${r}</text>`);
  TIMELINE.forEach((e, k) => { const i = rows.indexOf(e.row), ln = e.lane || 0, y = top + i * rh + 6 + ln * 15;
    s += `<rect class="seg" data-k="${k}" x="${TX(e.s)}" y="${y}" width="${Math.max(7, TX(e.e) - TX(e.s))}" height="${ln ? 10 : 13}" rx="5" fill="${col[e.row]}" ${ln ? 'opacity=".6"' : ""} data-tip="${e.t}<br>${e.o}"/>`; });
  s += `<line class="now" x1="${TX(NOW)}" x2="${TX(NOW)}" y1="${top - 6}" y2="${top + rows.length * rh + 4}"/><text class="yr" x="${TX(NOW) + 5}" y="${top + 2}" style="fill:var(--pink)">now</text>`;
  const svg = tl.querySelector("svg"); svg.setAttribute("viewBox", `0 0 ${tw} ${top + rows.length * rh + 24}`); svg.innerHTML = s;
  const cap = tl.querySelector(".tl-cap"), fmt = v => { const y = Math.floor(v), m = Math.round((v - y) * 12); return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.min(11, m)] + " " + y; };
  const sh = k => { const e = TIMELINE[k]; cap.innerHTML = `<b>${e.t}</b> · ${e.o}<br><span>${fmt(e.s)} to ${e.e > NOW ? (e.row === "Education" ? "2027" : "now") : fmt(e.e)}</span>`; };
  cap.innerHTML = `<span>Hover or tap any bar.</span>`;
  svg.addEventListener("pointerover", e => { const r = e.target.closest(".seg"); if (r) sh(+r.dataset.k); });
  svg.addEventListener("click", e => { const r = e.target.closest(".seg"); if (r) sh(+r.dataset.k); });
}

/* ---------- skill chips ---------- */
const chips = document.getElementById("chips");
if (chips && window.SKILLMAP) {
  const out = document.getElementById("chipOut"), ks = Object.keys(SKILLMAP);
  chips.innerHTML = ks.map(k => `<button data-k="${k}">${k}</button>`).join("");
  const sel = k => { chips.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.k === k)); const rs = SKILLMAP[k];
    out.innerHTML = rs.length ? rs.map(r => { const p = byRepo(r); return `<a href="work.html#${r}">${p.t}<span>${p.tl}</span></a>`; }).join("") :
      `<p>Mostly used in my jobs and papers: survey design for freelance clients, market research at HKRP and Garuda, and the primary surveys behind my streaming and Tata Motors studies.</p>`; };
  chips.onclick = e => { const b = e.target.closest("button"); if (b) sel(b.dataset.k); };
  sel(ks[1] === "Stata" ? "Causal inference" : ks[0]);
}

/* ---------- research / cv lists ---------- */
const papers = document.getElementById("papers");
if (papers) papers.innerHTML = PAPERS.map(p => `<article class="paper rv"><span class="yr">${p.y}</span><div><h4>${p.t}</h4><p>${p.p}</p><span class="meth">${p.m}</span>${p.repo ? `<a class="repo" href="${GH}${p.repo}" target="_blank" rel="noopener">Replication package ↗</a>` : ""}</div></article>`).join("");
const cvb = document.getElementById("cvblocks");
if (cvb && window.CV) cvb.innerHTML = CV.map(sec => `<div class="cvblock rv"><h3>${sec.h}<span class="ct">${String(sec.n || sec.rows.length).padStart(2, "0")}</span></h3><dl class="cv">${sec.rows.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl></div>`).join("");
const sk = document.getElementById("skills");
if (sk && window.SKILLS) sk.innerHTML = SKILLS.map(([a, b]) => `<div><h5>${a}</h5><p>${b}</p></div>`).join("");

/* ---------- reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
document.querySelectorAll(".rv").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 60 + "ms"; io.observe(el); });
if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView(), 80); }
})();

/* ---------- underline redraws on hover ---------- */
const ul = document.querySelector(".hero h1 .ul");
if (ul && !matchMedia("(prefers-reduced-motion: reduce)").matches) { const pth = ul.querySelector("path"); let busy = false;
  ul.addEventListener("pointerenter", () => { if (busy) return; busy = true;
    pth.style.animation = "none"; void pth.getBoundingClientRect(); pth.style.animation = "scribble .9s ease forwards";
    setTimeout(() => busy = false, 900); }); }
