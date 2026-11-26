/* ======================= TEORÍA: DE DÓNDE SALE CADA FÓRMULA ======================= */
/* Cada caja se usa en su lección (WHY), en la lección de repaso (la línea corta) y en el formulario. */
const THEORY = [
{ k:'funcion', t:'Función desde teoría de conjuntos',
  linea:'Subconjunto de X × Y en el que cada x aparece en exactamente una pareja.',
  body:`<p>Una función f : X → Y es un subconjunto de X × Y que cumple dos condiciones:</p>
<ol><li><b>Existencia:</b> todo x ∈ X aparece como primer elemento de alguna pareja (nadie se queda sin imagen).</li><li><b>Unicidad:</b> ningún x aparece en dos parejas con distinto segundo elemento (nadie tiene dos imágenes).</li></ol>
<p>Una relación solo pide ser subconjunto de X × Y. Por eso toda función es una relación, pero no al revés.</p>` },
{ k:'iny-sobre', t:'Cómo se demuestra que es inyectiva o sobreyectiva',
  linea:'Inyectiva: de f(x₁) = f(x₂) llegas a x₁ = x₂. Sobreyectiva: para cualquier y despejas una x del dominio.',
  body:`<ol><li><b>Inyectiva:</b> supón f(x₁) = f(x₂) y despeja hasta llegar a x₁ = x₂. Con f(x) = 4x − 1: 4x₁ − 1 = 4x₂ − 1 ⇒ 4x₁ = 4x₂ ⇒ x₁ = x₂.</li><li><b>Sobreyectiva:</b> toma un y cualquiera del codominio, despeja x de y = f(x) y revisa que esa x esté en el dominio. Con 4x − 1: x = (y + 1)/4 es real y f((y + 1)/4) = y.</li><li><b>Para negarlo</b> basta un contraejemplo: dos x distintas con la misma imagen (g(n) = n² tiene g(−2) = g(2)) o un y sin preimagen (2x nunca vale 1 en ℤ).</li></ol>` },
{ k:'palomar', t:'Tamaños y funciones',
  linea:'Si |X| > |Y| no hay inyectivas; si |X| < |Y| no hay sobreyectivas; biyectiva exige |X| = |Y|.',
  body:`<ol><li>Si |X| > |Y|, f no puede ser inyectiva: hay más elementos que destinos, así que dos comparten imagen (principio del palomar).</li><li>Si |X| < |Y|, f no puede ser sobreyectiva: salen |X| flechas y no alcanzan para cubrir los |Y| destinos.</li><li>Por lo tanto, una biyección entre conjuntos finitos solo existe si |X| = |Y|.</li></ol>` },
{ k:'hereda', t:'Composición: qué se hereda',
  linea:'g(f(x₁)) = g(f(x₂)) ⇒ f(x₁) = f(x₂) ⇒ x₁ = x₂. Para sobre: de z encuentras y, y de y encuentras x.',
  body:`<p><b>Teorema 1.</b> Si f : X → Y y g : Y → Z son inyectivas, g ∘ f es inyectiva.</p>
<ol><li>Supón (g ∘ f)(x₁) = (g ∘ f)(x₂), es decir g(f(x₁)) = g(f(x₂)).</li><li>Como g es inyectiva, f(x₁) = f(x₂).</li><li>Como f es inyectiva, x₁ = x₂. ∴ g ∘ f es inyectiva.</li></ol>
<p><b>Teorema 2.</b> Si f y g son sobreyectivas, g ∘ f es sobreyectiva.</p>
<ol><li>Toma cualquier z ∈ Z. Como g es sobreyectiva, hay una y ∈ Y con g(y) = z.</li><li>Como f es sobreyectiva, hay una x ∈ X con f(x) = y.</li><li>Entonces (g ∘ f)(x) = g(f(x)) = g(y) = z. ∴ g ∘ f es sobreyectiva.</li></ol>
<p>Con los dos juntos, biyectiva ∘ biyectiva es biyectiva. Por eso «tener la misma cardinalidad» es transitivo.</p>` },
{ k:'inversa', t:'¿Por qué solo las biyectivas tienen inversa?',
  linea:'f⁻¹ debe darle a cada y exactamente un regreso: sin inyectiva habría dos, sin sobreyectiva ninguno.',
  body:`<p>f⁻¹ : Y → X también tiene que ser función: a cada y le toca exactamente un regreso.</p>
<ol><li>Si f no es inyectiva, algún y viene de dos x distintas: f⁻¹(y) no sabría a cuál regresar.</li><li>Si f no es sobreyectiva, algún y no viene de nadie: f⁻¹(y) no existiría.</li><li>Por eso hacen falta las dos cosas: f debe ser biyectiva. Se calcula despejando x de y = f(x), y cumple f⁻¹(f(x)) = x.</li></ol>` },
{ k:'producto', t:'De dónde sale la regla del producto',
  linea:'Árbol con un nivel por paso: si cada nodo se abre en el mismo número de ramas, las hojas son n₁ · n₂ · … · nₖ.',
  body:`<ol><li>Dibuja el árbol de la operación, un nivel por paso. Cada hoja es una forma completa de hacerla.</li><li>El primer nivel tiene n₁ ramas. De cada una salen n₂, porque ese número no depende de la rama que tomaste, así que el segundo nivel tiene n₁ · n₂.</li><li>Nivel por nivel, al final hay n₁ · n₂ · … · nₖ hojas.</li></ol>
<p>Si el número de opciones cambia según lo que pasó antes (el torneo), las ramas no se abren igual: ahí se cuenta en el árbol.</p>` },
{ k:'suma', t:'De dónde sale la regla de la suma y el complemento',
  linea:'Casos ajenos: |A ∪ B| = |A| + |B|. Como «al menos uno» + «ninguno» = total, al menos uno = total − ninguno.',
  body:`<ol><li>Si A y B no pueden ocurrir a la vez, sus formas son conjuntos ajenos: cuentas las de A, luego las de B, y no repites ninguna. |A ∪ B| = |A| + |B|.</li><li>Si se enciman, lo común se contaría dos veces: |A ∪ B| = |A| + |B| − |A ∩ B|.</li><li><b>Complemento:</b> «al menos uno» y «ninguno» no se enciman y juntos son el total. Por la regla de la suma, total = (al menos uno) + (ninguno), así que (al menos uno) = total − (ninguno).</li></ol>` },
{ k:'factorial', t:'De dónde sale n!',
  linea:'Ordenar n objetos son n pasos con n, n − 1, …, 1 opciones: n!.',
  body:`<p><b>Teorema de tu clase:</b> un conjunto de n elementos tiene n! permutaciones.</p>
<ol><li>Formar una permutación es una operación de n pasos: elegir quién va primero, quién segundo, …, quién va al final.</li><li>El paso 1 tiene n opciones; el 2 tiene n − 1, porque ya usaste uno; …; el último tiene 1.</li><li>Por la regla del producto: n · (n − 1) · … · 2 · 1 = n!.</li></ol>
<p>0! = 1: hay una sola forma de ordenar nada, y así P(n, n) = n!/0! = n! sigue funcionando.</p>` },
{ k:'pnr', t:'De dónde sale P(n, r) = n!/(n − r)!',
  linea:'r lugares con n, n − 1, …, n − r + 1 opciones; multiplicando y dividiendo entre (n − r)! queda n!/(n − r)!.',
  body:`<ol><li>Una r-permutación llena r lugares en orden: es una operación de r pasos.</li><li>El 1er lugar tiene n opciones, el 2º n − 1… En el lugar r ya usaste r − 1 elementos, así que quedan n − r + 1.</li><li>Regla del producto: P(n, r) = n (n − 1) ⋯ (n − r + 1).</li><li>Para escribirlo con factoriales, multiplica y divide entre (n − r)!: arriba se completa n!. ∴ P(n, r) = n!/(n − r)!.</li></ol>
<div class="big-f">P(5, 2) = 5 · 4 = ${F('5 · 4 · 3 · 2 · 1', '3 · 2 · 1')} = ${F('5!', '3!')}</div>` },
{ k:'cnr', t:'De dónde sale C(n, r) = n!/(r!(n − r)!)',
  linea:'Escoger el grupo y luego ordenarlo da P(n, r) = C(n, r) · r!; se despeja C(n, r) = P(n, r)/r!.',
  body:`<ol><li>Una r-permutación se puede formar en dos pasos: primero escoges el subconjunto de r elementos (C(n, r) formas) y luego lo ordenas (r! formas).</li><li>Regla del producto: P(n, r) = C(n, r) · r!. Dicho de otra forma, cada combinación aparece r! veces en la lista de permutaciones (AB y BA).</li><li>Despeja: C(n, r) = P(n, r)/r! = n!/(r!(n − r)!). Como dice tu clase, el r! del denominador elimina las repetidas.</li></ol>
<p><b>Simetría:</b> C(n, r) = C(n, n − r), porque escoger los r que entran es lo mismo que escoger los n − r que se quedan fuera. En la fórmula solo se intercambian r! y (n − r)!.</p>` },
{ k:'repetidos', t:'De dónde sale n!/(a! · b! · …)',
  linea:'Si las copias iguales fueran distintas habría n!; cada palabra se contó a! · b! · … veces y se divide.',
  body:`<ol><li>Ponle subíndice a las copias iguales (C A₁ S A₂) y ordénalas como si fueran distintas: n! ordenamientos.</li><li>Cada palabra real aparece tantas veces como formas de revolver las copias iguales entre sí: a! · b! · … En CASA son 2! = 2: CA₁SA₂ y CA₂SA₁.</li><li>Si cada resultado se contó k veces, divides entre k: n!/(a! · b! · …).</li></ol>` },
{ k:'circulo', t:'De dónde sale (n − 1)! en un círculo',
  linea:'Las n! filas se agrupan de n en n (las rotaciones de un mismo círculo): n!/n = (n − 1)!.',
  body:`<ol><li>Corta el círculo en cualquier silla y léelo como fila: hay n! filas posibles.</li><li>Cada acomodo circular produce n filas distintas, una por cada silla donde puedes empezar a leer (sus n rotaciones).</li><li>Divide: n!/n = (n − 1)!. Es lo mismo que fijar a una persona y ordenar a las otras n − 1.</li></ol>` },
{ k:'funciones-ab', t:'¿Cuántas funciones hay de A en B?',
  linea:'Cada uno de los m elementos de A escoge su imagen entre n: nᵐ. Inyectivas: P(n, m).',
  body:`<p>Con |A| = m y |B| = n:</p>
<ol><li>Definir f es elegir f(x₁), f(x₂), …, f(xₘ): m pasos.</li><li>Cada paso tiene n opciones y no depende de los demás, porque dos x pueden tener la misma imagen.</li><li>Regla del producto: n · n · … · n (m veces) = nᵐ funciones.</li></ol>
<p>Si además debe ser inyectiva, las imágenes no se repiten: n (n − 1) ⋯ (n − m + 1) = P(n, m), si m ≤ n. Las biyecciones de un conjunto de n elementos en sí mismo son n!.</p>` }
];
const THBYK = {}; THEORY.forEach(t => { THBYK[t.k] = t; });
const WHY = k => '<div class="why"><span class="why-k">De dónde sale · teoría para el examen</span><h4>' + THBYK[k].t + '</h4>' + THBYK[k].body + '</div>';
const ERRATA_MN = `<div class="callout"><b>Ojo con la diapositiva de tu clase.</b> En «¿Cuántas funciones distintas se pueden definir de A a B?» quedó escrito m*n. Pero m · n cuenta las parejas de A × B, no las funciones. Con |A| = 3 y |B| = 2 hay 2³ = 8 funciones, no 6. Si te lo preguntan, contesta nᵐ y explica por qué.</div>`;
const TEORIA_HTML = '<div class="sheet"><h2>De dónde sale cada fórmula</h2><p class="prose">Las demostraciones cortas que te pueden pedir en el examen. Cada una está también en su lección.</p>' + THEORY.map(t => WHY(t.k)).join('') + ERRATA_MN + '</div>';

/* ---------- Ejercicios «Explícalo» (se califican con lista de puntos) ---------- */
EX.push(
{ id:'T1', src:'teoria', k:'explica', t:'Demuéstralo: f(x) = 3x + 5 es biyectiva',
  q:`<p>Demuestra que f : ℝ → ℝ, f(x) = 3x + 5, es biyectiva. Escríbelo como en el examen: primero inyectiva, luego sobreyectiva.</p>`,
  puntos:['Para inyectiva partes de f(x₁) = f(x₂), es decir 3x₁ + 5 = 3x₂ + 5', 'Despejas hasta x₁ = x₂ y concluyes que es inyectiva', 'Para sobreyectiva tomas un y cualquiera y despejas x = (y − 5)/3', 'Dices que esa x es real (está en el dominio) y que f(x) = y', 'Concluyes: inyectiva y sobreyectiva, entonces biyectiva'],
  sol:`<p><b>Inyectiva.</b> Sean x₁, x₂ ∈ ℝ con f(x₁) = f(x₂). Entonces 3x₁ + 5 = 3x₂ + 5, así que 3x₁ = 3x₂ y x₁ = x₂. ∴ f es inyectiva.</p><p><b>Sobreyectiva.</b> Sea y ∈ ℝ. Busco x con 3x + 5 = y: x = (y − 5)/3, que es un número real. Comprobación: f((y − 5)/3) = 3 · (y − 5)/3 + 5 = y. ∴ f es sobreyectiva.</p><p>Como es inyectiva y sobreyectiva, f es biyectiva (y su inversa es f⁻¹(y) = (y − 5)/3).</p>` },
{ id:'T2', src:'teoria', k:'explica', t:'Demuéstralo: inyectiva ∘ inyectiva',
  q:`<p>Sean f : X → Y y g : Y → Z funciones inyectivas. Demuestra que g ∘ f es inyectiva.</p>`,
  puntos:['Partes de (g ∘ f)(x₁) = (g ∘ f)(x₂), o sea g(f(x₁)) = g(f(x₂))', 'Usas que g es inyectiva para llegar a f(x₁) = f(x₂)', 'Usas que f es inyectiva para llegar a x₁ = x₂', 'Concluyes con la definición: g ∘ f es inyectiva'],
  sol:`<p>Sean x₁, x₂ ∈ X con (g ∘ f)(x₁) = (g ∘ f)(x₂), es decir, g(f(x₁)) = g(f(x₂)).</p><p>f(x₁) y f(x₂) son elementos de Y y g es inyectiva, así que f(x₁) = f(x₂).</p><p>Como f es inyectiva, x₁ = x₂. Partimos de imágenes iguales y llegamos a elementos iguales: ∴ g ∘ f es inyectiva.</p>` },
{ id:'T3', src:'teoria', k:'explica', t:'Explícalo: de dónde sale P(n, r)',
  q:`<p>Explica de dónde sale la fórmula P(n, r) = n!/(n − r)!. Puedes apoyarte en el ejemplo de tu clase con las vocales {a, e, i, o, u}.</p>`,
  puntos:['Dices qué cuenta: selecciones ordenadas de r elementos, o sea r pasos (un lugar por paso)', 'Cuentas las opciones de cada paso: n, n − 1, …, n − r + 1, y explicas por qué el último es n − r + 1', 'Nombras la regla del producto para multiplicarlas', 'Explicas que al multiplicar y dividir entre (n − r)! queda n!/(n − r)!'],
  sol:`<p>P(n, r) cuenta las selecciones <b>ordenadas</b> de r elementos tomados de n. Formar una es una operación de r pasos: elegir quién va en el 1er lugar, en el 2º, …, en el r-ésimo.</p><p>El 1er lugar tiene n opciones; el 2º, n − 1, porque ya se usó uno; y en el r-ésimo ya se usaron r − 1, así que quedan n − r + 1. Por la regla del producto, P(n, r) = n(n − 1)⋯(n − r + 1).</p><p>Si multiplico y divido entre (n − r)!, arriba se completa n! = n(n − 1)⋯(n − r + 1) · (n − r)!. ∴ P(n, r) = n!/(n − r)!. Con las vocales: P(5, 2) = 5 · 4 = 5!/3! = 20.</p>` },
{ id:'T4', src:'teoria', k:'explica', t:'Explícalo: de dónde sale C(n, r)',
  q:`<p>Explica de dónde sale C(n, r) = n!/(r!(n − r)!). Puedes apoyarte en el ejemplo de tu clase: elegir 2 personas de {A, B, C, D} para presidente y secretario, o para un equipo.</p>`,
  puntos:['Dices qué cuenta: subconjuntos de r elementos, donde el orden no importa', 'Relacionas con permutaciones: cada subconjunto de r se puede ordenar de r! formas', 'Escribes P(n, r) = C(n, r) · r! (cada combinación aparece r! veces en P(n, r))', 'Despejas C(n, r) = P(n, r)/r! y sustituyes P(n, r) = n!/(n − r)! para llegar a n!/(r!(n − r)!)'],
  sol:`<p>C(n, r) cuenta los subconjuntos de r elementos, donde el orden no importa (AB = BA).</p><p>Una selección ordenada de r elementos se puede hacer en dos pasos: escoger el subconjunto (C(n, r) formas) y luego ordenarlo (r! formas). Por la regla del producto, P(n, r) = C(n, r) · r!. En el ejemplo: 12 parejas de presidente y secretario = 6 equipos · 2!.</p><p>Despejando, C(n, r) = P(n, r)/r! = n!/(r!(n − r)!). El r! elimina las repeticiones: cada equipo aparecía r! veces en la lista ordenada.</p>` },
{ id:'T5', src:'teoria', k:'explica', t:'Explícalo: funciones de A en B',
  q:`<p>Si |A| = m y |B| = n, ¿cuántas funciones hay de A en B? Explica de dónde sale y di cuántas de ellas son inyectivas.</p>`,
  puntos:['Dices que definir f es elegir la imagen de cada uno de los m elementos de A', 'Cada elección tiene n opciones y no depende de las otras (pueden repetir imagen)', 'Por la regla del producto son n · n · … · n = nᵐ, no m · n', 'Inyectivas: las imágenes no se repiten, así que son P(n, m) = n!/(n − m)!, si m ≤ n'],
  sol:`<p>Sea A = {x₁, …, xₘ}. Una función queda definida cuando eliges f(x₁), f(x₂), …, f(xₘ): son m pasos. Cada uno tiene n opciones y no depende de los otros, porque dos elementos pueden ir a la misma imagen. Por la regla del producto hay n · n · … · n = <b>nᵐ</b> funciones.</p><p>Ejemplo: con |A| = 3 y |B| = 2 hay 2³ = 8. No es m · n = 6, que cuenta las parejas de A × B.</p><p>Para que sea inyectiva, las imágenes no se pueden repetir: n opciones para x₁, n − 1 para x₂, …, es decir <b>P(n, m) = n!/(n − m)!</b> (solo si m ≤ n; si m > n no hay ninguna).</p>` }
);

/* Banco de teoría del simulacro: un «Explícalo» por examen */
EX.push(
{ id:'X20', src:'examen', b:'teo', k:'explica', t:'Sobreyectiva ∘ sobreyectiva',
  q:`<p>Sean f : X → Y y g : Y → Z sobreyectivas. Demuestra que g ∘ f es sobreyectiva.</p>`,
  puntos:['Tomas un z cualquiera de Z', 'Usas que g es sobreyectiva: existe y ∈ Y con g(y) = z', 'Usas que f es sobreyectiva: existe x ∈ X con f(x) = y', 'Concluyes (g ∘ f)(x) = g(f(x)) = g(y) = z, así que g ∘ f es sobreyectiva'],
  sol:`<p>Sea z ∈ Z. Como g es sobreyectiva, existe y ∈ Y con g(y) = z. Como f es sobreyectiva, existe x ∈ X con f(x) = y. Entonces (g ∘ f)(x) = g(f(x)) = g(y) = z. Todo z tiene preimagen: ∴ g ∘ f es sobreyectiva.</p>` },
{ id:'X21', src:'examen', b:'teo', k:'explica', t:'Inversa solo si es biyectiva',
  q:`<p>Explica por qué una función f : X → Y tiene función inversa solo si es biyectiva.</p>`,
  puntos:['Dices que f⁻¹ : Y → X tiene que ser función: a cada y le toca exactamente un regreso', 'Si f no es inyectiva, algún y viene de dos x y f⁻¹(y) no estaría bien definida', 'Si f no es sobreyectiva, algún y no viene de nadie y f⁻¹(y) no existiría', 'Concluyes que hacen falta las dos: f debe ser biyectiva'],
  sol:`<p>La inversa debe ser una función de Y en X que regrese cada y al x del que salió. Si f no fuera inyectiva, habría un y con dos preimágenes y f⁻¹(y) tendría dos valores, así que no sería función. Si f no fuera sobreyectiva, habría un y sin preimagen y f⁻¹(y) no estaría definido. Por lo tanto f necesita ser inyectiva y sobreyectiva: biyectiva.</p>` },
{ id:'X22', src:'examen', b:'teo', k:'explica', t:'(n − 1)! en una mesa redonda',
  q:`<p>Explica por qué n personas se pueden sentar de (n − 1)! formas alrededor de una mesa redonda, si dos acomodos que son rotación uno del otro cuentan como el mismo.</p>`,
  puntos:['Dices que si fuera una fila habría n! formas', 'Explicas que cada acomodo circular corresponde a n filas: sus n rotaciones (empezar a leer en cualquier silla)', 'Divides: n!/n = (n − 1)!', 'O, de otra forma: fijas a una persona y ordenas a las otras n − 1'],
  sol:`<p>Si las sillas estuvieran en fila habría n! acomodos. En un círculo, girar a todos un lugar no cambia nada, y cada acomodo circular se puede leer empezando en cualquiera de las n sillas: corresponde a n filas distintas. Como cada círculo se contó n veces, hay n!/n = (n − 1)!. Es lo mismo que fijar a una persona y ordenar a las otras n − 1.</p>` },
{ id:'X23', src:'examen', b:'teo', k:'explica', t:'Letras repetidas',
  q:`<p>Explica por qué las letras de una palabra de n letras, donde una se repite a veces y otra b veces, se pueden ordenar de n!/(a! · b!) formas. Usa ANA o CASA como ejemplo.</p>`,
  puntos:['Dices que si todas las letras fueran distintas (con subíndices) habría n! ordenamientos', 'Explicas que cada palabra real aparece a! · b! veces, por todas las formas de revolver las copias iguales', 'Divides entre a! · b! porque cada resultado se contó esas veces', 'Das el ejemplo: ANA tiene 3!/2! = 3 (ANA, AAN, NAA)'],
  sol:`<p>Si a las copias iguales les pongo subíndice (A₁NA₂) todas las letras son distintas y hay n! ordenamientos. Pero una misma palabra aparece varias veces: A₁NA₂ y A₂NA₁ son ANA. Cada palabra se repite tantas veces como formas de revolver las copias iguales entre sí: a! · b!. Por eso se divide: n!/(a! · b!). En ANA, 3!/2! = 3: ANA, AAN y NAA.</p>` },
{ id:'X24', src:'examen', b:'teo', k:'explica', t:'¿Por qué C(n, r) = C(n, n − r)?',
  q:`<p>Explica por qué C(n, r) = C(n, n − r). Da el argumento con palabras y compruébalo con la fórmula.</p>`,
  puntos:['Explicas que escoger los r que entran es lo mismo que escoger los n − r que se quedan fuera', 'Dices que cada grupo de r corresponde a exactamente un grupo de n − r (su complemento), así que hay la misma cantidad', 'Con la fórmula: C(n, n − r) = n!/((n − r)! (n − (n − r))!) = n!/((n − r)! r!)', 'Concluyes que es igual a C(n, r)'],
  sol:`<p>Elegir a los r que entran a un comité deja automáticamente fuera a los otros n − r, y al revés. Cada subconjunto de r elementos se empareja con exactamente uno de n − r (su complemento), así que hay la misma cantidad de unos que de otros. Con la fórmula: C(n, n − r) = n!/((n − r)! · (n − (n − r))!) = n!/((n − r)! · r!) = C(n, r).</p>` }
);
