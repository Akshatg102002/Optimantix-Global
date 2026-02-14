
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { RefreshCw } from 'lucide-react';

export interface CaptchaRef {
  validate: () => boolean;
  reset: () => void;
}

export const SimpleCaptcha = forwardRef<CaptchaRef>((_, ref) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');

  const generateProblem = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setError('');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  useImperativeHandle(ref, () => ({
    validate: () => {
      const val = parseInt(userAnswer);
      if (isNaN(val) || val !== num1 + num2) {
        setError('Incorrect math answer. Please try again.');
        generateProblem();
        return false;
      }
      return true;
    },
    reset: () => generateProblem()
  }));

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Security Check: What is {num1} + {num2}?
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none dark:bg-dark dark:border-gray-600 dark:text-white"
            placeholder="?"
          />
          <button
            type="button"
            onClick={generateProblem}
            className="p-2 text-gray-500 hover:text-primary transition"
            title="Refresh Question"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
});

SimpleCaptcha.displayName = 'SimpleCaptcha';
