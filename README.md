# Academia IA - Landing Page & Chatbot

Plataforma web de cursos de Inteligencia Artificial que incluye una interfaz construida en Vanilla JavaScript (ES Modules) y CSS3 nativo, y un chatbot impulsado por **Google Gemini** con arquitectura RAG (Retrieval-Augmented Generation) ejecutado localmente desde el navegador apoyado por un proxy seguro en Node.js.

## Características

- 🎨 **Diseño Premium**: Paleta minimalista y limpia, componentes "glassmorphism", tipografía Inter, 100% responsivo.
- ⚡ **Full Vanilla JS**: Sin frameworks pesados. Usa un Hash Router nativo y componentes modulares funcionales.
- 🤖 **Chatbot Inteligente**: Integrado con `gemini-1.5-flash` a través de la API oficial de Google AI Studio. 
- 🔒 **Proxy Seguro**: La API key vive en el servidor backend (Node 20+) y no se expone al cliente. El backend expone `POST /api/chat`.
- 🧠 **RAG (Retrieval-Augmented Generation)**: La base de conocimiento se auto-construye de los datos de la app. El frontend recupera los fragmentos más relevantes y se los inyecta al prompt de Gemini junto con *guardrails* estrictos.

## Estructura del Proyecto

\`\`\`text
Chat-Bot/
├── server/
│   ├── server.js        # Proxy HTTP y rate-limiting
│   ├── config.js        # Variables de entorno
│   └── geminiClient.js  # Lógica de llamadas a AI Studio
├── public/
│   ├── index.html       # Shell y layout principal
│   ├── css/             # Sistema de diseño, layout y componentes
│   └── js/
│       ├── core/        # Router, manipuladores del DOM
│       ├── data/        # "Base de datos" estática (cursos, profes, historia)
│       ├── pages/       # Vistas de la aplicación
│       ├── components/  # Componentes reutilizables UI
│       └── chatbot/     # Motor RAG y Chat Widget UI
├── .env                 # Secretos locales
└── package.json         # Scripts de servidor
\`\`\`

## Requisitos

- [Node.js](https://nodejs.org) >= 20.6.0 (utiliza la flag nativa `--env-file`)

## Instalación y Ejecución

1. Clonar este repositorio.
2. Copiar `.env.example` a `.env` e ingresar tu clave de [Google AI Studio](https://aistudio.google.com/apikey).
   \`\`\`bash
   # Si aún no tienes .env:
   cp .env.example .env
   \`\`\`
3. No requiere `npm install` pesado, ya que utiliza utilidades nativas de Node.
4. Iniciar el servidor:
   \`\`\`bash
   npm run dev
   # o
   node --env-file=.env server/server.js
   \`\`\`
5. Abre `http://localhost:3000/` en tu navegador web.

## Notas

- Si `GEMINI_API_KEY` está vacía, el servidor seguirá funcionando en **modo de demostración**, permitiendo interactuar con el diseño y la interfaz del chatbot, el cual devolverá un mensaje explicativo sobre cómo añadir la clave.
- La aplicación sigue los estándares de accesibilidad básica y diseño mobile-first.
