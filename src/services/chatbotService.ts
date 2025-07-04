import { TFunction } from 'i18next';
import { Message, ConversationState, ResponseTemplate, CrisisKeyword } from '../types';
import { RESPONSE_TEMPLATES, CRISIS_KEYWORDS } from '../data/responseTemplates';
import { MENTAL_HEALTH_RESOURCES } from '../data/resources';
import { OpenAIService } from './openAIService';

export class ChatbotService {
  private conversationState: ConversationState;
  private t: TFunction = ((key: string | string[]): string => Array.isArray(key) ? key.join('') : key) as TFunction;
  private openAIService: OpenAIService;
  private currentLanguage: string = 'en';

  constructor() {
    this.conversationState = {
      sessionId: this.generateSessionId(),
      lastInteraction: new Date(),
      userSentiment: 'neutral',
      detectedTopics: [],
      riskLevel: 'low',
      conversationHistory: []
    };
    this.openAIService = new OpenAIService();
  }

  public setLanguage(language: string, t: TFunction) {
    this.currentLanguage = language;
    this.t = t;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private detectCrisisKeywords(message: string): CrisisKeyword[] {
    const lowerMessage = message.toLowerCase();
    return CRISIS_KEYWORDS.filter(crisis => 
      lowerMessage.includes(crisis.keyword.toLowerCase())
    );
  }

  private findMatchingTemplate(message: string): ResponseTemplate | null {
    const lowerMessage = message.toLowerCase();
    
    // First check for crisis keywords
    const crisisKeywords = this.detectCrisisKeywords(message);
    if (crisisKeywords.length > 0) {
      const crisisTemplate = RESPONSE_TEMPLATES.find(t => t.category === 'crisis');
      if (crisisTemplate) {
        this.conversationState.riskLevel = 'crisis';
        return crisisTemplate;
      }
    }

    // Then check for other templates
    return RESPONSE_TEMPLATES.find(template =>
      template.trigger.some(trigger => 
        lowerMessage.includes(trigger.toLowerCase())
      )
    ) || null;
  }

  private generateContextualResponse(): string {
    // Return the primary, more empathetic fallback response.
    return this.t('responses.fallback');
  }

  private getResourcesForTemplate(template: ResponseTemplate) {
    if (!template.resources) return [];
    
    return template.resources.map(resourceId =>
      MENTAL_HEALTH_RESOURCES.find(r => r.id === resourceId)
    ).filter(Boolean);
  }

  public async processMessage(userMessage: string): Promise<Message> {
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      conversationId: this.conversationState.sessionId,
      content: userMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    this.conversationState.conversationHistory.push(userMsg);
    this.conversationState.lastInteraction = new Date();

    let responseContent: string;
    let responseType: Message['type'] = 'text';
    let resources: any[] = [];

    const crisisTemplate = RESPONSE_TEMPLATES.find(t => t.category === 'crisis');
    const crisisKeywords = this.detectCrisisKeywords(userMessage);

    if (crisisKeywords.length > 0 && crisisTemplate && crisisTemplate.responseKey) {
      this.conversationState.riskLevel = 'crisis';
      responseContent = this.t(`responses.${crisisTemplate.responseKey}`);
      resources = this.getResourcesForTemplate(crisisTemplate) || [];
      responseType = 'crisis';
    } else {
      const history = this.conversationState.conversationHistory.reduce((acc: { role: 'user' | 'assistant'; content: string }[], msg) => {
        if (msg.sender === 'user' || msg.sender === 'bot') {
          acc.push({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          });
        }
        return acc;
      }, []);
      
      responseContent = await this.openAIService.getDynamicResponse(userMessage, history, this.currentLanguage);
      responseType = 'text';
    }

    const botResponse: Message = {
      id: `bot_${Date.now()}`,
      conversationId: this.conversationState.sessionId,
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(),
      type: responseType,
      resources: resources
    };

    this.conversationState.conversationHistory.push(botResponse);
    this.conversationState.lastInteraction = new Date();

    return botResponse;
  }

  public getConversationHistory(): Message[] {
    return this.conversationState.conversationHistory;
  }

  public getRiskLevel(): ConversationState['riskLevel'] {
    return this.conversationState.riskLevel;
  }

  public clearConversation(): void {
    this.conversationState = {
      sessionId: this.generateSessionId(),
      lastInteraction: new Date(),
      userSentiment: 'neutral',
      detectedTopics: [],
      riskLevel: 'low',
      conversationHistory: []
    };
  }
}