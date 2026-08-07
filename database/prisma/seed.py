"""
Seed script — populates the Publication table with a mix of real news,
fake news, and AI-generated content for TruthScroll gameplay.

Run with:
    python -m prisma db push   (first time, to sync schema)
    python prisma/seed.py
"""

import asyncio
from prisma import Prisma

PUBLICATIONS = [
    # ── REAL NEWS ────────────────────────────────────────────────────────────
    {
        "text_content": "La UNESCO declaró que el acceso a internet es un derecho humano fundamental en su informe anual de 2023, instando a los países a eliminar barreras de conectividad.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "Verifica que organismos internacionales como la UNESCO publiquen documentos oficiales en sus sitios web (.un.org, unesco.org). Los informes reales siempre tienen DOI o número de referencia.",
        "category": "real_news",
        "author_name": "UNESCO Press",
        "author_handle": "@UNESCO",
        "likes_count": 14820,
    },
    {
        "text_content": "Científicos del MIT desarrollaron un material que conduce electricidad 10 veces mejor que el cobre a temperatura ambiente, abriendo la puerta a dispositivos más eficientes.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "Las investigaciones científicas legítimas se publican en revistas con revisión de pares (Nature, Science, Cell). Busca el DOI del artículo para confirmar su autenticidad.",
        "category": "real_news",
        "author_name": "MIT News",
        "author_handle": "@MITnews",
        "likes_count": 9340,
    },
    {
        "text_content": "El Parlamento Europeo aprobó la primera ley mundial de regulación de IA (AI Act), que entrará en vigor de forma escalonada entre 2024 y 2027.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "Las leyes aprobadas por parlamentos están disponibles en gacetas oficiales (EUR-Lex para Europa). Comprueba la fuente primaria antes de compartir noticias legislativas.",
        "category": "real_news",
        "author_name": "Euronews",
        "author_handle": "@euronews",
        "likes_count": 21500,
    },
    {
        "text_content": "Amazon anunció la reducción de su plantilla en 27,000 empleados en enero de 2023, la mayor reducción de personal en la historia de la compañía.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "Los despidos masivos en empresas cotizadas deben reportarse a reguladores (SEC en EE.UU.). Busca comunicados oficiales en el sitio de relaciones con inversores de la empresa.",
        "category": "real_news",
        "author_name": "Reuters",
        "author_handle": "@Reuters",
        "likes_count": 18900,
    },
    {
        "text_content": "La misión Artemis I de la NASA completó con éxito su viaje alrededor de la Luna en diciembre de 2022, preparando el terreno para futuros vuelos tripulados.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "La NASA publica actualizaciones en tiempo real en nasa.gov y sus redes oficiales. Las misiones espaciales tienen transmisiones en vivo verificables.",
        "category": "real_news",
        "author_name": "NASA",
        "author_handle": "@NASA",
        "likes_count": 45200,
    },

    # ── FAKE NEWS ────────────────────────────────────────────────────────────
    {
        "text_content": "¡URGENTE! El gobierno acaba de aprobar en secreto un impuesto del 25% a todos los mensajes de WhatsApp. La ley entra en vigor el próximo lunes. ¡Comparte antes de que censuren esto!",
        "media_url": None,
        "is_real": False,
        "mil_tip": "Los llamados a 'compartir antes de que censuren' son señales de alarma (red flags). Las leyes tributarias se publican en la Gaceta Oficial del país y requieren proceso legislativo público.",
        "category": "text_fake",
        "author_name": "NoticiasVerdad24",
        "author_handle": "@noticias_v24",
        "likes_count": 3200,
    },
    {
        "text_content": "Médicos revelan que beber agua caliente con limón en ayunas destruye células cancerosas 10,000 veces más que la quimioterapia. ¡Los laboratorios suprimen esta información!",
        "media_url": None,
        "is_real": False,
        "mil_tip": "Las afirmaciones médicas extraordinarias requieren evidencia publicada en revistas revisadas por pares. Ningún alimento casero reemplaza tratamientos oncológicos aprobados por la FDA o la EMA.",
        "category": "text_fake",
        "author_name": "SaludNatural",
        "author_handle": "@saludnatural_ok",
        "likes_count": 8900,
    },
    {
        "text_content": "China instaló 5G en todo el planeta para controlar el pensamiento humano. Las antenas emiten señales que alteran las ondas cerebrales. Comprobado por ingenieros anónimos.",
        "media_url": None,
        "is_real": False,
        "mil_tip": "Las 'fuentes anónimas' sin institución o nombre verificable son señal de desinformación. El 5G es radiación no ionizante: la física demuestra que no puede afectar tejido cerebral.",
        "category": "text_fake",
        "author_name": "VerdadOculta",
        "author_handle": "@verdad_oculta_real",
        "likes_count": 12400,
    },
    {
        "text_content": "El presidente firmó hoy un decreto que elimina las pensiones de todos los mayores de 65 años a partir del 1 de septiembre. El documento fue filtrado por un funcionario.",
        "media_url": None,
        "is_real": False,
        "mil_tip": "Los decretos presidenciales son documentos públicos publicados en la Gaceta Oficial. Ante noticias de alto impacto, busca siempre la fuente primaria oficial antes de reaccionar.",
        "category": "text_fake",
        "author_name": "ElInformador",
        "author_handle": "@elinformador_cr",
        "likes_count": 5600,
    },

    # ── AI-GENERATED CONTENT ─────────────────────────────────────────────────
    {
        "text_content": "Esta fotografía muestra al presidente firmando un acuerdo secreto con representantes de una corporación extranjera en una reunión no declarada.",
        "media_url": "https://placehold.co/600x400/1a1a2e/e94560?text=Imagen+IA",
        "is_real": False,
        "mil_tip": "Las imágenes generadas por IA suelen tener anomalías: manos con dedos extra, fondos inconsistentes, texturas de piel irreales o texto ilegible. Usa herramientas como Hive Moderation o AI or Not para verificarlas.",
        "category": "image_ai",
        "author_name": "Denuncia Ciudadana",
        "author_handle": "@denuncia_real",
        "likes_count": 22100,
    },
    {
        "text_content": "Exclusiva: capturamos el momento exacto en que el senador acepta un sobre con dinero en efectivo en el Congreso. La imagen habla por sí sola.",
        "media_url": "https://placehold.co/600x400/0d0d1a/ff6b6b?text=Foto+Manipulada",
        "is_real": False,
        "mil_tip": "Realiza búsqueda inversa de imágenes (Google Lens, TinEye) para verificar si la foto ya existía en otro contexto. Una imagen 'exclusiva' sin metadatos EXIF verificables es altamente sospechosa.",
        "category": "image_ai",
        "author_name": "PeriodismoVerdad",
        "author_handle": "@periodismo_v",
        "likes_count": 34500,
    },
    {
        "text_content": "Imágenes satelitales revelan una instalación militar secreta construida en zona protegida. Fuentes gubernamentales niegan su existencia.",
        "media_url": "https://placehold.co/600x400/0a0a1a/4ecdc4?text=Satelite+IA",
        "is_real": False,
        "mil_tip": "Las imágenes satelitales auténticas provienen de fuentes verificables como Google Earth, Sentinel Hub o Planet Labs. Verifica las coordenadas geográficas en plataformas oficiales.",
        "category": "image_ai",
        "author_name": "IntelOpenSource",
        "author_handle": "@intel_os",
        "likes_count": 18700,
    },
    {
        "text_content": "Este video muestra cómo un funcionario de salud admite en privado que las vacunas contienen microchips de seguimiento. El audio fue filtrado por un empleado.",
        "media_url": "https://placehold.co/600x400/1a0a0a/ff9f43?text=Deepfake+Video",
        "is_real": False,
        "mil_tip": "Los deepfakes de audio y video son cada vez más convincentes. Busca inconsistencias en el movimiento de los labios, iluminación facial o artefactos en los bordes del rostro. Verifica con medios de comunicación de referencia.",
        "category": "image_ai",
        "author_name": "FiltradosOficial",
        "author_handle": "@filtrados_oficial",
        "likes_count": 41200,
    },
    {
        "text_content": "Astronautas de la ISS comparten imagen impactante de una tormenta solar captada directamente desde la órbita terrestre.",
        "media_url": "https://placehold.co/600x400/050520/7b68ee?text=Foto+NASA+Real",
        "is_real": True,
        "mil_tip": "¡Esta imagen es auténtica! La NASA publica regularmente fotografías desde la ISS en su galería oficial (nasa.gov/gallery). Verificar la fuente antes de dudar de contenido legítimo también es parte de la alfabetización mediática.",
        "category": "real_image",
        "author_name": "NASA Astronauts",
        "author_handle": "@NASA_Astronauts",
        "likes_count": 67800,
    },
]


async def main() -> None:
    db = Prisma()
    await db.connect()

    print(f"🌱 Seeding {len(PUBLICATIONS)} publications...")

    for i, pub in enumerate(PUBLICATIONS):
        await db.publication.create(data=pub)
        print(f"  ✅ [{i + 1}/{len(PUBLICATIONS)}] Created: {pub['author_name']}")

    count = await db.publication.count()
    print(f"\n✨ Done! Total publications in DB: {count}")

    await db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
