'use strict';
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store = {
  get(k, d){ try { const v = localStorage.getItem('cuentas-claras:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v){ try { localStorage.setItem('cuentas-claras:' + k, JSON.stringify(v)); } catch (e) {} }
};
function plural(n, s, p){ return n + ' ' + (n === 1 ? s : (p || s + 's')); }

/* ======================= NÚMEROS EXACTOS ======================= */
/* Racionales con BigInt: los conteos crecen rapidísimo (52!, 62^8…) y aquí no se redondea nada. */
class MathErr extends Error {}
function gcdB(a, b){ if (a < 0n) a = -a; if (b < 0n) b = -b; while (b) { const t = a % b; a = b; b = t; } return a; }
function mkQ(n, d){
  if (d === undefined) d = 1n;
  if (d === 0n) throw new MathErr('No se puede dividir entre cero.');
  if (d < 0n) { n = -n; d = -d; }
  const g = gcdB(n, d);
  return g > 1n ? { n: n / g, d: d / g } : { n, d };
}
const Qn = v => mkQ(BigInt(v));
const qAdd = (a, b) => mkQ(a.n * b.d + b.n * a.d, a.d * b.d);
const qSub = (a, b) => mkQ(a.n * b.d - b.n * a.d, a.d * b.d);
const qMul = (a, b) => mkQ(a.n * b.n, a.d * b.d);
const qDiv = (a, b) => { if (b.n === 0n) throw new MathErr('No se puede dividir entre cero.'); return mkQ(a.n * b.d, a.d * b.n); };
const qNeg = a => ({ n: -a.n, d: a.d });
const qEq = (a, b) => a.n === b.n && a.d === b.d;
const isInt = a => a.d === 1n;
function qMod(a, b){
  if (!isInt(a) || !isInt(b)) throw new MathErr('mod solo funciona con enteros.');
  if (b.n === 0n) throw new MathErr('No se puede sacar mod 0.');
  const m = b.n < 0n ? -b.n : b.n; return Qn(((a.n % m) + m) % m);
}
function hexLen(x){ return (x < 0n ? -x : x).toString(16).length; }
function qPow(a, e){
  if (!isInt(e)) throw new MathErr('El exponente debe ser un número entero.');
  let k = e.n; const neg = k < 0n; if (neg) k = -k;
  if (k > 200000n || (hexLen(a.n) + hexLen(a.d)) * 4 * Number(k) > 600000) throw new MathErr('El resultado es demasiado grande para calcularlo aquí.');
  let r = mkQ(a.n ** k, a.d ** k);
  if (neg) r = qDiv(Qn(1), r);
  return r;
}
const FACT = [1n];
function factB(n){
  if (n < 0n) throw new MathErr('El factorial solo existe para enteros mayores o iguales a 0.');
  if (n > 5000n) throw new MathErr('Ese factorial es demasiado grande para calcularlo aquí.');
  const k = Number(n); while (FACT.length <= k) FACT.push(FACT[FACT.length - 1] * BigInt(FACT.length));
  return FACT[k];
}
function needNat(q, what){ if (!isInt(q) || q.n < 0n) throw new MathErr(what + ' debe ser un entero mayor o igual a 0.'); return q.n; }
function combB(n, r){ if (r < 0n || r > n) return 0n; if (r > n - r) r = n - r; let x = 1n; for (let i = 1n; i <= r; i++) x = x * (n - r + i) / i; return x; }
function permB(n, r){ if (r < 0n || r > n) return 0n; let x = 1n; for (let i = 0n; i < r; i++) x *= (n - i); return x; }
function arity(a, k, nm){ if (a.length !== k) throw new MathErr(nm + '(…) lleva ' + plural(k, 'número') + ' separados por coma.'); }

const FN = {
  C: (a, nm) => { arity(a, 2, nm); return Qn(combB(needNat(a[0], 'n'), needNat(a[1], 'r'))); },
  P: (a, nm) => { if (a.length === 1) return Qn(factB(needNat(a[0], 'n'))); arity(a, 2, nm); return Qn(permB(needNat(a[0], 'n'), needNat(a[1], 'r'))); },
  VR: (a, nm) => { arity(a, 2, nm); return qPow(a[0], a[1]); },
  CR: (a, nm) => { arity(a, 2, nm); const n = needNat(a[0], 'n'), r = needNat(a[1], 'r'); return Qn(r === 0n ? 1n : n === 0n ? 0n : combB(n + r - 1n, r)); },
  PR: (a, nm) => {
    if (a.length < 2) throw new MathErr('PR(n; a, b, …) lleva el total y cuántas veces se repite cada cosa.');
    const n = needNat(a[0], 'n'); let d = 1n, s = 0n;
    for (let k = 1; k < a.length; k++) { const x = needNat(a[k], 'Cada repetición'); s += x; d *= factB(x); }
    if (s > n) throw new MathErr('En PR(n; a, b, …) las repeticiones suman más que n.');
    return mkQ(factB(n), d);
  },
  PC: (a, nm) => { arity(a, 1, nm); const n = needNat(a[0], 'n'); if (n < 1n) throw new MathErr('PC(n) necesita n ≥ 1.'); return Qn(factB(n - 1n)); },
  FACT: (a, nm) => { arity(a, 1, nm); return Qn(factB(needNat(a[0], 'n'))); },
  MOD: (a, nm) => { arity(a, 2, nm); return qMod(a[0], a[1]); },
  ABS: (a, nm) => { arity(a, 1, nm); return a[0].n < 0n ? qNeg(a[0]) : a[0]; }
};
const FN_ALIAS = { COMB:'C', NCR:'C', BINOM:'C', PERM:'P', NPR:'P', V:'P', VAR:'P', POW:'VR', FACTORIAL:'FACT' };

function normalizeInput(src, hasVars){
  let s = String(src == null ? '' : src).trim()
    .replace(/[−–—]/g, '-').replace(/[·×∙⋅]/g, '*').replace(/÷/g, '/')
    .replace(/²/g, '^2').replace(/³/g, '^3').replace(/\*\*/g, '^').replace(/[“”"]/g, '');
  if (/^-?\d{1,3}(,\d{3})+$/.test(s)) s = s.replace(/,/g, '');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  s = s.replace(/(\d)[    ](?=\d{3}(?!\d))/g, '$1');
  if (!hasVars) s = s.replace(/(\d)\s*[xX]\s*(?=[\d(])/g, '$1*');
  return s;
}
function tokenize(src, hasVars){
  const s = normalizeInput(src, hasVars); const T = []; let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s[i + 1] || ''))) {
      let j = i; while (j < s.length && /[0-9]/.test(s[j])) j++;
      if (s[j] === '.' && /[0-9]/.test(s[j + 1] || '')) { j++; while (j < s.length && /[0-9]/.test(s[j])) j++; }
      T.push({ k: 'num', v: s.slice(i, j) }); i = j; continue;
    }
    if (/[A-Za-zÀ-ÿ_]/.test(c)) {
      let j = i; while (j < s.length && /[A-Za-zÀ-ÿ_0-9]/.test(s[j])) j++;
      const w = s.slice(i, j); T.push(/^mod$/i.test(w) ? { k: 'op', v: 'mod' } : { k: 'id', v: w }); i = j; continue;
    }
    if ('+-*/^!(),%;[]{}'.indexOf(c) >= 0) {
      const v = c === '%' ? 'mod' : c === ';' ? ',' : (c === '[' || c === '{') ? '(' : (c === ']' || c === '}') ? ')' : c;
      T.push({ k: 'op', v }); i++; continue;
    }
    throw new MathErr('No entiendo el símbolo «' + c + '».');
  }
  return T;
}
function numQ(t){ const p = t.split('.'); if (p.length === 1) return Qn(p[0]); return mkQ(BigInt(p[0] + p[1]), 10n ** BigInt(p[1].length)); }
/* Evalúa una expresión: números, + − * / ^, n!, paréntesis, mod, C(n,r), P(n,r), V(n,r), VR, CR, PR, PC. */
function evalExpr(src, vars){
  const hasVars = !!vars && Object.keys(vars).length > 0;
  const T = tokenize(src, hasVars); let i = 0;
  if (!T.length) throw new MathErr('Escribe una respuesta.');
  const isOp = (t, v) => !!t && t.k === 'op' && t.v === v;
  const startsPrimary = t => !!t && (t.k === 'num' || t.k === 'id' || isOp(t, '('));
  function expr(){ let a = term(); while (isOp(T[i], '+') || isOp(T[i], '-')) { const o = T[i++].v; const b = term(); a = o === '+' ? qAdd(a, b) : qSub(a, b); } return a; }
  function term(){
    let a = unary();
    for (;;) {
      const t = T[i];
      if (isOp(t, '*') || isOp(t, '/') || isOp(t, 'mod')) { i++; const b = unary(); a = t.v === '*' ? qMul(a, b) : t.v === '/' ? qDiv(a, b) : qMod(a, b); }
      else if (startsPrimary(t)) { const b = power(); a = qMul(a, b); }
      else return a;
    }
  }
  function unary(){ if (isOp(T[i], '-')) { i++; return qNeg(unary()); } if (isOp(T[i], '+')) { i++; return unary(); } return power(); }
  function power(){ const b = postfix(); if (isOp(T[i], '^')) { i++; return qPow(b, unary()); } return b; }
  function postfix(){ let a = primary(); while (isOp(T[i], '!')) { i++; a = Qn(factB(needNat(a, 'El número del factorial'))); } return a; }
  function primary(){
    const t = T[i];
    if (!t) throw new MathErr('La expresión termina antes de tiempo.');
    if (t.k === 'num') { i++; return numQ(t.v); }
    if (isOp(t, '(')) { i++; const a = expr(); if (!isOp(T[i], ')')) throw new MathErr('Falta cerrar un paréntesis.'); i++; return a; }
    if (t.k === 'id') {
      i++;
      if (isOp(T[i], '(') && !(hasVars && Object.prototype.hasOwnProperty.call(vars, t.v))) {
        const up = t.v.toUpperCase(); const fn = FN[FN_ALIAS[up] || up];
        if (!fn) throw new MathErr('No conozco «' + t.v + '(…)». Usa C(n, r), P(n, r), V(n, r), VR(n, r), CR(n, r), PR(n, a, b, …), PC(n) o n!.');
        i++; const args = [];
        if (!isOp(T[i], ')')) for (;;) { args.push(expr()); if (isOp(T[i], ',')) { i++; continue; } break; }
        if (!isOp(T[i], ')')) throw new MathErr('Falta cerrar el paréntesis de ' + t.v + '(…).');
        i++; return fn(args, t.v);
      }
      if (hasVars && Object.prototype.hasOwnProperty.call(vars, t.v)) return vars[t.v];
      if (/^(C|P|V|VR|CR|PR|PC)\d+$/i.test(t.v)) throw new MathErr('Escribe «' + t.v + '» con paréntesis y coma, por ejemplo C(10, 3).');
      throw new MathErr('No sé qué es «' + t.v + '».' + (hasVars ? ' Usa la variable ' + Object.keys(vars).join(' o ') + '.' : ' Aquí va un número o una expresión como C(10, 3).'));
    }
    throw new MathErr('No esperaba «' + (t.v === 'mod' ? 'mod' : t.v) + '» ahí.');
  }
  const r = expr();
  if (i < T.length) throw new MathErr('No esperaba «' + T[i].v + '» ahí.');
  return r;
}
function groupDigits(s){ return s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
function fmtQ(q){
  if (isInt(q)) { const neg = q.n < 0n; return (neg ? '−' : '') + groupDigits((neg ? -q.n : q.n).toString()); }
  return fmtQ(mkQ(q.n)) + '/' + fmtQ(mkQ(q.d));
}
const SUP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻' };
const sup = n => String(n).split('').map(c => SUP[c] || c).join('');
function approxQ(q){
  if (!isInt(q)) { const v = Number(q.n * 1000000n / q.d) / 1000000; return '≈ ' + String(v).replace('-', '−'); }
  const s = (q.n < 0n ? -q.n : q.n).toString(); if (s.length <= 9) return '';
  return '≈ ' + (q.n < 0n ? '−' : '') + s[0] + '.' + s.slice(1, 3) + ' × 10' + sup(s.length - 1);
}
function tryEval(src, vars){ try { return { q: evalExpr(src, vars) }; } catch (e) { return { err: e instanceof MathErr ? e.message : 'No pude leer eso.' }; } }

/* ======================= CONJUNTOS Y VALORES ======================= */
function splitTop(s){
  const out = []; let d = 0, cur = '';
  for (const c of s) {
    if (c === '(' || c === '{' || c === '[') d++;
    if (c === ')' || c === '}' || c === ']') d--;
    if (c === ',' && d === 0) { out.push(cur); cur = ''; } else cur += c;
  }
  out.push(cur); return out.map(x => x.trim()).filter(x => x !== '');
}
const EMPTY_RE = /^(∅|ø|Ø|\{\s*\}|vac[ií]o|conjunto vac[ií]o|ninguno|ninguna|nada)$/i;
function cleanTxt(s){ return String(s == null ? '' : s).replace(/[−–—]/g, '-').replace(/[“”"'«»]/g, '').trim(); }
function normEl(e){
  e = cleanTxt(e);
  if (EMPTY_RE.test(e)) return '{}';
  if (e[0] === '{') return normSet(e);
  if (e[0] === '(' && e[e.length - 1] === ')') {
    const inner = splitTop(e.slice(1, -1));
    if (inner.length > 1) return '(' + inner.map(normEl).join(',') + ')';
    return normEl(e.slice(1, -1));
  }
  const r = tryEval(e);
  if (r.q) return isInt(r.q) ? r.q.n.toString() : r.q.n + '/' + r.q.d;
  return e.toLowerCase().replace(/\s+/g, '');
}
function normSet(s){
  s = cleanTxt(s);
  if (!s || EMPTY_RE.test(s)) return '{}';
  if (s[0] === '{' && s[s.length - 1] === '}') s = s.slice(1, -1);
  const els = Array.from(new Set(splitTop(s).map(normEl))).sort();
  return '{' + els.join(',') + '}';
}
function normVal(s){
  s = cleanTxt(s);
  if (s[0] === '{' && s[s.length - 1] === '}') { const inner = splitTop(s.slice(1, -1)); if (inner.length === 1) s = inner[0]; }
  return normEl(s);
}

/* ======================= REVISIÓN DE RESPUESTAS ======================= */
const SAMPLES = [-3, -2, -1, 0, 1, 2, 3, 5, 7].map(Qn).concat([mkQ(1n, 2n), mkQ(-5n, 3n)]);
const SAMPLES_NAT = [1, 2, 3, 4, 5, 6, 8, 11].map(Qn);
function sameFn(userSrc, ansSrc, vars, dom){
  const names = vars || ['n']; let used = 0;
  for (const v of (dom === 'nat' ? SAMPLES_NAT : SAMPLES)) {
    const env = {}; names.forEach((nm, k) => { env[nm] = k === 0 ? v : qAdd(v, Qn(k + 1)); });
    const a = tryEval(ansSrc, env), u = tryEval(userSrc, env);
    if (a.err && u.err) continue;
    if (a.err || u.err) return { ok: false, err: u.err && !a.err && used === 0 ? u.err : null };
    if (!qEq(a.q, u.q)) return { ok: false };
    used++;
  }
  return { ok: used > 0 };
}
const FACTS = [2, 3, 4, 5, 6, 7, 8].map(k => [k, Qn(factB(BigInt(k)))]);
/* Revisa una parte. Regresa { ok, msg, val, alt } */
function checkPart(p, raw){
  const s = raw == null ? '' : String(raw);
  if (p.k === 'opt') {
    if (raw === undefined || raw === null || raw === '') return { ok: false, empty: true, msg: 'Elige una opción.' };
    const j = Number(raw); if (j === p.a) return { ok: true, msg: p.w || '' };
    return { ok: false, msg: (p.why && p.why[j]) || 'Esa no es. Vuelve a revisar la definición.' };
  }
  if (!s.trim()) return { ok: false, empty: true, msg: 'Te falta responder esta parte.' };
  if (p.k === 'set' || p.k === 'val') {
    const norm = p.k === 'set' ? normSet : normVal;
    const u = norm(s);
    if (u === norm(p.a)) return { ok: true };
    for (const t of (p.traps || [])) if (u === norm(t[0])) return { ok: false, msg: t[1] };
    return { ok: false, msg: p.k === 'set' ? 'Ese conjunto no es. Revisa qué elementos sobran o faltan.' : 'No es ese valor.' };
  }
  if (p.k === 'expr') {
    const r = sameFn(s, p.a, p.vars, p.dom);
    if (r.ok) return { ok: true };
    if (r.err) return { ok: false, msg: 'No pude leer tu expresión: ' + r.err };
    for (const t of (p.traps || [])) if (sameFn(s, t[0], p.vars, p.dom).ok) return { ok: false, msg: t[1] };
    return { ok: false, msg: 'Tu expresión no da lo mismo que la correcta para todos los valores de ' + (p.vars || ['n']).join(', ') + '.' };
  }
  /* num */
  const r = tryEval(s);
  if (r.err) return { ok: false, msg: 'No pude leer tu respuesta: ' + r.err };
  const u = r.q; const val = fmtQ(u);
  if (p.test) { const ok = !!p.test(u); return ok ? { ok: true, val } : { ok: false, val, msg: p.testMsg || 'Ese valor no cumple lo que se pide.' }; }
  const a = evalExpr(p.a);
  if (qEq(u, a)) return { ok: true, val };
  for (const t of (p.alt || [])) if (qEq(u, evalExpr(t[0]))) return { ok: true, val, alt: t[1] };
  for (const t of (p.traps || [])) if (qEq(u, evalExpr(t[0]))) return { ok: false, val, msg: t[1] };
  if (u.n !== 0n && a.n !== 0n) {
    for (const [k, f] of FACTS) {
      if (qEq(u, qMul(a, f))) return { ok: false, val, msg: 'Tu número es exactamente ' + k + '! = ' + fmtQ(f) + ' veces el correcto. ¿Estás contando como distintos órdenes que aquí son lo mismo?' };
      if (qEq(qMul(u, f), a)) return { ok: false, val, msg: 'Tu número es ' + k + '! = ' + fmtQ(f) + ' veces más chico que el correcto. ¿Aquí el orden sí importa?' };
    }
  }
  return { ok: false, val, msg: 'Tu respuesta vale ' + val + ' y no es el número correcto.' };
}

/* ======================= FUERZA BRUTA (para la autoprueba) ======================= */
function range(a, b){ const r = []; for (let i = a; i <= b; i++) r.push(i); return r; }
function permsA(arr, r){
  if (r === undefined) r = arr.length; const out = [];
  (function go(pre, rest){ if (pre.length === r) { out.push(pre); return; } rest.forEach((x, i) => go(pre.concat([x]), rest.slice(0, i).concat(rest.slice(i + 1)))); })([], arr);
  return out;
}
function combsA(arr, r){
  const out = [];
  (function go(start, pre){ if (pre.length === r) { out.push(pre); return; } for (let i = start; i < arr.length; i++) go(i + 1, pre.concat([arr[i]])); })(0, []);
  return out;
}
function powA(arr, r){ let out = [[]]; for (let k = 0; k < r; k++) { const nx = []; out.forEach(p => arr.forEach(x => nx.push(p.concat([x])))); out = nx; } return out; }
function multisetCombsA(arr, r){
  const out = [];
  (function go(start, pre){ if (pre.length === r) { out.push(pre); return; } for (let i = start; i < arr.length; i++) go(i, pre.concat([arr[i]])); })(0, []);
  return out;
}
function uniquePermsA(arr){
  const a = arr.slice().sort(); const out = [a.slice()];
  for (;;) {
    let i = a.length - 2; while (i >= 0 && a[i] >= a[i + 1]) i--; if (i < 0) return out;
    let j = a.length - 1; while (a[j] <= a[i]) j--;
    [a[i], a[j]] = [a[j], a[i]];
    let l = i + 1, r = a.length - 1; while (l < r) { [a[l], a[r]] = [a[r], a[l]]; l++; r--; }
    out.push(a.slice());
  }
}
const countIf = (list, f) => list.reduce((s, x) => s + (f(x) ? 1 : 0), 0);
const adjacent = (p, a, b) => Math.abs(p.indexOf(a) - p.indexOf(b)) === 1;

/* ======================= ÁRBOLES DE POSIBILIDADES ======================= */
function leaves(nd){ return !nd.c || !nd.c.length ? 1 : nd.c.reduce((s, ch) => s + leaves(ch), 0); }
const TREES = {
  torneo(){
    const st = seq => { const a = countIf(seq.split(''), x => x === 'A'), b = seq.length - a, l2 = seq.slice(-2); return (l2 === 'AA' || a === 3) ? 'gana A' : (l2 === 'BB' || b === 3) ? 'gana B' : null; };
    const node = seq => { const e = st(seq); return e ? { l: seq.slice(-1), end: e + ' · ' + seq } : { l: seq.slice(-1), c: ['A', 'B'].map(x => node(seq + x)) }; };
    return { root: { l: 'Inicio', c: ['A', 'B'].map(x => node(x)) }, cols: ['', 'Juego 1', 'Juego 2', 'Juego 3', 'Juego 4', 'Juego 5'], cap: 'Cada hoja es una forma de que termine el torneo. La etiqueta de cada punto dice quién ganó ese juego.' };
  },
  monedas(){
    const node = (seq, d) => d === 5 ? { l: seq.slice(-1), end: seq } : { l: seq.slice(-1), c: (seq.slice(-1) === 'C' ? ['X'] : ['C', 'X']).map(x => node(seq + x, d + 1)) };
    return { root: { l: 'Inicio', c: ['C', 'X'].map(x => node(x, 1)) }, cols: ['', 'Tiro 1', 'Tiro 2', 'Tiro 3', 'Tiro 4', 'Tiro 5'], dx: 62, cap: 'C = cara, X = cruz. Después de una C solo puede venir X: por eso esas ramas no se abren en dos.' };
  },
  oficiales(){
    const P = ['Ann', 'Bob', 'Cyd', 'Dan'];
    const c = P.filter(p => p !== 'Ann').map(pres => ({ l: pres, c: P.filter(t => t !== pres).map(tes => ({ l: tes, c: ['Cyd', 'Dan'].filter(s => s !== pres && s !== tes).map(sec => ({ l: sec, end: pres[0] + tes[0] + sec[0] })) })).filter(n => n.c.length) }));
    return { root: { l: 'Inicio', c }, cols: ['', 'Presidente', 'Tesorero', 'Secretario'], dx: 96, cap: 'Ann no puede ser presidente y el secretario debe ser Cyd o Dan. Las ramas que se quedan sin secretario posible se cortan.' };
  },
  es(){
    return { root: { l: 'Inicio', c: ['A', 'B', 'C', 'D'].map(u => ({ l: u, c: ['X', 'Y', 'Z'].map(p => ({ l: p, end: u + p })) })) }, cols: ['', 'Unidad E/S', 'CPU'], dx: 90, cap: 'Cada unidad de entrada/salida abre 3 ramas: 4 · 3 = 12 hojas.' };
  },
  serie(){
    const st = seq => { const a = countIf(seq.split(''), x => x === 'A'), b = seq.length - a; return a === 2 ? 'gana A' : b === 2 ? 'gana B' : null; };
    const node = seq => { const e = st(seq); return e ? { l: seq.slice(-1), end: e + ' · ' + seq } : { l: seq.slice(-1), c: ['A', 'B'].map(x => node(seq + x)) }; };
    return { root: { l: 'Inicio', c: ['A', 'B'].map(x => node(x)) }, cols: ['', 'Juego 1', 'Juego 2', 'Juego 3'], cap: 'Serie al mejor de 3: termina en cuanto alguien gana 2.' };
  }
};
let svgSeq = 0;
function treeSVG(spec){
  const root = spec.root; let row = 0, maxD = 0; const nodes = [];
  (function lay(nd, d){ maxD = Math.max(maxD, d); nd._d = d; if (!nd.c || !nd.c.length) nd._r = row++; else { nd.c.forEach(ch => lay(ch, d + 1)); nd._r = (nd.c[0]._r + nd.c[nd.c.length - 1]._r) / 2; } nodes.push(nd); })(root, 0);
  const DX = spec.dx || 74, DY = 22, L = 40, T = spec.cols ? 34 : 16, EW = 120;
  const X = nd => L + nd._d * DX, Y = nd => T + nd._r * DY;
  const W = L + maxD * DX + EW, H = T + (row - 1) * DY + 18;
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" role="img" aria-label="Árbol con ' + row + ' hojas">';
  if (spec.cols) spec.cols.forEach((c, k) => { if (c) s += '<text class="sv-m" x="' + (L + k * DX) + '" y="14" text-anchor="middle">' + esc(c) + '</text>'; });
  nodes.forEach(nd => (nd.c || []).forEach(ch => { s += '<line class="sv-e" x1="' + X(nd) + '" y1="' + Y(nd) + '" x2="' + X(ch) + '" y2="' + Y(ch) + '"/>'; }));
  let leafN = 0;
  nodes.slice().sort((a, b) => a._r - b._r).forEach(nd => {
    s += '<circle class="sv-dot" cx="' + X(nd) + '" cy="' + Y(nd) + '" r="2.6"/>';
    s += '<text class="sv-t" x="' + (X(nd) - (nd._d === 0 ? 6 : 4)) + '" y="' + (Y(nd) - 6) + '" text-anchor="' + (nd._d === 0 ? 'end' : 'end') + '" font-size="12">' + esc(nd.l) + '</text>';
  });
  nodes.filter(nd => !nd.c || !nd.c.length).sort((a, b) => a._r - b._r).forEach(nd => { leafN++; s += '<text class="sv-leaf" x="' + (X(nd) + 8) + '" y="' + (Y(nd) + 4) + '">' + leafN + '. ' + esc(nd.end || '') + '</text>'; });
  return s + '</svg>';
}

/* ======================= DIAGRAMAS DE FLECHAS ======================= */
/* spec: { sets:[{n:'X', e:['a','b']}, …], maps:[{f:0, t:1, l:'f', p:[['a','1'], …]}], h? } */
function arrowSVG(spec){
  const id = 'ah' + (++svgSeq);
  const COLW = spec.colw || 150, ROWH = 27, TOP = 40;
  const maxN = Math.max.apply(null, spec.sets.map(S => S.e.length));
  const W = 60 + (spec.sets.length - 1) * COLW + 60, H = TOP + maxN * ROWH + 18;
  const pos = {};
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" role="img" aria-label="' + esc(spec.aria || 'Diagrama de flechas') + '"><defs><marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sv-ah" d="M0,0 L10,5 L0,10 z"/></marker></defs>';
  spec.sets.forEach((S, i) => {
    const cx = 60 + i * COLW, n = S.e.length, top = TOP + (maxN - n) * ROWH / 2;
    s += '<ellipse class="sv-set" cx="' + cx + '" cy="' + (top + n * ROWH / 2) + '" rx="' + (S.rx || 36) + '" ry="' + (n * ROWH / 2 + 9) + '"/>';
    s += '<text class="sv-n" x="' + cx + '" y="18" text-anchor="middle">' + esc(S.n) + '</text>';
    S.e.forEach((e, k) => {
      const y = top + ROWH / 2 + k * ROWH; const last = i === spec.sets.length - 1, first = i === 0;
      const dx = first ? 10 : last ? -10 : 0; const px = cx + dx;
      pos[i + ':' + e] = { x: px, y };
      s += '<circle class="sv-dot" cx="' + px + '" cy="' + y + '" r="3"/>';
      if (first) s += '<text class="sv-t" x="' + (px - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + esc(e) + '</text>';
      else if (last) s += '<text class="sv-t" x="' + (px + 8) + '" y="' + (y + 4) + '">' + esc(e) + '</text>';
      else s += '<text class="sv-t" x="' + (px - 5) + '" y="' + (y - 6) + '" text-anchor="end" font-size="12">' + esc(e) + '</text>';
    });
  });
  (spec.maps || []).forEach(M => {
    const x1 = 60 + M.f * COLW, x2 = 60 + M.t * COLW;
    if (M.l) s += '<text class="sv-n" x="' + ((x1 + x2) / 2) + '" y="18" text-anchor="middle" font-style="italic" font-weight="600">' + esc(M.l) + ' →</text>';
    M.p.forEach(pr => {
      const a = pos[M.f + ':' + pr[0]], b = pos[M.t + ':' + pr[1]]; if (!a || !b) return;
      s += '<line class="sv-a" x1="' + (a.x + 5) + '" y1="' + a.y + '" x2="' + (b.x - 5) + '" y2="' + b.y + '" marker-end="url(#' + id + ')"/>';
    });
  });
  return s + '</svg>';
}
