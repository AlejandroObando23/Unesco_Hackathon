# 🔍 TruthScroll: Sifting the Digital Chaos

> Simulador de Alfabetización Mediática e Informacional (MIL/AMI) desarrollado para el Hackathon UNESCO.

## 📐 Arquitectura de Microservicios

El proyecto cuenta con una arquitectura de microservicios con tres capas independientes:

```
React (Vite)  ↔  FastAPI (Backend Logic)  ↔  FastAPI + Prisma (Database API)  ↔  Supabase
   Puerto 5173         Puerto 8000                  Puerto 8001
```

## 🚀 Setup Rápido con Docker

El proyecto está dockerizado. Cada capa tiene su propio `Dockerfile` y `docker-compose.yml`.

### 1. Clonar y navegar al proyecto

```bash
cd Hackathon_Unesco
```

### 2. Configurar Base de Datos (Supabase)

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **Settings → Database → Connection String → URI** → `DATABASE_URL`
3. Agrega la variable en `database/.env`.

### 3. Levantar los Servicios

**Paso 1: Database API (Persistencia de Datos)**
```bash
cd database
docker-compose up --build -d
```
Estará disponible en: `http://localhost:8001` (Documentación API en `/docs`)

**Paso 2: Backend (Lógica del Juego)**
```bash
cd backend
docker-compose up --build -d
```
Estará disponible en: `http://localhost:8000` (Documentación API en `/docs`)

**Paso 3: Frontend (Interfaz Web)**
```bash
cd frontend
docker-compose up --build -d
```
Estará disponible en: `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
Hackathon_Unesco/
├── frontend/                    # Capa 1 — React + Vite (Puerto 5173)
│   ├── src/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── backend/                     # Capa 2 — Lógica de negocio (FastAPI, Puerto 8000)
│   ├── app/
│   │   ├── main.py              # Entrypoint 
│   │   ├── routers/             # posts.py, game.py (Consume Database API vía httpx)
│   │   └── services/            # evaluation.py (Motor MIL)
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── database/                    # Capa 3 — API de Persistencia (FastAPI + Prisma, Puerto 8001)
    ├── main.py                  # Endpoints de DB
    ├── prisma/
    │   ├── schema.prisma        
    │   └── seed.py              # Script de poblado de la base de datos
    ├── Dockerfile
    └── docker-compose.yml
```

## 🔌 API Endpoints Principales

### Backend API (Puerto 8000)
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/posts/` | Feed de publicaciones para el jugador |
| `POST` | `/api/game/submit` | Enviar decisiones + obtener reporte MIL |
| `GET` | `/api/leaderboard` | Obtener tabla de clasificación |

### Database API (Puerto 8001)
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/publications` | Obtener todos los posts (Interno) |
| `POST` | `/api/publications/batch` | Obtener posts específicos (Interno) |
| `POST` | `/api/leaderboard` | Guardar puntaje (Interno) |
| `GET` | `/api/leaderboard` | Obtener puntajes (Interno) |

## 🎮 Requisitos implementados

| REQ | Descripción | Implementación |
|-----|-------------|----------------|
| REQ001 | Gestionar Publicaciones | Modelo `Publication` vía Database API |
| REQ002 | Gestionar Partida | API de juego y evaluación asíncrona |
| REQ003 | Monitorear Partida | Timer 5min + validación anti-trampa en backend |
| REQ004 | Reporte y Consejos MIL | Motor de evaluación → `mil_tips` por post fallado |
| REQ005 | Leaderboard | Guardado de puntuación general |

## 👥 Equipo de 4 personas — División sugerida

| Dev | Área |
|-----|------|
| Dev 1 | Backend API: Reglas del juego y endpoints de frontend |
| Dev 2 | Database API: Prisma schema, migraciones y endpoints internos |
| Dev 3 | Frontend: Componentes principales (PostCard, Timer, ResultsPage) |
| Dev 4 | Frontend: Leaderboard y DevOps (Docker-compose) |
