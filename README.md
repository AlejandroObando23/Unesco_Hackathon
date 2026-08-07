# 🔍 TruthScroll: Sifting the Digital Chaos

> Simulador de Alfabetización Mediática e Informacional (MIL/AMI) desarrollado para el Hackathon UNESCO.

## 📐 Arquitectura

```
React (Vite)  →  FastAPI (Python)  →  Prisma ORM  →  Supabase/PostgreSQL
   Capa 1            Capa 2            Capa 3            Capa 4
```

## 🚀 Setup Rápido

### 1. Clonar y navegar al proyecto

```bash
cd Hackathon_Unesco
```

### 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **Settings → API** y copia:
   - `Project URL` → `VITE_SUPABASE_URL` / `SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`
   - `service_role secret key` → `SUPABASE_SERVICE_ROLE_KEY`
3. Ve a **Settings → API → JWT Settings** y copia el **JWT Secret** → `SUPABASE_JWT_SECRET`
4. Ve a **Settings → Database → Connection String → URI** → `DATABASE_URL`
5. Habilita **Email Auth** en **Authentication → Providers**
6. Crea un Storage Bucket llamado `post-media` (público) para imágenes

### 3. Backend

```bash
cd backend

# Crear entorno virtual
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate    # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
copy .env.example .env
# Edita .env con tus credenciales de Supabase

# Generar el cliente Prisma y crear tablas en Supabase
prisma generate
prisma db push

# Poblar la base de datos con posts de ejemplo
python prisma/seed.py

# Iniciar el servidor de desarrollo
uvicorn app.main:app --reload
```

El backend estará disponible en: `http://localhost:8000`
Documentación API: `http://localhost:8000/docs`

### 4. Frontend

```bash
cd frontend

# Configurar variables de entorno
copy .env.local.example .env.local
# Edita .env.local con tus credenciales

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
Hackathon_Unesco/
├── frontend/                    # Capa 1 — React + Vite
│   ├── src/
│   │   ├── pages/               # LoginPage, RegisterPage, GamePage, ResultsPage
│   │   ├── components/          # PostCard, Timer, DecisionBar, Scoreboard
│   │   ├── hooks/               # useAuth, useGameState
│   │   ├── services/            # supabase.js, api.js
│   │   └── App.jsx              # Router + PrivateRoute
│   └── index.html
│
└── backend/                     # Capa 2 + 3 — FastAPI + Prisma
    ├── app/
    │   ├── main.py              # FastAPI entrypoint + CORS
    │   ├── routers/             # posts.py, game.py
    │   ├── schemas/             # post.py, game.py (Pydantic)
    │   ├── services/            # auth.py, evaluation.py (Motor MIL)
    │   └── db/client.py         # Prisma singleton
    └── prisma/
        ├── schema.prisma        # User, Publication, GameSession
        └── seed.py              # 15 posts de ejemplo
```

## 🔌 API Endpoints

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/health` | Health check | ❌ |
| `GET` | `/api/posts/` | Feed de publicaciones (sin is_real) | ✅ JWT |
| `POST` | `/api/game/submit` | Enviar decisiones + obtener reporte MIL | ✅ JWT |
| `GET` | `/api/game/sessions` | Historial de partidas | ✅ JWT |

## 🎮 Requisitos implementados

| REQ | Descripción | Implementación |
|-----|-------------|----------------|
| REQ001 | Iniciar Sesión | Supabase Auth SDK (`signInWithPassword`) |
| REQ002 | Crear Cuenta | Supabase Auth SDK (`signUp`) |
| REQ003 | Recuperar Contraseña | Supabase Auth SDK (`resetPasswordForEmail`) |
| REQ004 | Gestionar Publicaciones | Modelo `Publication` en Prisma + seed |
| REQ005 | Gestionar Partida | Modelo `GameSession` + `GET /api/game/sessions` |
| REQ006 | Monitorear Partida | Timer 5min + validación anti-trampa en backend |
| REQ007 | Reporte y Consejos MIL | Motor de evaluación → `mil_tips` por post fallado |

## 👥 Equipo de 4 personas — División sugerida

| Dev | Área |
|-----|------|
| Dev 1 | Backend: FastAPI + motor de evaluación |
| Dev 2 | Base de datos: Prisma schema + seed + Supabase config |
| Dev 3 | Frontend: Autenticación (Login, Register, Reset) |
| Dev 4 | Frontend: Feed del juego (PostCard, Timer, ResultsPage) |
"# Unesco_Hackathon" 
