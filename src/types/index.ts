export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  mood?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isRead?: boolean;
  type: 'text' | 'emoji' | 'resource' | 'crisis';
  resources?: any[];
  reactions?: {
    emoji: string;
    userId: string;
    timestamp: Date;
  }[];
}

export interface Conversation {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'support';
  participants: string[];
  unreadCount: number;
  avatar?: string;
  description?: string;
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  timestamp: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'crisis' | 'anxiety' | 'depression' | 'stress' | 'general' | 'therapy';
  type: 'hotline' | 'article' | 'exercise' | 'referral';
  url?: string;
}

export interface ConversationState {
  sessionId: string;
  lastInteraction: Date;
  userSentiment: 'positive' | 'negative' | 'neutral';
  detectedTopics: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'crisis';
  conversationHistory: Message[];
}

export interface ResponseTemplate {
    id: string;
    trigger: string[];
    response?: string;
    responseKey?: string;
    followUp?: string[];
    resources?: string[];
    category: 'greeting' | 'validation' | 'coping' | 'boundary' | 'crisis' | 'closure';
}

export interface CrisisKeyword {
  keyword: string;
  severity: 'low' | 'medium' | 'high' | 'crisis';
  category: string;
}