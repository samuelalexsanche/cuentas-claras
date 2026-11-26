/* ======================= LECCIONES ======================= */
/* ex: obligatorios para completar la lección · mas: «Más práctica» opcional · pool: preguntas que solo salen en el simulacro
   teo:true marca las preguntas de teoría · optional:true son extras que no bloquean ni cuentan en la ruta */
const LIBRO = n => 'Libro de Razonamiento Lógico · Actividad 5, #' + n;
const MODULES = [
{ t:'Funciones', d:'Funciones desde teoría de conjuntos, dominio y rango, inyectiva/sobreyectiva/biyectiva, composición e inversa (clase 17). Dos extras opcionales.', lessons:[
  { id:'relaciones', t:'Relaciones y funciones', obj:'Distinguir una relación de una función con parejas ordenadas y diagramas de flechas.',
    intro:[`<h2>Del producto cartesiano a las funciones</h2>
<p class="prose">Este tema cierra Teoría de conjuntos y abre la combinatoria: una función es un conjunto de parejas con una regla, y <b>contar</b> un conjunto es emparejarlo con {1, 2, 3, …}.</p>
<h3>Producto cartesiano</h3>
<p class="prose">A × B es el conjunto de todas las parejas ordenadas (a, b) con a en A y b en B. Con A = {1, 2} y B = {x, y, z}:</p>
<div class="big-f">A × B = {(1,x), (1,y), (1,z), (2,x), (2,y), (2,z)}</div>
<p class="prose">Tiene 2 · 3 = 6 parejas. En general |A × B| = |A| · |B|: ya estás usando la regla del producto del módulo 2.</p>
<h3>Relación y función</h3>
<p class="prose">Una <b>relación</b> de A en B es <b>cualquier subconjunto</b> de A × B. Puede tener muchas parejas, pocas o ninguna. Una función es una relación con dos condiciones más:</p>
${WHY('funcion')}
<div class="note">No hace falta usar todos los elementos de B, y varios elementos de A pueden ir al mismo de B.</div>`,
`<h2>Los ejemplos de la clase</h2>
<p class="prose">A = {2, 3, 4, 5} y B = {0, 1, 4}.</p>
<div class="tw"><table class="t"><tr><th>Relación</th><th>¿Función de A en B?</th><th>Por qué</th></tr>
<tr><td class="mono">R1 = {(2,0), (3,0), (4,0), (5,0)}</td><td>Sí</td><td>Cada elemento de A aparece una sola vez. Que todos vayan al 0 está permitido.</td></tr>
<tr><td class="mono">R2 = {(1,2), (1,4), (5,4)}</td><td>No</td><td>El 1 aparece dos veces (dos imágenes). Además el 1 no está en A, el 2 no está en B y faltan 2, 3 y 4.</td></tr></table></div>
<h3>Diagramas de flechas</h3>
<p class="prose">X va a la izquierda, Y a la derecha y se dibuja una flecha de x a f(x). La prueba rápida: <b>de cada punto de la izquierda sale exactamente una flecha</b>.</p>
<div data-arrows="r1 r2 r3"></div>`],
    quiz:[
      { teo:true, q:'Desde teoría de conjuntos, una función f : A → B es…', o:['Un subconjunto de A × B en el que cada elemento de A aparece en exactamente una pareja','Cualquier subconjunto de A × B','Una fórmula que convierte números en números'], a:0, w:'Es una relación con dos condiciones: todos los de A aparecen (existencia) y ninguno repite (unicidad).' },
      { q:'En una función f : A → B, ¿pueden dos elementos de A tener la misma imagen?', o:['Sí','No'], a:0, w:'Lo prohibido es que un elemento de A tenga dos imágenes o ninguna. R1 de la clase manda todo al 0 y es función.' },
      { q:'R = {(1,a), (2,b), (2,c)} con A = {1, 2} y B = {a, b, c}. ¿Es función de A en B?', o:['Sí','No, porque el 2 tiene dos imágenes','No, porque a nadie le toca la c'], a:1, w:'El 2 aparece dos veces como primer elemento.' },
      { teo:true, q:'¿Por qué |A × B| = |A| · |B|?', o:['Formar una pareja son dos pasos: eliges a (|A| formas) y luego b (|B| formas); regla del producto','Porque A × B contiene a A y a B','Porque cada elemento de A se suma con uno de B'], a:0, w:'Es la regla del producto aplicada a parejas.' } ],
    pool:[
      { teo:true, q:'Una relación de A en B es…', o:['Cualquier subconjunto de A × B','Solo las que le asignan un elemento de B a cada elemento de A','Todo el conjunto A × B'], a:0, w:'Cualquier subconjunto sirve, incluso el vacío. Las funciones son un caso particular.' },
      { q:'¿Es obligatorio que todos los elementos de B reciban flecha?', o:['Sí; si no, no es función','No'], a:1, w:'No. Eso solo lo pide la sobreyectividad.' },
      { q:'Si |A| = 3 y |B| = 4, ¿cuántas parejas tiene A × B?', o:['7','12','64','81'], a:1, chk:'3*4', w:'|A × B| = |A| · |B| = 12.' } ],
    ex:['F1'], mas:['F3','F2','F4'] },
  { id:'dominio-rango', t:'Dominio, rango e imagen inversa', obj:'Leer de una función su dominio, codominio, rango, imágenes e imágenes inversas.',
    intro:[`<h2>Las partes de una función</h2>
<p class="prose">Para f : X → Y:</p>
<ul><li><b>Dominio:</b> X, el conjunto de salida.</li><li><b>Codominio:</b> Y, el conjunto de llegada completo, aunque no todos reciban flecha.</li><li><b>Rango o imagen:</b> los elementos de Y que sí reciben flecha: <span class="m">Rango f = {y ∈ Y | y = f(x) para alguna x ∈ X}</span>.</li><li><b>Imagen inversa de y:</b> todos los x que llegan a y: <span class="m">{x ∈ X | f(x) = y}</span>. Puede estar vacía o tener varios elementos.</li></ul>
<div data-arrows="d2"></div>
<div class="tw"><table class="t"><tr><th>Pregunta</th><th>Respuesta</th></tr>
<tr><td>Dominio</td><td class="mono">{x1, x2, x3, x4}</td></tr><tr><td>Codominio</td><td class="mono">{y1, y2, y3, y4, y5}</td></tr><tr><td>Rango</td><td class="mono">{y1, y3, y4}</td></tr><tr><td>Imagen inversa de y3</td><td class="mono">{x1, x3}</td></tr><tr><td>Imagen inversa de y2</td><td class="mono">∅</td></tr><tr><td>f como parejas</td><td class="mono">{(x1,y3), (x2,y1), (x3,y3), (x4,y4)}</td></tr></table></div>
<div class="callout"><b>Cuidado:</b> la imagen inversa existe siempre (es un conjunto). La <b>función inversa</b> f⁻¹ solo existe si f es biyectiva; la verás en la lección de composición e inversa.</div>`,
`<h2>Cómo escribir tus respuestas</h2>
<ul><li>Conjuntos con llaves y comas: <code>{a, c}</code>. El orden no importa: <code>{c, a}</code> también vale.</li><li>El vacío: <code>∅</code>, <code>{}</code> o <code>vacio</code>.</li><li>Parejas con paréntesis: <code>{(a,2), (b,4)}</code>.</li><li>Conjuntos de conjuntos: <code>{{a,b}, {a,c}}</code>.</li><li>Un solo valor, como f(a): escribe solo <code>2</code>.</li></ul>`],
    quiz:[
      { teo:true, q:'El rango de una función siempre es…', o:['Igual al codominio','Un subconjunto del codominio','Un subconjunto del dominio'], a:1, w:'Son los elementos del codominio que reciben flecha. Coincide con el codominio solo si f es sobreyectiva.' },
      { q:'La imagen inversa de un elemento y ∈ Y puede ser…', o:['Siempre un solo elemento','Vacía, de un elemento o de varios','Nunca vacía'], a:1, w:'Si nadie llega a y es ∅; si llegan varios, los incluye a todos.' },
      { q:'Si f : {1, 2, 3} → {1, 2, 3, 4, 5}, ¿cuál es el tamaño máximo del rango?', o:['3','5','8'], a:0, chk:'3', w:'Cada elemento del dominio aporta una sola imagen: a lo más 3 imágenes distintas.' },
      { teo:true, q:'Si juntas las imágenes inversas de todos los y ∈ Y, ¿cuántos elementos hay en total?', o:['|X|','|Y|','|X| · |Y|'], a:0, w:'Cada x está en exactamente una imagen inversa (la de f(x)): las imágenes inversas reparten X sin repetir.' } ],
    ex:['F5'], mas:['F6','F7','F8'] },
  { id:'inyectiva-sobre', t:'Inyectiva, sobreyectiva y biyectiva', obj:'Entender con un salón de clases qué significa cada palabra, revisarla en un diagrama o en una fórmula y escribir la demostración.',
    intro:[`<h2>Primero sin fórmulas: un salón</h2>
<p class="prose">Imagina un salón. X son los <b>alumnos</b>, Y son las <b>sillas</b>, y la función f le dice a cada alumno en qué silla se sienta. Que sea función solo pide que <b>cada alumno tenga exactamente una silla</b>, que es lo que viste en la lección anterior.</p>
<p class="prose">Las tres palabras nuevas son preguntas sobre las <b>sillas</b>, no sobre los alumnos:</p>
<div class="tw"><table class="t wrap"><tr><th>Palabra</th><th>En el salón</th><th>Cómo la revisas</th></tr>
<tr><td><b>Inyectiva</b></td><td>Nadie comparte silla.</td><td>¿Hay una silla con dos alumnos o más? Si la hay, <b>no</b> es inyectiva.</td></tr>
<tr><td><b>Sobreyectiva</b></td><td>No sobra ninguna silla.</td><td>¿Hay una silla vacía? Si la hay, <b>no</b> es sobreyectiva.</td></tr>
<tr><td><b>Biyectiva</b></td><td>Las dos cosas: cada silla tiene exactamente un alumno.</td><td>Ni sillas compartidas ni sillas vacías.</td></tr></table></div>
<div data-arrows="sA sB sC sD"></div>
<div class="note"><b>Para acordarte:</b> sobre-yectiva, que no <b>sobre</b> ninguna silla. Bi-yectiva, que cumpla las <b>dos</b>. Y la inyectiva es la de «cada quien en su silla».</div>`,
`<h2>En un diagrama: mira el lado derecho</h2>
<p class="prose">En un diagrama de flechas los alumnos son los puntos de la izquierda y las sillas los de la derecha. Para decidir, <b>cuenta cuántas flechas le llegan a cada punto de la derecha</b>:</p>
<div class="tw"><table class="t wrap"><tr><th>A un punto de Y le llegan…</th><th>Qué significa</th></tr>
<tr><td>0 flechas</td><td>Silla vacía: <b>no es sobreyectiva</b>.</td></tr>
<tr><td>2 flechas o más</td><td>Silla compartida: <b>no es inyectiva</b>.</td></tr>
<tr><td>Exactamente 1, a todos</td><td><b>Biyectiva</b>.</td></tr></table></div>
<div class="callout"><b>No te equivoques de lado.</b> «¿Es función?» se revisa a la <b>izquierda</b>: de cada punto sale exactamente una flecha. Inyectiva y sobreyectiva se revisan a la <b>derecha</b>. Una silla vacía no impide que sea función; solo impide que sea sobreyectiva.</div>
<h3>Atajo: compara los tamaños antes de mirar flechas</h3>
<ul><li><b>Más alumnos que sillas</b> (|X| > |Y|): a fuerza dos comparten, así que <b>nunca</b> es inyectiva.</li><li><b>Menos alumnos que sillas</b> (|X| < |Y|): a fuerza sobran sillas, así que <b>nunca</b> es sobreyectiva.</li><li>Para ser biyectiva necesitas <b>tantos alumnos como sillas</b> (|X| = |Y|).</li></ul>
${WHY('palomar')}`,
`<h2>Con una fórmula: las mismas dos preguntas</h2>
<p class="prose">Con f(x) = 4x − 1 no hay dibujo, pero se pregunta lo mismo. Los «alumnos» son los números que metes (x) y las «sillas» son los resultados (y).</p>
<h3>¿Es inyectiva? ¿Dos x distintas dan el mismo resultado?</h3>
<ul><li><b>Para decir que no</b> basta un ejemplo. Con g(x) = x²: g(2) = 4 y g(−2) = 4. Dos alumnos en la misma silla, y ya terminaste.</li><li><b>Para demostrar que sí</b> supones que dos cayeron en la misma silla, f(x₁) = f(x₂), y despejas. Si llegas a x₁ = x₂, eran el mismo alumno: nunca hay silla compartida.</li></ul>
<div class="big-f">4x₁ − 1 = 4x₂ − 1<br>4x₁ = 4x₂ <span class="small">(sumas 1)</span><br>x₁ = x₂ <span class="small">(divides entre 4)</span></div>
<h3>¿Es sobreyectiva? ¿Qué x tengo que meter para que salga y?</h3>
<ul><li>Toma un y cualquiera del codominio y <b>despeja x</b>.</li><li>Si esa x <b>siempre existe y está en el dominio</b>, toda silla tiene a alguien: es sobreyectiva.</li><li>Si para algún y la x no existe o no está permitida, encontraste una silla vacía.</li></ul>
<div class="big-f">y = 4x − 1<br>x = (y + 1)/4</div>
<p class="prose">Para cualquier y real, (y + 1)/4 también es real, y f((y + 1)/4) = y. No hay sillas vacías.</p>
<p class="prose">Ejemplo de la silla vacía: h : ℤ → ℤ, h(x) = 2x. Para que salga 1 necesitas x = 1/2, que no es entero. Nadie llega al 1, así que h no es sobreyectiva.</p>
<div class="callout"><b>La misma fórmula puede cambiar de respuesta.</b> x² de ℝ en ℝ no es inyectiva (2 y −2 chocan) ni sobreyectiva (nadie llega a −1). De [0, ∞) en [0, ∞) sí es biyectiva: quitaste los negativos que chocaban y las sillas negativas que nadie usaba. Por eso siempre lee el <b>f : X → Y</b>.</div>
<h3>Lo que dice el libro, traducido</h3>
<div class="tw"><table class="t wrap"><tr><th>Definición formal</th><th>Traducción</th></tr>
<tr><td class="mono">f(x₁) = f(x₂) ⇒ x₁ = x₂</td><td><b>Inyectiva:</b> si dos cayeron en la misma silla, eran el mismo alumno.</td></tr>
<tr><td class="mono">∀y ∈ Y, ∃x ∈ X: f(x) = y</td><td><b>Sobreyectiva:</b> en cada silla hay alguien sentado.</td></tr>
<tr><td class="mono">Rango f = Y</td><td><b>Sobreyectiva</b> otra vez: las sillas ocupadas son todas las sillas.</td></tr></table></div>
<p class="prose">Así se escribe en el examen:</p>
${WHY('iny-sobre')}`,
`<h2>Los cinco casos de la clase</h2>
<div class="tw"><table class="t"><tr><th>Función</th><th>¿Sobreyectiva?</th><th>Por qué</th><th>Cómo volverla sobreyectiva</th></tr>
<tr><td class="mono">f : ℝ → ℝ, f(x) = x</td><td>Sí</td><td>x = y</td><td>—</td></tr>
<tr><td class="mono">h : ℤ → ℤ, h(x) = 2x</td><td>No</td><td>1 no es 2x para ningún entero</td><td class="mono">h : ℤ → 2ℤ</td></tr>
<tr><td class="mono">g : ℝ → ℝ, g(x) = sen x</td><td>No</td><td>sen x nunca vale 2</td><td class="mono">g : ℝ → [−1, 1]</td></tr>
<tr><td class="mono">k : {a,b,c} → {1,2,3}</td><td>Sí</td><td>cada número recibe una letra</td><td>—</td></tr>
<tr><td class="mono">m : ℕ → ℕ, m(n) = n + 1</td><td>No</td><td>el 1 no es n + 1 para ningún natural</td><td class="mono">m : ℕ → {2, 3, 4, …}</td></tr></table></div>
<div class="note">Para volverla sobreyectiva, quita del codominio las sillas que nadie usa: achícalo hasta que sea igual al rango.</div>
<h2>Biyectiva: parejas perfectas</h2>
<p class="prose">Biyectiva es inyectiva <b>y</b> sobreyectiva: cada silla tiene exactamente un alumno. Por eso <b>solo las biyectivas tienen inversa</b>: con la silla sabes quién está sentado y puedes regresar. Si una silla tuviera dos alumnos no sabrías a cuál regresar, y si estuviera vacía no habría a quién.</p>
<div class="note">Otros nombres que te pueden aparecer: inyectiva = <b>uno a uno</b>; sobreyectiva = <b>suprayectiva</b>; biyectiva = <b>biunívoca</b>.</div>
<p class="prose">Juega con este constructor: deja una silla vacía o junta dos letras en el mismo número y mira cómo cambia el veredicto.</p>
<div data-fb></div>`],
    quiz:[
      { q:'En un salón, cada alumno se sienta en una silla. Nadie comparte silla, pero queda una silla vacía. La función alumno → silla es…', o:OPT_CLAS, a:0, w:'Nadie comparte: inyectiva. Hay una silla vacía: no es sobreyectiva.' },
      { teo:true, q:'Para demostrar que una función NO es inyectiva basta…', o:['Un contraejemplo: x₁ ≠ x₂ con f(x₁) = f(x₂)','Revisar que f(0) = 0','Probar con tres valores que dan distinto'], a:0, w:'Un solo par de elementos distintos con la misma imagen tumba la inyectividad.' },
      { teo:true, q:'Para demostrar que f : X → Y es sobreyectiva…', o:['Tomas un y cualquiera de Y y encuentras una x en X con f(x) = y','Pruebas con varios valores de x y ves que dan resultados distintos','Supones f(x₁) = f(x₂) y llegas a x₁ = x₂'], a:0, w:'La tercera es la demostración de inyectiva. Probar con ejemplos no demuestra nada.' },
      { teo:true, q:'Si |X| = 5 y |Y| = 3, una función f : X → Y…', o:['Puede ser inyectiva','Nunca es inyectiva','Siempre es biyectiva'], a:1, w:'Con 5 flechas y solo 3 destinos, algún destino recibe dos (principio del palomar).' } ],
    pool:[
      { q:'f : ℝ → ℝ, f(x) = 4x − 1 es…', o:['Solo inyectiva','Solo sobreyectiva','Biyectiva','Ninguna'], a:2, w:'Inyectiva por la demostración de la clase y sobreyectiva porque x = (y + 1)/4 siempre es real.' },
      { q:'h : ℤ → ℤ, h(x) = 2x es…', o:['Sobreyectiva','No sobreyectiva: el 1 no tiene preimagen entera'], a:1, w:'2x siempre es par; los impares se quedan sin flecha.' },
      { q:'Para que m(n) = n + 1 sea sobreyectiva con dominio ℕ = {1, 2, 3, …}, el codominio debe ser…', o:['ℕ','{2, 3, 4, …}','ℤ'], a:1, w:'El codominio se achica hasta el rango, que empieza en 2.' },
      { teo:true, q:'Una función es biyectiva si…', o:['Es inyectiva o sobreyectiva','Es inyectiva y sobreyectiva'], a:1, w:'Necesita las dos.' } ],
    ex:['F15','T1'], mas:['F13','F14','F16'] },
  { id:'composicion', t:'Composición e inversa', obj:'Componer funciones en el orden correcto, saber qué se hereda en la composición y encontrar inversas.',
    intro:[`<h2>Composición: emparejar dos veces</h2>
<p class="prose">Si f : X → Y y g : Y → Z (y el rango de f cabe en el dominio de g), la composición g ∘ f : X → Z es</p>
<div class="big-f">(g ∘ f)(x) = g(f(x))</div>
<p class="prose">Se lee «g círculo f» y <b>se aplica de derecha a izquierda</b>: primero f, luego g.</p>
<div data-arrows="compA"></div>
<h3>El orden importa</h3>
<p class="prose">Con f(x) = x² y g(x) = sen x: f(g(x)) = (sen x)², pero g(f(x)) = sen(x²). En general g ∘ f ≠ f ∘ g.</p>
${WHY('hereda')}`,
`<h2>Función inversa</h2>
<p class="prose">Si f : X → Y es biyectiva, su inversa f⁻¹ : Y → X deshace lo que hace f: f⁻¹(y) = x exactamente cuando f(x) = y. Para encontrarla, despeja x de y = f(x):</p>
<div class="big-f">y = 4x − 1 → x = (y + 1)/4 → f⁻¹(y) = (y + 1)/4</div>
<p class="prose">Comprobación: f⁻¹(f(x)) = ((4x − 1) + 1)/4 = x.</p>
${WHY('inversa')}`],
    quiz:[
      { q:'f(x) = x + 1 y g(x) = x³. (f ∘ g)(2) =', o:['9','27'], a:0, chk:'2^3+1', w:'f ∘ g aplica primero g: 2³ = 8, y luego f: 8 + 1 = 9. (g ∘ f)(2) sería 27.' },
      { teo:true, q:'Una función tiene inversa si y solo si es…', o:['Inyectiva','Sobreyectiva','Biyectiva'], a:2, w:'Sin inyectiva algún y tendría dos regresos; sin sobreyectiva, ninguno.' },
      { teo:true, q:'Si f y g son sobreyectivas, ¿por qué g ∘ f también lo es?', o:['Para cada z hay una y con g(y) = z, y para esa y hay una x con f(x) = y; entonces g(f(x)) = z','Porque toda composición es sobreyectiva','Porque f y g tienen el mismo codominio'], a:0, w:'Es el teorema 2: se encadenan las dos preimágenes.' } ],
    pool:[
      { q:'(g ∘ f)(x) significa…', o:['Aplicar g y luego f','Aplicar f y luego g'], a:1, w:'g(f(x)): primero f, luego g.' },
      { teo:true, q:'Si f y g son inyectivas, g ∘ f es…', o:['Inyectiva','No se puede saber'], a:0, w:'De g(f(x₁)) = g(f(x₂)) sale f(x₁) = f(x₂) y luego x₁ = x₂.' },
      { q:'f(x) = x² y g(x) = sen x. g(f(x)) es…', o:['sen²x','sen(x²)'], a:1, w:'Primero f: x², luego g: sen(x²).' },
      { teo:true, q:'f no es inyectiva: f(a) = f(b) = y con a ≠ b. ¿Qué falla al buscar f⁻¹?', o:['f⁻¹(y) tendría dos valores, a y b, y no sería función','f⁻¹(y) no existiría','Nada: f⁻¹ existe igual'], a:0, w:'Por eso la inversa exige inyectividad.' } ],
    ex:['F18','T2'], mas:['F17','F19','F20'] },
  { id:'otras-funciones', optional:true, t:'Extra: módulo, hash y otras funciones', obj:'Comparar funciones, usar la operación mod, tablas hash y funciones en conjuntos potencia, productos y booleanas.',
    intro:[`<h2>Igualdad de funciones</h2>
<div class="callout"><b>Opcional.</b> Viene en la clase 17, pero no está en la lista de temas del tercer examen. No bloquea las demás lecciones.</div>
<p class="prose">f : X → Y y g : X → Y son iguales si y solo si <span class="m">f(x) = g(x)</span> para toda x en X. Importa lo que hacen, no cómo está escrita la fórmula.</p>
<h3>Paréntesis: la operación módulo</h3>
<p class="prose"><span class="m">a mod n</span> es el residuo de dividir a entre n: 5 mod 3 = 2 porque 5 = 1·3 + 2. Es lo que haces al convertir 14 meses en 1 año y 2 meses (14 mod 12 = 2) u 88 minutos en 1 hora y 28 minutos. Prueba la calculadora: cambia la expresión y presiona Enter.</p>
${calc('88 mod 60')}
<h3>El ejemplo de la clase</h3>
<p class="prose">En A₃ = {0, 1, 2}: f(x) = (x² + x + 1) mod 3 y g(x) = (x + 2)² mod 3.</p>
<div class="tw"><table class="t"><tr><th class="c">x</th><th class="c">x² + x + 1</th><th class="c">f(x)</th><th class="c">(x + 2)²</th><th class="c">g(x)</th></tr><tr><td class="c">0</td><td class="c">1</td><td class="c">1</td><td class="c">4</td><td class="c">1</td></tr><tr><td class="c">1</td><td class="c">3</td><td class="c">0</td><td class="c">9</td><td class="c">0</td></tr><tr><td class="c">2</td><td class="c">7</td><td class="c">1</td><td class="c">16</td><td class="c">1</td></tr></table></div>
<p class="prose">Coinciden en los tres valores, así que <b>f = g</b> aunque las fórmulas se vean distintas.</p>`,
`<h2>Funciones con dominios distintos</h2>
<h3>De conjuntos a números</h3>
<p class="prose">f : 𝒫({a, b, c}) → ℤ, f(x) = número de elementos de x. El dominio es el conjunto potencia, con 8 subconjuntos:</p>
<div class="big-f">f(∅) = 0 · f({a}) = f({b}) = f({c}) = 1 · f({a,b}) = f({a,c}) = f({b,c}) = 2 · f({a,b,c}) = 3</div>
<p class="prose">El codominio es ℤ, pero el rango es solo {0, 1, 2, 3}.</p>
<h3>En el producto cartesiano</h3>
<p class="prose">m : ℝ × ℝ → ℝ, m(a, b) = ab, recibe una pareja y regresa un número: m(2, 1) = 2. r : ℝ × ℝ → ℝ × ℝ, r(a, b) = (−a, b), regresa otra pareja: r(2, 1) = (−2, 1).</p>
<h3>Funciones booleanas</h3>
<p class="prose">Una función booleana de n lugares va de {0,1}ⁿ a {0,1}: recibe n bits y regresa un bit. Su dominio tiene 2ⁿ elementos, uno por renglón de su tabla. Ejemplo: f(x₁, x₂, x₃) = (x₁ + x₂ + x₃) mod 2 vale 1 cuando hay una cantidad impar de unos.</p>
<div class="tw"><table class="t"><tr><th class="c">x₁</th><th class="c">x₂</th><th class="c">x₃</th><th class="c">f</th></tr>${powA([0,1],3).map(p => '<tr>' + p.map(b => '<td class="c">' + b + '</td>').join('') + '<td class="c"><b>' + ((p[0] + p[1] + p[2]) % 2) + '</b></td></tr>').join('')}</table></div>
<div class="note">Conexión con conteo: cada uno de los 2ⁿ renglones puede dar 0 o 1, así que hay 2 elevado a 2ⁿ funciones booleanas de n variables. Con n = 2 son 2⁴ = 16.</div>`,
`<h2>Aplicación: tablas hash</h2>
<p class="prose">Una tabla hash guarda pares (clave, valor) y usa una <b>función hash</b> que convierte la clave en un índice de la tabla. Si esa función fuera inyectiva no habría <b>colisiones</b> (dos claves con el mismo índice). Casi nunca lo es: hay muchas más claves posibles que casillas, y las colisiones se manejan con encadenamiento o sondeo. Ejemplo con 7 casillas y h(k) = k mod 7:</p>
<div class="two">${calc('15 mod 7')}${calc('22 mod 7')}</div>
<p class="prose">15 y 22 caen en la casilla 1: colisión. Las tablas hash buscan rapidísimo, pero son pésimas para guardar información ordenada.</p>`],
    quiz:[
      { q:'17 mod 5 =', o:['2','3','12'], a:0, chk:'17 mod 5', w:'17 = 3·5 + 2.' },
      { q:'f y g van de X en Y. Para que f = g hace falta…', o:['Que sus fórmulas se escriban igual','Que f(x) = g(x) para toda x en X','Que tengan el mismo rango'], a:1, w:'Funciones con fórmulas distintas pueden ser iguales, como en el ejemplo de mod 3.' },
      { q:'¿Cuántos renglones tiene la tabla de una función booleana de 3 variables?', o:['3','6','8','9'], a:2, chk:'2^3', w:'Cada variable es 0 o 1: 2³ = 8 combinaciones.' },
      { q:'¿Cuántas funciones booleanas distintas de 2 variables existen?', o:['4','8','16'], a:2, chk:'2^(2^2)', w:'2² = 4 renglones y cada uno puede dar 0 o 1: 2⁴ = 16.' },
      { q:'m : ℝ × ℝ → ℝ, m(a, b) = ab. ¿Cuál es el dominio de m?', o:['ℝ','ℝ × ℝ, las parejas de reales'], a:1, w:'m recibe parejas: su dominio es el producto cartesiano.' },
      { q:'Una tabla hash de 10 casillas recibe 11 claves. Entonces…', o:['Puede no haber colisiones','Seguro hay al menos una colisión'], a:1, w:'Una función de 11 claves en 10 casillas no puede ser inyectiva.' } ],
    ex:['F9','F10','F11','F12','F21'] },
  { id:'cardinalidad', optional:true, t:'Extra: cardinalidad e infinitos', obj:'Usar biyecciones para comparar tamaños de conjuntos, finitos e infinitos.',
    intro:[`<h2>Contar es emparejar</h2>
<div class="callout"><b>Opcional.</b> Viene en la clase 17, pero no está en la lista de temas del tercer examen. No bloquea las demás lecciones.</div>
<p class="prose">Contar un conjunto es establecer una biyección con {1, 2, …, n}. Dos conjuntos tienen la <b>misma cardinalidad</b> si existe una función biyectiva entre ellos. Es la idea de todo el módulo de combinatoria: para contar algo difícil, emparéjalo con algo fácil de contar.</p>
<div class="note">¿Cuántos números hay del 15 al 87? Empareja 15 → 1, 16 → 2, …, 87 → 73 (n ↦ n − 14). Son 73, no 72.</div>
<h3>¿Hay más enteros que pares?</h3>
<p class="prose">Los pares 2ℤ parecen «la mitad» de ℤ, pero h : ℤ → 2ℤ, h(n) = 2n, es biyectiva:</p>
<ul><li>Inyectiva: si 2n₁ = 2n₂ entonces n₁ = n₂.</li><li>Sobreyectiva: cada par y tiene preimagen y/2, que es entero.</li></ul>
<p class="prose">∴ |ℤ| = |2ℤ|. Con conjuntos infinitos, una parte puede ser tan grande como el todo.</p>`,
`<h2>Infinitos numerables: ℵ₀</h2>
<p class="prose">ℕ = {1, 2, 3, …} es infinito numerable y su cardinalidad se llama <b>aleph cero</b>, ℵ₀. Todo conjunto en biyección con ℕ también tiene cardinalidad ℵ₀:</p>
<div class="tw"><table class="t"><tr><th>Conjunto</th><th>Biyección desde ℕ</th></tr><tr><td>Impares positivos</td><td class="mono">f(n) = 2n − 1</td></tr><tr><td>Múltiplos de 3</td><td class="mono">f(n) = 3n</td></tr><tr><td>Enteros ℤ</td><td class="mono">1→0, 2→1, 3→−1, 4→2, 5→−2, …</td></tr></table></div>
<p class="prose">El zigzag en fórmula: f(n) = n/2 si n es par y f(n) = −(n − 1)/2 si n es impar. Recorre todos los enteros sin repetir, así que ℕ y ℤ tienen la misma cardinalidad.</p>
<p class="prose">Los racionales ℚ también son numerables: se recorren por diagonales, como en el video que dejó tu profe. Los reales ℝ no: hay «más» reales que naturales.</p>`],
    quiz:[
      { q:'Dos conjuntos tienen la misma cardinalidad si…', o:['Existe una función inyectiva entre ellos','Existe una biyección entre ellos','Uno está contenido en el otro'], a:1, w:'Hace falta un emparejamiento perfecto, sin repetir ni dejar a nadie.' },
      { q:'¿ℤ y los pares 2ℤ tienen la misma cardinalidad?', o:['Sí: h(n) = 2n es biyectiva','No: los pares son la mitad'], a:0, w:'Con infinitos, «la mitad» puede tener el mismo tamaño.' },
      { q:'Una biyección de ℕ = {1, 2, 3, …} a los impares positivos es…', o:['f(n) = 2n','f(n) = 2n − 1','f(n) = n + 2'], a:1, w:'1→1, 2→3, 3→5… recorre todos los impares sin repetir.' },
      { q:'Los racionales ℚ…', o:['Son numerables: tienen cardinalidad ℵ₀','Tienen más elementos que ℕ'], a:0, w:'Se pueden listar por diagonales.' },
      { q:'¿Cuántos enteros hay del 20 al 50, incluyendo ambos?', o:['30','31','32'], a:1, chk:'50-20+1', w:'50 − 20 + 1 = 31.' } ],
    ex:['F22','F23','F24'] } ] },

{ t:'Principios de conteo', d:'Árboles de posibilidades, regla de la multiplicación, regla de la suma y complemento (Combinatoria I y II).', lessons:[
  { id:'arboles', t:'Árboles de posibilidades', obj:'Contar casos pequeños o con condiciones dibujando el árbol y contando sus hojas.',
    intro:[`<h2>Árboles de posibilidades</h2>
<p class="prose">Un árbol muestra una tarea que ocurre por pasos: cada nivel es un paso, cada rama una opción y <b>cada hoja (punto final) es una forma completa</b>. Contar formas es contar hojas.</p>
<h3>El torneo de la clase</h3>
<p class="prose">A y B juegan hasta que alguien gane dos juegos seguidos o tres en total. ¿De cuántas formas puede terminar?</p>
<div data-tree="torneo"></div>
<p class="prose">Las ramas no tienen la misma profundidad: algunas terminan en el juego 2 (AA, BB) y otras llegan al 5. Por eso aquí no sirve una fórmula y el árbol es la herramienta correcta.</p>`,
`<h2>Árboles con restricciones</h2>
<h3>Monedas sin dos caras seguidas</h3>
<p class="prose">Tony lanza una moneda 5 veces. ¿De cuántas formas puede salir sin dos caras seguidas?</p>
<div data-tree="monedas"></div>
<h3>Oficiales con condiciones</h3>
<p class="prose">De Ann, Bob, Cyd y Dan se eligen presidente, tesorero y secretario. Ann no puede ser presidente y el secretario debe ser Cyd o Dan.</p>
<div data-tree="oficiales"></div>
<div class="callout"><b>¿Cuándo usar un árbol?</b> Cuando los casos son pocos o cuando las opciones de un paso dependen de lo que pasó antes. Para una contraseña de 8 caracteres el árbol tendría cientos de billones de hojas: ahí necesitas la regla de la multiplicación (siguiente lección).</div>`],
    quiz:[
      { teo:true, q:'Cada hoja del árbol representa…', o:['Un paso','Una forma completa de que ocurra todo','Una opción de un solo paso'], a:1, w:'Por eso contar formas es contar hojas.' },
      { teo:true, q:'¿Cuándo conviene dibujar un árbol?', o:['Cuando hay pocos casos o las opciones dependen de lo anterior','Siempre, para cualquier conteo'], a:0, w:'Con muchos casos el árbol se vuelve impráctico.' },
      { teo:true, q:'¿Por qué en el torneo de la clase no se puede usar la regla del producto?', o:['Porque el número de opciones de cada juego depende de lo que pasó antes y las ramas tienen distinto largo','Porque hay solo dos equipos','Porque el orden de los juegos no importa'], a:0, w:'La regla del producto pide que cada paso tenga el mismo número de opciones sin importar lo anterior.' } ],
    pool:[
      { q:'En el torneo de la clase, ¿cuántos juegos se juegan como máximo?', o:['3','4','5'], a:2, w:'Por ejemplo ABABA: nadie gana dos seguidos y A llega a 3 victorias en el quinto juego.' },
      { q:'En el árbol de las monedas, ¿por qué después de una C sale una sola rama?', o:['Porque después de una cara solo puede venir cruz','Porque se acabaron las monedas'], a:0, w:'Así se evita tener dos caras seguidas.' } ],
    ex:['D5'], mas:['D1','D2','D3','D4','D6'] },
  { id:'producto', t:'Regla de la multiplicación', obj:'Contar tareas de varios pasos multiplicando las opciones de cada paso.',
    intro:[`<h2>Regla de la multiplicación</h2>
<p class="prose">Si una operación consta de k pasos, el primero se puede hacer de n₁ formas, el segundo de n₂ formas (sin importar cómo se hizo el anterior), …, y el k-ésimo de nₖ formas, entonces la operación completa se puede hacer de</p>
<div class="big-f">n₁ · n₂ · … · nₖ formas</div>
<div data-tree="es"></div>
${WHY('producto')}
<div class="tw"><table class="t"><tr><th>Problema</th><th>Cuenta</th></tr>
<tr><td>Edificio: cimientos (2), paredes (2) y techo (3) — del libro</td><td class="mono">2 · 2 · 3 = 12</td></tr>
<tr><td>NIP de 4 dígitos</td><td class="mono">10 · 10 · 10 · 10 = 10,000</td></tr>
<tr><td>NIP sin dígitos repetidos</td><td class="mono">10 · 9 · 8 · 7 = 5,040</td></tr>
<tr><td>Contraseña de 8 caracteres (26 minúsculas + 26 mayúsculas + 10 dígitos)</td><td class="mono">62⁸</td></tr></table></div>
${calc('62^8')}
<div class="note">En el NIP sin repetir, el <b>número</b> de opciones de cada paso no depende de qué dígitos usaste antes (siempre quedan 9, luego 8…), aunque el <b>conjunto</b> sí cambie. Eso basta para multiplicar.</div>`,
`<h2>Cómo plantear un problema de producto</h2>
<ol><li>Divide la tarea en pasos que se hacen <b>todos</b> (y… y… y…).</li><li>Cuenta las opciones de cada paso, empezando por el que tiene restricciones.</li><li>Multiplica.</li></ol>
<p class="prose">Ejemplo: contraseñas de 3 letras seguidas de 2 dígitos. Pasos: letra, letra, letra, dígito, dígito → 26 · 26 · 26 · 10 · 10.</p>
${calc('26^3 * 10^2')}
<p class="prose">En los ejercicios puedes escribir el número o la expresión: <code>26^3*10^2</code>, <code>26³·10²</code> y <code>1757600</code> valen lo mismo.</p>`],
    quiz:[
      { src:LIBRO(4), q:'Pedro tiene 4 camisas, 3 pantalones y 5 pares de zapatos, todos distintos. ¿De cuántas maneras se puede vestir?', o:['12','11','60','35'], a:2, chk:'4*3*5', w:'Tres pasos: 4 · 3 · 5 = 60.' },
      { teo:true, q:'¿De dónde sale la regla del producto?', o:['Del árbol: si de cada rama salen siempre las mismas opciones, las hojas se multiplican nivel por nivel','De sumar las opciones de cada paso','De la fórmula de permutaciones'], a:0, w:'Cada hoja es una forma completa; si todos los nodos de un nivel se abren igual, el total es el producto.' },
      { teo:true, q:'En un NIP de 4 dígitos sin repetir, el tercer dígito tiene…', o:['10 opciones','8 opciones','7 opciones'], a:1, w:'Ya usaste dos dígitos: quedan 8. Cuáles son cambia, pero cuántos no: por eso se puede multiplicar.' } ],
    pool:[
      { src:LIBRO(1), q:'Una rifa usa boletos con un número de tres cifras (000 a 999). ¿Cuántos boletos hay que imprimir?', o:['300','1000','3000','100'], a:1, chk:'10^3', w:'Cada cifra tiene 10 opciones: 10³.' },
      { teo:true, q:'¿Cuántas funciones hay de A en B si |A| = 3 y |B| = 4?', o:['12','64','81'], a:1, chk:'4^3', w:'Cada uno de los 3 elementos de A escoge su imagen entre 4: 4 · 4 · 4. El 12 cuenta las parejas de A × B.' },
      { q:'Una operación tiene 3 pasos con 5, 2 y 7 opciones. ¿De cuántas formas se hace?', o:['14','70','35'], a:1, chk:'5*2*7', w:'5 · 2 · 7 = 70.' } ],
    ex:['D7'], mas:['D10','D8','D9','D11','H22','H41','H57'] },
  { id:'suma', t:'Regla de la suma y el complemento', obj:'Separar en casos que se excluyen, combinar suma y producto, y contar «al menos uno» con el complemento.',
    intro:[`<h2>Regla de la suma</h2>
<p class="prose">Si un evento A se puede realizar de m formas y otro evento B de n formas, y <b>no pueden ocurrir los dos a la vez</b>, entonces «A o B» se puede realizar de m + n formas.</p>
<div class="big-f">«y» (pasos que se hacen todos) → multiplica · «o» (casos que se excluyen) → suma</div>
<div class="tw"><table class="t"><tr><th>Problema</th><th>Cuenta</th></tr>
<tr><td>Mexicana tiene 3 vuelos a Quintana Roo y Aeroméxico 2</td><td class="mono">3 + 2 = 5</td></tr>
<tr><td>Un alumno de dos grupos de 25 y 30</td><td class="mono">25 + 30 = 55</td></tr>
<tr><td>Cruzar un lago en uno de 5 botes o de 3 barcos (libro)</td><td class="mono">5 + 3 = 8</td></tr></table></div>
<h3>Suma y producto juntos</h3>
<p class="prose">Muchos problemas se parten en casos y cada caso se cuenta con el producto. Secuencias Morse de hasta 4 signos: por longitud, 2 + 2² + 2³ + 2⁴.</p>
${calc('2 + 2^2 + 2^3 + 2^4')}`,
`<h2>El complemento: «al menos uno»</h2>
<p class="prose">Cuando piden «al menos uno», casi siempre es más fácil contar lo contrario y restarlo del total:</p>
<div class="big-f">(al menos uno) = (total) − (ninguno)</div>
<p class="prose">Braille: cada símbolo tiene 6 puntos que pueden estar levantados o planos, y al menos uno debe estar levantado. Total 2⁶; el único caso prohibido es «todos planos».</p>
${calc('2^6 - 1')}
<p class="prose">El problema de las direcciones IP de la clase usa la misma idea en cada bloque: 7 bits que no pueden ser todos 1 (2⁷ − 1) y 24 bits que no pueden ser todos 0 ni todos 1 (2²⁴ − 2). Los bloques se multiplican.</p>
${calc('(2^7 - 1) * (2^24 - 2)')}
${WHY('suma')}`],
    quiz:[
      { src:LIBRO(3), q:'Un grupo de 12 mujeres y 10 hombres elige un representante. ¿De cuántas maneras?', o:['22','120','122','10'], a:0, chk:'12+10', w:'El representante es mujer o es hombre: 12 + 10.' },
      { teo:true, q:'¿Por qué la regla de la suma pide que A y B no puedan ocurrir a la vez?', o:['Porque si se enciman, los casos comunes se cuentan dos veces','Porque si no, habría que multiplicar','Porque A y B deben tener el mismo tamaño'], a:0, w:'Si se enciman se usa |A ∪ B| = |A| + |B| − |A ∩ B|.' },
      { teo:true, q:'«Al menos uno» es igual a…', o:['Total − ninguno','Total − exactamente uno'], a:0, w:'«Al menos uno» y «ninguno» no se enciman y juntos son el total.' } ],
    pool:[
      { teo:true, q:'Entre casos que no pueden pasar a la vez («o») se…', o:['Suman','Multiplican'], a:0, w:'Se multiplica cuando son pasos que se hacen todos.' },
      { q:'¿Cuántas cadenas de 4 bits tienen al menos un 1?', o:['15','16','4'], a:0, chk:'2^4-1', w:'Todas (16) menos 0000.' },
      { q:'Una placa lleva 3 letras o 4 dígitos (no ambas cosas). ¿Cómo se cuenta?', o:['26³ · 10⁴','26³ + 10⁴'], a:1, w:'Son dos tipos de placa que se excluyen: se suman.' } ],
    ex:['D14'], mas:['D13','D12','H12','D15','H16'] } ] },

{ t:'Permutaciones', d:'Cuando el orden importa: n!, P(n, r), condiciones y elementos repetidos (Combinatoria I).', lessons:[
  { id:'factorial', t:'Ordenar todo: n!', obj:'Contar los ordenamientos de todos los elementos de un conjunto y operar con factoriales.',
    intro:[`<h2>Permutaciones: el orden importa</h2>
<p class="prose">Una <b>permutación</b> de un conjunto es un ordenamiento de todos sus elementos en fila. {a, b, c} tiene 6:</p>
<div data-enum data-items="a,b,c" data-r="3" data-mode="P"></div>
${WHY('factorial')}
<ul><li>n! = n · (n − 1)!; por ejemplo 8! = 8 · 7!.</li><li>Crece rapidísimo: 10! = 3,628,800.</li></ul>
${calc('7!')}
<p class="prose">Eso cuenta los ordenamientos de PERMUTA, que tiene 7 letras distintas. Cambia la expresión: prueba <code>10!/8!</code> o <code>0!</code>.</p>`],
    quiz:[
      { teo:true, q:'0! vale…', o:['0','1'], a:1, w:'Por convención 0! = 1: hay una sola forma de ordenar cero objetos. Así C(n, n) = n!/(n!·0!) da 1.' },
      { teo:true, q:'¿De dónde sale que n objetos tengan n! ordenamientos?', o:['Ordenar son n pasos con n, n − 1, …, 1 opciones, que se multiplican por la regla del producto','Cada objeto se puede poner en n lugares, así que son nⁿ','De sumar 1 + 2 + … + n'], a:0, w:'Es el teorema de tu clase: cada lugar tiene una opción menos que el anterior.' },
      { q:'8!/6! =', o:['56','2','8'], a:0, chk:'8!/6!', w:'8!/6! = 8 · 7 = 56: lo demás se cancela.' },
      { src:LIBRO(6), q:'¿De cuántas maneras se pueden sentar cinco personas en cinco sillas en fila?', o:['220','120','60','40'], a:1, chk:'5!', w:'5! = 120.' } ],
    pool:[
      { src:LIBRO(7), q:'Cinco personas en cinco sillas en fila, y una de ellas ocupa siempre el mismo lugar. ¿De cuántas maneras?', o:['24','720','120','12'], a:0, chk:'4!', w:'Solo se acomodan las otras 4: 4! = 24.' },
      { q:'n! = n · …', o:['(n − 1)!','n!','(n + 1)!'], a:0, w:'Por ejemplo 5! = 5 · 4!.' } ],
    ex:['D18'], mas:['D16','D17','H26','H43'] },
  { id:'p-n-r', t:'Ordenar algunos: P(n, r)', obj:'Contar selecciones ordenadas de r elementos tomados de n, con y sin repetición, y explicar de dónde sale la fórmula.',
    intro:[`<h2>Ordenar solo algunos: P(n, r)</h2>
<p class="prose">Una <b>r-permutación</b> es una selección <b>ordenada</b> de r elementos tomados de n. Su número es</p>
<div class="big-f">P(n, r) = n · (n − 1) · … · (n − r + 1) = ${F('n!','(n − r)!')}</div>
<p class="prose">Con {a, b, c} y r = 2 salen 6 parejas ordenadas; ab y ba cuentan distinto:</p>
<div data-enum data-items="a,b,c" data-r="2" data-mode="P"></div>
${WHY('pnr')}
<p class="prose">Ejemplo del libro: 8 autos compiten y se premian 1º, 2º y 3º: P(8, 3) = 8 · 7 · 6 = 336.</p>
${calc('P(8,3)')}
<div class="note">En la hoja de problemas P(n, r) aparece como V (<b>variaciones</b>) y nʳ como VR (variaciones con repetición). La calculadora entiende las dos notaciones: <code>V(10,3)</code> es lo mismo que <code>P(10,3)</code>.</div>`,
`<h2>¿Con repetición o sin repetición?</h2>
<div class="tw"><table class="t"><tr><th>Situación</th><th>¿Se repite?</th><th>Cuenta</th></tr>
<tr><td>Placas: 4 letras y 3 dígitos</td><td>Sí</td><td class="mono">26⁴ · 10³</td></tr>
<tr><td>Product Owner, Scrum Master y Tech Lead de 10 ingenieros</td><td>No</td><td class="mono">P(10, 3) = 720</td></tr>
<tr><td>Tokens de 4 caracteres de {A, E, I, 1, 2, 3} sin repetir</td><td>No</td><td class="mono">P(6, 4) = 360</td></tr></table></div>
<p class="prose">Si el enunciado no lo dice, piensa en la vida real: un dígito de una placa sí se repite; una persona no ocupa dos cargos.</p>`],
    quiz:[
      { q:'P(4, 3) =', o:['12','24','64'], a:1, chk:'P(4,3)', w:'4 · 3 · 2 = 24.' },
      { teo:true, q:'En P(n, r) = n(n − 1)⋯(n − r + 1), ¿por qué el último factor es n − r + 1?', o:['Porque al llenar el lugar r ya se usaron r − 1 elementos','Porque se resta r y se suma 1 por el cero','Porque así lo pide la regla de la suma'], a:0, w:'En el lugar k quedan n − (k − 1) opciones; con k = r quedan n − r + 1.' },
      { teo:true, q:'P(n, n) es igual a…', o:['n!','1','n'], a:0, w:'n!/(n − n)! = n!/0! = n!: ordenar todos.' } ],
    pool:[
      { src:LIBRO(5), q:'Un sindicato de 20 miembros elige presidente, secretario y tesorero. ¿Cuántas representaciones son posibles?', o:['6804','6840','8628','8640'], a:1, chk:'P(20,3)', w:'20 · 19 · 18 = 6,840.' },
      { src:LIBRO(13), q:'Se elige un representante y un suplente entre 6 candidatos. ¿De cuántas maneras?', o:['21','30','24','36'], a:1, chk:'P(6,2)', w:'Son cargos distintos: 6 · 5 = 30.' },
      { src:LIBRO(14), q:'Cinco atletas se disputan oro, plata y bronce. ¿De cuántas formas se reparten las medallas?', o:['60','13','125','50'], a:0, chk:'P(5,3)', w:'5 · 4 · 3 = 60.' },
      { src:LIBRO(9), q:'¿Cuántos números de 5 cifras se forman con 3, 4, 5, 6, 7 y 8 sin repetir?', o:['720','200','160','120'], a:0, chk:'P(6,5)', w:'6 · 5 · 4 · 3 · 2 = 720.' },
      { teo:true, q:'¿Por qué n(n − 1)⋯(n − r + 1) es igual a n!/(n − r)!?', o:['Porque n! = n(n − 1)⋯(n − r + 1) · (n − r)!, y al dividir se cancela (n − r)!','Porque (n − r)! es el número de repeticiones','Porque se suman los factores que faltan'], a:0, w:'Multiplicar y dividir entre (n − r)! completa el factorial de arriba.' } ],
    ex:['D21','T3'], mas:['D19','D20','D22','H13','H21','H35','H38'] },
  { id:'restricciones', t:'Permutaciones con condiciones', obj:'Resolver filas con extremos fijos, bloques que van juntos, mesas redondas y elementos que no pueden quedar juntos.',
    intro:[`<h2>Cuatro técnicas</h2>
<h3>1. Primero lo restringido</h3>
<p class="prose">Coloca primero a quien tiene condiciones y luego al resto. Familia de 5 con los padres en los extremos: padres 2! formas, hijos en medio 3!. Total 2 · 6 = 12.</p>
<h3>2. Juntos = un bloque</h3>
<p class="prose">Si unos elementos deben ir juntos, pégalos en un bloque, ordena los bloques y luego ordena dentro de cada bloque. 8 libros (3 de mate, 2 de historia, 3 de ciencia) con cada tema junto: 3 bloques → 3!, y adentro 3! · 2! · 3!.</p>
${calc('3! * 3! * 2! * 3!')}
<h3>3. En círculo: (n − 1)!</h3>
<p class="prose">En una mesa redonda, girar a todos un lugar da la misma acomodación. Con 8 servidores en anillo: 7! = 5,040. La calculadora lo tiene como <code>PC(8)</code>.</p>
${WHY('circulo')}
<h3>4. Separados = total − juntos</h3>
<p class="prose">«Ana y Beto no juntos» en una fila de 5 se cuenta con el complemento: todas las filas menos las que los tienen juntos.</p>
${calc('5! - 2*4!')}`],
    quiz:[
      { q:'5 personas alrededor de una mesa redonda', o:['120','24','5'], a:1, chk:'4!', w:'(5 − 1)! = 24.' },
      { teo:true, q:'¿Por qué en una mesa redonda son (n − 1)! acomodos y no n!?', o:['Cada acomodo circular aparece n veces entre las n! filas (sus rotaciones), y n!/n = (n − 1)!','Porque una persona no se sienta','Porque en un círculo el orden no importa'], a:0, w:'También puedes fijar a una persona y ordenar a las otras n − 1.' },
      { teo:true, q:'Contar «Ana y Beto separados» es más fácil como…', o:['Total − (Ana y Beto juntos)','Total − 2'], a:0, w:'Complemento: «separados» y «juntos» no se enciman y juntos son el total.' } ],
    pool:[
      { q:'Para que 3 libros queden juntos en un estante…', o:['Los tratas como un bloque y multiplicas por 3! (su orden interno)','Restas 3! al total'], a:0, w:'Bloque primero, orden interno después.' },
      { q:'10 personas en fila con 2 de ellas fijas en los extremos', o:['8!','2 · 8!','10! − 2'], a:1, w:'Los dos de los extremos se pueden intercambiar.' } ],
    ex:['D25'], mas:['D24','H7','H36','H47','H52','H61','D23'] },
  { id:'repetidos', t:'Elementos repetidos', obj:'Contar ordenamientos cuando hay elementos iguales: anagramas, bolas de colores y quinielas.',
    intro:[`<h2>Cuando hay elementos repetidos</h2>
<p class="prose">Si una palabra tiene letras repetidas, el orden ya no da n! palabras distintas: intercambiar dos A iguales da la misma palabra.</p>
${WHY('repetidos')}
<p class="prose">En la hoja se llama PR (permutaciones con repetición).</p>
<div data-enum data-items="CASA" data-r="4" data-mode="A"></div>
<h3>MATEMATICAS</h3>
<p class="prose">11 letras: M ×2, A ×3, T ×2 y E, I, C, S una vez. 11!/(2!·3!·2!) = 1,663,200. En la calculadora: <code>PR(11, 2, 3, 2)</code>.</p>
${calc('PR(11,2,3,2)')}
<div class="note">Con solo dos tipos, por ejemplo 8 bits con 3 unos y 5 ceros, n!/(a!·b!) es lo mismo que C(8, 3): escoger en qué posiciones van los unos. Es el puente hacia las combinaciones.</div>`],
    quiz:[
      { q:'¿Cuántos ordenamientos distintos tienen las letras de ANA?', o:['6','3','2'], a:1, chk:'3!/2!', w:'ANA, AAN y NAA.' },
      { teo:true, q:'En CASA, ¿por qué se divide entre 2!?', o:['Porque intercambiar las dos A da la misma palabra: cada palabra se contó 2! veces','Porque hay 2 vocales'], a:0, w:'Si cada resultado se contó k veces, se divide entre k.' },
      { teo:true, q:'Ordenar 5 objetos donde 3 son iguales entre sí y los otros 2 también da lo mismo que…', o:['C(5, 2)','P(5, 2)','5!'], a:0, w:'5!/(3!·2!) = 10 = C(5, 2): solo escoges dónde van los 2.' } ],
    pool:[
      { q:'2 bolas rojas y 2 azules en fila. ¿Cuántas filas distintas?', o:['6','24','4'], a:0, chk:'4!/(2!*2!)', w:'4!/(2!·2!) = 6.' } ],
    ex:['H50','H48'], mas:['D26','D27','H39','H55'] } ] },

{ t:'Combinaciones', d:'Cuando el orden no importa: C(n, r), comités con condiciones y repartos en grupos (Combinatoria II).', lessons:[
  { id:'combinaciones', t:'¿Importa el orden? C(n, r)', obj:'Distinguir permutaciones de combinaciones, calcular C(n, r) y explicar de dónde sale la fórmula.',
    intro:[`<h2>Combinaciones: el orden no importa</h2>
<p class="prose">De un grupo de 4 (A, B, C, D) se eligen 2 personas. Compara:</p>
<div class="two"><div class="card-mini"><b>Presidente y secretario</b><p class="small">AB ≠ BA</p><div data-enum data-items="A,B,C,D" data-r="2" data-mode="P"></div></div><div class="card-mini"><b>Equipo de dos</b><p class="small">AB = BA</p><div data-enum data-items="A,B,C,D" data-r="2" data-mode="C"></div></div></div>
<p class="prose">Una <b>r-combinación</b> es un subconjunto de r elementos. Cada equipo aparece 2! veces en la lista de cargos: 12 = 6 · 2.</p>
${WHY('cnr')}
<p class="prose">También se escribe como (n r) en columna o ₙCᵣ. Cinco de doce para un proyecto especial: C(12, 5).</p>
${calc('C(12,5)')}
<ul><li>C(n, 0) = C(n, n) = 1 y C(n, 1) = n.</li><li>C(n, 2) = n(n − 1)/2: saludos, partidos de liga, segmentos entre puntos.</li></ul>`,
`<h2>La pregunta clave</h2>
<p class="prose">Antes de calcular pregúntate: <b>si cambio el orden, ¿obtengo otro resultado?</b></p>
<div class="tw"><table class="t"><tr><th>Problema</th><th>¿Otro resultado?</th><th>Cuenta</th></tr>
<tr><td>2 libros de regalo de 15</td><td>No</td><td class="mono">C(15, 2) = 105</td></tr>
<tr><td>Boleto con 1º, 2º y 3º de 10 caballos</td><td>Sí</td><td class="mono">P(10, 3) = 720</td></tr>
<tr><td>Elegir 3 colores de 7</td><td>No</td><td class="mono">C(7, 3) = 35</td></tr>
<tr><td>Bandera de 3 franjas con 7 colores</td><td>Sí</td><td class="mono">P(7, 3) = 210</td></tr>
<tr><td>Mezclar 3 de 5 colores (libro)</td><td>No</td><td class="mono">C(5, 3) = 10</td></tr></table></div>
<div class="callout"><b>Palabras que suelen indicar combinación:</b> grupo, comité, equipo, elegir, escoger, saludos, manos de cartas. <b>Palabras de orden:</b> fila, cargos distintos, lugares, 1º/2º/3º, contraseña, número, palabra.</div>`],
    quiz:[
      { q:'Elegir 2 libros de 15 para regalarlos es…', o:OPT_CP, a:0, w:'Regalar A y B es lo mismo que B y A.' },
      { teo:true, q:'¿Por qué C(n, r) = P(n, r)/r!?', o:['Porque cada subconjunto de r elementos se puede ordenar de r! formas, así que aparece r! veces en P(n, r)','Porque r! es el número de subconjuntos','Porque al dividir entre r! se quitan los elementos repetidos del conjunto'], a:0, w:'P(n, r) = C(n, r) · r!: escoger el grupo y luego ordenarlo.' },
      { teo:true, q:'¿Por qué C(10, 3) = C(10, 7)?', o:['Escoger los 3 que entran es lo mismo que escoger los 7 que se quedan fuera','Por casualidad: los números salen iguales','Porque 3 + 7 = 10 y el orden no importa'], a:0, w:'Cada grupo de 3 corresponde a exactamente un grupo de 7 (su complemento). En la fórmula solo se intercambian 3! y 7!.' } ],
    pool:[
      { q:'Llenar boletos con el 1º, 2º y 3º de 10 caballos es…', o:OPT_CP, a:1, w:'El lugar de cada caballo importa.' },
      { q:'Contar los saludos entre 10 personas es…', o:OPT_CP, a:0, w:'Un saludo es una pareja sin orden.' },
      { src:LIBRO(10), q:'El encargado del cine escoge 2 películas de acción de 8 posibles. ¿Cuántas opciones tiene?', o:['20','25','28','10'], a:2, chk:'C(8,2)', w:'C(8, 2) = 28.' },
      { src:LIBRO(11), q:'Llegan 16 estudiantes tarde y el profesor deja entrar a 3, sin importar el orden. ¿De cuántas formas?', o:['560','240','300','650'], a:0, chk:'C(16,3)', w:'C(16, 3) = 560.' },
      { src:LIBRO(12), q:'¿Cuántos equipos de 6 jugadores se forman de un grupo de 9 personas?', o:['80','50','10','84'], a:3, chk:'C(9,6)', w:'C(9, 6) = C(9, 3) = 84.' },
      { src:LIBRO(15), q:'En una semifinal de 4 equipos cada uno juega contra los otros 3 una vez. ¿Cuántos partidos hay?', o:['6','5','4','7'], a:0, chk:'C(4,2)', w:'C(4, 2) = 6.' },
      { teo:true, q:'En el ejemplo de la clase hay 12 parejas de presidente y secretario y 6 equipos de dos. ¿Qué relación muestra eso?', o:['P(4, 2) = C(4, 2) · 2!','C(4, 2) = P(4, 2) · 2!','P(4, 2) = C(4, 2) + 2!'], a:0, w:'Cada equipo da 2! parejas ordenadas.' } ],
    ex:['D28','T4'], mas:['D29','D30','D31','H1','H6','H9','H23'] },
  { id:'comites', t:'Comités con condiciones', obj:'Resolver «exactamente», «al menos», «debe estar» y «no pueden estar juntos» con producto, suma y complemento.',
    intro:[`<h2>Comités con condiciones</h2>
<p class="prose">Con grupos (mujeres y hombres, mate y física) se combinan las dos reglas: <b>producto</b> para elegir de cada grupo y <b>suma</b> para juntar casos.</p>
<h3>Exactamente</h3>
<p class="prose">Comité de 3 con exactamente 1 mujer, de 4 mujeres y 6 hombres: C(4, 1) · C(6, 2) = 4 · 15 = 60.</p>
<h3>Al menos, por casos (como en la clase)</h3>
<div class="big-f">C(4,1)·C(6,2) + C(4,2)·C(6,1) + C(4,3)·C(6,0) = 60 + 36 + 4 = 100</div>
<h3>Al menos, por complemento</h3>
<p class="prose">Todos los comités menos los que no tienen mujeres:</p>
${calc('C(10,3) - C(6,3)')}
<div class="callout"><b>Trampa clásica:</b> «escojo una mujer seguro y luego 2 de los 9 restantes», C(4,1)·C(9,2) = 144, cuenta de más: el comité {Ana, Bety, Carlos} sale una vez con Ana como «la segura» y otra con Bety.</div>
<h3>Incluir o excluir a alguien</h3>
<ul><li><b>Debe estar X:</b> mételo y elige el resto de los que quedan. Equipo de 5 de 10 con el portero: C(9, 4).</li><li><b>No puede estar X:</b> sácalo del grupo: C(9, 5).</li><li><b>X y Y no pueden estar juntos:</b> total − (los que tienen a los dos).</li></ul>`],
    quiz:[
      { teo:true, q:'«Al menos una mujer» es lo mismo que…', o:['Total − comités sin mujeres','Total − comités con una mujer'], a:0, w:'Lo contrario de «al menos una» es «ninguna».' },
      { q:'De 5 hombres y 4 mujeres, comités de 3 con exactamente 2 mujeres', o:['C(4,2) · C(5,1)','C(4,2) + C(5,1)','C(9,3)'], a:0, w:'Eliges 2 mujeres y 1 hombre: dos pasos, se multiplica. Son 6 · 5 = 30.' },
      { teo:true, q:'«Escojo una mujer segura y luego 2 de los 9 restantes» da 144, pero los comités con al menos una mujer son 100. ¿Por qué cuenta de más?', o:['Un comité con 2 o 3 mujeres se cuenta una vez por cada mujer que pudo ser «la segura»','Porque faltó multiplicar por 3!','Porque hay que restar los comités de solo hombres'], a:0, w:'{Ana, Bety, Carlos} sale con Ana como la segura y otra vez con Bety. Por eso se cuenta por casos o con el complemento.' } ],
    pool:[
      { q:'Comité de 3 de 10 personas que debe incluir a Ana', o:['C(9, 2)','C(10, 3) − 1','C(9, 3)'], a:0, w:'Ana ya está; eliges 2 de los otros 9.' },
      { q:'Comité de 3 de 10 que no puede incluir a Ana', o:['C(9, 3)','C(10, 3) − 1'], a:0, w:'Quitas a Ana del grupo y eliges 3 de 9.' } ],
    ex:['D32'], mas:['D33','D34','D35','H14','H29','H31','H49'] },
  { id:'grupos', t:'Repartir en grupos', obj:'Repartir objetos en grupos con y sin nombre, y manejar números enormes como el bridge.',
    intro:[`<h2>Repartir en grupos</h2>
<p class="prose">Para repartir n objetos en grupos con nombre de tamaños a, b, c, …, eliges el primer grupo, luego el segundo entre los que quedan, y así:</p>
<div class="big-f">C(n, a) · C(n − a, b) · C(n − a − b, c) · … = ${F('n!','a! · b! · c! · …')}</div>
<p class="prose">Es la misma fórmula de las letras repetidas: repartir es ponerle a cada objeto la etiqueta de su grupo.</p>
<h3>Bridge</h3>
<p class="prose">52 cartas en 4 manos de 13: C(52,13) · C(39,13) · C(26,13) · C(13,13). Al último jugador le toca lo que queda (1 forma).</p>
${calc('C(52,13) * C(39,13) * C(26,13)')}
<h3>¿Los grupos tienen nombre?</h3>
<p class="prose">Si los grupos son intercambiables (solo «dos equipos de 3», sin nombre ni color), cada reparto se contó tantas veces como formas de ordenar esos grupos: divide entre k! si hay k grupos del mismo tamaño. 6 personas en dos equipos de 3: con nombre C(6,3) = 20; sin nombre 20/2! = 10.</p>
${calc('C(6,3)/2!')}`],
    quiz:[
      { q:'Repartir 6 personas en el equipo Rojo (3) y el equipo Azul (3)', o:['20','10','720'], a:0, chk:'C(6,3)', w:'Eliges a los del Rojo; los demás van al Azul.' },
      { q:'¿Y si las 6 personas forman «dos equipos de 3» sin nombre ni color?', o:['20','10','40'], a:1, chk:'C(6,3)/2', w:'Cada reparto se contó 2! veces.' },
      { teo:true, q:'¿Por qué se divide entre 2! cuando los dos equipos de 3 no tienen nombre?', o:['Porque cada reparto aparece dos veces: con los equipos intercambiados','Porque cada equipo tiene 2 integrantes','Porque el orden dentro del equipo importa'], a:0, w:'{A,B,C | D,E,F} y {D,E,F | A,B,C} son el mismo reparto si los equipos no tienen nombre.' } ],
    pool:[
      { q:'C(52,13) · C(39,13) · C(26,13) es igual a…', o:['52!/(13!)⁴','52!/13!'], a:0, w:'Es el reparto en 4 grupos de 13.' },
      { src:LIBRO(8), q:'¿De cuántas maneras se pueden distribuir 4 personas en dos equipos A y B de 2 personas cada uno?', o:['3','4','5','6'], a:3, chk:'C(4,2)', w:'Eliges quiénes van al equipo A: C(4, 2) = 6; el resto va al B. (Sin nombre serían 3.)' } ],
    ex:['D40'], mas:['D36','D37','D38','H27','D39'] } ] },

{ t:'Repaso para el examen', d:'Decidir qué fórmula usar y la teoría que te pueden preguntar. Dos extras opcionales.', lessons:[
  { id:'que-formula', t:'¿Qué fórmula uso?', obj:'Elegir la herramienta correcta con tres preguntas: ¿pasos o casos?, ¿importa el orden?, ¿se repite?',
    intro:[`<h2>Tres preguntas</h2>
<ol><li><b>¿Pasos o casos?</b> Varios pasos que se hacen todos → multiplica. Casos que se excluyen → suma.</li><li><b>¿Importa el orden?</b> Si cambiar el orden da otro resultado, sí.</li><li><b>¿Se puede repetir?</b> ¿Un elemento puede usarse dos veces?</li></ol>
<div class="tw"><table class="t"><tr><th></th><th>Sin repetir</th><th>Con repetición</th></tr>
<tr><td><b>Importa el orden</b></td><td class="mono">P(n, r) = n!/(n − r)!</td><td class="mono">nʳ</td></tr>
<tr><td><b>No importa el orden</b></td><td class="mono">C(n, r) = n!/(r!(n − r)!)</td><td class="mono">CR(n, r) = C(n + r − 1, r) (extra)</td></tr>
<tr><td><b>Ordenar todo con repetidos</b></td><td colspan="2" class="mono">n!/(a! · b! · …)</td></tr></table></div>
<p class="prose">Y antes de todo: si hay pocas opciones o las condiciones cambian según lo anterior, dibuja el árbol.</p>
<div data-enum data-items="A,B,C,D" data-r="2" data-mode="P"></div>
<p class="small">Cambia el tipo de conteo del enumerador para ver los cuatro casos con los mismos elementos.</p>`],
    quiz:[
      { q:'Tres premios distintos para 20 alumnos; uno puede ganar varios.', o:['20³','P(20, 3)','C(20, 3)'], a:0, w:'Orden importa y se repite.' },
      { q:'Escoger 3 asignaturas de 6 optativas.', o:['6³','P(6, 3)','C(6, 3)'], a:2, w:'Sin orden y sin repetir.' },
      { q:'Ordenar las letras de BANANA.', o:['6!','6!/(3!·2!)','C(6, 3)'], a:1, w:'A ×3 y N ×2.' },
      { teo:true, q:'¿Por qué nʳ permite repetir y P(n, r) no?', o:['En nʳ cada paso conserva sus n opciones; en P(n, r) cada elemento usado ya no está disponible y cada paso tiene una opción menos','Porque nʳ es más grande','Porque P(n, r) no toma en cuenta el orden'], a:0, w:'Las dos salen de la regla del producto; cambia cuántas opciones quedan en cada paso.' } ],
    pool:[
      { q:'Diálogos sin intérprete con 40 que solo hablan inglés y 20 que solo hablan alemán.', o:['C(60, 2)','C(40, 2) + C(20, 2)','C(40, 2) · C(20, 2)'], a:1, w:'O pareja de inglés o pareja de alemán.' },
      { q:'Una comisión con un alumno de cada uno de 4 cursos (40, 35, 32 y 28 alumnos).', o:['40 + 35 + 32 + 28','40 · 35 · 32 · 28','C(135, 4)'], a:1, w:'Cuatro pasos que se hacen todos.' },
      { q:'Manos de 5 cartas de una baraja de 40.', o:['P(40, 5)','C(40, 5)','40⁵'], a:1, w:'Una mano no tiene orden.' } ],
    ex:['D41'], mas:['D42','D43','H15','H30'] },
  { id:'teoria', t:'Teoría: de dónde sale cada fórmula', obj:'Explicar con tus palabras de dónde salen las fórmulas y las propiedades que te pueden preguntar en el examen.',
    intro:[`<h2>Cómo contestar una pregunta de teoría</h2>
<p class="prose">Tu clase pregunta «¿de dónde sale esta fórmula?». Una buena respuesta tiene tres partes:</p>
<ol><li><b>Qué cuenta.</b> Di en una frase qué estás contando: selecciones ordenadas, subconjuntos, funciones…</li><li><b>Con qué regla.</b> Parte la tarea en pasos (regla del producto), en casos que se excluyen (regla de la suma), o di cuántas veces se contó cada resultado y divide.</li><li><b>A qué llegas.</b> Escribe la fórmula y, si puedes, comprueba con un caso chico.</li></ol>
<h3>Todo el módulo en una línea por tema</h3>
<div class="tw"><table class="t"><tr><th>Tema</th><th>El argumento</th></tr>${THEORY.filter(t => t.k !== 'funciones-ab').map(t => '<tr><td>' + t.t + '</td><td>' + t.linea + '</td></tr>').join('')}</table></div>
<p class="small">La explicación completa de cada uno está en su lección y en el formulario.</p>`,
`<h2>La que falta: cuántas funciones hay de A en B</h2>
<p class="prose">Esta pregunta junta los dos temas del examen: funciones y regla del producto.</p>
${WHY('funciones-ab')}
${ERRATA_MN}`],
    quiz:[
      { teo:true, q:'Te piden explicar de dónde sale C(n, r). ¿Qué regla conecta C(n, r) con P(n, r)?', o:['La regla del producto: P(n, r) = C(n, r) · r!','La regla de la suma: P(n, r) = C(n, r) + r!','El complemento: C(n, r) = n! − P(n, r)'], a:0, w:'Escoger el grupo y luego ordenarlo son dos pasos.' },
      { teo:true, q:'Con |A| = 3 y |B| = 2, ¿cuántas funciones hay de A en B?', o:['8','6','9'], a:0, chk:'2^3', w:'Cada uno de los 3 elementos de A escoge entre 2 imágenes: 2³ = 8. El 6 = 3 · 2 cuenta las parejas de A × B.' },
      { teo:true, q:'¿Qué tienen en común las fórmulas n!/(a! · b!), (n − 1)! y C(n, r) = P(n, r)/r!?', o:['Cuentan de más a propósito y luego dividen entre las veces que se repite cada resultado','Todas usan la regla de la suma','Todas cuentan funciones inyectivas'], a:0, w:'Si cada resultado aparece k veces, se divide entre k.' },
      { teo:true, q:'Para demostrar que g ∘ f es inyectiva cuando f y g lo son, ¿por dónde empiezas?', o:['Supones g(f(x₁)) = g(f(x₂)) y usas primero que g es inyectiva','Supones x₁ = x₂ y llegas a g(f(x₁)) = g(f(x₂))','Das un ejemplo con números'], a:0, w:'La segunda solo prueba que g ∘ f es función. La inyectividad va de imágenes iguales a elementos iguales.' } ],
    pool:[
      { teo:true, q:'¿Cuántas funciones inyectivas hay de un conjunto de 3 elementos a uno de 5?', o:['60','125','10'], a:0, chk:'P(5,3)', w:'Las imágenes no se repiten: 5 · 4 · 3 = P(5, 3) = 60. 125 = 5³ son todas las funciones.' } ],
    ex:['T5'] },
  { id:'computacion', optional:true, t:'Extra: conteo en computación', obj:'Aplicar todo a bits, direcciones IP, teléfonos, usuarios y funciones entre conjuntos.',
    intro:[`<h2>Conteo en computación</h2>
<div class="callout"><b>Opcional.</b> Más práctica con los problemas de cómputo de tu clase. No bloquea las demás lecciones.</div>
<p class="prose">Tu clase abrió el módulo con preguntas como estas. Ya tienes todas las herramientas:</p>
<div class="tw"><table class="t"><tr><th>Pregunta</th><th>Respuesta</th></tr>
<tr><td>¿Cuántas cadenas de n bits hay?</td><td class="mono">2ⁿ</td></tr>
<tr><td>¿Cuántas tienen exactamente k unos?</td><td class="mono">C(n, k)</td></tr>
<tr><td>¿Cuántos números de 16 bits tienen exactamente 4 unos?</td><td class="mono">C(16, 4) = 1,820</td></tr>
<tr><td>¿Cuántas direcciones IPv4 hay?</td><td class="mono">2³²</td></tr>
<tr><td>¿Cuántas funciones hay de A (m elementos) en B (n elementos)?</td><td class="mono">nᵐ</td></tr>
<tr><td>¿Cuántas son inyectivas?</td><td class="mono">P(n, m), si m ≤ n</td></tr>
<tr><td>¿Cuántas biyecciones hay de un conjunto de n en sí mismo?</td><td class="mono">n!</td></tr></table></div>
<div class="two">${calc('C(16,4)')}${calc('2^32')}</div>`],
    quiz:[
      { q:'¿Cuántos números de 16 bits tienen exactamente 4 unos?', o:['1820','65536','43680'], a:0, chk:'C(16,4)', w:'Escoges las 4 posiciones de los unos: C(16, 4).' },
      { q:'Las direcciones IPv4 tienen 32 bits. ¿Cuántas hay en total?', o:['2³²','32²','32!'], a:0, w:'Cada bit tiene 2 opciones.' },
      { q:'¿Cuántas funciones hay de un conjunto de 4 elementos en {0, 1}?', o:['8','16','4'], a:1, chk:'2^4', w:'Cada elemento escoge 0 o 1: 2⁴. Coincide con el número de subconjuntos: la función dice quién está (1) y quién no (0).' } ],
    ex:['D44','D45','D46','D47','D48'] },
  { id:'repeticion', t:'Extra: combinaciones con repetición', optional:true, obj:'Contar selecciones sin orden que pueden repetir elementos, con estrellas y barras.',
    intro:[`<h2>Extra: combinaciones con repetición</h2>
<div class="callout"><b>Opcional.</b> Este tema aparece en la intro de tu clase (las donas) y en el libro (el dominó), pero no está en la lista de temas del tercer examen. Pregúntale a tu profe si entra. Esta lección no bloquea las siguientes.</div>
<p class="prose">¿De cuántas maneras eliges una docena de donas si hay 5 tipos? El orden no importa y puedes repetir tipo. El truco de <b>estrellas y barras</b>: cada docena es una fila de 12 estrellas (donas) y 4 barras que separan los 5 tipos.</p>
<div class="big-f">★★★ | ★★ | | ★★★★★ | ★★ → 3, 2, 0, 5 y 2 donas de cada tipo</div>
<p class="prose">Contar docenas es escoger en qué 4 de las 16 posiciones van las barras:</p>
<div class="big-f">CR(n, r) = C(n + r − 1, r) → CR(5, 12) = C(16, 12) = C(16, 4) = 1,820</div>
${calc('CR(5,12)')}
<div data-enum data-items="A,B,C" data-r="2" data-mode="CR"></div>`],
    quiz:[
      { src:LIBRO(2), noExam:true, q:'Se construye un dominó con los números del 0 al 6. ¿Cuántas fichas tiene?', o:['21','28','14','17'], a:1, chk:'CR(7,2)', w:'Parejas sin orden que pueden repetir número (las mulas): CR(7, 2) = C(8, 2) = 28. También: 21 fichas con números distintos + 7 mulas.' },
      { noExam:true, q:'CR(n, r) se calcula como…', o:['C(n + r − 1, r)','C(n, r) + r','nʳ/r!'], a:0, w:'n − 1 barras y r estrellas en n + r − 1 posiciones.' } ],
    ex:['D50','D51','D52'] } ] },

{ t:'Examen', d:'Simulacro del tercer examen con preguntas de teoría y problemas nuevos.', lessons:[
  { id:'examen', kind:'examen', t:'Simulacro del examen 3', obj:'Demostrar que dominas funciones y combinatoria, incluida la teoría.',
    intro:`<h2>Simulacro del tercer examen</h2>
<p class="prose">Mezcla los dos temas del examen: <b>funciones</b> (dominio, codominio, imagen, diagramas de flechas, inyectiva, sobreyectiva, biyectiva, inversa y composición) y <b>combinatoria</b> (árboles, regla de la multiplicación, permutaciones, regla de la suma y combinaciones).</p>
<ul><li><b>${EXAM_Q} preguntas</b> al azar de la ruta, al menos ${EXAM_TEO} de teoría. Algunas no aparecen en las lecciones. Se califican juntas al final; apruebas con ${EXAM_PASS}.</li><li><b>${EXAM_EX.length} problemas</b> que no aparecen en las lecciones: ${EXAM_EX.length - 1} de cuentas y uno de teoría para explicar con tus palabras. Los de cuentas cuentan si los resuelves sin abrir la solución antes; el de teoría, si tu explicación tiene todos los puntos.</li><li>«Hacer otro examen» genera uno nuevo con otras preguntas y otros problemas.</li></ul>
<p class="small">Consejo: resuélvelo con papel, como en el examen real. Usa la calculadora solo para revisar cuentas grandes.</p>` } ] }
];

/* ======================= FORMULARIO ======================= */
const FORMULARIO_HTML = `
<div class="sheet"><h2>Funciones</h2>
<div class="tw"><table class="t"><tr><th>Concepto</th><th>Qué significa</th><th>En el diagrama</th></tr>
<tr><td>Función f : X → Y</td><td>Cada x tiene exactamente una imagen</td><td>De cada punto de X sale una flecha</td></tr>
<tr><td>Dominio / codominio</td><td>X / Y completos</td><td>Columna izquierda / derecha</td></tr>
<tr><td>Rango</td><td class="mono">{y | y = f(x) para alguna x}</td><td>Los de Y que reciben flecha</td></tr>
<tr><td>Imagen inversa de y</td><td class="mono">{x | f(x) = y}</td><td>Los de X que apuntan a y</td></tr>
<tr><td>Inyectiva</td><td class="mono">f(x₁) = f(x₂) ⇒ x₁ = x₂</td><td>Nadie en Y recibe dos flechas</td></tr>
<tr><td>Sobreyectiva</td><td class="mono">∀y ∃x: f(x) = y</td><td>Todos en Y reciben flecha</td></tr>
<tr><td>Biyectiva</td><td>Inyectiva y sobreyectiva</td><td>Cada uno de Y recibe exactamente una</td></tr>
<tr><td>Inversa f⁻¹</td><td>Solo si f es biyectiva; despeja x de y = f(x)</td><td>Voltear las flechas</td></tr>
<tr><td>Composición</td><td class="mono">(g ∘ f)(x) = g(f(x))</td><td>Primero f, luego g</td></tr>
<tr><td>Misma cardinalidad</td><td>Existe una biyección</td><td>—</td></tr></table></div>
<p class="small">Tamaños finitos: |X| > |Y| ⇒ no inyectiva; |X| < |Y| ⇒ no sobreyectiva. Funciones de X (m) en Y (n): nᵐ; inyectivas P(n, m).</p></div>
<div class="sheet"><h2>Reglas básicas</h2>
<div class="tw"><table class="t"><tr><th>Regla</th><th>Cuándo</th><th>Cuenta</th></tr>
<tr><td>Producto</td><td>Pasos que se hacen todos («y»)</td><td class="mono">n₁ · n₂ · … · nₖ</td></tr>
<tr><td>Suma</td><td>Casos que se excluyen («o»)</td><td class="mono">m + n</td></tr>
<tr><td>Complemento</td><td>«Al menos uno», «no juntos»</td><td class="mono">total − lo contrario</td></tr>
<tr><td>Árbol</td><td>Pocos casos o condiciones que cambian</td><td>Contar hojas</td></tr></table></div></div>
<div class="sheet"><h2>Fórmulas</h2>
<div class="tw"><table class="t"><tr><th>Situación</th><th>Fórmula</th><th>En tu hoja</th><th>En la calculadora</th></tr>
<tr><td>Ordenar n distintos</td><td class="mono">n!</td><td class="mono">Pₙ</td><td class="mono">n!  o  P(n)</td></tr>
<tr><td>Ordenar r de n, sin repetir</td><td class="mono">P(n, r) = n!/(n − r)!</td><td class="mono">V (variaciones)</td><td class="mono">P(n,r)  o  V(n,r)</td></tr>
<tr><td>Ordenar r de n, con repetición</td><td class="mono">nʳ</td><td class="mono">VR</td><td class="mono">n^r  o  VR(n,r)</td></tr>
<tr><td>Elegir r de n, sin orden</td><td class="mono">C(n, r) = n!/(r!(n − r)!)</td><td class="mono">C</td><td class="mono">C(n,r)</td></tr>
<tr><td>Elegir r de n tipos, sin orden, con repetición</td><td class="mono">C(n + r − 1, r)</td><td class="mono">CR</td><td class="mono">CR(n,r)</td></tr>
<tr><td>Ordenar con repetidos</td><td class="mono">n!/(a! · b! · …)</td><td class="mono">PR</td><td class="mono">PR(n,a,b,…)</td></tr>
<tr><td>En círculo</td><td class="mono">(n − 1)!</td><td class="mono">PC</td><td class="mono">PC(n)</td></tr>
<tr><td>Repartir en grupos con nombre</td><td class="mono">C(n,a) · C(n − a,b) · …</td><td>—</td><td class="mono">C(…)*C(…)</td></tr></table></div></div>
<div class="sheet"><h2>Técnicas con condiciones</h2>
<ul><li><b>Primero lo restringido:</b> coloca extremos y posiciones fijas antes que el resto.</li><li><b>Juntos:</b> forma un bloque, ordena bloques y luego el interior.</li><li><b>Separados:</b> total − juntos.</li><li><b>Debe estar X:</b> mételo y elige el resto de los que quedan. <b>No puede estar:</b> sácalo del grupo.</li><li><b>Al menos:</b> por casos (exactamente 1, 2, …) o por complemento.</li><li><b>Grupos sin nombre:</b> divide entre k! por cada k grupos iguales.</li></ul></div>`;
