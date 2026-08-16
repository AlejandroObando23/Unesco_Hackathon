import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      landing: {
        title: "TruthScroll",
        subtitle: "Sifting the Digital Chaos",
        desc: "You have <strong>5 minutes</strong> to scroll through a social feed and decide what's real, what's fake, and what to report.<br/>Can you beat the digital chaos?",
        pill1: "⏱ 5 min of gameplay",
        pill2: "📰 15 posts",
        pill3: "📚 Personalized MIL tips",
        labelName: "Your name or alias",
        placeholder: "e.g. Ana, MediaDet3ct0r, Journalist...",
        errorEmpty: "Enter your name or alias to continue.",
        errorLength: "Maximum 30 characters.",
        startBtn: "🚀 Start Simulation",
        leaderboardBtn: "🏆 View Leaderboard",
        howToTitle: "How does it work?",
        step1: "<strong>Read</strong> each post in the social feed",
        step2: "<strong>Decide</strong> whether to trust it, mark it as fake, or report it",
        step3: "<strong>Receive</strong> your MIL report with personalized pedagogical tips",
        step4: "<strong>Climb</strong> the leaderboard and compete with others",
        welcome: "Welcome to",
        learnToDetect: "Learn to detect",
        disinformation: "disinformation"
      },
      game: {
        loading: "Loading the simulator feed...",
        evaluating: "Evaluating your answers, <strong>{{name}}</strong>...",
        errorRetry: "Return home",
        errorLoadFeed: "Could not load feed. Check your connection.",
        errorSubmit: "Error submitting results. Please try again.",
        endBtn: "End Game",
        done: "You've seen all the posts!",
        resultsBtn: "View my results"
      },
      decision: {
        trust: "Trust",
        fake: "Fake",
        report: "Report",
        real: "Real"
      },
      score: {
        post: "Post",
        decisions: "Decisions"
      },
      results: {
        analyzing: "Analyzing your results...",
        title: "Simulation Report",
        player: "Player",
        time: "Time",
        accuracy: "Accuracy",
        correct: "Correct",
        errors: "Errors",
        omitted: "Omitted",
        score: "Final Score",
        pts: "pts",
        saveError: "Error saving your score",
        feedbackTitle: "Analysis & Tips (MIL)",
        milTip: "MIL Tip",
        real_news: "📰 Real News",
        text_fake: "📝 Fake News",
        image_ai: "🤖 AI Generated Image",
        real_image: "📷 Real Image",
        youDecided: "Your decision",
        correctAnswer: "Correct",
        correctLabel: "Correct",
        incorrectLabel: "Incorrect",
        playAgain: "Play Again",
        leaderboardBtn: "View Leaderboard",
        report: "MIL Report",
        milTitle: "📚 Personalized MIL tips",
        saved: "Your score was saved in the leaderboard as",
        milIntro: "Based on your errors, here are some specific tips to improve your media literacy:",
        perfect: "Perfect! You made no mistakes. You are a media literacy expert.",
        feedback: {
          excellent: "Excellent! You are an expert at detecting disinformation. The digital world needs people like you.",
          good: "Well done! You have good media literacy skills. Review the tips to improve even more.",
          average: "You're on the right track, but disinformation can be tricky. Study the MIL tips to strengthen your judgment.",
          poor: "The digital chaos is a challenge. Don't be discouraged — media literacy is a skill you train. Try again!"
        }
      },
      lead: {
        title: "Global Leaderboard",
        subtitle: "TruthScroll — Sifting the Digital Chaos",
        loading: "Loading...",
        error: "Error loading leaderboard:",
        rank: "Rank",
        player: "Player",
        score: "Score",
        points: "Points",
        correct: "Correct",
        accuracy: "Accuracy",
        time: "Time",
        when: "When",
        you: "you",
        playBtn: "Play",
        backBtn: "Back",
        homeBtn: "Return home",
        empty: "Be the first to play and appear here!",
        playNow: "Play now"
      },
      time: {
        justNow: "just now",
        minutesAgo: "{{count}} min ago",
        hoursAgo: "{{count}} h ago",
        daysAgo: "{{count}} days ago"
      }
    }
  },
  es: {
    translation: {
      landing: {
        title: "TruthScroll",
        subtitle: "Sifting the Digital Chaos",
        desc: "Tienes <strong>5 minutos</strong> para navegar un feed social y decidir qué es real, qué es falso y qué debes reportar.<br/>¿Puedes vencer al caos digital?",
        pill1: "⏱ 5 min de juego",
        pill2: "📰 15 publicaciones",
        pill3: "📚 Tips MIL personalizados",
        labelName: "Tu nombre o alias",
        placeholder: "ej: Ana, MediaDet3ct0r, Periodista...",
        errorEmpty: "Ingresa tu nombre o alias para continuar.",
        errorLength: "Máximo 30 caracteres.",
        startBtn: "🚀 Iniciar Simulación",
        leaderboardBtn: "🏆 Ver tabla de líderes",
        howToTitle: "¿Cómo funciona?",
        step1: "<strong>Lee</strong> cada publicación del feed social",
        step2: "<strong>Decide</strong> si confías, la marcas como falsa o la reportas",
        step3: "<strong>Recibe</strong> tu reporte MIL con consejos pedagógicos personalizados",
        step4: "<strong>Sube</strong> al leaderboard y compite con otros participantes",
        welcome: "Bienvenido a",
        learnToDetect: "Aprende a detectar",
        disinformation: "desinformación"
      },
      game: {
        loading: "Cargando el feed del simulador...",
        evaluating: "Evaluando tus respuestas, <strong>{{name}}</strong>...",
        errorRetry: "Volver al inicio",
        errorLoadFeed: "No se pudo cargar el feed. Verifica tu conexión.",
        errorSubmit: "Error al enviar resultados. Intenta de nuevo.",
        endBtn: "Terminar",
        done: "¡Has visto todos los posts!",
        resultsBtn: "Ver mis resultados"
      },
      decision: {
        trust: "Confiar",
        fake: "Es Falso",
        report: "Reportar",
        real: "Real"
      },
      score: {
        post: "Post",
        decisions: "Decisiones"
      },
      results: {
        analyzing: "Analizando tus resultados...",
        title: "Reporte de Simulación",
        player: "Jugador",
        time: "Tiempo",
        accuracy: "Precisión",
        correct: "Aciertos",
        errors: "Errores",
        omitted: "Omitidos",
        score: "Puntaje Final",
        pts: "pts",
        saveError: "Error al guardar tu puntaje",
        feedbackTitle: "Análisis y Consejos (MIL)",
        milTip: "Tip MIL",
        real_news: "📰 Noticia Real",
        text_fake: "📝 Noticia Falsa",
        image_ai: "🤖 Imagen Generada por IA",
        real_image: "📷 Imagen Real",
        youDecided: "Tu decisión",
        correctAnswer: "Correcto",
        correctLabel: "Correcto",
        incorrectLabel: "Incorrecto",
        playAgain: "Jugar de nuevo",
        leaderboardBtn: "Ver Leaderboard",
        report: "Reporte MIL",
        milTitle: "📚 Consejos MIL personalizados",
        saved: "Tu puntaje fue guardado en el leaderboard como",
        milIntro: "Basado en tus errores, aquí tienes tips específicos para mejorar tu alfabetización mediática:",
        perfect: "¡Perfecto! No cometiste ningún error. Eres un experto en alfabetización mediática.",
        feedback: {
          excellent: "¡Excelente! Eres un experto en detectar desinformación. El mundo digital necesita personas como tú.",
          good: "¡Bien hecho! Tienes buenas habilidades de alfabetización mediática. Revisa los consejos para mejorar aún más.",
          average: "Vas por buen camino, pero la desinformación puede ser engañosa. Estudia los consejos MIL para fortalecer tu criterio.",
          poor: "El caos digital es un desafío. No te desanimes — la alfabetización mediática es una habilidad que se entrena. ¡Inténtalo de nuevo!"
        }
      },
      lead: {
        title: "Global Leaderboard",
        subtitle: "TruthScroll — Sifting the Digital Chaos",
        loading: "Cargando...",
        error: "Error al cargar tabla de líderes:",
        rank: "Rank",
        player: "Jugador",
        score: "Score",
        points: "Puntos",
        correct: "Correctos",
        accuracy: "Precisión",
        time: "Tiempo",
        when: "Cuando",
        you: "tú",
        playBtn: "Jugar",
        backBtn: "Volver",
        homeBtn: "Volver al inicio",
        empty: "¡Sé el primero en jugar y aparecer aquí!",
        playNow: "Jugar ahora"
      },
      time: {
        justNow: "hace un momento",
        minutesAgo: "hace {{count}} min",
        hoursAgo: "hace {{count}} h",
        daysAgo: "hace {{count}} días"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language is english
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
