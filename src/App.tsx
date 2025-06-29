import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionnaireStep from './components/QuestionnaireStep';
import ResultsScreen from './components/ResultsScreen';
import { moodQuestions } from './data/questions';
import { generatePersonalizedResponse } from './services/geminiApi';
import { UserResponse, CheckInResult } from './types';

type AppState = 'welcome' | 'questionnaire' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [result, setResult] = useState<CheckInResult | null>(null);

  const currentQuestion = moodQuestions[currentQuestionIndex];
  const currentResponse = responses.find(r => r.questionId === currentQuestion?.id);

  const handleStart = () => {
    setCurrentState('questionnaire');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setResult(null);
  };

  const handleResponse = (response: UserResponse) => {
    setResponses(prev => {
      const existing = prev.findIndex(r => r.questionId === response.questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = response;
        return updated;
      }
      return [...prev, response];
    });
  };

  const handleNext = async () => {
    if (currentQuestionIndex < moodQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete questionnaire
      const overallMoodResponse = responses.find(r => r.questionId === 'overall-mood');
      const overallMood = overallMoodResponse?.answer as number || 5;
      
      const preliminaryResult: CheckInResult = {
        overallMood,
        responses,
        aiResponse: undefined
      };
      
      setResult(preliminaryResult);
      setCurrentState('results');

      // Generate AI response in background
      try {
        const aiResponse = await generatePersonalizedResponse(responses);
        setResult(prev => prev ? { ...prev, aiResponse } : null);
      } catch (error) {
        console.error('Error generating AI response:', error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canGoNext = () => {
    if (!currentResponse) return false;
    if (currentQuestion.type === 'text') {
      return (currentResponse.answer as string).trim().length > 0;
    }
    return true;
  };

  const handleRestart = () => {
    setCurrentState('welcome');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setResult(null);
  };

  if (currentState === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (currentState === 'questionnaire') {
    return (
      <QuestionnaireStep
        question={currentQuestion}
        currentStep={currentQuestionIndex + 1}
        totalSteps={moodQuestions.length}
        response={currentResponse}
        onResponse={handleResponse}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext()}
      />
    );
  }

  if (currentState === 'results' && result) {
    return <ResultsScreen result={result} onRestart={handleRestart} />;
  }

  return null;
}

export default App;