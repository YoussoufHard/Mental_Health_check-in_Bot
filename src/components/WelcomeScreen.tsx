import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Mental Health Check-In
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Take a moment to check in with yourself. This brief assessment will help you understand your current mental state and provide personalized support and guidance.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              Takes just 2-3 minutes
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Completely confidential
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              Personalized insights
            </div>
          </div>
          
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center group shadow-lg"
          >
            Start Check-In
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;