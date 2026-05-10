(function() {

var WORKER = 'https://craftihouse-chat.craftihouse.workers.dev';
var PRODUCTS_WORKER = 'https://craftihouseproducts.craftihouse.workers.dev';

// ── STYLES ──
var st = document.createElement('style');
st.textContent = ''
+ '#CH_GF_BTN{position:fixed;bottom:160px;right:90px;background:linear-gradient(135deg,#1C110A,#3D200E);border:2px solid rgba(201,168,76,0.6);border-radius:14px;padding:10px 16px;display:flex;align-items:center;gap:8px;z-index:2147483640;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,0.4);}'
+ '#CH_GF_BTN:hover{border-color:#C9A84C;}'
+ '#CH_GF_BTN .icon{font-size:20px;}'
+ '#CH_GF_BTN .txt{display:flex;flex-direction:column;}'
+ '#CH_GF_BTN .txt span:first-child{font-size:11px;font-weight:bold;color:#E8C97A;font-family:Arial,sans-serif;}'
+ '#CH_GF_BTN .txt span:last-child{font-size:9px;color:rgba(232,201,122,0.5);font-family:Arial,sans-serif;}'
+ '#CH_GF_OVL{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:2147483644;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity 0.3s;}'
+ '#CH_GF_OVL.open{opacity:1;pointer-events:all;}'
+ '#CH_GF_BOX{background:linear-gradient(160deg,#1C110A,#2A160D);border:1px solid rgba(201,168,76,0.25);border-radius:20px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;}'
+ '#CH_GF_BOX::-webkit-scrollbar{width:3px;}'
+ '#CH_GF_BOX::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.3);border-radius:2px;}'
+ '.gf-head{background:linear-gradient(160deg,#1C110A,#3D200E);padding:20px 24px;border-radius:20px 20px 0 0;display:flex;align-items:center;justify-content:space-between;}'
+ '.gf-head h2{font-size:18px;color:#E8C97A;font-family:Georgia,serif;font-weight:normal;}'
+ '.gf-head p{font-size:11px;color:rgba(232,201,122,0.5);font-family:Arial,sans-serif;margin-top:2px;}'
+ '.gf-close{background:transparent;border:1px solid rgba(201,168,76,0.2);border-radius:8px;color:#9A8468;padding:5px 10px;cursor:pointer;font-size:12px;font-family:Arial,sans-serif;}'
+ '.gf-body{padding:24px;}'
+ '.gf-step{display:none;}'
+ '.gf-step.active{display:block;}'
+ '.gf-q{font-size:14px;color:#F2E8D5;font-family:Georgia,serif;margin-bottom:16px;}'
+ '.gf-q span{color:#C9A84C;}'
+ '.gf-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}'
+ '.gf-opt{padding:12px;background:rgba(255,255,255,0.03);border:1.5px solid rgba(201,168,76,0.12);border-radius:10px;cursor:pointer;text-align:center;transition:all 0.2s;}'
+ '.gf-opt:hover{border-color:rgba(201,168,76,0.4);background:rgba(201,168,76,0.05);}'
+ '.gf-opt.sel{background:linear-gradient(135deg,#C9A84C,#8A5E1A);border-color:#C9A84C;}'
+ '.gf-opt .oi{font-size:24px;display:block;margin-bottom:6px;}'
+ '.gf-opt .ol{font-size:12px;color:#F2E8D5;font-family:Arial,sans-serif;font-weight:500;}'
+ '.gf-opt .os{font-size:10px;color:#9A8468;font-family:Arial,sans-serif;margin-top:2px;}'
+ '.gf-opt.sel .ol,.gf-opt.sel .os{color:#1C110A;}'
+ '.gf-prog{display:flex;gap:4px;margin-bottom:20px;}'
+ '.gf-prog-dot{flex:1;height:3px;background:rgba(201,168,76,0.15);border-radius:2px;}'
+ '.gf-prog-dot.done{background:#C9A84C;}'
+ '.gf-nav{display:flex;gap:10px;}'
+ '.gf-next{flex:1;padding:12px;background:linear-gradient(135deg,#C9A84C,#8A5E1A);border:none;border-radius:10px;color:#1C110A;font-size:13px;font-weight:bold;cursor:pointer;font-family:Arial,sans-serif;}'
+ '.gf-next:disabled{opacity:0.3;cursor:not-allowed;}'
+ '.gf-back{padding:12px 18px;background:transparent;border:1px solid rgba(201,168,76,0.15);border-radius:10px;color:#9A8468;font-size:13px;cursor:pointer;font-family:Arial,sans-serif;}'
+ '.gf-loading{text-align:center;padding:40px 24px;}'
+ '.gf-loading .spin{font-size:36px;display:block;margin-bottom:12px;animation:gf-spin 1.5s linear infinite;}'
+ '@keyframes gf-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}'
+ '.gf-loading p{font-size:13px;color:#E8C97A;font-family:Georgia,serif;margin-bottom:6px;}'
+ '.gf-loading small{font-size:11px;color:#9A8468;font-family:Arial,sans-serif;}'
+ '.gf-results{padding:24px;}'
+ '.gf-res-head{text-align:center;margin-bottom:20px;}'
+ '.gf-res-head h3{font-size:16px;color:#E8C97A;font-family:Georgia,serif;font-weight:normal;margin-bottom:4px;}'
+ '.gf-res-head p{font-size:11px;color:#9A8468;font-family:Arial,sans-serif;}'
+ '.gf-cards{display:flex;flex-direction:column;gap:12px;margin-bottom:20px;}'
+ '.gf-card{background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.12);border-radius:12px;padding:14px;display:flex;gap:12px;align-items:flex-start;}'
+ '.gf-card-img{width:70px;height:70px;object-fit:cover;border-radius:8px;flex-shrink:0;}'
+ '.gf-card-img-ph{width:70px;height:70px;background:rgba(201,168,76,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;}'
+ '.gf-card-info{flex:1;min-width:0;}'
+ '.gf-card-name{font-size:12px;color:#F2E8D5;font-family:Arial,sans-serif;font-weight:600;margin-bottom:4px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}'
+ '.gf-card-why{font-size:11px;color:#9A8468;font-family:Arial,sans-serif;margin-bottom:8px;line-height:1.5;}'
+ '.gf-card-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px;}'
+ '.gf-card-price{font-size:14px;color:#C9A84C;font-family:Arial,sans-serif;font-weight:bold;}'
+ '.gf-card-btn{padding:6px 14px;background:linear-gradient(135deg,#C9A84C,#8A5E1A);border:none;border-radius:7px;color:#1C110A;font-size:11px;font-weight:bold;cursor:pointer;font-family:Arial,sans-serif;text-decoration:none;display:inline-block;}'
+ '.gf-restart{width:100%;padding:11px;background:transparent;border:1px solid rgba(201,168,76,0.2);border-radius:10px;color:#9A8468;font-size:12px;cursor:pointer;font-family:Arial,sans-serif;}'
+ '.gf-wa{width:100%;padding:11px;background:rgba(90,168,118,0.1);border:1px solid rgba(90,168,118,0.25);border-radius:10px;color:#5AA876;font-size:12px;cursor:pointer;font-family:Arial,sans-serif;text-decoration:none;display:block;text-align:center;margin-bottom:10px;}'
+ '@media(max-width:480px){#CH_GF_BOX{border-radius:16px;}.gf-opts{grid-template-columns:1fr 1fr;}.gf-opt .oi{font-size:20px;}}';
document.head.appendChild(st);

// ── HTML ──
var wrap = document.createElement('div');
wrap.innerHTML = ''
// Floating button
+ '<div id="CH_GF_BTN">'
+   '<span class="icon">🎁</span>'
+   '<div class="txt"><span>Find the Perfect Gift</span><span>AI-powered recommendations</span></div>'
+ '</div>'
// Overlay
+ '<div id="CH_GF_OVL">'
+   '<div id="CH_GF_BOX">'
+     '<div class="gf-head">'
+       '<div><h2>✦ Gift Finder</h2><p>Answer 3 quick questions — get perfect recommendations</p></div>'
+       '<button class="gf-close" id="gf-close">Close</button>'
+     '</div>'
+     '<div id="gf-content"></div>'
+   '</div>'
+ '</div>';
document.body.appendChild(wrap);

// ── STATE ──
var answers = { who: '', occasion: '', budget: '' };
var step = 0;

var questions = [
  {
    key: 'who',
    q: 'Step 1 of 3 — <span>Who are you shopping for?</span>',
    opts: [
      { icon: '💑', label: 'Partner / Spouse', sub: 'Romantic gift', val: 'partner or spouse' },
      { icon: '👨‍👩‍👧', label: 'Family Member', sub: 'Parent, sibling, child', val: 'family member' },
      { icon: '👫', label: 'Friend', sub: 'Close friend', val: 'friend' },
      { icon: '👔', label: 'Colleague / Boss', sub: 'Professional gift', val: 'colleague or boss' },
      { icon: '🏢', label: 'Corporate Client', sub: 'Business gift', val: 'corporate client' },
      { icon: '🎓', label: 'Graduate', sub: 'Achievement gift', val: 'graduate' }
    ]
  },
  {
    key: 'occasion',
    q: 'Step 2 of 3 — <span>What is the occasion?</span>',
    opts: [
      { icon: '💍', label: 'Wedding', sub: 'Marriage celebration', val: 'wedding' },
      { icon: '🌙', label: 'Eid', sub: 'Eid Al Fitr or Adha', val: 'Eid celebration' },
      { icon: '🎂', label: 'Birthday', sub: 'Birthday celebration', val: 'birthday' },
      { icon: '🎓', label: 'Graduation', sub: 'Academic achievement', val: 'graduation' },
      { icon: '🕌', label: 'Haj / Umrah', sub: 'Spiritual journey', val: 'Haj or Umrah' },
      { icon: '🏠', label: 'Housewarming', sub: 'New home gift', val: 'housewarming' }
    ]
  },
  {
    key: 'budget',
    q: 'Step 3 of 3 — <span>What is your budget?</span>',
    opts: [
      { icon: '💛', label: 'Under $30', sub: 'Up to 110 AED', val: 'under $30' },
      { icon: '💚', label: '$30 – $80', sub: '110 – 300 AED', val: 'between $30 and $80' },
      { icon: '💜', label: '$80 – $200', sub: '300 – 735 AED', val: 'between $80 and $200' },
      { icon: '🖤', label: '$200+', sub: '735+ AED', val: 'over $200' }
    ]
  }
];

// ── RENDER STEP ──
function renderStep() {
  var q = questions[step];
  var html = '<div class="gf-body">';

  // Progress
  html += '<div class="gf-prog">';
  for (var i = 0; i < 3; i++) {
    html += '<div class="gf-prog-dot' + (i <= step ? ' done' : '') + '"></div>';
  }
  html += '</div>';

  html += '<div class="gf-q">' + q.q + '</div>';
  html += '<div class="gf-opts">';
  q.opts.forEach(function(opt) {
    var sel = answers[q.key] === opt.val ? ' sel' : '';
    html += '<div class="gf-opt' + sel + '" data-val="' + opt.val + '" data-key="' + q.key + '">'
      + '<span class="oi">' + opt.icon + '</span>'
      + '<div class="ol">' + opt.label + '</div>'
      + '<div class="os">' + opt.sub + '</div>'
      + '</div>';
  });
  html += '</div>';

  html += '<div class="gf-nav">';
  if (step > 0) html += '<button class="gf-back" id="gf-back">← Back</button>';
  html += '<button class="gf-next" id="gf-next" ' + (!answers[q.key] ? 'disabled' : '') + '>'
    + (step === 2 ? '✦ Find My Perfect Gift' : 'Next →') + '</button>';
  html += '</div></div>';

  document.getElementById('gf-content').innerHTML = html;

  // Bind option clicks
  document.querySelectorAll('.gf-opt').forEach(function(el) {
    el.onclick = function() {
      var key = el.dataset.key;
      var val = el.dataset.val;
      answers[key] = val;
      document.querySelectorAll('.gf-opt').forEach(function(o) { o.classList.remove('sel'); });
      el.classList.add('sel');
      document.getElementById('gf-next').disabled = false;
    };
  });

  var nextBtn = document.getElementById('gf-next');
  if (nextBtn) nextBtn.onclick = function() {
    if (!answers[questions[step].key]) return;
    if (step < 2) { step++; renderStep(); }
    else { findGifts(); }
  };

  var backBtn = document.getElementById('gf-back');
  if (backBtn) backBtn.onclick = function() { step--; renderStep(); };
}

// ── FIND GIFTS ──
function findGifts() {
  document.getElementById('gf-content').innerHTML = ''
    + '<div class="gf-loading">'
    + '<span class="spin">✦</span>'
    + '<p>Finding perfect gifts for you...</p>'
    + '<small>Layla is searching 9000+ products</small>'
    + '</div>';

  // First fetch some products to give Claude real data
  fetch(PRODUCTS_WORKER + '/products?limit=50&include=images&is_visible=true', {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  }).then(function(r) { return r.json(); })
  .then(function(d) {
    var products = d.data || [];
    var productList = products.map(function(p) {
      return p.name + ' ($' + p.price + ')';
    }).join('\n');

    var prompt = 'You are Layla, gift advisor for Craftihouse Dubai. A customer needs gift help.\n\n'
      + 'Customer details:\n'
      + '- Shopping for: ' + answers.who + '\n'
      + '- Occasion: ' + answers.occasion + '\n'
      + '- Budget: ' + answers.budget + '\n\n'
      + 'Available products from our store:\n' + productList + '\n\n'
      + 'Recommend exactly 3 products from the list above that best match. For each product respond in this exact JSON format:\n'
      + '[{"name":"exact product name","price":"$XX","why":"one sentence why this is perfect","emoji":"relevant emoji"}]\n'
      + 'Output ONLY the JSON array, nothing else.';

    return fetch(WORKER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 600,
        system: 'You are a gift recommendation expert for Craftihouse Dubai. Always respond with valid JSON only.',
        messages: [{ role: 'user', content: prompt }]
      })
    });
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    var text = d.content && d.content[0] ? d.content[0].text : '';
    var recs = [];
    try {
      var clean = text.replace(/"""json|"""/g, '').trim();
      recs = JSON.parse(clean);
    } catch(e) {
      recs = fallbackRecs();
    }
    renderResults(recs);
  })
  .catch(function() {
    renderResults(fallbackRecs());
  });
}

// ── FALLBACK RECOMMENDATIONS ──
function fallbackRecs() {
  return [
    { name: 'Custom Arabic Calligraphy on Paper', price: '$20', why: 'A deeply personal handwritten gift perfect for any occasion.', emoji: '✍️' },
    { name: 'Personalized Ghawa Cup with Arabic Calligraphy', price: '$18', why: 'A meaningful UAE cultural gift they will use and cherish.', emoji: '☕' },
    { name: 'Handmade Backgammon Set', price: '$99', why: 'A luxurious handcrafted game set that makes an impressive gift.', emoji: '🎲' }
  ];
}

// ── RENDER RESULTS ──
function renderResults(recs) {
  var waMsg = encodeURIComponent('Hi Craftihouse! I used the Gift Finder and need help ordering. I am looking for a gift for ' + answers.who + ' for ' + answers.occasion + ' with budget ' + answers.budget + '.');

  var html = '<div class="gf-results">'
    + '<div class="gf-res-head">'
    + '<h3>✦ Your Perfect Gift Recommendations</h3>'
    + '<p>Handpicked by Layla for ' + answers.occasion + ' · ' + answers.budget + '</p>'
    + '</div>'
    + '<div class="gf-cards">';

  recs.forEach(function(rec) {
    var searchUrl = 'https://craftihouse.com/search.php?search_query=' + encodeURIComponent(rec.name.split(' ').slice(0, 4).join(' '));
    html += '<div class="gf-card">'
      + '<div class="gf-card-img-ph">' + (rec.emoji || '🎁') + '</div>'
      + '<div class="gf-card-info">'
      + '<div class="gf-card-name">' + rec.name + '</div>'
      + '<div class="gf-card-why">' + rec.why + '</div>'
      + '<div class="gf-card-bottom">'
      + '<span class="gf-card-price">From ' + rec.price + '</span>'
      + '<a href="' + searchUrl + '" class="gf-card-btn" target="_blank">View Product</a>'
      + '</div>'
      + '</div>'
      + '</div>';
  });

  html += '</div>'
    + '<a href="https://wa.me/971558513794?text=' + waMsg + '" target="_blank" class="gf-wa">💬 Get Personal Help on WhatsApp</a>'
    + '<button class="gf-restart" id="gf-restart">← Start Over</button>'
    + '</div>';

  document.getElementById('gf-content').innerHTML = html;

  var restartBtn = document.getElementById('gf-restart');
  if (restartBtn) restartBtn.onclick = function() {
    answers = { who: '', occasion: '', budget: '' };
    step = 0;
    renderStep();
  };
}

// ── OPEN / CLOSE ──
function openFinder() {
  answers = { who: '', occasion: '', budget: '' };
  step = 0;
  renderStep();
  document.getElementById('CH_GF_OVL').classList.add('open');
}

function closeFinder() {
  document.getElementById('CH_GF_OVL').classList.remove('open');
}

document.getElementById('CH_GF_BTN').onclick = openFinder;
document.getElementById('gf-close').onclick = closeFinder;
document.getElementById('CH_GF_OVL').onclick = function(e) {
  if (e.target.id === 'CH_GF_OVL') closeFinder();
};

// Show proactive bubble after 20 seconds
setTimeout(function() {
  var btn = document.getElementById('CH_GF_BTN');
  if (btn) {
    btn.style.animation = 'none';
    var pulse = document.createElement('div');
    pulse.style.cssText = 'position:absolute;top:-6px;right:-6px;width:14px;height:14px;background:#C9A84C;border-radius:50%;border:2px solid #1C110A;';
    btn.style.position = 'relative';
    btn.appendChild(pulse);
  }
}, 20000);

})();
