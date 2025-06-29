export interface MoodQuestion {
  id: string;
  question: string;
  type: 'scale' | 'multiple' | 'text';
  options?: string[];
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface UserResponse {
  questionId: string;
  answer: string | number;
}

export interface CheckInResult {
  overallMood: number;
  responses: UserResponse[];
  aiResponse?: string;
}