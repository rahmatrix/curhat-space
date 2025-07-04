import { useState, useEffect, useCallback } from 'react';
import { Message, Conversation, User, TypingIndicator } from '../types';
import { useLocalStorage } from './useLocalStorage';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'You',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'online',
    mood: '😊'
  },
  {
    id: '2',
    name: 'Emma',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'online',
    mood: '💫'
  },
  {
    id: '3',
    name: 'Alex',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'away',
    mood: '🌱'
  },
  {
    id: '4',
    name: 'Support Team',
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'online',
    mood: '🤗'
  }
];

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Emma',
    type: 'direct',
    participants: ['1', '2'],
    unreadCount: 2,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Alex',
    type: 'direct',
    participants: ['1', '3'],
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Support Chat',
    type: 'support',
    participants: ['1', '4'],
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Always here to listen and support you',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date()
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '2',
    content: "Hey! How are you feeling today? 😊",
    type: 'text',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read'
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '2',
    content: "I've been thinking about our conversation yesterday, and I wanted to check in on you 💜",
    type: 'text',
    timestamp: new Date(Date.now() - 1800000),
    status: 'delivered'
  },
  {
    id: '3',
    conversationId: '2',
    senderId: '3',
    content: "Thanks for listening yesterday. It really helped! 🙏",
    type: 'text',
    timestamp: new Date(Date.now() - 7200000),
    status: 'read'
  },
  {
    id: '4',
    conversationId: '3',
    senderId: '4',
    content: "Welcome to SoulConnect Support! We're here to listen and support you. How can we help today?",
    type: 'text',
    timestamp: new Date(Date.now() - 86400000),
    status: 'read'
  }
];

export function useChatSimulation() {
  const [users] = useState<User[]>(MOCK_USERS);
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('chat_conversations', INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useLocalStorage<Message[]>('chat_messages', INITIAL_MESSAGES);
  const [currentUserId] = useState('1');
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>([]);

  const sendMessage = useCallback((conversationId: string, content: string, type: 'text' | 'emoji' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: currentUserId,
      content,
      type,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, lastMessage: newMessage, updatedAt: new Date() }
          : conv
      )
    );

    // Simulate auto-response for demo
    if (conversationId !== '3') { // Don't auto-respond in support chat
      setTimeout(() => {
        simulateTyping(conversationId);
        setTimeout(() => {
          const responses = [
            "Thank you for sharing that with me 💙",
            "I'm here for you, always remember that ✨",
            "That sounds really meaningful. How did it make you feel?",
            "Your feelings are completely valid 🤗",
            "I appreciate you opening up about this 🌟"
          ];
          
          const otherUserId = conversations.find(c => c.id === conversationId)?.participants.find(p => p !== currentUserId);
          if (otherUserId) {
            const responseMessage: Message = {
              id: (Date.now() + 1).toString(),
              conversationId,
              senderId: otherUserId,
              content: responses[Math.floor(Math.random() * responses.length)],
              type: 'text',
              timestamp: new Date(),
              status: 'sent'
            };
            
            setMessages(prev => [...prev, responseMessage]);
            setConversations(prev =>
              prev.map(conv =>
                conv.id === conversationId
                  ? { ...conv, lastMessage: responseMessage, updatedAt: new Date(), unreadCount: conv.unreadCount + 1 }
                  : conv
              )
            );
          }
          
          setTypingIndicators(prev => 
            prev.filter(t => t.conversationId !== conversationId)
          );
        }, 2000 + Math.random() * 3000);
      }, 1000 + Math.random() * 2000);
    }
  }, [currentUserId, conversations, setMessages, setConversations]);

  const simulateTyping = useCallback((conversationId: string) => {
    const otherUserId = conversations.find(c => c.id === conversationId)?.participants.find(p => p !== currentUserId);
    if (otherUserId) {
      setTypingIndicators(prev => [
        ...prev.filter(t => t.conversationId !== conversationId),
        { conversationId, userId: otherUserId, timestamp: new Date() }
      ]);
    }
  }, [conversations, currentUserId]);

  const markAsRead = useCallback((conversationId: string) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );

    setMessages(prev =>
      prev.map(msg =>
        msg.conversationId === conversationId && msg.senderId !== currentUserId
          ? { ...msg, status: 'read' }
          : msg
      )
    );
  }, [currentUserId, setConversations, setMessages]);

  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find(r => r.userId === currentUserId);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions?.filter(r => r.userId !== currentUserId)
            };
          } else {
            return {
              ...msg,
              reactions: [
                ...(msg.reactions || []),
                { emoji, userId: currentUserId, timestamp: new Date() }
              ]
            };
          }
        }
        return msg;
      })
    );
  }, [currentUserId, setMessages]);

  const getConversationMessages = useCallback((conversationId: string) => {
    return messages.filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [messages]);

  const isUserTyping = useCallback((conversationId: string) => {
    return typingIndicators.some(t => 
      t.conversationId === conversationId && 
      Date.now() - new Date(t.timestamp).getTime() < 5000
    );
  }, [typingIndicators]);

  // Clean up old typing indicators
  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndicators(prev => 
        prev.filter(t => Date.now() - new Date(t.timestamp).getTime() < 5000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    users,
    conversations,
    messages: getConversationMessages,
    currentUserId,
    sendMessage,
    markAsRead,
    addReaction,
    isUserTyping
  };
}