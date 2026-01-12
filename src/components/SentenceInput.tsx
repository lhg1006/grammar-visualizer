'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SentenceInputProps {
  onAnalyze: (sentence: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const EXAMPLE_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "She gave him a book that she had bought yesterday.",
  "Although it was raining, we decided to go for a walk.",
  "The student who studied hard passed the exam easily.",
  "If you work hard, you will succeed.",
  "The beautiful sunset painted the sky with vibrant colors.",
];

export default function SentenceInput({ onAnalyze, isLoading, disabled }: SentenceInputProps) {
  const [sentence, setSentence] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sentence.trim() && !isLoading && !disabled) {
      onAnalyze(sentence.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setSentence(example);
    onAnalyze(example);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <textarea
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="분석할 영어 문장을 입력하세요..."
            disabled={disabled}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-5 py-4 pr-24 text-lg text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            rows={3}
          />
          <button
            type="submit"
            disabled={!sentence.trim() || isLoading || disabled}
            className="absolute bottom-4 right-4 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                분석 중
              </span>
            ) : (
              '분석'
            )}
          </button>
        </div>
        {disabled && (
          <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
            API 키를 먼저 설정해주세요.
          </p>
        )}
      </form>

      {/* Example Sentences */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          예시 문장
        </h3>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_SENTENCES.map((example, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleExampleClick(example)}
              disabled={isLoading || disabled}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-900/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {example.length > 40 ? example.slice(0, 40) + '...' : example}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
