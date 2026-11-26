/* ======================= INTERFAZ ======================= */
const EXBYID = {};
EX.forEach(e => {
  if (!e.parts) e.parts = [{ k: e.k || 'num', a: e.a, v: e.v, traps: e.traps, alt: e.alt, test: e.test, testMsg: e.testMsg, show: e.show, vars: e.vars, o: e.o, w: e.w }];
  e.parts.forEach(p => { if (!p.k) p.k = p.o ? 'opt' : 'num'; });
  EXBYID[e.id] = e;
});
const SRC_LABEL = e => e.src === 'hoja' ? 'Hoja #' + e.n : e.src === 'diap' ? 'Diapositiva' : e.src === 'libro' ? 'Libro' : e.src === 'examen' ? (e.k === 'explica' ? 'Teoría · tipo examen' : 'Tipo examen') : e.src === 'teoria' ? 'Teoría' : 'Extra';
const PH = { num: 'Número o expresión, p. ej. C(10,3)', set: 'Conjunto, p. ej. {a, c}  o  ∅', val: 'Un valor', expr: 'Expresión, p. ej. (n+1)^3' };
const solved = store.get('solved', {});
const tries = store.get('tries', {});
const quizAns = store.get('quiz', {});
const skipped = store.get('skipped', {});
let freeMode = !!store.get('free', false);
let exam = store.get('exam', null);
const peek = {};
let current = 'inicio';

/* ---------- Widgets ---------- */
function calcHTML(expr, tag){
  return '<div class="calc-bar"><span class="calc-tag">' + (tag || 'Calculadora') + '</span><span class="sp"></span><button class="btn sm" type="button" data-calc>Calcular</button></div>' +
    '<div class="calc-row"><input class="calc-in" value="' + esc(expr || '') + '" spellcheck="false" autocomplete="off" aria-label="Expresión para calcular"></div><div class="calc-out" aria-live="polite"></div>';
}
function runCalc(box){
  const inp = $('.calc-in', box), out = $('.calc-out', box); const src = inp.value.trim();
  if (!src) { out.innerHTML = ''; return null; }
  const r = tryEval(src);
  if (r.err) { out.innerHTML = '<span class="er">' + esc(r.err) + '</span>'; return null; }
  const ap = approxQ(r.q);
  out.innerHTML = '<span class="eq">= ' + fmtQ(r.q) + '</span>' + (ap ? '<span class="ap">' + ap + '</span>' : '');
  return r.q;
}
function mountCalc(el){
  el.innerHTML = calcHTML(el.dataset.e, el.dataset.tag);
  const inp = $('.calc-in', el);
  inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); runCalc(el); } });
  $('[data-calc]', el).addEventListener('click', () => runCalc(el));
  runCalc(el);
}
function mountTree(el){
  const spec = TREES[el.dataset.tree](); const n = leaves(spec.root);
  el.className = 'fig';
  el.innerHTML = '<div class="fig-wrap">' + treeSVG(spec) + '</div><p class="fig-cap">' + esc(spec.cap || '') + ' <b>Total: ' + n + ' hojas.</b></p>';
}
function mountArrows(el){
  const keys = el.dataset.arrows.split(' ');
  el.className = 'figs';
  el.innerHTML = keys.map(k => { const s = ARROWS[k]; return '<div class="fig"><div class="fig-wrap">' + arrowSVG(s) + '</div>' + (s.cap ? '<p class="fig-cap">' + s.cap + '</p>' : '') + '</div>'; }).join('');
}
const EN_MODES = {
  P: 'Importa el orden, sin repetir · P(n, r)',
  C: 'No importa el orden, sin repetir · C(n, r)',
  VR: 'Importa el orden, con repetición · nʳ',
  CR: 'No importa el orden, con repetición · CR(n, r)',
  A: 'Ordenar todas las letras (con repetidas)'
};
function parseItems(s, keepDup){
  s = String(s || '').trim(); let arr = /[,\s]/.test(s) ? s.split(/[,\s]+/) : s.split('');
  arr = arr.map(x => x.trim()).filter(Boolean);
  return keepDup ? arr : Array.from(new Set(arr));
}
function enumRun(el){
  const mode = $('[data-en=mode]', el).value; const rIn = $('[data-en=r]', el); rIn.disabled = mode === 'A';
  const items = parseItems($('[data-en=items]', el).value, mode === 'A');
  const n = items.length, r = Math.max(0, Math.min(12, parseInt(rIn.value, 10) || 0));
  const res = $('.en-res', el);
  if (!n) { res.innerHTML = '<p class="small">Escribe algunos elementos.</p>'; return; }
  let count, formula, list = null;
  const N = BigInt(n), R = BigInt(r);
  if (mode === 'P') { count = permB(N, R); formula = 'P(' + n + ', ' + r + ') = ' + n + '!/' + (n - r >= 0 ? (n - r) + '!' : '—'); }
  else if (mode === 'C') { count = combB(N, R); formula = 'C(' + n + ', ' + r + ') = ' + n + '!/(' + r + '!·' + Math.max(0, n - r) + '!)'; }
  else if (mode === 'VR') { count = N ** R; formula = n + sup(r); }
  else if (mode === 'CR') { count = r === 0 ? 1n : combB(N + R - 1n, R); formula = 'CR(' + n + ', ' + r + ') = C(' + (n + r - 1) + ', ' + r + ')'; }
  else {
    const freq = {}; items.forEach(x => { freq[x] = (freq[x] || 0) + 1; });
    const rep = Object.keys(freq).filter(k => freq[k] > 1);
    let d = 1n; rep.forEach(k => { d *= factB(BigInt(freq[k])); }); count = factB(N) / d;
    formula = n + '!' + (rep.length ? '/(' + rep.map(k => freq[k] + '!').join('·') + ')' : '') + (rep.length ? '   (se repiten: ' + rep.map(k => k + ' ×' + freq[k]).join(', ') + ')' : '');
  }
  if (count <= 3000n && n <= 12) {
    list = mode === 'P' ? permsA(items, r) : mode === 'C' ? combsA(items, r) : mode === 'VR' ? powA(items, r) : mode === 'CR' ? multisetCombsA(items, r) : uniquePermsA(items);
  }
  const sepO = mode === 'C' || mode === 'CR';
  const show = list ? list.slice(0, 400).map(p => '<span>' + esc(sepO ? '{' + p.join(',') + '}' : (p.every(x => x.length === 1) ? p.join('') : '(' + p.join(',') + ')')) + '</span>').join('') : '';
  res.innerHTML = '<p class="en-count">' + esc(formula) + ' = <b>' + fmtQ(mkQ(count)) + '</b> ' + (count === 1n ? 'caso' : 'casos') + '</p>' +
    (list ? '<div class="en-list">' + show + (list.length > 400 ? '<span>… y ' + groupDigits(String(list.length - 400)) + ' más</span>' : '') + '</div>' : '<p class="small">Son demasiados para listarlos; aquí solo va la cuenta.</p>') +
    (sepO ? '<p class="small">Las llaves { } indican que el orden no importa: {A,B} y {B,A} son el mismo.</p>' : '');
}
function mountEnum(el){
  const mode = el.dataset.mode || 'P';
  el.className = 'wg';
  el.innerHTML = '<div class="wg-h"><h3>Enumerador</h3><span class="calc-tag">Lista todos los casos</span></div>' +
    '<div class="wg-row"><label class="fld">Elementos<input data-en="items" value="' + esc(el.dataset.items || 'A,B,C,D') + '" size="14" spellcheck="false" autocomplete="off"></label>' +
    '<label class="fld">Cuántos tomas (r)<input data-en="r" type="number" min="0" max="12" value="' + esc(el.dataset.r || '2') + '" style="width:6em"></label>' +
    '<label class="fld">Tipo de conteo<select data-en="mode">' + Object.keys(EN_MODES).map(k => '<option value="' + k + '"' + (k === mode ? ' selected' : '') + '>' + EN_MODES[k] + '</option>').join('') + '</select></label></div><div class="en-res" aria-live="polite"></div>';
  $$('[data-en]', el).forEach(x => x.addEventListener('input', () => enumRun(el)));
  enumRun(el);
}
function mountFB(el){
  const XS = ['a', 'b', 'c', 'd', 'e'], YS = ['1', '2', '3', '4', '5'];
  const st = { nx: 3, ny: 4, m: { a: '2', b: '4', c: '2', d: '1', e: '3' } };
  el.className = 'wg';
  el.innerHTML = '<div class="wg-h"><h3>Arma tu función</h3><span class="calc-tag">f : X → Y</span></div>' +
    '<div class="wg-row"><label class="fld">Elementos de X<select data-fb="nx">' + [1, 2, 3, 4, 5].map(k => '<option' + (k === st.nx ? ' selected' : '') + '>' + k + '</option>').join('') + '</select></label>' +
    '<label class="fld">Elementos de Y<select data-fb="ny">' + [1, 2, 3, 4, 5].map(k => '<option' + (k === st.ny ? ' selected' : '') + '>' + k + '</option>').join('') + '</select></label></div>' +
    '<div class="fb-grid" data-fb-map></div><div class="fb-cols"><div class="fig"><div class="fig-wrap" data-fb-fig></div></div><div class="verdicts" data-fb-v></div></div>';
  const paint = () => {
    const X = XS.slice(0, st.nx), Y = YS.slice(0, st.ny);
    X.forEach(x => { if (Y.indexOf(st.m[x]) < 0) st.m[x] = Y[0]; });
    $('[data-fb-map]', el).innerHTML = X.map(x => '<label>f(' + x + ') =<select data-x="' + x + '">' + Y.map(y => '<option' + (st.m[x] === y ? ' selected' : '') + '>' + y + '</option>').join('') + '</select></label>').join('');
    $$('[data-x]', el).forEach(s => s.addEventListener('change', () => { st.m[s.dataset.x] = s.value; paint(); }));
    $('[data-fb-fig]', el).innerHTML = arrowSVG({ sets: [{ n: 'X', e: X }, { n: 'Y', e: Y }], maps: [{ f: 0, t: 1, l: 'f', p: X.map(x => [x, st.m[x]]) }], colw: 130 });
    const img = X.map(x => st.m[x]); const rango = Y.filter(y => img.indexOf(y) >= 0);
    const dup = Y.map(y => X.filter(x => st.m[x] === y)).filter(g => g.length > 1);
    const miss = Y.filter(y => rango.indexOf(y) < 0);
    const iny = !dup.length, sob = !miss.length;
    const yes = '<b class="y">Sí.</b> ', no = '<b class="n">No.</b> ';
    $('[data-fb-v]', el).innerHTML =
      '<div>Rango: {' + rango.join(', ') + '}</div>' +
      '<div>¿Inyectiva? ' + (iny ? yes + 'Ningún elemento de Y recibe dos flechas.' : no + dup.map(g => g.join(' y ') + ' van al mismo ' + st.m[g[0]]).join('; ') + '.') + '</div>' +
      '<div>¿Sobreyectiva? ' + (sob ? yes + 'Todos los de Y reciben al menos una flecha.' : no + 'Nadie llega a ' + miss.join(', ') + '.') + '</div>' +
      '<div>¿Biyectiva? ' + (iny && sob ? yes + 'Es inyectiva y sobreyectiva: tiene inversa.' : no + 'Le falta ser ' + (!iny && !sob ? 'inyectiva y sobreyectiva' : !iny ? 'inyectiva' : 'sobreyectiva') + '.') + '</div>' +
      '<div class="small">Con |X| = ' + st.nx + ' y |Y| = ' + st.ny + ' existen ' + st.ny + sup(st.nx) + ' = ' + Math.pow(st.ny, st.nx) + ' funciones; ' + (st.nx <= st.ny ? fmtQ(Qn(permB(BigInt(st.ny), BigInt(st.nx)))) : '0') + ' son inyectivas' + (st.nx === st.ny ? ' y ' + fmtQ(Qn(factB(BigInt(st.nx)))) + ' biyectivas' : '') + '.</div>';
  };
  $('[data-fb=nx]', el).addEventListener('change', ev => { st.nx = +ev.target.value; paint(); });
  $('[data-fb=ny]', el).addEventListener('change', ev => { st.ny = +ev.target.value; paint(); });
  paint();
}
function mountWidgets(root){
  $$('.calc[data-e]', root).forEach(el => { if (!el.dataset.on) { el.dataset.on = 1; mountCalc(el); } });
  $$('[data-tree]', root).forEach(el => { if (!el.dataset.on) { el.dataset.on = 1; mountTree(el); } });
  $$('[data-arrows]', root).forEach(el => { if (!el.dataset.on) { el.dataset.on = 1; mountArrows(el); } });
  $$('[data-enum]', root).forEach(el => { if (!el.dataset.on) { el.dataset.on = 1; mountEnum(el); } });
  $$('[data-fb]', root).forEach(el => { if (!el.dataset.on && el.tagName === 'DIV' && !el.closest('.wg')) { el.dataset.on = 1; mountFB(el); } });
}

/* ---------- Ejercicios ---------- */
function partHTML(e, p, i, pre){
  const inId = pre + 'in-' + e.id + '-' + i;
  let h = '<div class="pt" data-i="' + i + '">' + (p.l ? '<label class="pt-l"' + (p.k === 'opt' ? '' : ' for="' + inId + '"') + '>' + p.l + '</label>' : '');
  if (p.k === 'opt') h += '<div class="qq-o" role="group">' + p.o.map((o, j) => '<button class="opt" type="button" data-pj="' + j + '">' + o + '</button>').join('') + '</div>';
  else h += '<div class="pt-in"><input class="ans" id="' + inId + '" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="' + esc(p.ph || PH[p.k] || PH.num) + '"' + (p.l ? '' : ' aria-label="Tu respuesta"') + '><span class="pt-st" aria-hidden="true"></span></div><div class="pt-prev"></div>';
  return h + '<div class="pt-msg" aria-live="polite"></div></div>';
}
function explicaCard(e, pre, ok){
  return '<article class="ex explica' + (ok ? ' solved' : '') + '" id="' + pre + 'ej-' + e.id + '" data-id="' + e.id + '" data-pre="' + pre + '">' +
    '<div class="ex-h"><span class="ex-id">' + e.id + '</span><h3>' + e.t + '</h3><span class="chip teo">' + SRC_LABEL(e) + '</span><span class="chip done"' + (ok ? '' : ' hidden') + '>Resuelto</span></div>' +
    '<div class="ex-q">' + e.q + '</div>' +
    '<div class="parts"><div class="pt" data-i="0"><label class="pt-l" for="' + pre + 'in-' + e.id + '-0">Tu explicación</label><textarea class="ans long" id="' + pre + 'in-' + e.id + '-0" rows="6" spellcheck="true" placeholder="Escríbela como en el examen: qué cuenta, qué regla usas y a qué llegas."></textarea></div></div>' +
    '<div class="ex-actions"><button class="btn primary" type="button" data-act="cmp">Comparar con la respuesta modelo</button></div>' +
    '<div class="ex-out"></div></article>';
}
function explicaOut(e, card){
  const c = store.get(card.dataset.dk, {}).c || [];
  card.querySelector('.ex-out').innerHTML = '<div class="solbox"><p class="eyebrow">Respuesta modelo</p><div class="prose">' + e.sol + '</div></div>' +
    '<div class="checklist"><p class="small"><b>Revisa tu explicación.</b> Marca cada punto que sí dijiste, aunque sea con otras palabras. Si te faltó alguno, agrégalo arriba con tus palabras y márcalo.</p>' +
    e.puntos.map((t, i) => '<label class="ck"><input type="checkbox" data-ck="' + i + '"' + (c[i] ? ' checked' : '') + '><span>' + t + '</span></label>').join('') + '</div><div class="ck-msg" aria-live="polite"></div>';
  paintCk(e, card);
}
function paintCk(e, card){
  const c = store.get(card.dataset.dk, {}).c || []; const n = e.puntos.filter((t, i) => c[i]).length; const m = card.querySelector('.ck-msg'); if (!m) return;
  m.innerHTML = n === e.puntos.length ? '<div class="msg ok"><span class="tag">Completo</span>Tu explicación tiene todos los puntos. Así la contestarías en el examen.</div>' : '<div class="msg info"><span class="tag">' + n + ' de ' + e.puntos.length + '</span>Cuando tu explicación tenga todos los puntos, el ejercicio cuenta como resuelto.</div>';
}
document.addEventListener('change', ev => {
  const b = ev.target.closest('.ex.explica input[data-ck]'); if (!b) return;
  const card = b.closest('.ex'); const e = EXBYID[card.dataset.id]; const d = store.get(card.dataset.dk, {});
  d.c = e.puntos.map((t, i) => !!(card.querySelector('input[data-ck="' + i + '"]') || {}).checked); store.set(card.dataset.dk, d);
  if (d.c.every(Boolean)) {
    solved[e.id] = true; store.set('solved', solved);
    if (card.dataset.pre === 'exam-' && exam) { exam.solvedEx[e.id] = true; store.set('exam', exam); }
    refreshProgress();
  }
  paintCk(e, card);
});
function exCard(e, pre){
  const ok = pre === 'exam-' ? !!(exam && exam.solvedEx[e.id]) : !!solved[e.id];
  if (e.k === 'explica') return explicaCard(e, pre, ok);
  return '<article class="ex' + (ok ? ' solved' : '') + '" id="' + pre + 'ej-' + e.id + '" data-id="' + e.id + '" data-pre="' + pre + '">' +
    '<div class="ex-h"><span class="ex-id">' + e.id + '</span><h3>' + e.t + '</h3><span class="chip">' + SRC_LABEL(e) + '</span>' + (e.errata ? '<span class="chip warn">La hoja trae un error</span>' : '') + '<span class="chip done"' + (ok ? '' : ' hidden') + '>Resuelto</span></div>' +
    '<div class="ex-q">' + e.q + '</div>' +
    '<div class="parts">' + e.parts.map((p, i) => partHTML(e, p, i, pre)).join('') + '</div>' +
    '<div class="ex-actions"><button class="btn primary" type="button" data-act="check">Revisar</button>' + (e.pista ? '<button class="btn" type="button" data-act="hint">Pista</button>' : '') + '<button class="btn" type="button" data-act="sol">Solución</button></div>' +
    (e.pista ? '<div class="msg info" data-hint hidden><span class="tag">Pista</span>' + e.pista + '</div>' : '') +
    '<div class="ex-out"></div></article>';
}
function partVal(card, i){
  const pt = card.querySelector('.pt[data-i="' + i + '"]');
  const inp = pt.querySelector('.ans'); return inp ? inp.value : pt.dataset.v;
}
function preview(inp){
  const pt = inp.closest('.pt'); const card = inp.closest('.ex'); const e = EXBYID[card.dataset.id]; const p = e.parts[+pt.dataset.i];
  const prev = $('.pt-prev', pt); if (!prev) return; prev.textContent = '';
  if (p.k !== 'num' || !inp.value.trim()) return;
  const r = tryEval(inp.value);
  if (r.q && !/^[\d,.\s−-]+$/.test(inp.value.trim())) prev.textContent = '= ' + fmtQ(r.q) + (approxQ(r.q) ? '  ' + approxQ(r.q) : '');
}
function mountExercises(host, ids, pre, draftPrefix){
  pre = pre || ''; draftPrefix = draftPrefix || 'draft:';
  host.insertAdjacentHTML('beforeend', ids.map(id => exCard(EXBYID[id], pre)).join(''));
  ids.forEach(id => {
    const e = EXBYID[id]; const card = document.getElementById(pre + 'ej-' + id);
    card.dataset.dk = draftPrefix + id;
    const saved = store.get(draftPrefix + id, {});
    e.parts.forEach((p, i) => {
      const pt = card.querySelector('.pt[data-i="' + i + '"]');
      if (p.k === 'opt') { if (saved[i] !== undefined) { pt.dataset.v = saved[i]; paintOpt(pt); } return; }
      const inp = pt.querySelector('.ans'); inp.value = saved[i] || ''; preview(inp);
      let t = null;
      inp.addEventListener('input', () => { preview(inp); pt.classList.remove('ok', 'bad'); const st = $('.pt-st', pt); if (st) st.textContent = ''; clearTimeout(t); t = setTimeout(() => saveDraft(card), 300); });
      if (e.k !== 'explica') inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); onAct(e, card, 'check'); } });
    });
    if (e.k === 'explica' && saved.c) explicaOut(e, card);
    mountWidgets(card);
  });
}
function saveDraft(card){
  const e = EXBYID[card.dataset.id]; const d = {}; const old = store.get(card.dataset.dk, {}); if (old.c) d.c = old.c;
  e.parts.forEach((p, i) => { const v = partVal(card, i); if (v !== undefined && v !== '') d[i] = v; });
  store.set(card.dataset.dk, d);
}
function paintOpt(pt){ $$('.opt', pt).forEach(b => b.classList.toggle('sel', String(b.dataset.pj) === String(pt.dataset.v))); }
document.addEventListener('click', ev => {
  const o = ev.target.closest('.pt .opt[data-pj]');
  if (o) { const pt = o.closest('.pt'); pt.dataset.v = o.dataset.pj; pt.classList.remove('ok', 'bad'); $('.pt-msg', pt).textContent = ''; $$('.opt', pt).forEach(b => b.classList.remove('right', 'wrong')); paintOpt(pt); saveDraft(o.closest('.ex')); return; }
  const b = ev.target.closest('.ex [data-act]'); if (!b) return;
  const card = b.closest('.ex'); const e = EXBYID[card.dataset.id]; if (e) onAct(e, card, b.dataset.act);
});
function ansText(p){
  if (p.show) return p.show;
  if (p.k === 'opt') return p.o[p.a].replace(/<[^>]+>/g, '');
  if (p.k === 'num') { const v = fmtQ(evalExpr(p.a)); return /^[\d\s]+$/.test(p.a) ? v : p.a.replace(/,/g, ', ').replace(/\s+/g, ' ').replace(/\*/g, '·') + ' = ' + v; }
  return p.a;
}
function partTag(p){
  if (!p.l) return '';
  const t = p.l.replace(/<[^>]+>/g, '').trim(); const m = /^([A-Za-z0-9]{1,2})[).]\s/.exec(t);
  if (m && !/[=?]\s*$/.test(t)) return m[1] + ')';
  return /=\s*$/.test(t) ? t.replace(/\s*=\s*$/, '') + ' =' : (m ? m[1] + ')' : t.replace(/[:?]\s*$/, '') + ':');
}
function solHTML(e){
  return '<div class="solbox"><p class="eyebrow">Solución</p><div class="sol-ans">' + e.parts.map(p => '<div>' + (p.l ? '<b>' + esc(partTag(p)) + '</b> ' : '') + esc(ansText(p)) + '</div>').join('') + '</div>' + (e.sol ? '<div class="prose">' + e.sol + '</div>' : '') + '</div>';
}
function onAct(e, card, act){
  const out = card.querySelector('.ex-out'); const inExam = card.dataset.pre === 'exam-';
  if (act === 'hint') { const h = card.querySelector('[data-hint]'); if (h) h.hidden = !h.hidden; return; }
  if (act === 'cmp') {
    if (partVal(card, 0).trim().length < 40) { out.innerHTML = '<div class="msg info"><span class="tag">Primero escribe</span>Escribe tu explicación (un par de frases por lo menos) antes de ver la respuesta modelo. Así practicas lo que harás en el examen.</div>'; return; }
    tries[e.id] = (tries[e.id] || 0) + 1; store.set('tries', tries);
    if (inExam && exam) { exam.tried = exam.tried || {}; exam.tried[e.id] = true; store.set('exam', exam); }
    saveDraft(card); const d = store.get(card.dataset.dk, {}); if (!d.c) { d.c = e.puntos.map(() => false); store.set(card.dataset.dk, d); }
    explicaOut(e, card); return;
  }
  if (act === 'sol') {
    if (!tries[e.id] && !(inExam && exam && exam.tried && exam.tried[e.id])) { out.innerHTML = '<div class="msg info"><span class="tag">Primero intenta</span>La solución se abre después de tu primer «Revisar». Si no sabes por dónde empezar, abre la pista.</div>'; return; }
    if (inExam && exam && !exam.solvedEx[e.id]) { exam.viewed = exam.viewed || {}; exam.viewed[e.id] = true; store.set('exam', exam); }
    out.innerHTML = (inExam && exam && !exam.solvedEx[e.id] ? '<div class="msg info"><span class="tag">Ojo</span>Viste la solución: este ejercicio ya no cuenta para el examen. Genera otro examen para intentarlo limpio.</div>' : '') + solHTML(e);
    mountWidgets(out);
    return;
  }
  if (act !== 'check') return;
  tries[e.id] = (tries[e.id] || 0) + 1; store.set('tries', tries);
  if (inExam && exam) { exam.tried = exam.tried || {}; exam.tried[e.id] = true; store.set('exam', exam); }
  saveDraft(card);
  let nOk = 0, nEmpty = 0, altMsg = [];
  e.parts.forEach((p, i) => {
    const pt = card.querySelector('.pt[data-i="' + i + '"]'); let r;
    try { r = checkPart(p, partVal(card, i)); } catch (err) { r = { ok: false, msg: 'Algo falló al revisar: ' + err.message }; }
    pt.classList.toggle('ok', r.ok); pt.classList.toggle('bad', !r.ok && !r.empty);
    const st = $('.pt-st', pt); if (st) st.textContent = r.ok ? '✓' : r.empty ? '' : '✗';
    if (p.k === 'opt') $$('.opt', pt).forEach(b => { const j = +b.dataset.pj; b.classList.toggle('right', r.ok && j === p.a); b.classList.toggle('wrong', !r.ok && String(j) === String(pt.dataset.v)); });
    $('.pt-msg', pt).innerHTML = r.ok ? (r.alt ? esc(r.alt) : (p.k === 'opt' && p.w ? esc(p.w) : '')) : esc(r.msg || '');
    if (r.alt) altMsg.push(r.alt);
    if (r.ok) nOk++; if (r.empty) nEmpty++;
  });
  const all = nOk === e.parts.length;
  if (all) {
    solved[e.id] = true; store.set('solved', solved);
    if (inExam && exam && !(exam.viewed && exam.viewed[e.id])) { exam.solvedEx[e.id] = true; store.set('exam', exam); }
    refreshProgress();
    out.innerHTML = '<div class="msg ok"><span class="tag">Correcto</span>' + (e.parts.length > 1 ? 'Todas las partes están bien.' : 'Es el resultado.') + (inExam && exam && exam.viewed && exam.viewed[e.id] ? ' (No cuenta para el examen porque viste la solución.)' : '') + ' Abre «Solución» para comparar tu razonamiento.</div>';
  } else {
    out.innerHTML = '<div class="msg err"><span class="tag">Todavía no</span>' + (e.parts.length > 1 ? nOk + ' de ' + e.parts.length + ' partes bien' + (nEmpty ? ' (' + plural(nEmpty, 'sin responder', 'sin responder') + ')' : '') + '. Revisa las marcadas con ✗.' : 'Revisa el mensaje de arriba.') + '</div>';
  }
}

/* ---------- Lecciones ---------- */
const LESSONS = [], LBYID = {}, QBYID = {};
const hashStr = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
MODULES.forEach((m, mi) => m.lessons.forEach((L, li) => {
  L.mod = m; L.mi = mi; L.li = li; L.quiz = L.quiz || []; L.ex = L.ex || []; L.mas = L.mas || []; L.pool = L.pool || [];
  L.quiz.concat(L.pool).forEach(q => { q.id = L.id + '-' + hashStr(q.q); q.L = L; QBYID[q.id] = q; });
  LESSONS.push(L); LBYID[L.id] = L;
}));
const ROUTE = LESSONS.filter(L => !L.optional);

/* ---------- Tiempo estimado ---------- */
const T_MIN = { wpm: 170, widget: 0.5, q: 0.5, examQ: 0.6, opt: 0.4, set: 0.6, val: 0.6, num: 1, expr: 1, explica: 3 };
const exMin = id => { const e = EXBYID[id]; return e.k === 'explica' ? T_MIN.explica : e.parts.reduce((a, p) => a + (T_MIN[p.k] || 1), 0); };
const readMin = html => { const w = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length; const wid = (html.match(/data-(tree|arrows|enum|fb)\b|class="calc"/g) || []).length; return w / T_MIN.wpm + wid * T_MIN.widget; };
function lessonMin(L){
  const intro = Array.isArray(L.intro) ? L.intro.join(' ') : L.intro;
  if (L.kind === 'examen') return readMin(intro) + EXAM_Q * T_MIN.examQ + EXAM_EX.reduce((a, g) => { const b = EX.filter(e => e.src === 'examen' && EXAM_BANK[g].indexOf(e.b) >= 0); return a + b.reduce((x, e) => x + exMin(e.id), 0) / b.length; }, 0);
  return readMin(intro) + L.quiz.length * T_MIN.q + L.ex.reduce((a, id) => a + exMin(id), 0);
}
LESSONS.forEach(L => { L.min = lessonMin(L); });
const fmtMin = m => { m = Math.round(m); if (m < 60) return m + ' min'; const h = Math.floor(m / 60), r = m % 60; return h + ' h' + (r ? ' ' + r + ' min' : ''); };
const sumMin = Ls => Ls.reduce((a, L) => a + L.min, 0);
const LOCK_SVG = '<svg viewBox="0 0 12 14" width="10" height="12" aria-hidden="true"><rect x="1" y="6" width="10" height="7" rx="1.5" fill="currentColor"/><path d="M3.5 6V4.2a2.5 2.5 0 0 1 5 0V6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
const hasCheck = L => L.quiz.length > 0 || L.kind === 'examen';
const hasPractice = L => L.ex.length > 0 || L.kind === 'examen';
const lessonSec = id => document.querySelector('section.lesson[data-view="' + id + '"]');
/* Orden de opciones revuelto pero fijo por pregunta: la correcta no queda siempre arriba */
function optOrder(x){
  if (x.ord) return x.ord;
  let h = (parseInt(hashStr(x.q + '|' + x.o.join('|')), 36) % 2147483647) || 1;
  const rnd = () => { h = (h * 48271) % 2147483647; return h / 2147483647; };
  const ord = x.o.map((o, j) => j);
  for (let i = ord.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = ord[i]; ord[i] = ord[j]; ord[j] = t; }
  return (x.ord = ord);
}
const qSrc = x => (x.src || x.teo) ? '<div class="qq-src">' + (x.teo ? '<span class="teo">Teoría</span>' : '') + (x.src ? esc(x.src) : '') + '</div>' : '';
function quizHTML(qs){
  return '<div class="sheet"><div class="quiz">' + qs.map((x, i) => '<div class="qq" data-q="' + x.id + '">' + qSrc(x) + '<div>' + (i + 1) + '. ' + x.q + '</div><div class="qq-o">' + optOrder(x).map(j => '<button class="opt" type="button" data-j="' + j + '">' + esc(x.o[j]) + '</button>').join('') + '</div><div class="qq-w" hidden></div></div>').join('') + '</div></div>';
}
function paintQ(qq){
  const x = QBYID[qq.dataset.q]; const j = quizAns[x.id]; if (j === undefined) return;
  $$('.opt', qq).forEach(b => { const k = +b.dataset.j; b.classList.toggle('right', j === x.a && k === x.a); b.classList.toggle('wrong', k === j && j !== x.a); });
  const w = $('.qq-w', qq); w.hidden = false;
  w.textContent = j === x.a ? 'Correcto. ' + x.w : 'No es esa. ' + (x.no || 'Vuelve a leer la parte de arriba e intenta otra opción.');
}
document.addEventListener('click', ev => {
  const b = ev.target.closest('.qq[data-q] .opt'); if (!b) return;
  const qq = b.closest('.qq'); quizAns[qq.dataset.q] = +b.dataset.j; store.set('quiz', quizAns); paintQ(qq); refreshProgress();
});
function buildOutline(){
  $('#outline').innerHTML = MODULES.map((m, mi) => '<div class="om"><div class="om-h"><span>' + (mi + 1) + '. ' + esc(m.t) + '</span><span class="om-c" data-mc="' + mi + '"></span></div><ol class="ol">' +
    m.lessons.map(L => '<li data-li="' + L.id + '"><a href="#' + L.id + '" data-lesson="' + L.id + '"><span class="st" aria-hidden="true"></span><span class="lt">' + L.t + '</span></a></li>').join('') + '</ol></div>').join('');
}
function buildLessons(){
  const main = $('#main'); const later = [];
  LESSONS.forEach(L => {
    const sec = document.createElement('section'); sec.className = 'view lesson'; sec.dataset.view = L.id; sec.hidden = true;
    const n2 = hasCheck(L) ? 3 : 2;
    sec.innerHTML =
      '<header class="hero lesson-h"><p class="eyebrow">Módulo ' + (L.mi + 1) + ' · ' + esc(L.mod.t) + ' · Lección ' + (L.li + 1) + ' de ' + L.mod.lessons.length + '</p><h1>' + L.t + '</h1><p class="lede">' + L.obj + '</p><div class="steps" data-steps></div></header>' +
      '<div class="sheet locked" data-lock hidden></div>' +
      '<div class="lesson-body" data-body>' +
        '<section class="part" data-part="aprende"><div class="part-h"><span class="num">1</span><h2>' + (L.kind === 'examen' ? 'Instrucciones' : 'Aprende') + '</h2></div><div class="part-body"></div></section>' +
        (hasCheck(L) ? '<section class="part" data-part="comprueba"><div class="part-h"><span class="num">2</span><h2>' + (L.kind === 'examen' ? 'Preguntas' : 'Comprueba') + '</h2><span class="part-c" data-qc></span></div><div class="part-body"></div></section>' : '') +
        (hasPractice(L) ? '<section class="part" data-part="practica"><div class="part-h"><span class="num">' + n2 + '</span><h2>' + (L.kind === 'examen' ? 'Problemas' : 'Practica') + '</h2><span class="part-c" data-ec></span></div><div class="part-body"></div></section>' : '') +
        '<footer class="lesson-f" data-foot></footer>' +
      '</div>';
    const learn = $('[data-part=aprende] .part-body', sec);
    (Array.isArray(L.intro) ? L.intro : [L.intro]).forEach(h => learn.insertAdjacentHTML('beforeend', '<div class="sheet">' + h + '</div>'));
    const check = $('[data-part=comprueba] .part-body', sec);
    if (check && L.quiz.length) check.innerHTML = quizHTML(L.quiz);
    const prac = $('[data-part=practica] .part-body', sec);
    if (prac && L.ex.length) later.push([prac, L.ex]);
    if (prac && L.mas.length) { prac.insertAdjacentHTML('afterend', '<details class="more"><summary>Más práctica · ' + plural(L.mas.length, 'ejercicio opcional', 'ejercicios opcionales') + '</summary><p class="small">No cuentan para completar la lección. Sirven para repasar o si te quedó alguna duda.</p><div class="more-body"></div></details>'); later.push([$('.more-body', sec), L.mas]); }
    main.appendChild(sec);
    mountWidgets(learn);
  });
  later.forEach(x => mountExercises(x[0], x[1]));
  $$('.qq[data-q]').forEach(paintQ);
}
function examPassed(){ return !!(exam && exam.graded && exam.score >= EXAM_PASS && exam.ex.every(id => exam.solvedEx[id])); }
function lessonProgress(L){
  const qOk = L.quiz.filter(q => quizAns[q.id] === q.a).length;
  const exOk = L.ex.filter(id => solved[id]).length;
  const need = []; let done, kindTxt = '';
  if (L.kind === 'examen') {
    done = examPassed(); kindTxt = 'Examen pendiente';
    if (!done) {
      if (!exam || !exam.graded) need.push('calificar las preguntas'); else if (exam.score < EXAM_PASS) need.push('sacar ' + EXAM_PASS + ' o más en las preguntas (sacaste ' + exam.score + ')');
      const left = exam ? exam.ex.filter(id => !exam.solvedEx[id]).length : EXAM_EX.length; if (left) need.push('resolver ' + plural(left, 'problema') + ' del examen');
    }
  } else {
    done = qOk === L.quiz.length && exOk === L.ex.length;
    if (qOk < L.quiz.length) need.push(plural(L.quiz.length - qOk, 'pregunta'));
    if (exOk < L.ex.length) need.push(plural(L.ex.length - exOk, 'ejercicio'));
  }
  return { qOk, exOk, done, need, kindTxt };
}
function computeStatus(){
  const st = {}; let prevOk = true;
  LESSONS.forEach((L, i) => { const p = lessonProgress(L); p.open = i === 0 || freeMode || prevOk || !!L.free; st[L.id] = p; prevOk = p.open && (p.done || !!skipped[L.id] || !!L.optional); });
  return st;
}
function paintLesson(L, st){
  const sec = lessonSec(L.id); if (!sec) return;
  const s = st[L.id]; const idx = LESSONS.indexOf(L);
  const locked = !s.open && !peek[L.id];
  const lock = $('[data-lock]', sec); lock.hidden = !locked; $('[data-body]', sec).hidden = locked;
  if (locked) {
    let b = null; for (let k = idx - 1; k >= 0; k--) { const P = LESSONS[k]; if (st[P.id].open && !st[P.id].done && !skipped[P.id] && !P.optional) { b = P; break; } }
    lock.innerHTML = '<h2>Esta lección todavía está cerrada</h2><p class="prose">Se abre cuando completes o saltes ' + (b ? '«' + b.t + '»' : 'las lecciones anteriores') + '. Ir en orden ayuda: cada lección usa lo de la anterior.</p><div class="ex-actions">' + (b ? '<a class="btn primary" href="#' + b.id + '">Ir a «' + b.t + '»</a>' : '') + '<button class="btn" type="button" data-peek="' + L.id + '">Verla de todos modos</button></div>';
  }
  const chips = ['<span class="step-chip">≈ ' + fmtMin(L.min) + '</span>'];
  if (L.optional) chips.push('<span class="step-chip">Extra opcional</span>');
  if (L.quiz.length) chips.push('<span class="step-chip' + (s.qOk === L.quiz.length ? ' ok' : '') + '">Comprueba ' + s.qOk + '/' + L.quiz.length + '</span>');
  if (L.ex.length) chips.push('<span class="step-chip' + (s.exOk === L.ex.length ? ' ok' : '') + '">Practica ' + s.exOk + '/' + L.ex.length + '</span>');
  if (L.kind) chips.push('<span class="step-chip' + (s.done ? ' ok' : '') + '">' + (s.done ? 'Aprobado' : s.kindTxt) + '</span>');
  $('[data-steps]', sec).innerHTML = chips.join('');
  const qc = $('[data-qc]', sec); if (qc && L.quiz.length) qc.textContent = s.qOk + ' de ' + L.quiz.length;
  const ec = $('[data-ec]', sec); if (ec && L.ex.length) ec.textContent = s.exOk + ' de ' + L.ex.length;
  const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
  const nextOpen = next && st[next.id].open;
  const msg = s.done ? '<b>' + (L.kind === 'examen' ? 'Examen aprobado.' : 'Lección completa.') + '</b> ' + (next ? 'Sigue con «' + next.t + '».' : 'Terminaste el curso. Haz otro examen cuando quieras repasar.')
    : (L.optional ? 'Esta lección es opcional: no bloquea las siguientes. ' : '') + 'Para completarla te falta ' + s.need.join(' y ') + '.' + (skipped[L.id] ? ' La saltaste; puedes volver cuando quieras.' : '');
  const f = $('[data-foot]', sec); f.classList.toggle('done', s.done);
  f.innerHTML = '<p class="msgtxt">' + msg + '</p>' +
    (prev ? '<a class="btn" href="#' + prev.id + '">← Anterior</a>' : '') +
    (!s.done && !skipped[L.id] && !L.optional && next ? '<button class="btn link" type="button" data-skip="' + L.id + '">Saltar esta lección</button>' : '') +
    (next ? (nextOpen ? '<a class="btn primary" href="#' + next.id + '">Siguiente: ' + next.t + ' →</a>' : '<span class="btn disabled" aria-disabled="true">Siguiente →</span>') : '<a class="btn primary" href="#inicio">Ver mi progreso</a>');
}
document.addEventListener('click', ev => {
  const sk = ev.target.closest('[data-skip]'); if (sk) { skipped[sk.dataset.skip] = true; store.set('skipped', skipped); refreshProgress(); return; }
  const pk = ev.target.closest('[data-peek]'); if (pk) { peek[pk.dataset.peek] = true; refreshProgress(); }
});
function renderDash(st){
  st = st || computeStatus();
  const nextL = LESSONS.find(L => st[L.id].open && !st[L.id].done && !skipped[L.id] && !L.optional) || LESSONS.find(L => !st[L.id].done) || LESSONS[LESSONS.length - 1];
  const started = LESSONS.some(L => st[L.id].done || skipped[L.id] || st[L.id].qOk || st[L.id].exOk);
  const nL = ROUTE.filter(L => st[L.id].done).length;
  const sum = f => ROUTE.reduce((a, L) => a + f(L), 0);
  const allQ = sum(L => L.quiz.length), qOk = sum(L => st[L.id].qOk), allE = sum(L => L.ex.length), eOk = sum(L => st[L.id].exOk);
  const hojaOk = HOJA.filter(id => solved[id]).length;
  const allDone = nL === ROUTE.length;
  const extras = LESSONS.filter(L => L.optional), extOk = extras.filter(L => st[L.id].done).length;
  const left = sumMin(ROUTE.filter(L => !st[L.id].done && !skipped[L.id]));
  $('#dash').innerHTML =
    '<header class="hero"><p class="eyebrow">Lógica y Estructuras Discretas · Módulo final</p><h1>Cuentas Claras</h1><p class="lede">Funciones y combinatoria paso a paso, con lo que entra en tu tercer examen, teoría incluida. La ruta completa dura unas ' + fmtMin(Math.round(sumMin(ROUTE) / 5) * 5) + ': ' + (ROUTE.length - 1) + ' lecciones cortas y el simulacro.</p></header>' +
    '<div class="sheet dash-cont"><div class="dc-txt"><p class="eyebrow">' + (allDone ? 'Curso terminado' : started ? 'Sigue donde te quedaste' : 'Empieza aquí') + '</p><h2>' + (allDone ? 'Terminaste la ruta' : nextL.t) + '</h2><p class="small">' + (allDone ? 'Repasa cualquier lección, los extras o haz otro examen.' : 'Módulo ' + (nextL.mi + 1) + ' · ' + esc(nextL.mod.t) + ' · ≈ ' + fmtMin(nextL.min) + (started ? ' · te faltan ≈ ' + fmtMin(left) + ' de ruta' : '')) + '</p></div><a class="btn primary big" href="#' + (allDone ? 'examen' : nextL.id) + '">' + (allDone ? 'Hacer otro examen' : started ? 'Continuar' : 'Empezar el curso') + ' →</a></div>' +
    '<div class="dash-stats"><span><b>' + nL + '</b> de ' + ROUTE.length + ' lecciones de la ruta</span><span><b>' + qOk + '</b> de ' + allQ + ' preguntas</span><span><b>' + eOk + '</b> de ' + allE + ' ejercicios</span><span><b>' + extOk + '</b> de ' + extras.length + ' extras</span><span><b>' + hojaOk + '</b> de ' + HOJA.length + ' problemas de la hoja</span></div>' +
    '<div class="tools-row"><a href="#hoja"><b>Hoja de actividades</b><span>Los 61 problemas de tu hoja, con revisión y solución explicada.</span></a><a href="#formulario"><b>Formulario</b><span>Todas las fórmulas y cómo decidir cuál usar.</span></a><a href="#calculadora"><b>Calculadora</b><span>C(n,r), P(n,r), n!, potencias y el enumerador.</span></a></div>' +
    '<div class="sheet"><h2>Cómo funciona</h2><div class="how"><div><b>1 · Aprende</b><p>Lee la explicación y mueve los ejemplos: calculadoras, árboles y diagramas responden al instante.</p></div><div><b>2 · Comprueba</b><p>Responde el quiz. Si fallas, vuelve a leer e intenta otra opción.</p></div><div><b>3 · Practica</b><p>Unos pocos problemas obligatorios. Escribe el número o la expresión, como <code>C(10,3)</code>, y pulsa Revisar. Abajo hay «Más práctica» opcional.</p></div></div><p class="prose"><b>Teoría para el examen.</b> Las cajas «De dónde sale» explican cada fórmula como la contestarías en el examen. Las preguntas marcadas con <span class="teo">Teoría</span> y los ejercicios «Explícalo», donde escribes la explicación y la comparas con una respuesta modelo, te preparan para las preguntas de teoría.</p><p class="small">La siguiente lección se abre cuando completas la actual o la saltas. Las lecciones «Extra» son opcionales: no bloquean nada y no están en la lista de temas del examen. Para repasar todo, activa «Abrir todas las lecciones» en el índice. Tu avance se guarda en este navegador.</p></div>' +
    '<div class="mods">' + MODULES.map((m, mi) => {
      const req = m.lessons.filter(L => !L.optional); const d = req.filter(L => st[L.id].done).length;
      return '<div class="mod"><div class="mod-h"><span class="n">Módulo ' + (mi + 1) + '</span><h3>' + esc(m.t) + '</h3><span class="mc">' + d + '/' + req.length + ' · ≈ ' + fmtMin(sumMin(req)) + '</span></div><p class="small">' + esc(m.d) + '</p><div class="bar"><i style="width:' + Math.round(100 * d / req.length) + '%"></i></div><ol class="ol mod-ol">' +
        m.lessons.map(L => { const s = st[L.id]; const cls = (s.done ? 'done' : skipped[L.id] ? 'skipped' : s.open ? 'open' : 'locked') + (L.optional ? ' extra' : ''); return '<li class="' + cls + '"><a href="#' + L.id + '"><span class="st" aria-hidden="true">' + (cls.indexOf('locked') === 0 ? LOCK_SVG : '') + '</span><span class="lt">' + L.t + '</span><span class="lm">' + fmtMin(L.min) + '</span></a></li>'; }).join('') + '</ol></div>';
    }).join('') + '</div>';
}
function refreshProgress(){
  if (!LESSONS.length || !$('#outline')) return;
  const st = computeStatus();
  LESSONS.forEach(L => {
    const s = st[L.id]; const li = document.querySelector('#outline li[data-li="' + L.id + '"]'); if (!li) return;
    const cls = s.done ? 'done' : skipped[L.id] ? 'skipped' : s.open ? 'open' : 'locked';
    li.className = cls + (L.optional ? ' extra' : ''); $('.st', li).innerHTML = cls === 'locked' ? LOCK_SVG : '';
    $('a', li).title = { done: 'Completada', skipped: 'Saltada', open: 'Disponible', locked: 'Cerrada' }[cls];
  });
  MODULES.forEach((m, mi) => { const el = document.querySelector('[data-mc="' + mi + '"]'); const req = m.lessons.filter(L => !L.optional); if (el) el.textContent = req.filter(L => st[L.id].done).length + '/' + req.length; });
  const nDone = ROUTE.filter(L => st[L.id].done).length;
  $('#pg-les').textContent = nDone + ' / ' + ROUTE.length; $('#pg-bar').style.width = Math.round(100 * nDone / ROUTE.length) + '%';
  const hc = $('#hoja-count'); if (hc) hc.textContent = HOJA.filter(id => solved[id]).length + '/' + HOJA.length;
  $$('.ex[data-id]').forEach(card => { const id = card.dataset.id; const ok = card.dataset.pre === 'exam-' ? !!(exam && exam.solvedEx[id]) : !!solved[id]; card.classList.toggle('solved', ok); const c = $('.chip.done', card); if (c) c.hidden = !ok; });
  LESSONS.forEach(L => paintLesson(L, st));
  if (current === 'inicio') renderDash(st);
  if (current === 'hoja') paintHojaHead();
}

/* ---------- Examen ---------- */
function shuffle(a){ for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function examPool(){ return ROUTE.reduce((a, L) => a.concat(L.quiz, L.pool), []).filter(q => !q.noExam); }
function newExam(){
  const all = examPool(); const teo = shuffle(all.filter(q => q.teo));
  const rest = shuffle(teo.slice(EXAM_TEO).concat(all.filter(q => !q.teo)));
  const used = new Set();
  exam = { n: Date.now(), qs: shuffle(teo.slice(0, EXAM_TEO).concat(rest.slice(0, EXAM_Q - EXAM_TEO))).map(q => q.id), ans: {}, graded: false, score: 0,
    ex: EXAM_EX.map(g => { const c = shuffle(EX.filter(e => e.src === 'examen' && EXAM_BANK[g].indexOf(e.b) >= 0 && !used.has(e.id))); const id = c[0].id; used.add(id); return id; }), solvedEx: {}, viewed: {}, tried: {} };
  store.set('exam', exam);
}
function renderExamQuiz(){
  const box = $('[data-part=comprueba] .part-body', lessonSec('examen')); if (!box) return;
  const qs = exam.qs.map(id => QBYID[id]).filter(Boolean);
  let h = '<div class="sheet"><div class="quiz">' + qs.map((x, i) => {
    const j = exam.ans[x.id];
    return '<div class="qq" data-eq="' + x.id + '">' + (x.teo ? '<div class="qq-src"><span class="teo">Teoría</span></div>' : '') + '<div>' + (i + 1) + '. ' + x.q + '</div><div class="qq-o">' + optOrder(x).map(k => { const o = x.o[k];
      let c = 'opt'; if (exam.graded) { if (k === x.a) c += ' right'; else if (k === j) c += ' wrong'; } else if (k === j) c += ' sel';
      return '<button class="' + c + '" type="button" data-k="' + k + '"' + (exam.graded ? ' disabled' : '') + '>' + esc(o) + '</button>';
    }).join('') + '</div>' + (exam.graded ? '<div class="qq-w">' + (j === x.a ? 'Correcto. ' : j === undefined ? 'Sin responder. ' : 'Incorrecto. ') + esc(x.w) + '</div>' : '') + '</div>';
  }).join('') + '</div>';
  if (!exam.graded) h += '<div class="exam-bar"><span class="small">' + Object.keys(exam.ans).length + ' de ' + qs.length + ' respondidas</span><button class="btn primary" type="button" data-exam="grade">Calificar preguntas</button></div>';
  else h += '<div class="exam-bar"><span class="msg ' + (exam.score >= EXAM_PASS ? 'ok' : 'err') + '"><span class="tag">' + (exam.score >= EXAM_PASS ? 'Aprobado' : 'Todavía no') + '</span>' + exam.score + ' de ' + qs.length + ' correctas. Se aprueba con ' + EXAM_PASS + '.</span><button class="btn" type="button" data-exam="new">Hacer otro examen</button></div>';
  box.innerHTML = h + '</div>';
}
function renderExamEx(){
  const box = $('[data-part=practica] .part-body', lessonSec('examen')); if (!box) return;
  box.innerHTML = '<p class="small">Uno de cada tema y uno de teoría. Los de cuentas valen si los resuelves aquí sin abrir la solución antes; el de teoría, si tu explicación tiene todos los puntos.</p>';
  mountExercises(box, exam.ex, 'exam-', 'exam' + exam.n + ':');
}
document.addEventListener('click', ev => {
  const b = ev.target.closest('.qq[data-eq] .opt');
  if (b && exam && !exam.graded) { exam.ans[b.closest('.qq').dataset.eq] = +b.dataset.k; store.set('exam', exam); renderExamQuiz(); return; }
  const a = ev.target.closest('[data-exam]'); if (!a) return;
  if (a.dataset.exam === 'grade') {
    const left = exam.qs.length - Object.keys(exam.ans).length;
    if (left && !confirm('Te faltan ' + plural(left, 'pregunta') + ' por responder. ¿Calificar de todos modos?')) return;
    exam.graded = true; exam.score = exam.qs.filter(id => exam.ans[id] === QBYID[id].a).length; store.set('exam', exam); renderExamQuiz(); refreshProgress();
  }
  if (a.dataset.exam === 'new') { if (!confirm('Se genera un examen nuevo y se borra el actual. ¿Seguir?')) return; newExam(); renderExamQuiz(); renderExamEx(); refreshProgress(); }
});

/* ---------- Hoja de actividades ---------- */
let hojaFilter = 'todos';
const HOJA_TEMA = {};
LESSONS.forEach(L => L.ex.concat(L.mas).forEach(id => { if (EXBYID[id] && EXBYID[id].src === 'hoja' && !HOJA_TEMA[id]) HOJA_TEMA[id] = L; }));
function paintHojaHead(){
  const n = HOJA.filter(id => solved[id]).length;
  const el = $('#hoja-prog'); if (el) el.innerHTML = '<div class="pg-row"><span>' + n + ' de ' + HOJA.length + ' resueltos</span><b>' + Math.round(100 * n / HOJA.length) + '%</b></div><div class="bar"><i style="width:' + (100 * n / HOJA.length) + '%"></i></div>';
}
function applyHojaFilter(){
  $$('#hoja-list .ex').forEach(card => { const id = card.dataset.id; const t = EXBYID[id].tema;
    card.hidden = hojaFilter === 'pend' ? !!solved[id] : hojaFilter === 'todos' ? false : t !== hojaFilter; });
  $$('#hoja-chips .chipbtn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === hojaFilter)));
}
function buildHoja(){
  const temas = Object.keys(TEMA_HOJA);
  $('#hoja-chips').innerHTML = '<button class="chipbtn" type="button" data-f="todos">Todos<span>' + HOJA.length + '</span></button><button class="chipbtn" type="button" data-f="pend">Pendientes</button>' +
    temas.map(t => '<button class="chipbtn" type="button" data-f="' + esc(t) + '">' + esc(t) + '<span>' + HOJA.filter(id => EXBYID[id].tema === t).length + '</span></button>').join('');
  mountExercises($('#hoja-list'), HOJA, 'hoja-');
  HOJA.forEach(id => { const L = HOJA_TEMA[id]; if (!L) return; const h = document.querySelector('#hoja-ej-' + id + ' .ex-h'); h.insertAdjacentHTML('beforeend', '<a class="chip" href="#' + L.id + '">Lección: ' + esc(L.t) + '</a>'); });
  $('#hoja-chips').addEventListener('click', ev => { const b = ev.target.closest('[data-f]'); if (!b) return; hojaFilter = b.dataset.f; applyHojaFilter(); });
  applyHojaFilter(); paintHojaHead();
}

/* ---------- Calculadora ---------- */
const calcHist = store.get('hist', []);
function paintHist(){ $('#calc-hist').innerHTML = calcHist.length ? calcHist.slice().reverse().map(h => '<div><span>' + esc(h[0]) + '</span><span>= ' + esc(h[1]) + '</span></div>').join('') : '<p class="small">Aquí aparecen tus cálculos.</p>'; }
function initCalc(){
  const box = $('#calc-main'); box.innerHTML = calcHTML('', 'Escribe y presiona Enter');
  const inp = $('.calc-in', box); inp.placeholder = 'Por ejemplo: C(52,13) * C(39,13) / 4!';
  const go = () => { const q = runCalc(box); if (q) { calcHist.push([inp.value.trim(), fmtQ(q)]); while (calcHist.length > 30) calcHist.shift(); store.set('hist', calcHist); paintHist(); } };
  inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); go(); } });
  $('[data-calc]', box).addEventListener('click', go);
  $('#calc-clear').addEventListener('click', () => { calcHist.length = 0; store.set('hist', calcHist); paintHist(); });
  paintHist();
}

/* ---------- Autoprueba ---------- */
function runSelfTest(){
  const out = $('#selftest-out'); const items = [];
  const add = (s, t) => items.push({ s, t });
  for (const e of EX) {
    const errs = [];
    if (e.k === 'explica') { add(e.puntos && e.puntos.length >= 3 && e.sol && e.q ? 'pass' : 'fail', e.id + ': Explícalo con ' + plural((e.puntos || []).length, 'punto') + ' y respuesta modelo'); continue; }
    e.parts.forEach((p, i) => {
      const tag = e.id + (e.parts.length > 1 ? '.' + (i + 1) : '');
      try {
        if (p.k === 'opt') { if (!(p.a >= 0 && p.a < p.o.length)) errs.push(tag + ': respuesta fuera de rango'); return; }
        if (p.k === 'num') {
          const a = evalExpr(p.a);
          if (p.v !== undefined) { const v = String(p.v).indexOf('/') > 0 ? mkQ(BigInt(p.v.split('/')[0]), BigInt(p.v.split('/')[1])) : Qn(p.v); if (!qEq(a, v)) errs.push(tag + ': ' + p.a + ' da ' + fmtQ(a) + ' y se esperaba ' + p.v); }
          else if (!p.test) errs.push(tag + ': falta el valor de control v');
          (p.traps || []).forEach(t => { if (qEq(evalExpr(t[0]), a)) errs.push(tag + ': la trampa ' + t[0] + ' da lo mismo que la respuesta'); });
          (p.alt || []).forEach(t => evalExpr(t[0]));
        }
        const r = checkPart(p, p.k === 'num' ? p.a : p.a);
        if (!r.ok) errs.push(tag + ': la respuesta guardada no pasa su propia revisión (' + (r.msg || '') + ')');
        if (p.k === 'set' || p.k === 'val' || p.k === 'expr') (p.traps || []).forEach(t => { if (checkPart(p, t[0]).ok) errs.push(tag + ': la trampa ' + t[0] + ' se acepta como correcta'); });
      } catch (err) { errs.push(tag + ': excepción ' + err.message); }
    });
    if (e.bf) {
      try {
        const got = e.bf(); const arr = Array.isArray(got) ? got : [got];
        arr.forEach((g, k) => { if (g === null) return; const p = e.parts[k]; if (!p || p.k !== 'num') { errs.push(e.id + ': fuerza bruta sin parte numérica ' + (k + 1)); return; } if (!qEq(Qn(g), evalExpr(p.a))) errs.push(e.id + '.' + (k + 1) + ': la fuerza bruta cuenta ' + g + ' y la respuesta dice ' + fmtQ(evalExpr(p.a))); });
      } catch (err) { errs.push(e.id + ': la fuerza bruta falló: ' + err.message); }
    }
    add(errs.length ? 'fail' : 'pass', errs.length ? errs.join(' | ') : e.id + ': ' + plural(e.parts.length, 'parte') + ' bien' + (e.bf ? ' · comprobado por fuerza bruta' : ''));
  }
  LESSONS.forEach(L => L.quiz.concat(L.pool).forEach(q => {
    if (!(q.a >= 0 && q.a < q.o.length)) { add('fail', 'Pregunta ' + q.id + ': respuesta fuera de rango'); return; }
    if (q.chk) { try { const v = evalExpr(q.chk); const o = tryEval(q.o[q.a].replace(/,/g, '')); const ok = o.q && qEq(o.q, v); add(ok ? 'pass' : 'fail', 'Pregunta ' + q.id + ': ' + (ok ? 'opción verificada (' + fmtQ(v) + ')' : q.chk + ' da ' + fmtQ(v) + ' y la opción dice ' + q.o[q.a])); } catch (err) { add('fail', 'Pregunta ' + q.id + ': ' + err.message); } }
  }));
  Object.keys(TREE_EXPECT).forEach(k => { const n = leaves(TREES[k]().root); add(n === TREE_EXPECT[k] ? 'pass' : 'fail', 'Árbol ' + k + ': ' + n + ' hojas (se esperan ' + TREE_EXPECT[k] + ')'); });
  LESSONS.forEach(L => L.ex.concat(L.mas).forEach(id => { if (!EXBYID[id]) add('fail', L.id + ': no existe el ejercicio ' + id); }));
  const used = new Set(HOJA); LESSONS.forEach(L => L.ex.concat(L.mas).forEach(id => used.add(id)));
  const seen = {}; LESSONS.forEach(L => L.ex.concat(L.mas).forEach(id => { if (seen[id]) add('fail', id + ' está en dos lecciones: ' + seen[id] + ' y ' + L.id); seen[id] = L.id; }));
  const ids = {}; LESSONS.forEach(L => L.quiz.concat(L.pool).forEach(q => { if (ids[q.id]) add('fail', 'Pregunta repetida: ' + q.id); ids[q.id] = 1; }));
  ROUTE.forEach(L => { if (L.kind) return; const n = L.quiz.filter(q => q.teo).length; add(n ? 'pass' : 'fail', L.id + ': ' + plural(n, 'pregunta', 'preguntas') + ' de teoría · ≈ ' + fmtMin(L.min)); });
  const nTeo = examPool().filter(q => q.teo).length; add(nTeo >= EXAM_TEO * 3 ? 'pass' : 'fail', 'Simulacro: ' + nTeo + ' preguntas de teoría y ' + examPool().length + ' en total para escoger');
  const allQs = LESSONS.reduce((a, L) => a.concat(L.quiz, L.pool), []); const first = allQs.filter(q => optOrder(q)[0] === q.a).length;
  add(first / allQs.length <= 0.5 ? 'pass' : 'fail', 'Opciones revueltas: la correcta aparece primero en ' + first + ' de ' + allQs.length + ' preguntas');
  const total = sumMin(ROUTE); add(total >= 100 && total <= 130 ? 'pass' : 'fail', 'Ruta completa ≈ ' + fmtMin(total) + ' (meta: unas dos horas)');
  EX.forEach(e => { if (e.src !== 'examen' && !used.has(e.id)) add('warn', 'El ejercicio ' + e.id + ' no está en ninguna lección'); });
  add(HOJA.length === 61 ? 'pass' : 'fail', 'Hoja: ' + HOJA.length + ' problemas');
  EXAM_EX.forEach(g => { const n = EX.filter(e => e.src === 'examen' && EXAM_BANK[g].indexOf(e.b) >= 0).length; add(n >= 2 ? 'pass' : 'fail', 'Banco del examen, tema ' + g + ': ' + n + ' problemas'); });
  const bancos = [].concat.apply([], EXAM_EX.map(g => EXAM_BANK[g])); EX.forEach(e => { if (e.src === 'examen' && bancos.indexOf(e.b) < 0) add('warn', e.id + ' no sale en ningún simulacro'); });
  $$('.calc[data-e]').forEach(el => { const r = tryEval(el.dataset.e); add(r.err ? 'fail' : 'pass', 'Celda «' + el.dataset.e + '»: ' + (r.err || '= ' + fmtQ(r.q))); });
  $$('[data-arrows]').forEach(el => el.dataset.arrows.split(' ').forEach(k => { if (!ARROWS[k]) add('fail', 'Falta el diagrama ' + k); }));
  const known = [['C(5,2)', '10'], ['P(5,2)', '20'], ['5!', '120'], ['V(10,4)', '5040'], ['VR(3,6)', '729'], ['CR(5,12)', '1820'], ['PR(11,2,3,2)', '1663200'], ['PC(8)', '5040'], ['17 mod 5', '2'], ['2^10', '1024'], ['13,983,816', '13983816'], ['3 x 4', '12'], ['(2^7-1)(2^24-2)', '2130706178'], ['-3/2', '-3/2']];
  known.forEach(k => { const r = tryEval(k[0]); const v = k[1].indexOf('/') > 0 ? mkQ(BigInt(k[1].split('/')[0]), BigInt(k[1].split('/')[1])) : Qn(k[1]); add(r.q && qEq(r.q, v) ? 'pass' : 'fail', 'Calculadora: ' + k[0] + ' = ' + (r.q ? fmtQ(r.q) : r.err)); });
  const sets = [['{a, c}', '{c,a}'], ['∅', '{}'], ['{(a,2),(b,4)}', '{(b, 4), (a, 2)}'], ['(-0.5, -3)', '(-1/2,-3)'], ['{{a,b},{a,c}}', '{{c,a},{b,a}}']];
  sets.forEach(k => { const ok = normSet(k[0]) === normSet(k[1]); add(ok ? 'pass' : 'fail', 'Conjuntos: ' + k[0] + ' = ' + k[1]); });
  add('pass', ROUTE.length + ' lecciones en la ruta y ' + (LESSONS.length - ROUTE.length) + ' extras, ' + LESSONS.reduce((a, L) => a + L.quiz.length + L.pool.length, 0) + ' preguntas y ' + EX.length + ' ejercicios cargados');
  const fails = items.filter(i => i.s === 'fail').length;
  out.innerHTML = '<div class="msg ' + (fails ? 'err' : 'ok') + '"><span class="tag">Autoprueba</span>' + (items.length - fails) + ' bien, ' + fails + ' con problemas.</div><ul>' + items.map(i => '<li class="' + i.s + '"><b>' + (i.s === 'pass' ? '✓' : i.s === 'warn' ? '!' : '✗') + '</b>' + esc(i.t) + '</li>').join('') + '</ul>';
  document.body.dataset.selftest = fails ? 'fail:' + fails : 'ok';
}

/* ---------- Rutas ---------- */
const TOOLS = ['inicio', 'hoja', 'formulario', 'calculadora', 'autoprueba'];
function route(){
  let r = (location.hash || '').replace('#', '');
  if (!LBYID[r] && TOOLS.indexOf(r) < 0) r = 'inicio';
  current = r;
  $$('.view[data-view]').forEach(v => { v.hidden = v.dataset.view !== r; });
  $$('.side a[data-route], .side a[data-lesson]').forEach(a => { if ((a.dataset.route || a.dataset.lesson) === r) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  $('#side').classList.remove('open'); $('#outline-toggle').setAttribute('aria-expanded', 'false');
  if (r === 'autoprueba') runSelfTest();
  refreshProgress();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
$('#outline-toggle').addEventListener('click', () => { const o = $('#side').classList.toggle('open'); $('#outline-toggle').setAttribute('aria-expanded', String(o)); });

/* ---------- Arranque ---------- */
buildOutline();
buildLessons();
$('#formulario-body').innerHTML = FORMULARIO_HTML + TEORIA_HTML;
mountWidgets($('#formulario-body'));
mountWidgets($('section[data-view="calculadora"]'));
buildHoja();
initCalc();
if (!exam || !exam.ex || exam.ex.length !== EXAM_EX.length || exam.qs.length !== EXAM_Q || exam.ex.some(id => !EXBYID[id]) || exam.qs.some(id => !QBYID[id])) newExam();
renderExamQuiz(); renderExamEx();
const libre = $('#modo-libre'); libre.checked = freeMode;
libre.addEventListener('change', () => { freeMode = libre.checked; store.set('free', freeMode); refreshProgress(); });
route();
