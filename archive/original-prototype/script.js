// =====================================================
// JAPAN 2028 — THE JOURNEY
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initRain();
  initNavbar();
  initCountdown();
  initCities();
  initTabs();
  initTravelers();
  initBudget();
  initChecklist();
  initPassport();
  initFujiEasterEgg();
  initKonami();
});

/* ---------- LOADER ---------- */
function initLoader(){
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 2600);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hide'), 3200);
}

/* ---------- HERO RAIN CANVAS ---------- */
function initRain(){
  const canvas = document.getElementById('rainCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let drops = [];

  function resize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    drops = Array.from({length: count}, () => makeDrop());
  }
  function makeDrop(){
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: 10 + Math.random() * 18,
      speed: 4 + Math.random() * 6,
      opacity: 0.05 + Math.random() * 0.15
    };
  }
  function tick(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 1;
    drops.forEach(d => {
      ctx.globalAlpha = d.opacity;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.len);
      ctx.stroke();
      d.y += d.speed;
      if(d.y > canvas.height){ d.y = -d.len; d.x = Math.random() * canvas.width; }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  resize();
  window.addEventListener('resize', resize);
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    requestAnimationFrame(tick);
  }
}

/* ---------- NAVBAR ---------- */
function initNavbar(){
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ---------- COUNTDOWN ---------- */
function initCountdown(){
  const target = new Date('2028-04-01T00:00:00');
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-min'),
    s: document.getElementById('cd-sec')
  };
  function update(){
    const diff = target - new Date();
    if(diff <= 0){ els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = '0'; return; }
    const day = Math.floor(diff / 86400000);
    const hr = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const sec = Math.floor((diff % 60000) / 1000);
    els.d.textContent = day;
    els.h.textContent = String(hr).padStart(2,'0');
    els.m.textContent = String(min).padStart(2,'0');
    els.s.textContent = String(sec).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
}

/* ---------- CITIES ---------- */
const CITY_INFO = {
  tokyo: "Neon, velocidade e contraste — bairros como Shibuya e Akihabara nunca dormem.",
  hakone: "Tudo desacelera: montanhas, onsen e o Monte Fuji ao fundo.",
  kyoto: "Mais madeira, mais templos, mais silêncio — a alma tradicional do Japão.",
  nara: "Parques abertos e cervos livres, um respiro entre duas grandes cidades.",
  osaka: "Fica neon e divertido: comida de rua e a energia de Dotonbori.",
  nagoya: "Castelo, Ghibli Park e uma parada tranquila antes da volta."
};

function initCities(){
  const section = document.getElementById('cities');
  const cards = document.querySelectorAll('.city-card');
  const name = document.getElementById('cityDetailName');
  const desc = document.getElementById('cityDetailDesc');
  const days = document.getElementById('cityDetailDays');
  const places = document.getElementById('cityDetailPlaces');
  const budget = document.getElementById('cityDetailBudget');

  function activate(card){
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const theme = card.dataset.theme;
    section.dataset.theme = theme;
    name.textContent = card.querySelector('.city-name').textContent;
    desc.textContent = CITY_INFO[theme] || '';
    days.textContent = card.dataset.days;
    places.textContent = card.dataset.places;
    budget.textContent = card.dataset.budget;
  }

  cards.forEach(card => card.addEventListener('click', () => activate(card)));
  if(cards[0]) activate(cards[0]);
}

/* ---------- TABS ---------- */
function initTabs(){
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });
}

/* ---------- TRAVELERS ---------- */
const TRAVELERS = [
  { name: 'Dani', emoji: '👩', paid: 78, spent: 42000, wishlist: ['Uniqlo','Daiso','Ghibli Store'] },
  { name: 'Baby', emoji: '🐾', paid: 60, spent: 21000, wishlist: ['Pokémon Center','Kirby Café'] },
  { name: 'Claudinho Dinho', emoji: '🧑', paid: 90, spent: 38500, wishlist: ['Apple Store','Yodobashi Camera'] },
  { name: 'Rayo Lightyear', emoji: '⚡', paid: 55, spent: 18000, wishlist: ['Nintendo Store','Mandarake'] },
  { name: 'Tai', emoji: '🧑\u200d🦱', paid: 70, spent: 29500, wishlist: ['Ippudo','Sushiro'] },
  { name: 'Vini', emoji: '👤', paid: 78, spent: 42000, wishlist: ['Nintendo','Sony','Pokémon Center'] }
];

function initTravelers(){
  const grid = document.getElementById('travelerGrid');
  grid.innerHTML = TRAVELERS.map(t => `
    <div class="traveler-card">
      <div class="traveler-top">
        <div class="traveler-avatar">${t.emoji}</div>
        <div>
          <div class="traveler-name">${t.name}</div>
          <div class="traveler-status">${t.paid >= 100 ? 'Paid' : 'In progress'}</div>
        </div>
      </div>
      <div class="traveler-progress"><i data-w="${t.paid}"></i></div>
      <div class="traveler-figures"><span>${t.paid}% pago</span><span>¥${t.spent.toLocaleString('pt-BR')}</span></div>
      <div class="traveler-wishlist">${t.wishlist.map(w => `<span>${w}</span>`).join('')}</div>
    </div>
  `).join('');

  // render person budget bars too
  const maxSpent = Math.max(...TRAVELERS.map(t => t.spent));
  const personBars = document.getElementById('personBars');
  if(personBars){
    personBars.innerHTML = TRAVELERS.map(t => `
      <div class="bar-row">
        <span>${t.name}</span>
        <div class="bar"><i style="--w:${Math.round((t.spent/maxSpent)*100)}%"></i></div>
        <b>¥${t.spent.toLocaleString('pt-BR')}</b>
      </div>
    `).join('');
  }

  // animate progress bars when visible
  const bars = grid.querySelectorAll('.traveler-progress i');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const i = e.target;
        i.style.width = i.dataset.w + '%';
        io.unobserve(i);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
}

/* ---------- BUDGET ---------- */
function initBudget(){
  const figures = document.querySelectorAll('[data-count]');
  const barFill = document.getElementById('budgetBarFill');
  const catBars = document.querySelectorAll('#categoryBars i');
  const personBarsWrap = document.getElementById('personBars');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      io.unobserve(e.target);
      if(e.target.id === 'budget'){
        figures.forEach(f => countUp(f, parseInt(f.dataset.count,10)));
        barFill.style.width = '29%'; // 42000/145000
        catBars.forEach(i => { i.style.width = i.style.getPropertyValue('--w'); });
        if(personBarsWrap) personBarsWrap.querySelectorAll('.bar i').forEach(i => { i.style.width = i.style.getPropertyValue('--w'); });
      }
    });
  }, { threshold: 0.3 });
  const budgetSection = document.getElementById('budget');
  if(budgetSection) io.observe(budgetSection);
}

function countUp(el, target){
  const duration = 1400;
  const start = performance.now();
  function frame(now){
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = 'R$ ' + Math.round(target * eased).toLocaleString('pt-BR');
    if(p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- CHECKLIST ---------- */
const CHECKLIST_ITEMS = [
  'Passaporte','Seguro viagem','Wise / cartão','Dinheiro em espécie','Remédios',
  'Adaptador de tomada','Chip / eSIM','VPN','Documentos digitais','Reservas impressas'
];

function initChecklist(){
  const grid = document.getElementById('checklistGrid');
  const progressLabel = document.getElementById('checklistProgress');
  const stored = JSON.parse(localStorage.getItem('japan2028-checklist') || '{}');

  grid.innerHTML = CHECKLIST_ITEMS.map((item, i) => `
    <button class="check-item ${stored[i] ? 'done' : ''}" data-index="${i}">
      <span class="check-box"></span>
      <span class="check-label">${item}</span>
    </button>
  `).join('');

  function updateProgress(){
    const done = grid.querySelectorAll('.check-item.done').length;
    progressLabel.textContent = `${done} de ${CHECKLIST_ITEMS.length} concluídos`;
  }

  grid.querySelectorAll('.check-item').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('done');
      const state = {};
      grid.querySelectorAll('.check-item').forEach(b => state[b.dataset.index] = b.classList.contains('done'));
      localStorage.setItem('japan2028-checklist', JSON.stringify(state));
      updateProgress();
    });
  });
  updateProgress();
}

/* ---------- PASSPORT / STAMPS ---------- */
const CITIES = [
  { key: 'tokyo', label: 'Tokyo', km: 0 },
  { key: 'hakone', label: 'Hakone', km: 90 },
  { key: 'kyoto', label: 'Kyoto', km: 320 },
  { key: 'nara', label: 'Nara', km: 45 },
  { key: 'osaka', label: 'Osaka', km: 35 },
  { key: 'nagoya', label: 'Nagoya', km: 190 }
];

function initPassport(){
  const grid = document.getElementById('stampGrid');
  const complete = document.getElementById('journeyComplete');
  const kmEl = document.getElementById('jcKm');
  const spentEl = document.getElementById('jcSpent');
  const stored = JSON.parse(localStorage.getItem('japan2028-stamps') || '{}');

  grid.innerHTML = CITIES.map(c => `
    <button class="stamp ${stored[c.key] ? 'done' : ''}" data-key="${c.key}">
      <span class="mark">${stored[c.key] ? '✓' : '柱'}</span>
      <span class="label">${c.label}</span>
    </button>
  `).join('');

  function checkComplete(){
    const state = {};
    let allDone = true;
    grid.querySelectorAll('.stamp').forEach(s => {
      const done = s.classList.contains('done');
      state[s.dataset.key] = done;
      if(!done) allDone = false;
    });
    localStorage.setItem('japan2028-stamps', JSON.stringify(state));
    complete.classList.toggle('unlocked', allDone);
    if(allDone){
      const totalKm = CITIES.reduce((sum,c) => sum + c.km, 0);
      kmEl.textContent = totalKm.toLocaleString('pt-BR') + ' km';
      spentEl.textContent = 'R$ 145.000';
    }
  }

  grid.querySelectorAll('.stamp').forEach(s => {
    s.addEventListener('click', () => {
      s.classList.toggle('done');
      s.querySelector('.mark').textContent = s.classList.contains('done') ? '✓' : '柱';
      checkComplete();
    });
  });
  checkComplete();
}

/* ---------- MT FUJI EASTER EGG ---------- */
function initFujiEasterEgg(){
  const fuji = document.getElementById('fujiEgg');
  const godzilla = document.getElementById('godzillaEgg');
  let clicks = 0;
  fuji.addEventListener('click', () => {
    clicks++;
    fuji.style.transform = `scale(${1 + Math.min(clicks,10)*0.03})`;
    if(clicks >= 10){
      godzilla.classList.add('show');
      setTimeout(() => godzilla.classList.remove('show'), 3500);
      clicks = 0;
      fuji.style.transform = '';
    }
  });
}

/* ---------- KONAMI CODE ---------- */
function initKonami(){
  const sequence = 'konami';
  let buffer = '';
  window.addEventListener('keydown', (e) => {
    if(e.key.length === 1){
      buffer = (buffer + e.key.toLowerCase()).slice(-sequence.length);
      if(buffer === sequence) launchMiniGame();
    }
  });
}

function launchMiniGame(){
  if(document.getElementById('miniGameOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'miniGameOverlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.92)', zIndex: 10000,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem'
  });

  const title = document.createElement('p');
  title.textContent = '🚄 Desvie dos obstáculos no trem-bala! (setas ← →)';
  title.style.cssText = 'color:#fff;font-family:Inter,sans-serif;font-size:.95rem;text-align:center;padding:0 1rem;';

  const canvas = document.createElement('canvas');
  canvas.width = 320; canvas.height = 420;
  canvas.style.cssText = 'border:1px solid rgba(255,255,255,.15);border-radius:12px;background:#0a0a12;';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Fechar';
  closeBtn.style.cssText = 'padding:.6rem 1.4rem;border-radius:100px;background:#fff;color:#050505;font-weight:600;';

  overlay.append(title, canvas, closeBtn);
  document.body.appendChild(overlay);

  const ctx = canvas.getContext('2d');
  let playerX = 150, lane = 1;
  let obstacles = [];
  let score = 0;
  let running = true;
  let frame = 0;

  function keyHandler(e){
    if(e.key === 'ArrowLeft') lane = Math.max(0, lane - 1);
    if(e.key === 'ArrowRight') lane = Math.min(2, lane + 1);
  }
  window.addEventListener('keydown', keyHandler);

  const lanes = [70, 150, 230];

  function loop(){
    if(!running) return;
    frame++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // track lines
    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    [110,190].forEach(x => { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); });

    if(frame % 40 === 0){
      obstacles.push({ lane: Math.floor(Math.random()*3), y: -20 });
    }
    obstacles.forEach(o => { o.y += 5; });
    obstacles = obstacles.filter(o => o.y < canvas.height + 20);

    ctx.fillStyle = '#d62828';
    obstacles.forEach(o => ctx.fillRect(lanes[o.lane]-18, o.y, 36, 20));

    playerX = lanes[lane];
    ctx.fillStyle = '#4fc3f7';
    ctx.fillRect(playerX-16, 360, 32, 24);

    obstacles.forEach(o => {
      if(o.lane === lane && o.y > 335 && o.y < 385){
        running = false;
        ctx.fillStyle = '#fff';
        ctx.font = '20px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Fim de jogo! Pontos: ' + score, canvas.width/2, canvas.height/2);
      }
    });

    if(running){
      score++;
      ctx.fillStyle = '#fff';
      ctx.font = '14px Inter';
      ctx.textAlign = 'left';
      ctx.fillText('Pontos: ' + score, 10, 20);
      requestAnimationFrame(loop);
    }
  }
  requestAnimationFrame(loop);

  closeBtn.addEventListener('click', () => {
    running = false;
    window.removeEventListener('keydown', keyHandler);
    overlay.remove();
  });
}
