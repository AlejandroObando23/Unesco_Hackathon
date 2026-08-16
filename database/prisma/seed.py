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
    {
        "text_content": "La UNESCO declaró que el acceso a internet es un derecho humano fundamental en su informe anual de 2023, instando a los países a eliminar barreras de conectividad.",
        "text_content_en": "UNESCO declared internet access a fundamental human right in its 2023 annual report, urging countries to eliminate connectivity barriers.",
        "media_url": "https://articles.unesco.org/sites/default/files/2023-02/52703519932_f56bcda15e_o.jpg",
        "is_real": True,
        "mil_tip": "Verifica que organismos internacionales como la UNESCO publiquen documentos oficiales en sus sitios web (.un.org, unesco.org). Los informes reales siempre tienen DOI o número de referencia.",
        "mil_tip_en": "Verify that international organizations like UNESCO publish official documents on their websites (.un.org, unesco.org). Real reports always have a DOI or reference number.",
        "category": "real_news",
        "author_name": "UNESCO Press",
        "author_handle": "@UNESCO",
        "likes_count": 14820,
    },
    {
        "text_content": "Científicos del MIT desarrollaron un material que conduce electricidad 10 veces mejor que el cobre a temperatura ambiente, abriendo la puerta a dispositivos más eficientes.",
        "text_content_en": "MIT scientists developed a material that conducts electricity 10 times better than copper at room temperature, opening the door to more efficient devices.",
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8upkjCU2on7NPbytIGdPSWOkMBdXi81U9RUKs93MMghoWdjnlXBGX3_V&s=10",
        "is_real": True,
        "mil_tip": "Las investigaciones científicas legítimas se publican en revistas con revisión de pares (Nature, Science, Cell). Busca el DOI del artículo para confirmar su autenticidad.",
        "mil_tip_en": "Legitimate scientific research is published in peer-reviewed journals (Nature, Science, Cell). Look for the article's DOI to confirm its authenticity.",
        "category": "real_news",
        "author_name": "MIT News",
        "author_handle": "@MITnews",
        "likes_count": 9340,
    },
    {
        "text_content": "El Parlamento Europeo aprobó la primera ley mundial de regulación de IA (AI Act), que entrará en vigor de forma escalonada entre 2024 y 2027.",
        "text_content_en": "The European Parliament approved the world's first AI regulation law (AI Act), which will come into effect in stages between 2024 and 2027.",
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrEs2_X9P1mgped4rzU8F_RJIFop-VWgYFxd3gVA1D-XJqZSisAN49RHQ&s=10",
        "is_real": True,
        "mil_tip": "Las leyes aprobadas por parlamentos están disponibles en gacetas oficiales (EUR-Lex para Europa). Comprueba la fuente primaria antes de compartir noticias legislativas.",
        "mil_tip_en": "Laws passed by parliaments are available in official gazettes (EUR-Lex for Europe). Check the primary source before sharing legislative news.",
        "category": "real_news",
        "author_name": "Euronews",
        "author_handle": "@euronews",
        "likes_count": 21500,
    },
    {
        "text_content": "Amazon anunció la reducción de su plantilla en 27,000 empleados en enero de 2023, la mayor reducción de personal en la historia de la compañía.",
        "text_content_en": "Amazon announced a workforce reduction of 27,000 employees in January 2023, the largest staff cut in the company's history.",
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Io2YlRQzOiAfM4sucZBHMCM_iEHwu2Kjq5fuVlQbPgiv9TXxSkDi3LQ&s=10",
        "is_real": True,
        "mil_tip": "Los despidos masivos en empresas cotizadas deben reportarse a reguladores (SEC en EE.UU.). Busca comunicados oficiales en el sitio de relaciones con inversores de la empresa.",
        "mil_tip_en": "Mass layoffs in publicly traded companies must be reported to regulators (SEC in the US). Look for official press releases on the company's investor relations site.",
        "category": "real_news",
        "author_name": "Reuters",
        "author_handle": "@Reuters",
        "likes_count": 18900,
    },
    {
        "text_content": "La misión Artemis I de la NASA completó con éxito su viaje alrededor de la Luna en diciembre de 2022, preparando el terreno para futuros vuelos tripulados.",
        "text_content_en": "NASA's Artemis I mission successfully completed its journey around the Moon in December 2022, paving the way for future crewed flights.",
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7bjqQW87w13zhD2Cy8jk_d7unYNYui4CAlNnS-aQ5QyD2VxoFw7wYHQBN&s=10",
        "is_real": True,
        "mil_tip": "La NASA publica actualizaciones en tiempo real en nasa.gov y sus redes oficiales. Las misiones espaciales tienen transmisiones en vivo verificables.",
        "mil_tip_en": "NASA publishes real-time updates on nasa.gov and its official networks. Space missions have verifiable live streams.",
        "category": "real_news",
        "author_name": "NASA",
        "author_handle": "@NASA",
        "likes_count": 45200,
    },
    {
        "text_content": "¡URGENTE! El gobierno acaba de aprobar en secreto un impuesto del 25% a todos los mensajes de WhatsApp. La ley entra en vigor el próximo lunes. ¡Comparte antes de que censuren esto!",
        "text_content_en": "URGENT! The government just secretly approved a 25% tax on all WhatsApp messages. The law takes effect next Monday. Share before they censor this!",
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mTWo7nD1s1GUy0TNEs0ujxzqE83RpWrAUG6dJNGrNPYV-tILM0f8cSM&s=10",
        "is_real": False,
        "mil_tip": "Los llamados a 'compartir antes de que censuren' son señales de alarma (red flags). Las leyes tributarias se publican en la Gaceta Oficial del país y requieren proceso legislativo público.",
        "mil_tip_en": "Calls to 'share before they censor' are red flags. Tax laws are published in the country's Official Gazette and require a public legislative process.",
        "category": "text_fake",
        "author_name": "NoticiasVerdad24",
        "author_handle": "@noticias_v24",
        "likes_count": 3200,
    },
    {
        "text_content": "Médicos revelan que beber agua caliente con limón en ayunas destruye células cancerosas 10,000 veces más que la quimioterapia. ¡Los laboratorios suprimen esta información!",
        "text_content_en": "Doctors reveal that drinking hot lemon water on an empty stomach destroys cancer cells 10,000 times more than chemotherapy. Laboratories are suppressing this information!",
        "media_url": None,
        "is_real": False,
        "mil_tip": "Las afirmaciones médicas extraordinarias requieren evidencia publicada en revistas revisadas por pares. Ningún alimento casero reemplaza tratamientos oncológicos aprobados por la FDA o la EMA.",
        "mil_tip_en": "Extraordinary medical claims require evidence published in peer-reviewed journals. No homemade food replaces cancer treatments approved by the FDA or EMA.",
        "category": "text_fake",
        "author_name": "SaludNatural",
        "author_handle": "@saludnatural_ok",
        "likes_count": 8900,
    },
    {
        "text_content": "China instaló 5G en todo el planeta para controlar el pensamiento humano. Las antenas emiten señales que alteran las ondas cerebrales. Comprobado por ingenieros anónimos.",
        "text_content_en": "China installed 5G across the planet to control human thought. Antennas emit signals that alter brain waves. Proven by anonymous engineers.",
        "media_url": None,
        "is_real": False,
        "mil_tip": "Las 'fuentes anónimas' sin institución o nombre verificable son señal de desinformación. El 5G es radiación no ionizante: la física demuestra que no puede afectar tejido cerebral.",
        "mil_tip_en": "Anonymous sources without a verifiable institution or name are a sign of misinformation. 5G is non-ionizing radiation: physics shows it cannot affect brain tissue.",
        "category": "text_fake",
        "author_name": "VerdadOculta",
        "author_handle": "@verdad_oculta_real",
        "likes_count": 12400,
    },
    {
        "text_content": "El presidente firmó hoy un decreto que elimina las pensiones de todos los mayores de 65 años a partir del 1 de septiembre. El documento fue filtrado por un funcionario.",
        "text_content_en": "The president signed a decree today eliminating pensions for everyone over 65 starting September 1st. The document was leaked by an official.",
        "media_url": "https://i.postimg.cc/brW5PZ9s/expediente.jpg",
        "is_real": False,
        "mil_tip": "Los decretos presidenciales son documentos públicos publicados en la Gaceta Oficial. Ante noticias de alto impacto, busca siempre la fuente primaria oficial antes de reaccionar.",
        "mil_tip_en": "Presidential decrees are public documents published in the Official Gazette. For high-impact news, always look for the official primary source before reacting.",
        "category": "text_fake",
        "author_name": "ElInformador",
        "author_handle": "@elinformador_cr",
        "likes_count": 5600,
    },
    {
        "text_content": "Esta fotografía muestra al presidente firmando un acuerdo secreto con representantes de una corporación extranjera en una reunión no declarada.",
        "text_content_en": "This photograph shows the president signing a secret agreement with representatives of a foreign corporation in an undeclared meeting.",
        "media_url": "https://i.postimg.cc/Pxf9Qsqf/noboa-firma.jpg",
        "is_real": False,
        "mil_tip": "Las imágenes generadas por IA suelen tener anomalías: manos con dedos extra, fondos inconsistentes, texturas de piel irreales o texto ilegible. Usa herramientas como Hive Moderation o AI or Not para verificarlas.",
        "mil_tip_en": "AI-generated images often have anomalies: hands with extra fingers, inconsistent backgrounds, unrealistic skin textures, or illegible text. Use tools like Hive Moderation to verify them.",
        "category": "image_ai",
        "author_name": "Denuncia Ciudadana",
        "author_handle": "@denuncia_real",
        "likes_count": 22100,
    },
    {
        "text_content": "Exclusiva: capturamos el momento exacto en que el senador acepta un sobre con dinero en efectivo en el Congreso. La imagen habla por sí sola.",
        "text_content_en": "Exclusive: we captured the exact moment the senator accepts an envelope with cash in Congress. The image speaks for itself.",
        "media_url": "https://i.postimg.cc/pT070G9H/parlamento.jpg",
        "is_real": False,
        "mil_tip": "Realiza búsqueda inversa de imágenes (Google Lens, TinEye) para verificar si la foto ya existía en otro contexto. Una imagen 'exclusiva' sin metadatos EXIF verificables es altamente sospechosa.",
        "mil_tip_en": "Perform a reverse image search (Google Lens, TinEye) to verify if the photo already existed in another context. An 'exclusive' image without verifiable EXIF metadata is highly suspicious.",
        "category": "image_ai",
        "author_name": "PeriodismoVerdad",
        "author_handle": "@periodismo_v",
        "likes_count": 34500,
    },
    {
        "text_content": "Imágenes satelitales revelan una instalación militar secreta construida en zona protegida. Fuentes gubernamentales niegan su existencia.",
        "text_content_en": "Satellite images reveal a secret military installation built in a protected area. Government sources deny its existence.",
        "media_url": "https://i.postimg.cc/9MXKY5Qk/base-secreta.jpg",
        "is_real": False,
        "mil_tip": "Las imágenes satelitales auténticas provienen de fuentes verificables como Google Earth, Sentinel Hub o Planet Labs. Verifica las coordenadas geográficas en plataformas oficiales.",
        "mil_tip_en": "Authentic satellite images come from verifiable sources like Google Earth, Sentinel Hub, or Planet Labs. Verify geographical coordinates on official platforms.",
        "category": "image_ai",
        "author_name": "IntelOpenSource",
        "author_handle": "@intel_os",
        "likes_count": 18700,
    },

    {
        "text_content": "Astronautas de la ISS comparten imagen impactante de una tormenta solar captada directamente desde la órbita terrestre.",
        "text_content_en": "ISS astronauts share a striking image of a solar storm captured directly from Earth's orbit.",
        "media_url": "https://www.infobae.com/resizer/v2/AZL7K4DIOVGYXKBD2KHTMGX4VQ.jpg?auth=3703ba17b0c641f5e7668833f559d946dd68dfe508bb34b03753f054622c8ebd&smart=true&width=1200&height=630&quality=85",
        "is_real": True,
        "mil_tip": "¡Esta imagen es auténtica! La NASA publica regularmente fotografías desde la ISS en su galería oficial (nasa.gov/gallery). Verificar la fuente antes de dudar de contenido legítimo también es parte de la alfabetización mediática.",
        "mil_tip_en": "This image is authentic! NASA regularly publishes photographs from the ISS in its official gallery (nasa.gov/gallery). Verifying the source before doubting legitimate content is also part of media literacy.",
        "category": "real_image",
        "author_name": "NASA Astronauts",
        "author_handle": "@NASA_Astronauts",
        "likes_count": 67800,
    },
    {
        "text_content": "La UNESCO declaró que el acceso a internet es un derecho humano fundamental en su informe anual de 2023, instando a los países a eliminar barreras de conectividad.",
        "text_content_en": "UNESCO declared internet access a fundamental human right in its 2023 annual report, urging countries to eliminate connectivity barriers.",
        "media_url": "https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/article/2025-02/shutterstock_2411240235.jpg.webp?itok=EFtMh6c8",
        "is_real": True,
        "mil_tip": "Verifica que organismos internacionales como la UNESCO publiquen documentos oficiales en sus sitios web (.un.org, unesco.org). Los informes reales siempre tienen DOI o número de referencia.",
        "mil_tip_en": "Verify that international organizations like UNESCO publish official documents on their websites (.un.org, unesco.org). Real reports always have a DOI or reference number.",
        "category": "real_news",
        "author_name": "UNESCO Press",
        "author_handle": "@UNESCO",
        "likes_count": 14820,
    },
    {
        "text_content": "Científicos del MIT desarrollaron un material que conduce electricidad 10 veces mejor que el cobre a temperatura ambiente, abriendo la puerta a dispositivos más eficientes.",
        "text_content_en": "MIT scientists developed a material that conducts electricity 10 times better than copper at room temperature, opening the door to more efficient devices.",
        "media_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8upkjCU2on7NPbytIGdPSWOkMBdXi81U9RUKs93MMghoWdjnlXBGX3_V&s=10",
        "is_real": True,
        "mil_tip": "Las investigaciones científicas legítimas se publican en revistas con revisión de pares (Nature, Science, Cell). Busca el DOI del artículo para confirmar su autenticidad.",
        "mil_tip_en": "Legitimate scientific research is published in peer-reviewed journals (Nature, Science, Cell). Look for the article's DOI to confirm its authenticity.",
        "category": "real_news",
        "author_name": "MIT News",
        "author_handle": "@MITnews",
        "likes_count": 9340,
    },
    {
        "text_content": "El Parlamento Europeo aprobó la primera ley mundial de regulación de IA (AI Act), que entrará en vigor de forma escalonada entre 2024 y 2027.",
        "text_content_en": "The European Parliament approved the world's first AI regulation law (AI Act), which will come into effect in stages between 2024 and 2027.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "Las leyes aprobadas por parlamentos están disponibles en gacetas oficiales (EUR-Lex para Europa). Comprueba la fuente primaria antes de compartir noticias legislativas.",
        "mil_tip_en": "Laws passed by parliaments are available in official gazettes (EUR-Lex for Europe). Check the primary source before sharing legislative news.",
        "category": "real_news",
        "author_name": "Euronews",
        "author_handle": "@euronews",
        "likes_count": 21500,
    },
    {
        "text_content": "Amazon anunció la reducción de su plantilla en 27,000 empleados en enero de 2023, la mayor reducción de personal en la historia de la compañía.",
        "text_content_en": "Amazon announced a workforce reduction of 27,000 employees in January 2023, the largest staff cut in the company's history.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "Los despidos masivos en empresas cotizadas deben reportarse a reguladores (SEC en EE.UU.). Busca comunicados oficiales en el sitio de relaciones con inversores de la empresa.",
        "mil_tip_en": "Mass layoffs in publicly traded companies must be reported to regulators (SEC in the US). Look for official press releases on the company's investor relations site.",
        "category": "real_news",
        "author_name": "Reuters",
        "author_handle": "@Reuters",
        "likes_count": 18900,
    },
    {
        "text_content": "La misión Artemis I de la NASA completó con éxito su viaje alrededor de la Luna en diciembre de 2022, preparando el terreno para futuros vuelos tripulados.",
        "text_content_en": "NASA's Artemis I mission successfully completed its journey around the Moon in December 2022, paving the way for future crewed flights.",
        "media_url": None,
        "is_real": True,
        "mil_tip": "La NASA publica actualizaciones en tiempo real en nasa.gov y sus redes oficiales. Las misiones espaciales tienen transmisiones en vivo verificables.",
        "mil_tip_en": "NASA publishes real-time updates on nasa.gov and its official networks. Space missions have verifiable live streams.",
        "category": "real_news",
        "author_name": "NASA",
        "author_handle": "@NASA",
        "likes_count": 45200,
    }
]


async def main() -> None:
    db = Prisma()
    await db.connect()

    print("Clearing old publications...")
    await db.publication.delete_many()

    print(f"Seeding {len(PUBLICATIONS)} publications...")

    for i, pub in enumerate(PUBLICATIONS):
        await db.publication.create(data=pub)
        print(f"  [{i + 1}/{len(PUBLICATIONS)}] Created: {pub['author_name']}")

    count = await db.publication.count()
    print(f"\nDone! Total publications in DB: {count}")

    await db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
