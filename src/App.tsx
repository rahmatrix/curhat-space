import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChatbotService } from './services/chatbotService';
import { Message } from './types';
import { Header } from './components/layout/Header';
import { WelcomeMessage } from './components/layout/WelcomeMessage';
import { MessageBubble } from './components/chat/MessageBubble';
import { MessageInput } from './components/chat/MessageInput';
import { TypingIndicator } from './components/ui/TypingIndicator';
import { ResourcesModal } from './components/modals/ResourcesModal';
import { CrisisModal } from './components/modals/CrisisModal';
import { MoodTracker } from './components/chat/MoodTracker';
import { supabase } from './services/supabaseClient';

function App() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [chatbotService] = useState(() => new ChatbotService());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // When language changes, update the service
    chatbotService.setLanguage(i18n.language, t);
  }, [i18n.language, t, chatbotService]);

  const handleSendMessage = async (content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      conversationId: 'main',
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      isRead: true
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Simulate typing delay for more natural interaction
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Get bot response
      const botResponse = await chatbotService.processMessage(content);
      
      setMessages(prev => [...prev, botResponse]);
      
      // Check if crisis response was triggered
      if (botResponse.type === 'crisis') {
        setTimeout(() => setShowCrisis(true), 1000);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback response
      const errorResponse: Message = {
        id: `bot_${Date.now()}`,
        conversationId: 'main',
        content: "I apologize, but I'm having trouble responding right now. Please know that I'm here to support you, and if you're in crisis, please reach out to a crisis hotline immediately.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    chatbotService.clearConversation();
  };

  const showWelcome = messages.length === 0;

  const handleMoodSubmit = async (mood: string, description: string) => {
    // Simpan ke Supabase
    const { error } = await supabase
      .from('moods') // Pastikan tabel 'moods' sudah ada di Supabase
      .insert([
        {
          mood,
          description,
          created_at: new Date().toISOString(),
          // Tambahkan user_id jika ada autentikasi user
        }
      ]);
    if (error) {
      alert('Gagal menyimpan mood: ' + error.message);
    } else {
      alert('Mood berhasil disimpan!');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-misty-blue-50 via-white to-soft-sage-50 leaf-pattern">
      {/* Header */}
      <Header
        onResourcesClick={() => setShowResources(true)}
        onMoodTrackerClick={() => setShowMoodTracker(true)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto chat-container px-4 py-6"
        >
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message */}
            {showWelcome && <WelcomeMessage />}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  showTimestamp={true}
                />
              ))}
            </div>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              placeholder={showWelcome ? t('messageInput.placeholderWelcome') : t('messageInput.placeholder')}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ResourcesModal
        isOpen={showResources}
        onClose={() => setShowResources(false)}
      />
      <MoodTracker
        isOpen={showMoodTracker}
        onClose={() => setShowMoodTracker(false)}
        onSubmit={handleMoodSubmit}
      />
      <CrisisModal
        isOpen={showCrisis}
        onClose={() => setShowCrisis(false)}
      />

      {/* Clear Chat Button (Development) */}
      {messages.length > 0 && (
        <button
          onClick={handleClearChat}
          className="fixed bottom-4 right-4 bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded-full opacity-50 hover:opacity-100 transition-opacity"
        >
          Clear Chat
        </button>
      )}
    </div>
  );
}

export default App;