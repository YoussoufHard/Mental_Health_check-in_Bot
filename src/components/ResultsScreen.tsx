import React from 'react';
import { CheckCircle, RefreshCw, Heart } from 'lucide-react';
import { CheckInResult } from '../types';

interface ResultsScreenProps {
  result: CheckInResult;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onRestart }) => {
  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600';
    if (mood >= 6) return 'text-yellow-600';
    if (mood >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getMoodLabel = (mood: number) => {
    if (mood >= 8) return 'Great';
    if (mood >= 6) return 'Good';
    if (mood >= 4) return 'Fair';
    return 'Needs Attention';
  };

  const formatAiResponse = (response: string) => {
    return response
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .split('\n')
      .filter(line => line.trim())
      .map((line, index) => (
        <p key={index} className="mb-3 leading-relaxed">
          {line.trim()}
        </p>
      ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Check-In Complete
          </h1>
          <p className="text-gray-600">
            Thank you for taking time to check in with yourself
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mood Summary */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-pink-500" />
              Your Mood Summary
            </h2>
            
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold mb-2 ${getMoodColor(result.overallMood)}`}>
                {result.overallMood}/10
              </div>
              <div className={`text-lg font-medium ${getMoodColor(result.overallMood)}`}>
                {getMoodLabel(result.overallMood)}
              </div>
            </div>

            <div className="space-y-4">
              {result.responses.slice(0, 4).map((response, index) => {
                const labels = [
                  'Overall Mood',
                  'Energy Level', 
                  'Stress Level',
                  'Sleep Quality'
                ];
                
                return (
                  <div key={response.questionId} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">{labels[index]}</span>
                    <span className="font-medium text-gray-800">
                      {typeof response.answer === 'number' ? `${response.answer}/10` : 
                       typeof response.answer === 'string' && response.answer.length > 20 ? 
                       `${response.answer.substring(0, 20)}...` : response.answer}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Response */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Personalized Guidance
            </h2>
            
            {result.aiResponse ? (
              <div className="text-gray-700 leading-relaxed">
                {formatAiResponse(result.aiResponse)}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Generating your personalized guidance...</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Take Another Check-In
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Remember: This is a supportive tool, not a replacement for professional mental health care.</p>
          <p className="mt-2">If you're experiencing persistent difficulties, consider reaching out to a mental health professional.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;