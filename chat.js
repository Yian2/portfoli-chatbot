/* ============================================================
   XAT "PREGUNTA A LA NEUS"
   1) Si la web està publicada a Netlify amb la clau de Groq, respon un model
      de llenguatge (LLM) a través de /api/chat (netlify/functions/chat.mjs).
   2) Si no hi ha connexió amb la IA, respon el motor local d'aquí sota:
      detecta projectes, tecnologies i temes (sense accents ni majúscules)
      i no repeteix la mateixa resposta dues vegades seguides.
   Accions dins les respostes: [[projecte:id]] [[cv]] [[contacte]] [[projectes]]
   ============================================================ */
(() => {
const log = $('#chat-log'), form = $('#chat-form'), input = $('#chat-input'), chipsBox = $('#chips'), sendBtn = $('.send');
const history = []; // {role, content}
let busy = false, lastKey = null;

const UI = {
  ca:{hello:'Hola! Sóc la Neus. Bé, una versió amb IA de mi. Pregunta\'m pels meus projectes, les tecnologies que faig servir o la meva experiència.',
      chips:['Qui ets?','Quins projectes has fet?','Què saps d\'IA?','Quina experiència tens?','Saps Python?','Com et puc contactar?'],
      proj:'Veure', cv:'Descarregar CV', contact:'Contactar', all:'Tots els projectes', err:'Ara mateix no puc respondre. Torna-ho a provar o escriu-me a neus.filba@uvic.cat.'},
  es:{hello:'¡Hola! Soy Neus. Bueno, una versión con IA de mí. Pregúntame por mis proyectos, las tecnologías que uso o mi experiencia.',
      chips:['¿Quién eres?','¿Qué proyectos has hecho?','¿Qué sabes de IA?','¿Qué experiencia tienes?','¿Sabes Python?','¿Cómo te contacto?'],
      proj:'Ver', cv:'Descargar CV', contact:'Contactar', all:'Todos los proyectos', err:'Ahora mismo no puedo responder. Vuelve a intentarlo o escríbeme a neus.filba@uvic.cat.'},
  en:{hello:'Hi! I\'m Neus. Well, an AI version of me. Ask me about my projects, the technologies I use or my experience.',
      chips:['Who are you?','What have you built?','What do you know about AI?','What experience do you have?','Do you know Python?','How can I contact you?'],
      proj:'View', cv:'Download CV', contact:'Contact', all:'All projects', err:'I can\'t answer right now. Please try again or email me at neus.filba@uvic.cat.'}
};

/* ---------- 1. temes generals ---------- */
const R = {
  hi:{k:['hola','hello','hi','hey','bon dia','bona tarda','buenas','buenos dias','que tal','com estas','como estas','how are you'],
    ca:'Hola! Què t\'agradaria saber? Et puc explicar els meus projectes, la meva experiència o amb quines tecnologies treballo.',
    es:'¡Hola! ¿Qué te gustaría saber? Te puedo contar mis proyectos, mi experiencia o con qué tecnologías trabajo.',
    en:'Hi! What would you like to know? I can tell you about my projects, my experience or the technologies I work with.'},
  thanks:{k:['gracies','gracias','thanks','thank you','merci','perfecte','perfecto','genial','great'],
    ca:'De res! Si vols, pots descarregar el meu CV o escriure\'m directament. [[cv]] [[contacte]]',
    es:'¡De nada! Si quieres, puedes descargar mi CV o escribirme directamente. [[cv]] [[contacte]]',
    en:'You\'re welcome! Feel free to download my CV or get in touch directly. [[cv]] [[contacte]]'},
  bye:{k:['adeu','adios','bye','fins aviat','hasta luego','see you','chao'],
    ca:'Gràcies per passar-te! Si vols parlar de pràctiques, escriu-me quan vulguis. [[contacte]]',
    es:'¡Gracias por pasarte! Si quieres hablar de prácticas, escríbeme cuando quieras. [[contacte]]',
    en:'Thanks for stopping by! If you\'d like to talk about an internship, just write to me. [[contacte]]'},
  bot:{k:['ets real','eres real','are you real','ets un bot','eres un bot','are you a bot','ets una ia','eres una ia','are you an ai','com funciona aquest','como funciona este','how does this chat','chatgpt'],
    ca:'Sóc un assistent que respon en nom de la Neus. Quan la web està connectada, funciono amb un model de llenguatge (LLM) que només fa servir la informació real del seu perfil; si no, amb un motor de respostes propi. L\'he programat jo mateixa.',
    es:'Soy un asistente que responde en nombre de Neus. Cuando la web está conectada, funciono con un modelo de lenguaje (LLM) que solo usa la información real de su perfil; si no, con un motor de respuestas propio. Lo he programado yo misma.',
    en:'I\'m an assistant answering on Neus\'s behalf. When the site is connected, I run on a large language model (LLM) that only uses her real profile information; otherwise I use a built-in answer engine. I built it myself.'},
  about:{k:['qui ets','quien eres','who are you','presenta','about you','sobre tu','sobre ti','parla\'m de tu','hablame de ti','cuentame de ti','tell me about yourself','explica\'m qui'],
    ca:'Sóc la Neus Filbà, estudiant de 4t del Grau en Multimèdia a la Universitat de Vic. M\'agrada entendre problemes reals i resoldre\'ls amb tecnologia: webs, apps mòbils i solucions amb IA. Des d\'octubre de 2026 faig pràctiques de tractament de dades. [[projectes]] [[cv]]',
    es:'Soy Neus Filbà, estudiante de 4.º del Grado en Multimedia en la Universitat de Vic. Me gusta entender problemas reales y resolverlos con tecnología: webs, apps móviles y soluciones con IA. Desde octubre de 2026 hago prácticas de tratamiento de datos. [[projectes]] [[cv]]',
    en:'I\'m Neus Filbà, a final-year Multimedia student at the University of Vic (Barcelona). I like understanding real problems and solving them with technology: websites, mobile apps and AI solutions. Since October 2026 I\'ve been doing a data processing internship. [[projectes]] [[cv]]'},
  projects:{k:['projecte','proyecto','project','has fet','has hecho','have you built','what have you made','portfoli','portfolio','treballs','trabajos'],
    ca:'Els meus projectes destacats són:\n• Bolets del Montseny: xat amb IA (RAG) i mapa.\n• Mis Gastos: app mòbil de finances.\n• La Efímera: web i comandes d\'una pizzeria.\n• NF: botiga online amb WordPress.\nTambé tinc més apps i videojocs. [[projecte:bolets]] [[projecte:misgastos]] [[projecte:efimera]] [[projectes]]',
    es:'Mis proyectos destacados son:\n• Setas del Montseny: chat con IA (RAG) y mapa.\n• Mis Gastos: app móvil de finanzas.\n• La Efímera: web y pedidos de una pizzería.\n• NF: tienda online con WordPress.\nTambién tengo más apps y videojuegos. [[projecte:bolets]] [[projecte:misgastos]] [[projecte:efimera]] [[projectes]]',
    en:'My featured projects are:\n• Montseny Mushrooms: AI chat (RAG) with a map.\n• Mis Gastos: a personal finance mobile app.\n• La Efímera: website and ordering system for a pizzeria.\n• NF: a WordPress online shop.\nI also have more apps and games. [[projecte:bolets]] [[projecte:misgastos]] [[projecte:efimera]] [[projectes]]'},
  ai:{k:['ia','i.a','intel·ligencia','inteligencia','artificial','ai','rag','llm','machine learning','chatbot','model de llenguatge','modelo de lenguaje','automatitz','automatiz','automation'],
    ca:'La IA aplicada és el que més m\'interessa. Vaig fer "Bolets del Montseny": un xat amb RAG que busca a les fitxes dels bolets i un LLM (Groq) que respon citant les fonts, amb regles de seguretat al codi i un mapa d\'hàbitats. Aquest mateix xat també funciona amb un LLM. [[projecte:bolets]]',
    es:'La IA aplicada es lo que más me interesa. Hice "Setas del Montseny": un chat con RAG que busca en las fichas de las setas y un LLM (Groq) que responde citando las fuentes, con reglas de seguridad en el código y un mapa de hábitats. Este mismo chat también funciona con un LLM. [[projecte:bolets]]',
    en:'Applied AI is what interests me most. I built "Montseny Mushrooms": a RAG chat that searches mushroom data sheets and an LLM (Groq) that answers citing its sources, with safety rules in code and a habitat map. This chat also runs on an LLM. [[projecte:bolets]]'},
  iot:{k:['iot','internet of things','sensor','hardware','dispositiu','dispositivo','device','electronica','electronics'],
    ca:'Treballo amb Arduino i m\'interessa molt combinar l\'IoT amb la IA. Encara no tinc cap projecte IoT acabat per ensenyar aquí, però és el següent que vull afegir al portfoli.',
    es:'Trabajo con Arduino y me interesa mucho combinar el IoT con la IA. Todavía no tengo ningún proyecto IoT terminado para enseñar aquí, pero es lo siguiente que quiero añadir al portfolio.',
    en:'I work with Arduino and I\'m very interested in combining IoT with AI. I don\'t have a finished IoT project to show here yet, but it\'s the next thing I want to add.'},
  tfg:{k:['tfg','treball de fi','trabajo de fin','final project','final degree','thesis','tesi'],
    ca:'El TFG l\'estic començant aquest curs. Quan tingui resultats per ensenyar, el penjaré aquí. Mentrestant, et puc ensenyar els projectes que ja tinc acabats. [[projectes]]',
    es:'El TFG lo estoy empezando este curso. Cuando tenga resultados para enseñar, lo subiré aquí. Mientras tanto, te puedo enseñar los proyectos que ya tengo terminados. [[projectes]]',
    en:'I\'m just starting my final degree project this year. Once I have results to show, I\'ll add it here. In the meantime, have a look at my finished projects. [[projectes]]'},
  apps:{k:['app','apps','mobil','movil','mobile','android','ios'],
    ca:'He fet apps mòbils com Mis Gastos (React Native, Expo i TypeScript): controla ingressos, despeses i hores treballades, amb gràfics. També MakeupCatalog, per catalogar productes de maquillatge. [[projecte:misgastos]] [[projecte:makeup]]',
    es:'He hecho apps móviles como Mis Gastos (React Native, Expo y TypeScript): controla ingresos, gastos y horas trabajadas, con gráficos. También MakeupCatalog, para catalogar productos de maquillaje. [[projecte:misgastos]] [[projecte:makeup]]',
    en:'I\'ve built mobile apps like Mis Gastos (React Native, Expo and TypeScript): it tracks income, expenses and hours worked, with charts. Also MakeupCatalog, to catalogue makeup products. [[projecte:misgastos]] [[projecte:makeup]]'},
  web:{k:['web','webs','website','pagina','frontend','backend','full stack','fullstack','botiga online','tienda online','ecommerce','e-commerce'],
    ca:'En web he fet La Efímera (Laravel, PHP i MySQL), amb carta, comandes per emportar i un panell per gestionar-les; una botiga amb WordPress i WooCommerce; i la web Fashion Week. També treballo amb React i TypeScript. [[projecte:efimera]] [[projecte:nf]] [[projecte:fashion]]',
    es:'En web he hecho La Efímera (Laravel, PHP y MySQL), con carta, pedidos para llevar y un panel para gestionarlos; una tienda con WordPress y WooCommerce; y la web Fashion Week. También trabajo con React y TypeScript. [[projecte:efimera]] [[projecte:nf]] [[projecte:fashion]]',
    en:'On the web side I built La Efímera (Laravel, PHP and MySQL) with a menu, take-away orders and an admin panel; a WordPress/WooCommerce shop; and the Fashion Week site. I also work with React and TypeScript. [[projecte:efimera]] [[projecte:nf]] [[projecte:fashion]]'},
  games:{k:['joc','jocs','juego','juegos','game','games','videojoc','videojuego','gaming'],
    ca:'També faig videojocs: un joc multijugador en 3D amb Unity, StrawHop (plataformes 2D en pixel art) i un joc d\'escacs amb C++ i Qt. [[projecte:barcos]] [[projecte:strawhop]] [[projecte:escacs]]',
    es:'También hago videojuegos: un juego multijugador en 3D con Unity, StrawHop (plataformas 2D en pixel art) y un juego de ajedrez con C++ y Qt. [[projecte:barcos]] [[projecte:strawhop]] [[projecte:escacs]]',
    en:'I also make games: a 3D multiplayer game in Unity, StrawHop (a 2D pixel-art platformer) and a chess game in C++ with Qt. [[projecte:barcos]] [[projecte:strawhop]] [[projecte:escacs]]'},
  exp:{k:['experiencia','experience','practiques','practicas','internship','feina','trabajo','work','treballes','trabajas','cambrera','camarera','pizzeria','jefa','cap de sala','laboral'],
    ca:'Des d\'octubre de 2026 faig pràctiques de tractament de dades a la Universitat de Vic: treballo amb PostgreSQL i Firebase i he desplegat una aplicació amb Docker. A més, des del 2022 sóc cap de sala d\'una pizzeria: coordino l\'equip, formo companys nous i resolc problemes sota pressió. [[cv]]',
    es:'Desde octubre de 2026 hago prácticas de tratamiento de datos en la Universitat de Vic: trabajo con PostgreSQL y Firebase y he desplegado una aplicación con Docker. Además, desde 2022 soy jefa de sala en una pizzería: coordino al equipo, formo a compañeros nuevos y resuelvo problemas bajo presión. [[cv]]',
    en:'Since October 2026 I\'ve been doing a data processing internship at the University of Vic, working with PostgreSQL and Firebase, and I\'ve deployed an app with Docker. Since 2022 I\'ve also been a floor manager at a pizzeria: I coordinate the team, train new staff and solve problems under pressure. [[cv]]'},
  data:{k:['dades','datos','data','analisi','analisis','analysis','analyst','analista','dashboard','base de dades','base de datos','database'],
    ca:'A les pràctiques de tractament de dades (des d\'octubre de 2026) treballo amb PostgreSQL, incloent-hi polítiques d\'accés, i amb Firebase. Sé SQL, Python i tinc un nivell bàsic de Power BI. M\'agrada convertir dades en decisions. [[cv]]',
    es:'En las prácticas de tratamiento de datos (desde octubre de 2026) trabajo con PostgreSQL, incluidas políticas de acceso, y con Firebase. Sé SQL, Python y tengo un nivel básico de Power BI. Me gusta convertir datos en decisiones. [[cv]]',
    en:'In my data processing internship (since October 2026) I work with PostgreSQL, including access policies, and Firebase. I know SQL and Python and have a basic level of Power BI. I like turning data into decisions. [[cv]]'},
  skills:{k:['habilitats','habilidades','skills','tecnologies','tecnologias','technologies','stack','llenguatges','lenguajes','programming languages','eines','herramientas','tools','que saps fer','que sabes hacer'],
    ca:'Treballo amb Python, SQL, PostgreSQL i Firebase per a dades i IA; React, TypeScript, PHP/Laravel i WordPress per a web; React Native, Expo, Unity i Arduino per a apps, jocs i IoT; i Git, Docker i Figma com a eines. Pregunta\'m per qualsevol tecnologia concreta. [[cv]]',
    es:'Trabajo con Python, SQL, PostgreSQL y Firebase para datos e IA; React, TypeScript, PHP/Laravel y WordPress para web; React Native, Expo, Unity y Arduino para apps, juegos e IoT; y Git, Docker y Figma como herramientas. Pregúntame por cualquier tecnología concreta. [[cv]]',
    en:'I work with Python, SQL, PostgreSQL and Firebase for data and AI; React, TypeScript, PHP/Laravel and WordPress for the web; React Native, Expo, Unity and Arduino for apps, games and IoT; and Git, Docker and Figma as tools. Ask me about any specific technology. [[cv]]'},
  soft:{k:['soft skill','equip','equipo','team','lideratge','liderazgo','leadership','comunicacio','comunicacion','com treballes','como trabajas','personalitat','personalidad'],
    ca:'Com a cap de sala he après a coordinar un equip, formar gent nova, organitzar-me quan hi ha molta feina i resoldre imprevistos amb calma. Aprenc ràpid i m\'agrada entendre bé el problema abans de posar-me a programar.',
    es:'Como jefa de sala he aprendido a coordinar un equipo, formar a gente nueva, organizarme cuando hay mucho trabajo y resolver imprevistos con calma. Aprendo rápido y me gusta entender bien el problema antes de ponerme a programar.',
    en:'As a floor manager I\'ve learnt to coordinate a team, train new people, stay organised when it gets busy and handle the unexpected calmly. I learn fast and I like to understand the problem well before I start coding.'},
  weak:{k:['punt feble','punts febles','punto debil','puntos debiles','debilidad','weakness','millorar','mejorar','improve','defecte','defecto'],
    ca:'El meu anglès encara és intermedi i no tinc Excel avançat. Hi estic treballant: practico anglès i aprenc el que necessito sobre la marxa, com he fet amb altres eines.',
    es:'Mi inglés todavía es intermedio y no tengo Excel avanzado. Estoy trabajando en ello: practico inglés y aprendo lo que necesito sobre la marcha, como he hecho con otras herramientas.',
    en:'My English is still intermediate and my Excel isn\'t advanced yet. I\'m working on both: I practise English and pick up what I need along the way, as I\'ve done with other tools.'},
  study:{k:['estudi','estudis','estudios','study','studies','universitat','universidad','university','grau','grado','degree','uvic','carrera','curs','curso'],
    ca:'Estudio el Grau en Multimèdia. Aplicacions i Videojocs a la Universitat de Vic – UCC (2023–2027). És una carrera molt tècnica: programació, web, apps, videojocs, 3D i disseny d\'interacció.',
    es:'Estudio el Grado en Multimedia. Aplicaciones y Videojuegos en la Universitat de Vic – UCC (2023–2027). Es una carrera muy técnica: programación, web, apps, videojuegos, 3D y diseño de interacción.',
    en:'I\'m studying a Bachelor\'s in Multimedia (Applications and Video Games) at the University of Vic – UCC (2023–2027). It\'s a very technical degree: programming, web, apps, games, 3D and interaction design.'},
  certs:{k:['certific','certificat','certificado','certificate','hubspot','curs de','community manager'],
    ca:'Tinc la certificació HubSpot Marketing Hub Software (2026) i un curs de Community Manager de 110 hores. [[cv]]',
    es:'Tengo la certificación HubSpot Marketing Hub Software (2026) y un curso de Community Manager de 110 horas. [[cv]]',
    en:'I hold the HubSpot Marketing Hub Software certification (2026) and a 110-hour Community Manager course. [[cv]]'},
  marketing:{k:['marketing','màrqueting','crm','brevo','salesforce','landing','email marketing','seo'],
    ca:'Tinc la certificació de HubSpot Marketing Hub i, a classe, vaig fer una landing page, una automatització d\'emails amb Brevo i un pipeline de vendes. M\'interessa on es troben el màrqueting, les dades i l\'automatització.',
    es:'Tengo la certificación de HubSpot Marketing Hub y, en clase, hice una landing page, una automatización de emails con Brevo y un pipeline de ventas. Me interesa donde se cruzan el marketing, los datos y la automatización.',
    en:'I hold the HubSpot Marketing Hub certification and in class I built a landing page, an email automation with Brevo and a sales pipeline. I\'m interested in where marketing, data and automation meet.'},
  lang:{k:['idioma','idiomes','idiomas','language','languages','angles','ingles','english','catala','catalan','castella','castellano','spanish'],
    ca:'Parlo català i castellà (nadiues) i anglès a nivell intermedi, que continuo millorant.',
    es:'Hablo catalán y castellano (nativas) e inglés a nivel intermedio, que sigo mejorando.',
    en:'I speak Catalan and Spanish natively, and intermediate English, which I keep improving.'},
  langcert:{k:['b1','b2','c1','c2','cambridge','toefl','ielts','titol','titulo','nivel oficial','official level'],
    ca:'Tinc un nivell intermedi d\'anglès. Si per al lloc cal un nivell concret o un títol, escriu-me i t\'ho concreto. També puc fer part de l\'entrevista en anglès. [[contacte]]',
    es:'Tengo un nivel intermedio de inglés. Si para el puesto se necesita un nivel concreto o un título, escríbeme y te lo concreto. También puedo hacer parte de la entrevista en inglés. [[contacte]]',
    en:'My English is intermediate. If the role needs a specific level or certificate, drop me a line and I\'ll give you the details. I\'m also happy to do part of the interview in English. [[contacte]]'},
  avail:{k:['disponib','available','availability','quan pots','cuando puedes','when can','comencar','empezar','start','febrer','febrero','february','hores','horas','hours','durada','duracion','duration','conveni','convenio'],
    ca:'Busco pràctiques curriculars a partir de febrer de 2027 (unes 300 hores) en desenvolupament, dades o IA aplicada. [[contacte]]',
    es:'Busco prácticas curriculares a partir de febrero de 2027 (unas 300 horas) en desarrollo, datos o IA aplicada. [[contacte]]',
    en:'I\'m looking for a curricular internship from February 2027 (around 300 hours) in development, data or applied AI. [[contacte]]'},
  where:{k:['on vius','donde vives','where do you live','d\'on ets','de donde eres','where are you from','ubicacio','ubicacion','location','barcelona','remot','remoto','remote','presencial','hibrid','hibrido','hybrid'],
    ca:'Visc al Vallès Oriental, a prop de Barcelona. Si vols concretar modalitat (presencial, híbrida o remota), en parlem. [[contacte]]',
    es:'Vivo en el Vallès Oriental, cerca de Barcelona. Si quieres concretar modalidad (presencial, híbrida o remota), lo hablamos. [[contacte]]',
    en:'I live in the Vallès Oriental area, near Barcelona. If you want to talk about on-site, hybrid or remote, just get in touch. [[contacte]]'},
  contact:{k:['contact','contacte','contacto','email','correu','correo','mail','linkedin','telefon','telefono','phone','github','parlar','hablar'],
    ca:'Pots escriure\'m a neus.filba@uvic.cat o trobar-me a LinkedIn i GitHub (Yian2). [[contacte]] [[cv]]',
    es:'Puedes escribirme a neus.filba@uvic.cat o encontrarme en LinkedIn y GitHub (Yian2). [[contacte]] [[cv]]',
    en:'You can email me at neus.filba@uvic.cat or find me on LinkedIn and GitHub (Yian2). [[contacte]] [[cv]]'},
  cv:{k:['cv','curriculum','resume'],
    ca:'Aquí tens el meu CV. [[cv]]', es:'Aquí tienes mi CV. [[cv]]', en:'Here\'s my CV. [[cv]]'},
  why:{k:['per que t\'hauria','por que deberia','why should','contractar','contratar','hire','fortalesa','fortaleza','strength','punts forts','puntos fuertes','que aportes','que aportas','diferencia'],
    ca:'Perquè combino una base tècnica (dades, web, apps i IA) amb ganes d\'entendre el problema de negoci que hi ha darrere. I com a cap de sala he après a organitzar-me, a treballar en equip i a resoldre imprevistos. Aprenc ràpid i m\'agrada que la tecnologia serveixi per a alguna cosa real. [[projectes]]',
    es:'Porque combino una base técnica (datos, web, apps e IA) con ganas de entender el problema de negocio que hay detrás. Y como jefa de sala he aprendido a organizarme, a trabajar en equipo y a resolver imprevistos. Aprendo rápido y me gusta que la tecnología sirva para algo real. [[projectes]]',
    en:'Because I combine a technical base (data, web, apps and AI) with a real interest in the business problem behind it. As a floor manager I\'ve learnt to stay organised, work in a team and handle the unexpected. I learn fast and I like technology that solves real problems. [[projectes]]'}
};

/* ---------- 2. tecnologies concretes ("Saps Python?") ---------- */
const TECH = [
  {k:['python'], ca:'Sí. Amb Python vaig fer Bolets del Montseny: RAG amb embeddings, un LLM de Groq i una interfície amb Streamlit. [[projecte:bolets]]', es:'Sí. Con Python hice Setas del Montseny: RAG con embeddings, un LLM de Groq y una interfaz con Streamlit. [[projecte:bolets]]', en:'Yes. I used Python for Montseny Mushrooms: RAG with embeddings, a Groq LLM and a Streamlit interface. [[projecte:bolets]]'},
  {k:['sql','postgres','postgresql','mysql'], ca:'Sí. A les pràctiques treballo amb PostgreSQL (incloent-hi polítiques d\'accés) i a La Efímera vaig fer servir MySQL. [[projecte:efimera]]', es:'Sí. En las prácticas trabajo con PostgreSQL (incluidas políticas de acceso) y en La Efímera usé MySQL. [[projecte:efimera]]', en:'Yes. In my internship I work with PostgreSQL (including access policies), and I used MySQL for La Efímera. [[projecte:efimera]]'},
  {k:['firebase'], ca:'Sí, faig servir Firebase a les pràctiques de tractament de dades.', es:'Sí, uso Firebase en las prácticas de tratamiento de datos.', en:'Yes, I use Firebase in my data processing internship.'},
  {k:['docker','contenidor','contenedor','container'], ca:'Sí. A les pràctiques he desplegat amb Docker una aplicació que calcula l\'empremta de carboni.', es:'Sí. En las prácticas he desplegado con Docker una aplicación que calcula la huella de carbono.', en:'Yes. In my internship I deployed a carbon footprint calculator app with Docker.'},
  {k:['react native','expo','typescript','asyncstorage'], ca:'Sí. Mis Gastos està feta amb React Native, Expo Router i TypeScript, amb les dades a AsyncStorage. [[projecte:misgastos]]', es:'Sí. Mis Gastos está hecha con React Native, Expo Router y TypeScript, con los datos en AsyncStorage. [[projecte:misgastos]]', en:'Yes. Mis Gastos is built with React Native, Expo Router and TypeScript, storing data in AsyncStorage. [[projecte:misgastos]]'},
  {k:['react','javascript','js','html','css'], ca:'Sí, treballo amb JavaScript, React, HTML i CSS. Aquest mateix portfoli l\'he fet a mà, sense plantilles. [[projectes]]', es:'Sí, trabajo con JavaScript, React, HTML y CSS. Este mismo portfolio lo he hecho a mano, sin plantillas. [[projectes]]', en:'Yes, I work with JavaScript, React, HTML and CSS. I hand-coded this portfolio myself, no templates. [[projectes]]'},
  {k:['laravel','php','blade'], ca:'Sí. La Efímera està feta amb Laravel i PHP: carta, comandes per emportar i panell d\'administració. [[projecte:efimera]]', es:'Sí. La Efímera está hecha con Laravel y PHP: carta, pedidos para llevar y panel de administración. [[projecte:efimera]]', en:'Yes. La Efímera is built with Laravel and PHP: menu, take-away orders and an admin panel. [[projecte:efimera]]'},
  {k:['wordpress','woocommerce','elementor'], ca:'Sí. Vaig fer la botiga online NF amb WordPress i WooCommerce. [[projecte:nf]]', es:'Sí. Hice la tienda online NF con WordPress y WooCommerce. [[projecte:nf]]', en:'Yes. I built the NF online shop with WordPress and WooCommerce. [[projecte:nf]]'},
  {k:['unity','c#','csharp'], ca:'Sí. Vaig fer un videojoc multijugador en 3D amb Unity i C#. [[projecte:barcos]]', es:'Sí. Hice un videojuego multijugador en 3D con Unity y C#. [[projecte:barcos]]', en:'Yes. I built a 3D multiplayer game with Unity and C#. [[projecte:barcos]]'},
  {k:['c++','qt'], ca:'Sí. Vaig programar un joc d\'escacs d\'escriptori amb C++ i Qt. [[projecte:escacs]]', es:'Sí. Programé un juego de ajedrez de escritorio con C++ y Qt. [[projecte:escacs]]', en:'Yes. I programmed a desktop chess game with C++ and Qt. [[projecte:escacs]]'},
  {k:['unreal','blueprint','blueprints'], ca:'Estic aprenent Unreal Engine a classe, amb Blueprints.', es:'Estoy aprendiendo Unreal Engine en clase, con Blueprints.', en:'I\'m learning Unreal Engine in class, using Blueprints.'},
  {k:['three.js','threejs','three','webgl'], ca:'Sí. Vaig fer una versió 3D del meu portfoli amb Three.js i Vite.', es:'Sí. Hice una versión 3D de mi portfolio con Three.js y Vite.', en:'Yes. I built a 3D version of my portfolio with Three.js and Vite.'},
  {k:['arduino'], ca:'Sí, tinc base d\'Arduino i m\'interessa combinar-lo amb IA en projectes IoT.', es:'Sí, tengo base de Arduino y me interesa combinarlo con IA en proyectos IoT.', en:'Yes, I have a foundation in Arduino and I\'d like to combine it with AI in IoT projects.'},
  {k:['java','kotlin'], ca:'He programat en Java a la carrera.', es:'He programado en Java en la carrera.', en:'I\'ve programmed in Java during my degree.'},
  {k:['power bi','powerbi'], ca:'Tinc un nivell bàsic de Power BI i el vull aprofundir.', es:'Tengo un nivel básico de Power BI y quiero profundizar.', en:'I have a basic level of Power BI and I want to go further.'},
  {k:['excel','spreadsheet','full de calcul','hoja de calculo'], ca:'No tinc Excel avançat, però sé SQL i aprenc ràpid les eines que necessito.', es:'No tengo Excel avanzado, pero sé SQL y aprendo rápido las herramientas que necesito.', en:'My Excel isn\'t advanced yet, but I know SQL and I pick up the tools I need quickly.'},
  {k:['git','github'], ca:'Sí, faig servir Git i GitHub. El meu GitHub és Yian2.', es:'Sí, uso Git y GitHub. Mi GitHub es Yian2.', en:'Yes, I use Git and GitHub. My GitHub is Yian2.'},
  {k:['figma','ux','ui','disseny','diseno','design'], ca:'Sí, faig servir Figma per dissenyar interfícies abans de programar-les.', es:'Sí, uso Figma para diseñar interfaces antes de programarlas.', en:'Yes, I use Figma to design interfaces before building them.'},
  {k:['jira','trello','scrum','agile','kanban'], ca:'Sí, he treballat amb Jira i Trello i amb Scrum i Kanban en projectes d\'equip.', es:'Sí, he trabajado con Jira y Trello y con Scrum y Kanban en proyectos de equipo.', en:'Yes, I\'ve used Jira and Trello, with Scrum and Kanban, in team projects.'},
  {k:['groq','embeddings','streamlit','langchain','ollama','openai'], ca:'Sí. A Bolets del Montseny faig servir embeddings, un LLM de Groq i Streamlit; aquest xat també es connecta a Groq. [[projecte:bolets]]', es:'Sí. En Setas del Montseny uso embeddings, un LLM de Groq y Streamlit; este chat también se conecta a Groq. [[projecte:bolets]]', en:'Yes. Montseny Mushrooms uses embeddings, a Groq LLM and Streamlit; this chat also connects to Groq. [[projecte:bolets]]'},
  {k:['.net','dotnet','angular','vue','aws','azure','kubernetes','tableau','swift','flutter','django','node'], no:true,
    ca:'Encara no hi he treballat, però aprenc ràpid: amb React Native, Laravel o els LLM vaig començar de zero i vaig acabar fent projectes complets. [[projectes]]',
    es:'Todavía no he trabajado con eso, pero aprendo rápido: con React Native, Laravel o los LLM empecé de cero y acabé haciendo proyectos completos. [[projectes]]',
    en:'I haven\'t worked with that yet, but I learn fast: I started from scratch with React Native, Laravel and LLMs and ended up building complete projects. [[projectes]]'}
];

/* ---------- 3. projectes pel nom ---------- */
const PNAMES = {bolets:['bolets','setas','mushroom','montseny'], misgastos:['mis gastos','misgastos','gastos','despeses','finances','finanzas'], efimera:['efimera','pizzeria web'],
  nf:['nf','neceser','botiga nf'], fashion:['fashion'], makeup:['makeup','maquillatge','maquillaje'], strawhop:['strawhop'], escacs:['escacs','ajedrez','chess'], barcos:['vaixell','vaixells','barco','barcos','boat','boats']};
const MORE = {ca:'Tecnologies', es:'Tecnologías', en:'Tech'};

/* ---------- motor ---------- */
const strip = s => ' ' + s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9+#.'·\s]/g,' ').replace(/\s+/g,' ').trim() + ' ';
const has = (t, k) => { k = strip(k).trim(); return t.includes(' ' + k + ' ') || (k.length > 4 && t.includes(' ' + k)); };
const REPEAT = {
  ca:'Això és el que et puc dir des d\'aquí. Si vols més detalls, escriu-me i en parlem amb calma. [[contacte]]',
  es:'Esto es lo que te puedo contar desde aquí. Si quieres más detalles, escríbeme y lo hablamos con calma. [[contacte]]',
  en:'That\'s what I can tell you from here. If you\'d like more detail, write to me and we can talk it through. [[contacte]]'
};
const FALLBACK = {
  ca:'D\'això no en tinc informació aquí. Prova a preguntar-me pels meus projectes, una tecnologia concreta (React, SQL, Unity...), la meva experiència o la disponibilitat per fer pràctiques.',
  es:'De eso no tengo información aquí. Prueba a preguntarme por mis proyectos, una tecnología concreta (React, SQL, Unity...), mi experiencia o mi disponibilidad para prácticas.',
  en:'I don\'t have information about that here. Try asking about my projects, a specific technology (React, SQL, Unity...), my experience or my availability for an internship.'
};
function localAnswer(q){
  const t = strip(q); let key = null, text = null;
  // projecte pel nom
  for (const id in PNAMES){ if (PNAMES[id].some(k => has(t, k))){
    const p = PROJECTS.find(x => x.id === id); if (p){ key = 'p:' + id; text = p.t[lang].desc + ' ' + MORE[lang] + ': ' + p.tags.join(', ') + '. [[projecte:' + id + ']]'; } break; } }
  // tecnologia concreta (fins a 2)
  if (!text){ const hits = TECH.filter(x => x.k.some(k => has(t, k)));
    if (hits.length){ const known = hits.filter(h => !h.no); const pick = (known.length ? known : hits).slice(0, 2);
      key = 't:' + pick.map(h => h.k[0]).join('+'); text = pick.map(h => h[lang]).join(' '); } }
  // tema general
  if (!text){ let best = null, score = 0;
    const order = ['langcert','cv','contact','avail','where','tfg','bot','weak','why','soft','certs','marketing','lang','about','iot','ai','data','apps','games','web','exp','study','skills','projects','thanks','bye','hi'];
    for (const k of order){ const s = R[k].k.filter(w => has(t, w)).length; if (s > score){ score = s; best = k; } }
    if (best === 'lang' && R.langcert.k.some(w => has(t, w))) best = 'langcert';
    if (best){ key = best; text = R[best][lang]; } }
  if (!text) { lastKey = null; return FALLBACK[lang]; }
  if (key === lastKey && key !== 'hi' && key !== 'thanks'){ lastKey = null; return REPEAT[lang]; }
  lastKey = key; return text;
}

/* ---------- connexió amb l'LLM (Netlify Function) ---------- */
async function remoteAnswer(){
  if (location.protocol === 'file:') return null;
  const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), 15000);
  try{
    const r = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, signal:ctrl.signal,
      body: JSON.stringify({lang, messages: history.slice(-10)})});
    if (!r.ok) return null;
    const d = await r.json(); return (d && typeof d.reply === 'string' && d.reply.trim()) ? d.reply.trim() : null;
  } catch(e){ return null; } finally { clearTimeout(tm); }
}

/* ---------- interfície ---------- */
function addMsg(role, text){
  const m = el('div', 'msg ' + (role === 'user' ? 'me' : 'bot'));
  if (role === 'user'){ m.textContent = text; log.append(m); log.scrollTop = log.scrollHeight; return m; }
  log.append(m); return m;
}
function actionsFrom(text){
  const acts = []; const clean = text.replace(/\[\[(projecte:[a-z0-9]+|cv|contacte|projectes)\]\]/g, (_, a) => { acts.push(a); return ''; }).replace(/[ \t]+\n/g,'\n').trim();
  return {clean, acts:[...new Set(acts)]};
}
function renderActs(m, acts){
  if (!acts.length) return;
  const box = el('div','acts');
  acts.forEach(a => {
    if (a.startsWith('projecte:')){
      const p = PROJECTS.find(x => x.id === a.slice(9)); if (!p) return;
      const b = el('button', null, UI[lang].proj + ': ' + p.t[lang].title); b.type='button'; b.onclick = () => openModal(p); box.append(b);
    } else if (a === 'cv'){ const l = el('a', null, UI[lang].cv); l.href = 'assets/NeusFilba_CV.pdf'; l.setAttribute('download',''); box.append(l); }
    else if (a === 'contacte'){ const b = el('button', null, UI[lang].contact); b.type='button'; b.onclick = () => $('#contacte').scrollIntoView({behavior:'smooth'}); box.append(b); }
    else if (a === 'projectes'){ const b = el('button', null, UI[lang].all); b.type='button'; b.onclick = () => $('#projectes').scrollIntoView({behavior:'smooth'}); box.append(b); }
  });
  if (box.children.length) m.append(box);
}
function typeOut(m, text, acts){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const span = el('span'); m.append(span);
  if (reduce){ span.textContent = text; renderActs(m, acts); log.scrollTop = log.scrollHeight; return Promise.resolve(); }
  return new Promise(res => {
    let i = 0; const step = Math.max(1, Math.round(text.length / 120));
    const tick = () => { i = Math.min(text.length, i + step); span.textContent = text.slice(0, i); log.scrollTop = log.scrollHeight;
      if (i < text.length) setTimeout(tick, 14); else { renderActs(m, acts); log.scrollTop = log.scrollHeight; res(); } };
    tick();
  });
}
async function ask(q){
  q = q.trim(); if (!q || busy) return;
  busy = true; sendBtn.disabled = true;
  addMsg('user', q); history.push({role:'user', content:q});
  const m = addMsg('bot'); const dots = el('span','typing'); dots.append(el('i'), el('i'), el('i')); m.append(dots); log.scrollTop = log.scrollHeight;
  let reply = await remoteAnswer();
  if (!reply){ await new Promise(r => setTimeout(r, 450)); reply = localAnswer(q); }
  dots.remove();
  const {clean, acts} = actionsFrom(reply);
  history.push({role:'assistant', content:clean});
  await typeOut(m, clean, acts);
  busy = false; sendBtn.disabled = false;
}
function renderChips(){
  chipsBox.replaceChildren(...UI[lang].chips.map(c => { const b = el('button', null, c); b.type='button'; b.onclick = () => ask(c); return b; }));
}
function greet(){
  log.replaceChildren(); history.length = 0; lastKey = null;
  const m = addMsg('bot'); const {clean} = actionsFrom(UI[lang].hello); typeOut(m, clean, []);
}
form.addEventListener('submit', e => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
window.onLangChange = () => { renderChips(); greet(); };
window.onLangChange();
})();
