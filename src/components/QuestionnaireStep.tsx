import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MoodQuestion, UserResponse } from '../types';

interface QuestionnaireStepProps {
  question: MoodQuestion;
  currentStep: number;
  totalSteps: number;
  response: UserResponse | undefined;
  onResponse: (response: UserResponse) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
}

const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  question,
  currentStep,
  totalSteps,
  response,
  onResponse,
  onNext,
  onPrevious,
  canGoNext
}) => {
  const progress = (currentStep / totalSteps) * 100;

  const handleScaleChange = (value: number) => {
    onResponse({
      questionId: question.id,
      answer: value
    });
  };

  const handleMultipleChoice = (option: string) => {
    onResponse({
      questionId: question.id,
      answer: option
    });
  };

  const handleTextChange = (text: string) => {
    onResponse({
      questionId: question.id,
      answer: text
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentStep}</span>
            <span>{totalSteps} total</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {question.question}
          </h2>

          {/* Question Type Rendering */}
          {question.type === 'scale' && question.scale && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{question.scale.minLabel}</span>
                <span>{question.scale.maxLabel}</span>
              </div>
              <div className="space-y-4">
                <input
                  type="range"
                  min={question.scale.min}
                  max={question.scale.max}
                  value={response?.answer as number || question.scale.min}
                  onChange={(e) => handleScaleChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center">
                  <span className="text-2xl font-bold text-purple-600">
                    {response?.answer || question.scale.min}
                  </span>
                </div>
              </div>
            </div>
          )}

          {question.type === 'multiple' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoice(option)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    response?.answer === option
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <div>
              <textarea
                value={response?.answer as string || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Share your thoughts here..."
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onPrevious}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {currentStep === totalSteps ? 'Get Results' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireStep;