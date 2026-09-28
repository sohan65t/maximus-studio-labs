const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Scroll-reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
}), { threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

// Scroll progress bar
const bar = $(".progress");
const onScroll = () => {
  const h = document.documentElement;
  bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// Active nav link
const links = $$("nav a");
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("section[id]").forEach(s => spy.observe(s));

// Cursor glow (smoothed) + hero parallax
const glow = $(".cursor-glow");
let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my;
addEventListener("mousemove", e => {
  mx = e.clientX; my = e.clientY;
  const x = (mx / innerWidth - .5) * 16, y = (my / innerHeight - .5) * 16;
  $(".hero-visual")?.style.setProperty("translate", `${x}px ${y}px`);
  $$(".float-card").forEach((c, i) => c.style.setProperty("translate", `${x * (i ? -1.6 : 1.6)}px ${y * 1.6}px`));
});
(function loop() {
  gx += (mx - gx) * .08; gy += (my - gy) * .08;
  glow.style.transform = `translate(${gx}px,${gy}px)`;
  requestAnimationFrame(loop);
})();

// Card spotlight
$$(".app-card").forEach(c => c.addEventListener("mousemove", e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", `${e.clientX - r.left}px`);
  c.style.setProperty("--my", `${e.clientY - r.top}px`);
}));
