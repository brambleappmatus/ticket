import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GlitchText } from '../components/GlitchText';
import { Lock } from 'lucide-react';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-black rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-black dark:bg-white rounded-full mb-4">
            <Lock className="w-6 h-6 text-white dark:text-black" />
          </div>
          <GlitchText
            as="h1"
            className="text-2xl font-bold text-black dark:text-white"
          >
            Admin Access
          </GlitchText>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black dark:text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-transparent border-gray-200 dark:border-gray-800 text-black dark:text-white focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}