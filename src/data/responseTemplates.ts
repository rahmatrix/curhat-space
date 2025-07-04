import { ResponseTemplate, CrisisKeyword } from '../types';

export const CRISIS_KEYWORDS: CrisisKeyword[] = [
  { keyword: 'suicide', severity: 'crisis', category: 'suicide' },
  { keyword: 'bunuh diri', severity: 'crisis', category: 'suicide' },
  { keyword: 'kill myself', severity: 'crisis', category: 'suicide' },
  { keyword: 'akhiri hidup', severity: 'crisis', category: 'suicide' },
  { keyword: 'end it all', severity: 'crisis', category: 'suicide' },
  { keyword: 'hurt myself', severity: 'high', category: 'self-harm' },
  { keyword: 'menyakiti diri sendiri', severity: 'high', category: 'self-harm' },
  { keyword: 'self harm', severity: 'high', category: 'self-harm' },
  { keyword: 'cutting', severity: 'high', category: 'self-harm' },
  { keyword: 'overdose', severity: 'crisis', category: 'substance' },
  { keyword: 'emergency', severity: 'crisis', category: 'emergency' },
  { keyword: 'darurat', severity: 'crisis', category: 'emergency' },
  { keyword: 'crisis', severity: 'high', category: 'emergency' },
  { keyword: 'krisis', severity: 'high', category: 'emergency' },
  { keyword: 'help me', severity: 'medium', category: 'emergency' },
  { keyword: 'tolong saya', severity: 'medium', category: 'emergency' },
];

export const RESPONSE_TEMPLATES: ResponseTemplate[] = [
  {
    id: 'greeting',
    trigger: ['hello', 'hi', 'hey', 'start', 'halo', 'hai'],
    responseKey: 'hello',
    category: 'greeting'
  },
  {
    id: 'anxiety',
    trigger: ['anxious', 'anxiety', 'worried', 'panic', 'nervous', 'stressed', 'cemas', 'khawatir', 'panik', 'gugup', 'stres'],
    responseKey: 'anxiety',
    category: 'validation',
    resources: ['breathing-exercises', 'anxiety-resources']
  },
  {
    id: 'depression',
    trigger: ['depressed', 'depression', 'sad', 'hopeless', 'empty', 'worthless', 'depresi', 'sedih', 'putus asa', 'hampa', 'tidak berharga'],
    responseKey: 'depression',
    category: 'validation',
    resources: ['depression-support', 'self-care-activities']
  },
  {
    id: 'crisis-response',
    trigger: ['suicide', 'kill myself', 'end it all', 'hurt myself', 'bunuh diri', 'akhiri hidup', 'menyakiti diri sendiri'],
    responseKey: 'crisisResponse',
    category: 'crisis',
    resources: ['crisis-hotlines', 'emergency-resources']
  },
  {
    id: 'validation',
    trigger: [
      'struggling', 'difficult', 'hard time', 'overwhelmed', 'feeling down', 'feeling low', 'feeling lost', 'don\'t know what to do',
      'kesulitan', 'sulit', 'kewalahan', 'merasa berat', 'capek', 'sedih banget', 'bingung'
    ],
    responseKey: 'validation',
    category: 'validation'
  },
  {
    id: 'boundary',
    trigger: ['medical advice', 'diagnosis', 'medication', 'prescribe', 'nasihat medis', 'diagnosa', 'obat', 'resep'],
    responseKey: 'boundary',
    category: 'boundary',
    resources: ['find-therapist', 'medical-resources']
  },
  {
    id: 'coping-strategies',
    trigger: ['cope', 'coping', 'manage', 'deal with', 'handle', 'mengatasi', 'menangani'],
    responseKey: 'copingStrategies',
    category: 'coping',
    resources: ['coping-strategies', 'mindfulness-exercises']
  },
  {
    id: 'fallback',
    trigger: [],
    responseKey: 'fallback',
    category: 'closure' // Or a more appropriate category
  }
];