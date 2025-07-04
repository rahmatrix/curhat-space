import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      header: {
        title: "Serenity AI",
        subtitle: "Compassionate Support",
        resources: "Resources",
        crisisHelp: "Crisis Help"
      },
      welcome: {
        title: "Welcome to Your Safe Space",
        intro: "I'm Serenity, your compassionate AI companion. I'm here to listen, support, and provide resources for your emotional wellbeing. This is a judgment-free space where your feelings matter.",
        safeAndPrivate: "Safe & Private",
        safeAndPrivateDesc: "Your conversations are confidential and secure",
        available247: "24/7 Available",
        available247Desc: "I'm here whenever you need support",
        importantToKnow: "Important to Know",
        importantDisclaimer: "I'm an AI assistant designed to provide emotional support and resources. While I'm here to listen and help, I'm not a replacement for professional therapy, medical care, or crisis intervention. If you're experiencing a mental health emergency, please contact emergency services or a crisis hotline immediately.",
        readyToStart: "Ready to start? Share what's on your mind, or simply say hello."
      },
      messageInput: {
        placeholder: "Share what's on your mind...",
        placeholderWelcome: "Hello, I'd like to talk...",
        disclaimer: "Serenity AI provides support but is not a replacement for professional therapy or medical care.",
        responses: {
          greeting: "Hello, and welcome to Serenity AI. I'm here to provide a safe, supportive space where you can share what's on your mind. I'm an AI assistant designed to offer emotional support and resources, though I'm not a replacement for professional therapy or medical care. How are you feeling today?",
          anxiety: "I hear that you're feeling anxious, and I want you to know that what you're experiencing is valid. Anxiety can feel overwhelming, but you're not alone in this. Many people experience anxiety, and there are ways to manage these feelings.",
          depression: "Thank you for sharing these difficult feelings with me. Depression can make everything feel heavy and overwhelming, but I want you to know that these feelings, while very real and painful, are not permanent. You matter, and your life has value.",
          crisisResponse: "I'm very concerned about what you've shared, and I want you to know that I'm here with you right now. Your life has value, and there are people who want to help. Please reach out to a crisis helpline immediately - they have trained counselors available 24/7.",
          validation: "It takes courage to reach out when you're struggling, and I'm glad you're here. What you're going through sounds really difficult, and it's completely understandable that you're feeling overwhelmed. Your feelings are valid, and you deserve support.",
          boundary: "I understand you're looking for specific medical guidance, but as an AI assistant, I'm not qualified to provide medical advice, diagnoses, or medication recommendations. For these concerns, it's important to speak with a healthcare professional who can properly assess your situation.",
          copingStrategies: "Learning healthy coping strategies is so important, and I'm glad you're thinking about this. Everyone's coping toolkit looks different, but there are some evidence-based techniques that many people find helpful.",
          fallback: "Thank you for sharing that with me. It sounds like this is weighing heavily on you. Can you tell me more about what's making you feel this way?",
          contextualFallback1: "I'm listening, and I want you to know that this is a safe space to express whatever is on your mind. What would be most helpful for you right now?",
          contextualFallback2: "It sounds like you have a lot on your mind. I'm here to support you through this. Would you like to explore these feelings together?",
          contextualFallback3: "I appreciate you opening up about this. Your feelings and experiences matter. How has this been affecting you?",
          contextualFallback4: "Thank you for trusting me with this. Sometimes it helps just to have someone listen. What's been the most challenging part for you?"
        }
      }
    }
  },
  id: {
    translation: {
      header: {
        title: "Serenity AI",
        subtitle: "Dukungan Penuh Kasih",
        resources: "Sumber Daya",
        crisisHelp: "Bantuan Krisis"
      },
      welcome: {
        title: "Selamat Datang di Ruang Aman Anda",
        intro: "Saya Serenity, rekan AI Anda yang penuh kasih. Saya di sini untuk mendengarkan, mendukung, dan menyediakan sumber daya untuk kesehatan emosional Anda. Ini adalah ruang bebas penilaian di mana perasaan Anda berarti.",
        safeAndPrivate: "Aman & Pribadi",
        safeAndPrivateDesc: "Percakapan Anda bersifat rahasia dan aman",
        available247: "Tersedia 24/7",
        available247Desc: "Saya di sini kapan pun Anda butuh dukungan",
        importantToKnow: "Penting untuk Diketahui",
        importantDisclaimer: "Saya adalah asisten AI yang dirancang untuk memberikan dukungan emosional dan sumber daya. Meskipun saya di sini untuk mendengarkan dan membantu, saya bukan pengganti terapi profesional, perawatan medis, atau intervensi krisis. Jika Anda mengalami keadaan darurat kesehatan mental, harap segera hubungi layanan darurat atau hotline krisis.",
        readyToStart: "Siap untuk memulai? Bagikan apa yang ada di pikiran Anda, atau sapa saja."
      },
      messageInput: {
        placeholder: "Bagikan apa yang ada di pikiranmu...",
        placeholderWelcome: "Halo, saya ingin bercerita...",
        disclaimer: "Serenity AI memberikan dukungan tetapi bukan pengganti terapi atau perawatan medis profesional.",
        responses: {
          greeting: "Halo, dan selamat datang di Serenity AI. Saya di sini untuk menyediakan ruang yang aman dan suportif di mana Anda dapat berbagi apa yang ada di pikiran Anda. Saya adalah asisten AI yang dirancang untuk menawarkan dukungan emosional dan sumber daya, meskipun saya bukan pengganti terapi profesional atau perawatan medis. Bagaimana perasaan Anda hari ini?",
          anxiety: "Saya mendengar Anda merasa cemas, dan saya ingin Anda tahu bahwa apa yang Anda alami itu valid. Kecemasan bisa terasa luar biasa, tetapi Anda tidak sendirian dalam hal ini. Banyak orang mengalami kecemasan, dan ada cara untuk mengelola perasaan ini.",
          depression: "Terima kasih telah berbagi perasaan sulit ini dengan saya. Depresi bisa membuat segalanya terasa berat dan luar biasa, tetapi saya ingin Anda tahu bahwa perasaan ini, meskipun sangat nyata dan menyakitkan, tidak permanen. Anda berharga, dan hidup Anda memiliki nilai.",
          crisisResponse: "Saya sangat prihatin dengan apa yang Anda bagikan, dan saya ingin Anda tahu bahwa saya di sini bersama Anda saat ini. Hidup Anda berharga, dan ada orang yang ingin membantu. Harap segera hubungi saluran bantuan krisis - mereka memiliki konselor terlatih yang tersedia 24/7.",
          validation: "Butuh keberanian untuk menjangkau saat Anda sedang berjuang, dan saya senang Anda ada di sini. Apa yang Anda lalui terdengar sangat sulit, dan sangat bisa dimengerti bahwa Anda merasa kewalahan. Perasaan Anda valid, dan Anda berhak mendapatkan dukungan.",
          boundary: "Saya mengerti Anda mencari panduan medis khusus, tetapi sebagai asisten AI, saya tidak memenuhi syarat untuk memberikan nasihat medis, diagnosis, atau rekomendasi pengobatan. Untuk masalah ini, penting untuk berbicara dengan seorang profesional kesehatan yang dapat menilai situasi Anda dengan benar.",
          copingStrategies: "Mempelajari strategi koping yang sehat sangat penting, dan saya senang Anda memikirkan hal ini. Perangkat koping setiap orang terlihat berbeda, tetapi ada beberapa teknik berbasis bukti yang menurut banyak orang membantu.",
          fallback: "Terima kasih sudah berbagi. Terdengar seperti ini sangat membebani Anda. Boleh ceritakan lebih lanjut apa yang membuat Anda merasa seperti ini?",
          contextualFallback1: "Saya mendengarkan, dan saya ingin Anda tahu bahwa ini adalah ruang yang aman untuk mengekspresikan apa pun yang ada di pikiran Anda. Apa yang paling membantu Anda saat ini?",
          contextualFallback2: "Sepertinya Anda punya banyak pikiran. Saya di sini untuk mendukung Anda melalui ini. Apakah Anda ingin menjelajahi perasaan ini bersama?",
          contextualFallback3: "Saya menghargai Anda terbuka tentang ini. Perasaan dan pengalaman Anda penting. Bagaimana ini memengaruhi Anda?",
          contextualFallback4: "Terima kasih telah mempercayai saya dengan ini. Terkadang hanya dengan didengarkan saja sudah membantu. Apa bagian yang paling menantang bagi Anda?"
        }
      }
    }
  }
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n; 