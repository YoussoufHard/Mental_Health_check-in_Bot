import { UserResponse } from '../types';

const GEMINI_API_KEY = 'AIzaSyAtLKzD_wSVGBK8yF5OaWXWTO3M-LMxftg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generatePersonalizedResponse(responses: UserResponse[]): Promise<string> {
  try {
    const promptData = buildPrompt(responses);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptData
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return getFallbackResponse();
  }
}

function buildPrompt(responses: UserResponse[]): string {
  let context = "You are a compassionate mental health companion providing personalized support. Based on the user's check-in responses, provide a warm, encouraging message with 2-3 specific, actionable tips for improving their wellbeing. Keep it concise, positive, and supportive. Use simple formatting without asterisks or markdown symbols.\n\nUser's responses:\n";
  
  responses.forEach(response => {
    context += `- ${response.questionId}: ${response.answer}\n`;
  });
  
  context += "\nPlease provide a personalized response that acknowledges their feelings and offers practical guidance for their specific situation. Focus on being empathetic and actionable.";
  
  return context;
}

function getFallbackResponse(): string {
  return `Thank you for taking the time to check in with yourself today. Remember that it's completely normal to have ups and downs in your mental health journey.

Here are some gentle reminders for you:

Take a few deep breaths and remind yourself that you're doing your best. Every small step counts toward better mental wellbeing.

Try to get some fresh air today, even if it's just stepping outside for a few minutes. Nature has a wonderful way of helping us reset.

Consider reaching out to someone you trust if you're feeling overwhelmed. Connection with others is a powerful tool for healing.

You matter, and your feelings are valid. Be patient and kind with yourself as you navigate today.`;
}