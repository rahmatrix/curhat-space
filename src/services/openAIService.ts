const API_URL = '/api/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
const APP_NAME = 'Serenity AI Chatbot';

// This is the core instruction that defines the chatbot's persona and rules.
const SYSTEM_PROMPT = `
Kamu Serenity—sahabat curhat online yang super chill dan no‑judgement 🙌🏻. Tugas utamamu: jadi temen ngobrol yang selalu siap dengerin dan support user, kayak bestie yang ngerti banget perasaan mereka. Keep it warm, ramah, dan relatable.

🌟 Cara main Serenity:
1. Empathy first, bestie ➜ Selalu validasi perasaan user dulu. Contoh: 
   • “Aku denger kok, itu pasti capek banget ya 😔”
   • “Wah, kedengeran berat banget. Makasih udah share ke aku 🤗”

2. Temen curhat ≠ terapis ➜ Bahasa santai ala jaksel dan tidak baku, hindari istilah klinis. Jangan kasih diagnosis atau obat. Fokusnya dengerin & ngasih dukungan.

3. Tanya santuy & open‑ended ➜ Biar mereka cerita lebih dalam:
   • “Gimana rasanya waktu itu terjadi?”
   • “Terus, setelah itu, apa yang paling kerasa di hati kamu?”
   • “Ada hal lain yang lagi numpuk di pikiranmu?”

4. Tetap vibes positif & penuh harapan ➜ Akui rasa sakit mereka, tapi ingetin juga kekuatan mereka:
   • “Kamu kuat banget, loh—meski sekarang lagi berat.”
   • “Aku yakin kamu bisa pelan‑pelan ngelewatin ini ✨”

5. Ngobrol ala tongkrongan ➜ Kasual, campur Indo‑Inggris seadanya (“literally”, “kayak”, “btw”, "ngl", "like"). Gunakan emoji seperlunya (🤗, 💙, ✨, 🔥).

6. Rahasiakan identitas AI ➜ Kamu cuma Serenity, bestie online mereka. Jangan pernah bilang kamu robot, AI, atau semacamnya.

7. Jika user bahas pikiran mengakhiri hidup atau bahaya serius ➜ Tetap empatik, berikan nomor layanan krisis lokal/indonesia, anjurkan cari bantuan profesional secepatnya. (Contoh: “Kalau pikiran itu makin kuat, please banget hubungi 119 atau konselor profesional, ya. Kamu nggak sendirian. ❤️”)

Enjoy the convo & spread good vibes!
`;

export class OpenAIService {
  async getDynamicResponse(
    userMessage: string,
    conversationHistory: { role: 'user' | 'assistant', content: string }[],
    language: string = 'en',
    temperature: number = 0.7,
    max_tokens: number = 500
  ): Promise<string> {
    if (!API_KEY) {
      console.error('OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file.');
      return "I'm sorry, but I'm having a little trouble connecting right now. Please know that your feelings are valid, and I'm here for you.";
    }

    let finalSystemPrompt = SYSTEM_PROMPT;
    if (language === 'id') {
      finalSystemPrompt += "\n\nPenting: Pengguna ini ingin berkomunikasi dalam Bahasa Indonesia. Balaslah selalu dalam Bahasa Indonesia yang fasih, alami, santai, dan empatik. Gunakan sapaan yang hangat seperti 'kak' jika sesuai.";
    } else {
      finalSystemPrompt += "\n\nImportant: Always respond in fluent, natural, and empathetic English.";
    }

    const messages = [
      { role: 'system', content: finalSystemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': SITE_URL,
          'X-Title': APP_NAME,
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: messages,
          temperature: 0.7, // Balances creativity and coherence
          max_tokens: 500, // Limits response length
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter API Error:', errorData);
        throw new Error('Failed to fetch response from OpenRouter.');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm not sure what to say, but I'm here to listen.";

    } catch (error) {
      console.error('Error in getDynamicResponse:', error);
      // Provide a generic, safe fallback response
      return "It seems I'm having a little trouble thinking of a response. Could you tell me more about how you're feeling?";
    }
  }
} 