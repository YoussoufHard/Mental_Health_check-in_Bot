import { MoodQuestion } from '../types';

export const moodQuestions: MoodQuestion[] = [
  {
    id: 'overall-mood',
    question: 'How would you rate your overall mood today?',
    type: 'scale',
    scale: {
      min: 1,
      max: 10,
      minLabel: 'Very Low',
      maxLabel: 'Excellent'
    }
  },
  {
    id: 'energy-level',
    question: 'How energetic do you feel right now?',
    type: 'scale',
    scale: {
      min: 1,
      max: 10,
      minLabel: 'Exhausted',
      maxLabel: 'Very Energetic'
    }
  },
  {
    id: 'stress-level',
    question: 'What is your current stress level?',
    type: 'scale',
    scale: {
      min: 1,
      max: 10,
      minLabel: 'Very Calm',
      maxLabel: 'Very Stressed'
    }
  },
  {
    id: 'sleep-quality',
    question: 'How well did you sleep last night?',
    type: 'multiple',
    options: [
      'Excellent - Felt refreshed',
      'Good - Mostly rested',
      'Fair - Some tiredness',
      'Poor - Quite tired',
      'Very poor - Exhausted'
    ]
  },
  {
    id: 'social-connection',
    question: 'How connected do you feel to others today?',
    type: 'multiple',
    options: [
      'Very connected - Surrounded by support',
      'Somewhat connected - Good relationships',
      'Neutral - Neither connected nor isolated',
      'Somewhat isolated - Limited interaction',
      'Very isolated - Feeling alone'
    ]
  },
  {
    id: 'main-concern',
    question: 'What is your main concern or challenge today?',
    type: 'text'
  },
  {
    id: 'gratitude',
    question: 'What is one thing you\'re grateful for today?',
    type: 'text'
  }
];