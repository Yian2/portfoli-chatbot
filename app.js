/* ============================================================
   PORTFOLI NEUS FILBÀ
   Per editar textos o projectes, canvia només les dades d'aquí sota.
   ============================================================ */
document.documentElement.classList.add('js');

const GH = 'https://github.com/Yian2';

/* ---------- PROJECTES ----------
   featured: true → surt a dalt en gran
   media: {type:'video'|'image', src, poster?, phone?:true (format mòbil)}
   gallery: imatges extra que surten al detall
*/
const PROJECTS = [
  {
    id:'atoms3r', featured:true, cat:'iot',
    media:{type:'video', src:'assets/video/atoms3r.mp4', poster:'assets/img/poster-atoms3r.jpg'},
    gallery:['assets/img/poster-atoms3r.jpg'],
    tags:['ESP32-S3','M5Stack','C++','IMU','WebSocket','Firebase','Python','LLM (Groq)','Chart.js'],
    links:[],
    t:{
      ca:{title:'Laberint AtomS3R per a gent gran', one:'Joc IoT de laberint que es controla inclinant un dispositiu, amb seguiment de l\'evolució i resum setmanal amb IA.',
        desc:'Un joc de laberint pensat per estimular la coordinació ull-mà, l\'atenció i la mobilitat del canell de la gent gran d\'una manera lúdica. La persona inclina un M5Stack AtomS3R (ESP32-S3) i la bola rodola pel laberint fins a la meta, evitant els forats. El mateix dispositiu serveix una web on el joc es veu en gran en una tauleta o una pantalla, guarda cada partida al núvol i un dashboard mostra l\'evolució amb objectius setmanals. Un LLM redacta un resum setmanal per a la família o el fisioterapeuta. És una eina de motivació i seguiment, no un aparell mèdic.',
        did:['Firmware en C++ (Arduino, M5Unified) que llegeix l\'IMU a 50 Hz i simula la física de la bola: acceleració, fregament, rebots i col·lisions.','Generació procedural d\'un laberint nou a cada partida (recursive backtracker) i validació amb BFS que sempre hi ha camí fins a la meta.','Servidor web i WebSocket al mateix ESP32: el joc es veu en directe a qualsevol dispositiu de la xarxa, sense ordinador intermedi.','Enviament de cada partida (temps, caigudes, meta) a Firebase Realtime Database per WiFi.','Script en Python (pandas) que compara la setmana amb l\'anterior i genera un resum amb un LLM (Groq).','Dashboard amb Chart.js: indicadors clau, objectius setmanals configurables i evolució del temps i les caigudes.','Proves informals amb 2 persones de 65 a 68 anys.']},
      es:{title:'Laberinto AtomS3R para personas mayores', one:'Juego IoT de laberinto que se controla inclinando un dispositivo, con seguimiento de la evolución y resumen semanal con IA.',
        desc:'Un juego de laberinto pensado para estimular la coordinación ojo-mano, la atención y la movilidad de la muñeca de las personas mayores de forma lúdica. La persona inclina un M5Stack AtomS3R (ESP32-S3) y la bola rueda por el laberinto hasta la meta, evitando los agujeros. El propio dispositivo sirve una web donde el juego se ve en grande en una tableta o una pantalla, guarda cada partida en la nube y un dashboard muestra la evolución con objetivos semanales. Un LLM redacta un resumen semanal para la familia o el fisioterapeuta. Es una herramienta de motivación y seguimiento, no un aparato médico.',
        did:['Firmware en C++ (Arduino, M5Unified) que lee la IMU a 50 Hz y simula la física de la bola: aceleración, rozamiento, rebotes y colisiones.','Generación procedural de un laberinto nuevo en cada partida (recursive backtracker) y validación con BFS de que siempre hay camino hasta la meta.','Servidor web y WebSocket en el propio ESP32: el juego se ve en directo en cualquier dispositivo de la red, sin ordenador intermedio.','Envío de cada partida (tiempo, caídas, meta) a Firebase Realtime Database por WiFi.','Script en Python (pandas) que compara la semana con la anterior y genera un resumen con un LLM (Groq).','Dashboard con Chart.js: indicadores clave, objetivos semanales configurables y evolución del tiempo y las caídas.','Pruebas informales con 2 personas de 65 a 68 años.']},
      en:{title:'AtomS3R Maze for Older Adults', one:'IoT tilt-maze game controlled by tilting a device, with progress tracking and a weekly AI summary.',
        desc:'A maze game designed to encourage hand-eye coordination, attention and wrist mobility in older adults in a playful way. The player tilts an M5Stack AtomS3R (ESP32-S3) and the ball rolls through the maze to the goal, avoiding the holes. The device itself serves a web page that shows the game in large format on a tablet or screen, stores every session in the cloud, and a dashboard shows progress against weekly goals. An LLM writes a weekly summary for family members or a physiotherapist. It is a motivation and tracking tool, not a medical device.',
        did:['C++ firmware (Arduino, M5Unified) that reads the IMU at 50 Hz and simulates the ball physics: acceleration, friction, bounces and collisions.','Procedural generation of a new maze every game (recursive backtracker), validated with BFS so there is always a path to the goal.','Web server and WebSocket running on the ESP32 itself: the game streams live to any device on the network, with no computer in between.','Each session (time, falls, goal reached) is sent to Firebase Realtime Database over WiFi.','Python script (pandas) that compares the week with the previous one and generates a summary with an LLM (Groq).','Chart.js dashboard: key indicators, configurable weekly goals and time and fall trends.','Informal testing with 2 users aged 65 to 68.']}
    }
  },
  {
    id:'typingocto-seo', featured:true, cat:'ia',
    media:{type:'image', src:'assets/img/typingocto-seo.webp'},
    gallery:['assets/img/typingocto-seo.webp','assets/img/typingocto-seo-an.webp','assets/img/typingocto-seo-auto.webp','assets/img/typingocto-seo-nou.webp'],
    tags:['React','TypeScript','Firebase','Gemini API','GitHub Actions','Search Console API','GA4 Data API','Node.js','Firestore Rules','SEO tècnic'],
    links:[{label:'typingocto.com/blog', href:'https://typingocto.com/blog/'}],
    t:{
      ca:{title:'TypingOcto SEO Intelligence', one:'Mini SaaS que fa créixer el blog de typingocto.com amb dades reals de Google, esborranys amb IA i publicació automàtica amb aprovació humana.',
        desc:'A part de crear typingocto.com (una web gratuïta per aprendre mecanografia, amb una mascota que és un pop), vaig construir un panell privat que automatitza tot el cicle de contingut SEO: llegeix les dades reals de Google Search Console i Google Analytics 4, detecta oportunitats, genera esborranys d\'articles amb IA (Gemini), en revisa la qualitat i els publica al blog quan arriba la data programada, però només si jo els he aprovat. Funciona tot sol encara que tingui l\'ordinador apagat i amb un cost de 0 €/mes.',
        did:['Panell privat amb React, TypeScript i Vite, allotjat a Firebase Hosting, amb login de Google i accés només per a administradors (regles de seguretat de Firestore provades amb tests a l\'emulador).',
          'Integració amb les APIs oficials de Google Search Console, GA4 Data API i URL Inspection: clics, impressions, CTR, posició, indexació, canals, trànsit de TikTok i quins articles porten usuaris que realment fan servir l\'app.',
          'Motor en Node.js que s\'executa a GitHub Actions cada 30 minuts (despertat per un cron extern), amb bloqueig contra execucions duplicades, reintents limitats, registre de costos i historial.',
          'Generació d\'articles amb Gemini amb una sortida JSON estructurada i un prompt que prohibeix inventar estadístiques, estudis o funcionalitats, a més d\'un model alternatiu automàtic si el principal està saturat.',
          'Control de qualitat automàtic: contingut duplicat, afirmacions sense font, enllaços trencats, crides a l\'acció cap a rutes reals, llicències d\'imatges i detecció d\'injecció de prompts.',
          'Aprovació humana lligada a una versió concreta de l\'article (hash SHA-256): si s\'edita després d\'aprovar-lo, no es publica.',
          'Publicació via l\'API de GitHub → build estàtic → revisió de SEO tècnic → desplegament a GitHub Pages, i l\'article només es marca com a publicat quan la URL ja està en línia.',
          'Calendari editorial configurable, recordatoris per correu, editor visual amb autoguardat i versions, gestor del blog (crear, editar, eliminar) i una biblioteca d\'il·lustracions de la mascota generades per codi.',
          'Puntuació d\'oportunitats SEO explicable i investigació de paraules clau que separa les dades reals dels suggeriments de la IA.']},
      es:{title:'TypingOcto SEO Intelligence', one:'Mini SaaS que hace crecer el blog de typingocto.com con datos reales de Google, borradores con IA y publicación automática con aprobación humana.',
        desc:'Además de crear typingocto.com (una web gratuita para aprender mecanografía, con un pulpo como mascota), construí un panel privado que automatiza todo el ciclo de contenido SEO: lee los datos reales de Google Search Console y Google Analytics 4, detecta oportunidades, genera borradores de artículos con IA (Gemini), revisa su calidad y los publica en el blog cuando llega la fecha programada, pero solo si yo los he aprobado. Funciona solo aunque tenga el ordenador apagado y con un coste de 0 €/mes.',
        did:['Panel privado con React, TypeScript y Vite, alojado en Firebase Hosting, con login de Google y acceso solo para administradores (reglas de seguridad de Firestore probadas con tests en el emulador).',
          'Integración con las APIs oficiales de Google Search Console, GA4 Data API y URL Inspection: clics, impresiones, CTR, posición, indexación, canales, tráfico de TikTok y qué artículos traen usuarios que realmente usan la app.',
          'Motor en Node.js que se ejecuta en GitHub Actions cada 30 minutos (despertado por un cron externo), con bloqueo contra ejecuciones duplicadas, reintentos limitados, registro de costes e historial.',
          'Generación de artículos con Gemini con una salida JSON estructurada y un prompt que prohíbe inventar estadísticas, estudios o funcionalidades, además de un modelo alternativo automático si el principal está saturado.',
          'Control de calidad automático: contenido duplicado, afirmaciones sin fuente, enlaces rotos, llamadas a la acción hacia rutas reales, licencias de imágenes y detección de inyección de prompts.',
          'Aprobación humana ligada a una versión concreta del artículo (hash SHA-256): si se edita después de aprobarlo, no se publica.',
          'Publicación vía la API de GitHub → build estático → revisión de SEO técnico → despliegue en GitHub Pages, y el artículo solo se marca como publicado cuando la URL ya está en línea.',
          'Calendario editorial configurable, recordatorios por correo, editor visual con autoguardado y versiones, gestor del blog (crear, editar, eliminar) y una biblioteca de ilustraciones de la mascota generadas por código.',
          'Puntuación de oportunidades SEO explicable e investigación de palabras clave que separa los datos reales de las sugerencias de la IA.']},
      en:{title:'TypingOcto SEO Intelligence', one:'Mini SaaS that grows the typingocto.com blog with real Google data, AI drafts and automated publishing with human approval.',
        desc:'Besides building typingocto.com (a free typing tutor with an octopus mascot), I built a private dashboard that automates the whole SEO content cycle: it reads real Google Search Console and Google Analytics 4 data, finds opportunities, drafts articles with AI (Gemini), checks their quality and publishes them to the blog on the scheduled date, but only if I have approved them. It runs on its own with my computer switched off, at €0/month.',
        did:['Private dashboard with React, TypeScript and Vite on Firebase Hosting, with Google sign-in and admin-only access (Firestore security rules tested on the emulator).',
          'Integration with the official Google Search Console, GA4 Data and URL Inspection APIs: clicks, impressions, CTR, position, indexing, channels, TikTok traffic and which articles bring users who actually use the app.',
          'Node.js engine running on GitHub Actions every 30 minutes (woken up by an external cron), with a lock against duplicate runs, limited retries, cost tracking and run history.',
          'Article generation with Gemini using structured JSON output and a prompt that forbids made-up statistics, studies or features, plus an automatic fallback model when the main one is overloaded.',
          'Automated quality checks: duplicate content, unsourced claims, broken links, calls to action pointing to real routes, image licences and prompt-injection detection.',
          'Human approval bound to one exact version of the article (SHA-256 hash): if it is edited after approval, it is not published.',
          'Publishing through the GitHub API → static build → technical SEO checks → GitHub Pages deploy, and the article is only marked as published once its URL is live.',
          'Configurable editorial calendar, email reminders, visual editor with autosave and versions, blog manager (create, edit, delete) and a code-generated mascot illustration library.',
          'Explainable SEO opportunity score and keyword research that keeps real data apart from AI suggestions.']}
    }
  },
  {
    id:'bolets', featured:true, cat:'ia',
    media:{type:'image', src:'assets/img/bolets.webp'},
    gallery:['assets/img/bolets.webp'],
    tags:['Python','RAG','LLM (Groq)','Embeddings','Streamlit'],
    links:[],
    t:{
      ca:{title:'Bolets del Montseny', one:'Xat amb IA (RAG) que respon sobre els bolets del Montseny i ressalta al mapa on viuen.',
        desc:'Un xat que respon preguntes sobre els bolets del Parc Natural del Montseny: quins hi ha, en quin bosc i a quina altitud es troben, amb quins bolets tòxics es poden confondre i què diu la normativa. A més, ressalta al mapa les zones on viuen.',
        did:['RAG amb cerca híbrida: noms exactes + embeddings multilingües.','Un LLM (Groq) que respon només amb les fitxes i cita el PDF i la pàgina.','Regles de seguretat al codi: davant d\'una intoxicació respon amb el 112 sense passar per l\'LLM.','Mapa interactiu amb els hàbitats de cada bolet.']},
      es:{title:'Setas del Montseny', one:'Chat con IA (RAG) que responde sobre las setas del Montseny y resalta en el mapa dónde viven.',
        desc:'Un chat que responde preguntas sobre las setas del Parque Natural del Montseny: cuáles hay, en qué bosque y a qué altitud se encuentran, con qué setas tóxicas se pueden confundir y qué dice la normativa. Además, resalta en el mapa las zonas donde viven.',
        did:['RAG con búsqueda híbrida: nombres exactos + embeddings multilingües.','Un LLM (Groq) que responde solo con las fichas y cita el PDF y la página.','Reglas de seguridad en el código: ante una intoxicación responde con el 112 sin pasar por el LLM.','Mapa interactivo con los hábitats de cada seta.']},
      en:{title:'Montseny Mushrooms', one:'AI chat (RAG) that answers questions about Montseny mushrooms and highlights where they grow on a map.',
        desc:'A chat that answers questions about the mushrooms of the Montseny Natural Park: which species grow there, in which forest and at what altitude, which toxic mushrooms they can be confused with, and what the regulations say. It also highlights their habitats on a map.',
        did:['RAG with hybrid search: exact names + multilingual embeddings.','An LLM (Groq) that answers only from the data sheets and cites the PDF and page.','Safety rules in code: if someone reports poisoning, it replies with emergency numbers without using the LLM.','Interactive map of each mushroom\'s habitat.']}
    }
  },
  {
    id:'misgastos', featured:true, cat:'apps',
    media:{type:'video', src:'assets/video/misgastos.mp4', poster:'assets/img/poster-misgastos.jpg', phone:true},
    gallery:['assets/img/misgastos.webp'],
    tags:['React Native','Expo','TypeScript','AsyncStorage'],
    links:[],
    t:{
      ca:{title:'Mis Gastos', one:'App mòbil per controlar ingressos, despeses i hores treballades, amb gràfics.',
        desc:'Una app per portar el control de les finances personals: afegeixes moviments per categories, veus el balanç i gràfics, i també pots registrar les jornades de feina per calcular les hores i el que has guanyat.',
        did:['Desenvolupament amb React Native, Expo Router i TypeScript.','Registre de moviments per categories i balanç.','Gràfics de barres i circulars de la despesa.','Registre de jornades: entrada, sortida, preu per hora i total guanyat.','Dades guardades al mòbil (AsyncStorage), amb importació i exportació d\'arxius.']},
      es:{title:'Mis Gastos', one:'App móvil para controlar ingresos, gastos y horas trabajadas, con gráficos.',
        desc:'Una app para llevar el control de las finanzas personales: añades movimientos por categorías, ves el balance y gráficos, y también puedes registrar las jornadas de trabajo para calcular las horas y lo que has ganado.',
        did:['Desarrollo con React Native, Expo Router y TypeScript.','Registro de movimientos por categorías y balance.','Gráficos de barras y circulares del gasto.','Registro de jornadas: entrada, salida, precio por hora y total ganado.','Datos guardados en el móvil (AsyncStorage), con importación y exportación de archivos.']},
      en:{title:'Mis Gastos', one:'Mobile app to track income, expenses and hours worked, with charts.',
        desc:'An app to manage personal finances: add transactions by category, see your balance and charts, and log work shifts to calculate hours and earnings.',
        did:['Built with React Native, Expo Router and TypeScript.','Transactions by category and balance.','Bar and pie charts of spending.','Work-shift log: start, end, hourly rate and total earned.','Data stored on the device (AsyncStorage), with file import and export.']}
    }
  },
  {
    id:'efimera', featured:true, cat:'webs',
    media:{type:'video', src:'assets/video/efimera.mp4', poster:'assets/img/poster-efimera.jpg'},
    gallery:['assets/img/efimera.webp','assets/img/efimera-comandes.webp'],
    tags:['PHP','Laravel','MySQL','Multiidioma'],
    links:[{label:'GitHub', href:GH+'/La-Efimera---Pagina-web'}],
    t:{
      ca:{title:'La Efímera', one:'Web i sistema de comandes take away per a una pizzeria real.',
        desc:'La web de la pizzeria La Efímera: carta, comandes per emportar, contacte i un panell per gestionar totes les comandes amb filtres per client, dates i productes.',
        did:['Web pública amb carta i take away, en diversos idiomes.','Sistema de comandes amb base de dades MySQL.','Panell d\'administració amb filtres i ordenació.','Desenvolupament amb Laravel (PHP).']},
      es:{title:'La Efímera', one:'Web y sistema de pedidos take away para una pizzería real.',
        desc:'La web de la pizzería La Efímera: carta, pedidos para llevar, contacto y un panel para gestionar todos los pedidos con filtros por cliente, fechas y productos.',
        did:['Web pública con carta y take away, en varios idiomas.','Sistema de pedidos con base de datos MySQL.','Panel de administración con filtros y ordenación.','Desarrollo con Laravel (PHP).']},
      en:{title:'La Efímera', one:'Website and take-away ordering system for a real pizzeria.',
        desc:'The website of La Efímera pizzeria: menu, take-away orders, contact, and an admin panel to manage every order with filters by customer, date and product.',
        did:['Public multilingual website with menu and take-away.','Ordering system backed by a MySQL database.','Admin panel with filters and sorting.','Built with Laravel (PHP).']}
    }
  },
  {
    id:'nf', featured:true, cat:'webs',
    media:{type:'video', src:'assets/video/nf.mp4', poster:'assets/img/poster-nf.jpg'},
    gallery:['assets/img/nf.webp'],
    tags:['WordPress','WooCommerce','SEO','E-commerce'],
    links:[],
    t:{
      ca:{title:'NF', one:'Botiga online de neceseres personalitzats fets a mà.', desc:'Una botiga online amb WordPress i WooCommerce, treballada també a nivell de SEO, per vendre neceseres personalitzats i sostenibles fets a mà.', did:['Disseny de la botiga i de la identitat visual.','Catàleg de productes i carret amb WooCommerce.','Seccions de més venuts i novetats.','Posicionament SEO: títols, meta descripcions, textos i imatges optimitzats.']},
      es:{title:'NF', one:'Tienda online de neceseres personalizados hechos a mano.', desc:'Una tienda online con WordPress y WooCommerce, trabajada también a nivel de SEO, para vender neceseres personalizados y sostenibles hechos a mano.', did:['Diseño de la tienda y de la identidad visual.','Catálogo de productos y carrito con WooCommerce.','Secciones de más vendidos y novedades.','Posicionamiento SEO: títulos, meta descripciones, textos e imágenes optimizados.']},
      en:{title:'NF', one:'Online shop for handmade personalised toiletry bags.', desc:'An SEO-optimised online shop built with WordPress and WooCommerce to sell handmade, sustainable, personalised toiletry bags.', did:['Shop and visual identity design.','Product catalogue and cart with WooCommerce.','Best-sellers and new-arrivals sections.','SEO work: optimised titles, meta descriptions, copy and images.']}
    }
  },
  {
    id:'fashion', cat:'webs',
    media:{type:'video', src:'assets/video/fashion.mp4', poster:'assets/img/poster-fashion.jpg'},
    gallery:['assets/img/fashion.webp'],
    tags:['HTML','CSS','JavaScript','UI i UX'],
    links:[{label:'GitHub', href:GH+'/fashion_week_web'}],
    t:{
      ca:{title:'Fashion Week', one:'Web editorial sobre tendències i moments icònics de la Fashion Week.', desc:'Una web editorial sobre la Fashion Week: història, ciutats clau, tendències, marques i outfits, amb un disseny visual i cercador.', did:['Disseny i maquetació de la web.','Diverses seccions de contingut.','Cercador i navegació.']},
      es:{title:'Fashion Week', one:'Web editorial sobre tendencias y momentos icónicos de la Fashion Week.', desc:'Una web editorial sobre la Fashion Week: historia, ciudades clave, tendencias, marcas y outfits, con un diseño visual y buscador.', did:['Diseño y maquetación de la web.','Varias secciones de contenido.','Buscador y navegación.']},
      en:{title:'Fashion Week', one:'Editorial website about Fashion Week trends and iconic moments.', desc:'An editorial website about Fashion Week: history, key cities, trends, brands and outfits, with a visual design and search.', did:['Website design and layout.','Several content sections.','Search and navigation.']}
    }
  },
  {
    id:'makeup', cat:'apps',
    media:{type:'video', src:'assets/video/makeup.mp4', poster:'assets/img/poster-makeup.jpg', phone:true},
    gallery:['assets/img/makeup.webp'],
    tags:['Android Studio','Java','Kotlin','Login','Multiidioma'],
    links:[],
    t:{
      ca:{title:'MakeupCatalog', one:'App mòbil per catalogar productes de maquillatge per categories.', desc:'Una app per organitzar els teus productes de maquillatge: rostre, ulls, llavis i accessoris, amb inici de sessió i diversos idiomes.', did:['Disseny de la interfície.','Categories i fitxes de producte.','Afegir productes amb marca, to i preu.']},
      es:{title:'MakeupCatalog', one:'App móvil para catalogar productos de maquillaje por categorías.', desc:'Una app para organizar tus productos de maquillaje: rostro, ojos, labios y accesorios, con inicio de sesión y varios idiomas.', did:['Diseño de la interfaz.','Categorías y fichas de producto.','Añadir productos con marca, tono y precio.']},
      en:{title:'MakeupCatalog', one:'Mobile app to catalogue makeup products by category.', desc:'An app to organise your makeup: face, eyes, lips and accessories, with login and multiple languages.', did:['Interface design.','Categories and product cards.','Add products with brand, shade and price.']}
    }
  },
  {
    id:'strawhop', cat:'jocs',
    media:{type:'video', src:'assets/video/strawhop.mp4', poster:'assets/img/poster-strawhop.jpg'},
    gallery:['assets/img/strawhop.webp'],
    tags:['Unity 2D','C#','Pixel art'],
    links:[],
    t:{
      ca:{title:'StrawHop', one:'Videojoc de plataformes 2D fet amb Unity, amb estètica pixel art.', desc:'Un joc de plataformes 2D fet amb Unity: salta, esquiva obstacles i recull maduixes per sumar punts.', did:['Mecàniques de salt i col·lisions.','Puntuació, vides i obstacles.','Menú i estètica pixel art.']},
      es:{title:'StrawHop', one:'Videojuego de plataformas 2D hecho con Unity, con estética pixel art.', desc:'Un juego de plataformas 2D hecho con Unity: salta, esquiva obstáculos y recoge fresas para sumar puntos.', did:['Mecánicas de salto y colisiones.','Puntuación, vidas y obstáculos.','Menú y estética pixel art.']},
      en:{title:'StrawHop', one:'2D platformer built in Unity with a pixel-art style.', desc:'A 2D platformer built in Unity: jump, dodge obstacles and collect strawberries to score points.', did:['Jumping and collision mechanics.','Score, lives and obstacles.','Menu and pixel-art style.']}
    }
  },
  {
    id:'escacs', cat:'jocs',
    media:{type:'image', src:'assets/img/escacs.webp'},
    gallery:['assets/img/escacs.webp','assets/img/escacs2.webp'],
    tags:['C++','Qt'],
    links:[{label:'GitHub', href:GH+'/Escacs_QT'}],
    t:{
      ca:{title:'Escacs', one:'Joc d\'escacs d\'escriptori fet amb C++ i Qt.', desc:'Una aplicació d\'escriptori per jugar als escacs, amb taulell, moviments de les peces i puntuació de cada jugador.', did:['Lògica del joc en C++.','Interfície gràfica amb Qt.','Moviments vàlids i puntuació.']},
      es:{title:'Ajedrez', one:'Juego de ajedrez de escritorio hecho con C++ y Qt.', desc:'Una aplicación de escritorio para jugar al ajedrez, con tablero, movimientos de las piezas y puntuación de cada jugador.', did:['Lógica del juego en C++.','Interfaz gráfica con Qt.','Movimientos válidos y puntuación.']},
      en:{title:'Chess', one:'Desktop chess game built with C++ and Qt.', desc:'A desktop app to play chess, with board, piece movement and scoring for each player.', did:['Game logic in C++.','Graphical interface with Qt.','Valid moves and scoring.']}
    }
  },
  {
    id:'barcos', cat:'jocs',
    media:{type:'image', src:'assets/img/barcos.webp'},
    gallery:['assets/img/barcos.webp'],
    tags:['Unity','C#','Multijugador','3D'],
    links:[],
    t:{
      ca:{title:'Vaixells 3D', one:'Videojoc multijugador en 3D fet amb Unity.', desc:'Un videojoc multijugador en 3D on cada jugador controla un vaixell en un escenari low poly.', did:['Desenvolupament amb Unity.','Partides multijugador.','Escenari i models 3D low poly.']},
      es:{title:'Barcos 3D', one:'Videojuego multijugador en 3D hecho con Unity.', desc:'Un videojuego multijugador en 3D en el que cada jugador controla un barco en un escenario low poly.', did:['Desarrollo con Unity.','Partidas multijugador.','Escenario y modelos 3D low poly.']},
      en:{title:'Boats 3D', one:'3D multiplayer game built with Unity.', desc:'A 3D multiplayer game where each player steers a boat through a low-poly world.', did:['Built with Unity.','Multiplayer matches.','Low-poly 3D scene and models.']}
    }
  }
];

const SKILLS = [
  {t:{ca:'IA i dades',es:'IA y datos',en:'AI & data'}, items:['Python','RAG / LLM','Gemini API','SQL','PostgreSQL','Firebase','Google Analytics 4','Search Console','Power BI']},
  {t:{ca:'Web',es:'Web',en:'Web'}, items:['React','TypeScript','JavaScript','PHP / Laravel','HTML / CSS','WordPress']},
  {t:{ca:'Apps i IoT',es:'Apps e IoT',en:'Apps & IoT'}, items:['React Native','Expo','Arduino','Unity / C#','Java','C / C++']},
  {t:{ca:'Eines',es:'Herramientas',en:'Tools'}, items:['Git / GitHub','GitHub Actions','Docker','Figma','Three.js','HubSpot','Jira']}
];

const CATS = {
  all:{ca:'Tots',es:'Todos',en:'All'}, ia:{ca:'IA i dades',es:'IA y datos',en:'AI & data'}, iot:{ca:'IoT',es:'IoT',en:'IoT'},
  apps:{ca:'Apps',es:'Apps',en:'Apps'}, webs:{ca:'Webs',es:'Webs',en:'Websites'}, jocs:{ca:'Jocs',es:'Juegos',en:'Games'}
};

const ROTATE = {
  ca:['webs','apps mòbils','solucions amb IA','dashboards de dades','dispositius IoT'],
  es:['webs','apps móviles','soluciones con IA','dashboards de datos','dispositivos IoT'],
  en:['websites','mobile apps','AI solutions','data dashboards','IoT devices']
};

const I18N = {
  ca:{'nav.projects':'Projectes','nav.about':'Sobre mi','nav.contact':'Contacte','nav.cv':'CV','cap.role':'Multimèdia · UVic-UCC','hero.lede2':'Desenvolupo webs, apps i solucions amb IA. En lloc de llegir un currículum, pregunta\'m el que vulguis.','chat.status':'Assistent amb IA','chat.label':'Escriu una pregunta','chat.ph':'Pregunta\'m sobre els meus projectes, estudis o experiència...','hero.status':'Disponible per a pràctiques · febrer 2027','hero.hello':'Hola, sóc la','hero.ido':'Creo',
    'hero.lede':'Estudiant de Multimèdia a la UVic-UCC. M\'agrada entendre problemes reals i resoldre\'ls amb tecnologia: des d\'una web fins a una app amb IA o un dispositiu amb sensors.',
    'hero.cta1':'Veure projectes','hero.cta2':'Parlem','chip.ai':'IA aplicada','proj.eyebrow':'Projectes destacats','proj.title':'Coses que he construït','proj.more':'Més projectes',
    'about.eyebrow':'Sobre mi','about.title':'Tecnologia amb sentit pràctic',
    'about.p1':'Estic acabant el Grau en Multimèdia. Aplicacions i Videojocs a la Universitat de Vic. Des d\'octubre de 2026 faig pràctiques de tractament de dades: treballo amb PostgreSQL i Firebase, desenvolupo en equip una aplicació de petjada de carboni per a la Fundació Kilian Jornet (Docker, Scrum) i he fet un prototip de realitat augmentada amb Unity. M\'interessa sobretot la IA aplicada: fer servir models de llenguatge i dades per resoldre problemes reals d\'empresa.',
    'about.p3':'Busco pràctiques a partir de febrer de 2027 en un equip on pugui aplicar la IA i les dades a problemes reals: automatitzar processos, crear assistents que responguin amb la informació de l\'empresa o construir eines internes que facin la feina més fàcil. M\'agrada entendre primer com treballa la gent i després proposar la solució tècnica.',
    'about.p2':'Des del 2022 soc cap de sala d\'una pizzeria mentre estudio: coordino un equip, formo companys nous i resolc problemes sota pressió. Això també és el que porto a cada projecte.',
    'tl.1d':'Oct 2026 – ara','tl.1t':'Pràctiques de tractament de dades','tl.1s':'Universitat de Vic – UCC','tl.1a':'Gestió i tractament de dades amb PostgreSQL: consultes SQL, organització de les taules i polítiques d\'accés perquè cada usuari només vegi les dades que li toquen.','tl.1b':'Firebase per guardar les dades de les aplicacions i configurar-ne els permisos.','tl.1c':'Desenvolupament en equip d\'una aplicació per calcular la petjada de carboni per a la Fundació Kilian Jornet, desplegada amb Docker i organitzada amb Scrum.','tl.1e':'Prototip de realitat augmentada amb Unity AR per a mòbil: un marcador de referència de 25 mm que es projecta a escala real i s\'adapta en temps real a la distància i a les superfícies.','tl.3d':'2022 – ara','tl.3t':'Cap de sala','tl.4t':'Grau en Multimèdia',
    'contact.eyebrow':'Contacte','contact.title':'Parlem?','contact.lede':'Busco pràctiques a partir de febrer de 2027 en desenvolupament, dades o IA aplicada.','contact.copy':'Copiar','contact.copied':'Copiat!','contact.cv':'Descarregar CV',
    'modal.did':'Què he fet','card.view':'Veure projecte →','card.soon':'En desenvolupament','soon.text':'Aviat, vídeo del prototip'},
  es:{'nav.projects':'Proyectos','nav.about':'Sobre mí','nav.contact':'Contacto','nav.cv':'CV','cap.role':'Multimedia · UVic-UCC','hero.lede2':'Desarrollo webs, apps y soluciones con IA. En lugar de leer un currículum, pregúntame lo que quieras.','chat.status':'Asistente con IA','chat.label':'Escribe una pregunta','chat.ph':'Pregúntame sobre mis proyectos, estudios o experiencia...','hero.status':'Disponible para prácticas · febrero 2027','hero.hello':'Hola, soy','hero.ido':'Creo',
    'hero.lede':'Estudiante de Multimedia en la UVic-UCC. Me gusta entender problemas reales y resolverlos con tecnología: desde una web hasta una app con IA o un dispositivo con sensores.',
    'hero.cta1':'Ver proyectos','hero.cta2':'Hablemos','chip.ai':'IA aplicada','proj.eyebrow':'Proyectos destacados','proj.title':'Cosas que he construido','proj.more':'Más proyectos',
    'about.eyebrow':'Sobre mí','about.title':'Tecnología con sentido práctico',
    'about.p1':'Estoy terminando el Grado en Multimedia. Aplicaciones y Videojuegos en la Universitat de Vic. Desde octubre de 2026 hago prácticas de tratamiento de datos: trabajo con PostgreSQL y Firebase, desarrollo en equipo una aplicación de huella de carbono para la Fundació Kilian Jornet (Docker, Scrum) y he hecho un prototipo de realidad aumentada con Unity. Me interesa sobre todo la IA aplicada: usar modelos de lenguaje y datos para resolver problemas reales de empresa.',
    'about.p3':'Busco prácticas a partir de febrero de 2027 en un equipo donde pueda aplicar la IA y los datos a problemas reales: automatizar procesos, crear asistentes que respondan con la información de la empresa o construir herramientas internas que faciliten el trabajo. Me gusta entender primero cómo trabaja la gente y después proponer la solución técnica.',
    'about.p2':'Desde 2022 soy jefa de sala en una pizzería mientras estudio: coordino un equipo, formo a compañeros nuevos y resuelvo problemas bajo presión. Eso también es lo que llevo a cada proyecto.',
    'tl.1d':'Oct 2026 – ahora','tl.1t':'Prácticas de tratamiento de datos','tl.1s':'Universitat de Vic – UCC','tl.1a':'Gestión y tratamiento de datos con PostgreSQL: consultas SQL, organización de las tablas y políticas de acceso para que cada usuario solo vea los datos que le corresponden.','tl.1b':'Firebase para guardar los datos de las aplicaciones y configurar sus permisos.','tl.1c':'Desarrollo en equipo de una aplicación para calcular la huella de carbono para la Fundació Kilian Jornet, desplegada con Docker y organizada con Scrum.','tl.1e':'Prototipo de realidad aumentada con Unity AR para móvil: un marcador de referencia de 25 mm que se proyecta a escala real y se adapta en tiempo real a la distancia y a las superficies.','tl.3d':'2022 – ahora','tl.3t':'Jefa de sala','tl.4t':'Grado en Multimedia',
    'contact.eyebrow':'Contacto','contact.title':'¿Hablamos?','contact.lede':'Busco prácticas a partir de febrero de 2027 en desarrollo, datos o IA aplicada.','contact.copy':'Copiar','contact.copied':'¡Copiado!','contact.cv':'Descargar CV',
    'modal.did':'Qué he hecho','card.view':'Ver proyecto →','card.soon':'En desarrollo','soon.text':'Pronto, vídeo del prototipo'},
  en:{'nav.projects':'Projects','nav.about':'About','nav.contact':'Contact','nav.cv':'CV','cap.role':'Multimedia · UVic-UCC','hero.lede2':'I build websites, apps and AI solutions. Instead of reading a CV, just ask me anything.','chat.status':'AI assistant','chat.label':'Type a question','chat.ph':'Ask me about my projects, studies or experience...','hero.status':'Open to internships · February 2027','hero.hello':'Hi, I\'m','hero.ido':'I build',
    'hero.lede':'Multimedia student at UVic-UCC (Barcelona). I like understanding real problems and solving them with technology: from a website to an AI app or a sensor device.',
    'hero.cta1':'See projects','hero.cta2':'Let\'s talk','chip.ai':'Applied AI','proj.eyebrow':'Featured projects','proj.title':'Things I\'ve built','proj.more':'More projects',
    'about.eyebrow':'About me','about.title':'Technology with a practical purpose',
    'about.p1':'I\'m finishing my Bachelor\'s in Multimedia (Applications and Video Games) at the University of Vic. Since October 2026 I\'ve been doing a data processing internship: I work with PostgreSQL and Firebase, I\'m part of a team building a carbon footprint app for the Kilian Jornet Foundation (Docker, Scrum), and I built an augmented reality prototype with Unity. What interests me most is applied AI: using language models and data to solve real business problems.',
    'about.p3':'I\'m looking for an internship from February 2027 in a team where I can apply AI and data to real problems: automating processes, building assistants that answer with the company\'s own information, or creating internal tools that make work easier. I like to understand how people work first and then propose the technical solution.',
    'about.p2':'Since 2022 I\'ve worked as a floor manager at a pizzeria while studying: I coordinate a team, train new staff and solve problems under pressure. That\'s what I bring to every project too.',
    'tl.1d':'Oct 2026 – now','tl.1t':'Data processing internship','tl.1s':'University of Vic – UCC','tl.1a':'Data management with PostgreSQL: SQL queries, table design and access policies so each user only sees the data they are allowed to.','tl.1b':'Firebase to store application data and configure its permissions.','tl.1c':'Team development of a carbon footprint calculator for the Kilian Jornet Foundation, deployed with Docker and managed with Scrum.','tl.1e':'Mobile augmented reality prototype with Unity AR: a 25 mm reference marker projected at real scale that adapts in real time to distance and surfaces.','tl.3d':'2022 – now','tl.3t':'Floor manager','tl.4t':'Bachelor\'s in Multimedia',
    'contact.eyebrow':'Contact','contact.title':'Let\'s talk','contact.lede':'I\'m looking for an internship from February 2027 in development, data or applied AI.','contact.copy':'Copy','contact.copied':'Copied!','contact.cv':'Download CV',
    'modal.did':'What I did','card.view':'View project →','card.soon':'In progress','soon.text':'Prototype video coming soon'}
};

/* ============================================================ */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
let lang = 'ca', filter = 'all';
try { const saved = localStorage.getItem('nf-lang'); if (saved && I18N[saved]) lang = saved; else if ((navigator.language||'').startsWith('es')) lang='es'; else if (!(navigator.language||'').startsWith('ca')) lang = 'en'; } catch(e){}
const T = k => I18N[lang][k] || I18N.ca[k] || k;
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

function mediaEl(p, big){
  const m = p.media, box = el('div', 'fmedia');
  if (m.type === 'soon' || m.type === 'soon3d'){
    const s = el('div','soon'); s.append(el('span','soon-mark','IoT'), el('span',null, T('soon.text')));
    box.classList.add('duo'); box.append(s); return box;
  }
  let inner;
  if (m.type === 'video'){
    inner = document.createElement('video');
    Object.assign(inner, {muted:true, loop:true, playsInline:true, preload:'none', poster:m.poster||''});
    inner.setAttribute('muted',''); inner.setAttribute('playsinline','');
    inner.dataset.src = m.src; inner.setAttribute('aria-hidden','true');
  } else {
    inner = document.createElement('img'); inner.src = m.src; inner.alt = p.t[lang].title; inner.loading = 'lazy'; inner.decoding='async';
  }
  if (m.phone){ const ph = el('div','phone'); ph.append(inner); box.classList.add('duo'); box.append(ph); }
  else { inner.classList.add('cover'); box.append(inner); }
  return box;
}

function card(p, featured){
  const tx = p.t[lang];
  const b = el('button', featured ? 'fcard reveal' : 'gcard reveal'); b.type='button'; b.dataset.cat = p.cat; b.dataset.id = p.id;
  b.setAttribute('aria-label', tx.title);
  const media = mediaEl(p, featured);
  if (p.soon){ const bd = el('span','badge', T('card.soon')); media.append(bd); }
  const body = el('div','fbody');
  body.append(el('span','cat', CATS[p.cat][lang]), el('h3', null, tx.title), el('p', null, tx.one));
  const tags = el('div','tags'); p.tags.slice(0, featured?5:3).forEach(t => tags.append(el('span','tag',t))); body.append(tags);
  if (featured) body.append(el('span','more', T('card.view')));
  b.append(media, body);
  b.addEventListener('click', () => openModal(p));
  return b;
}

function render(){
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(n => n.textContent = T(n.dataset.i18n));
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  $('#featured').replaceChildren(...PROJECTS.filter(p => p.featured).map(p => card(p, true)));
  $('#grid').replaceChildren(...PROJECTS.map(p => { const c = card(p, false); if (p.featured) c.dataset.feat = '1'; return c; }));
  $('#filters').replaceChildren(...Object.keys(CATS).map(k => { const b = el('button', null, CATS[k][lang]); b.type='button'; b.setAttribute('aria-pressed', String(k===filter)); b.onclick = () => { filter = k; applyFilter(); }; b.dataset.k = k; return b; }));
  applyFilter();
  $('#skills').replaceChildren(...SKILLS.map(s => { const d = el('div','sk reveal'); const h = el('h4', null, s.t[lang]); const t = el('div','tags'); s.items.forEach(i => t.append(el('span','tag',i))); d.append(h,t); return d; }));
  $('#track').replaceChildren(...[0,1].map(() => { const s = el('span'); ['Python','React','TypeScript','IA · RAG','SQL','PostgreSQL','Firebase','Laravel','React Native','Docker','GitHub Actions','SEO','Arduino','IoT','Three.js','Figma'].forEach(w => { const x = el('span',null,w); s.append(x); }); return s; }));
  observe();
  $$('[data-i18n-ph]').forEach(n => n.placeholder = T(n.dataset.i18nPh));
  if (window.onLangChange) window.onLangChange();
}
function applyFilter(){
  $$('#filters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === filter)));
  $$('#grid .gcard').forEach(c => c.hidden = filter === 'all' ? !!c.dataset.feat : c.dataset.cat !== filter);
}

/* modal */
function openModal(p){
  const tx = p.t[lang], mm = $('#m-media'); mm.replaceChildren();
  if (p.media.type === 'video'){ const v = document.createElement('video'); Object.assign(v,{src:p.media.src, muted:true, loop:true, playsInline:true, autoplay:true, controls:true, poster:p.media.poster||''}); v.setAttribute('playsinline',''); mm.append(v); }
  p.gallery.forEach(src => { if (p.media.type==='image' && src===p.media.src && mm.children.length) return; const i = document.createElement('img'); i.src = src; i.alt = tx.title; i.loading='lazy'; mm.append(i); });
  mm.hidden = !mm.children.length;
  $('#m-cat').textContent = CATS[p.cat][lang]; $('#m-title').textContent = tx.title; $('#m-desc').textContent = tx.desc;
  $('#m-did').replaceChildren(...tx.did.map(d => el('li', null, d)));
  $('#m-tags').replaceChildren(...p.tags.map(t => el('span','tag',t)));
  $('#m-links').replaceChildren(...p.links.map(l => { const a = el('a','btn btn-ghost btn-small', l.label + ' ↗'); a.href = l.href; if (/^https?:/.test(l.href)){ a.target='_blank'; a.rel='noopener'; } return a; }));
  const d = $('#modal'); if (d.showModal) d.showModal(); else d.setAttribute('open','');
}
$('#m-close').addEventListener('click', () => $('#modal').close());
$('#modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
$('#modal').addEventListener('close', () => $$('#m-media video').forEach(v => v.pause()));

/* video autoplay when visible + reveal */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let io;
function observe(){
  if (io) io.disconnect();
  io = new IntersectionObserver(entries => entries.forEach(en => {
    const t = en.target;
    if (t.tagName === 'VIDEO'){
      if (en.isIntersecting){ if (!t.src && t.dataset.src) t.src = t.dataset.src; if (!reduce) t.play().catch(()=>{}); }
      else t.pause();
    } else if (en.isIntersecting){ t.classList.add('in'); io.unobserve(t); }
  }), {rootMargin:'0px 0px -8% 0px', threshold:0.15});
  $$('video[data-src]').forEach(v => io.observe(v));
  $$('.reveal').forEach(r => io.observe(r));
}

/* language */
$$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; try{ localStorage.setItem('nf-lang', lang); }catch(e){} render(); }));

/* llum del ratolí (ordinador) */
if (matchMedia('(pointer:fine)').matches && !reduce){
  addEventListener('pointermove', e => {
    document.body.style.setProperty('--mx', e.clientX + 'px'); document.body.style.setProperty('--my', e.clientY + 'px');
  });
}

/* copy email */
$('#copy').addEventListener('click', async () => {
  const lbl = $('.copy-lbl'); const email = $('#email').textContent;
  try { await navigator.clipboard.writeText(email); lbl.textContent = T('contact.copied'); }
  catch(e){ location.href = 'mailto:' + email; }
  setTimeout(() => lbl.textContent = T('contact.copy'), 1800);
});

render();
