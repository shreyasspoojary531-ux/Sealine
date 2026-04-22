import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Anchor, Loader2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const { login } = useAuth();

  // --- Form state ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- Async state ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(username, password);
      setIsSuccess(true);
      // TODO: redirect to dashboard — e.g. navigate('/dashboard') if using react-router
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white relative">
      {/* Logo */}
      <div className="w-12 h-12 bg-emerald-green rounded-xl flex items-center justify-center mb-8 shadow-sm">
        <Anchor className="text-white w-6 h-6" strokeWidth={2.5} />
      </div>

      <h1 className="text-3xl font-bold text-dark-sea mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8 text-sm md:text-base">Enter your credentials to access your account</p>

      {/* Error banner */}
      {error && (
        <div role="alert" className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Success banner */}
      {isSuccess && (
        <div role="status" className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          Logged in successfully!
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Email / Username Input */}
        <div>
          <label className="block text-sm font-semibold text-dark-sea mb-1.5" htmlFor="email">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-green transition-colors" />
            </div>
            <input
              type="email"
              id="email"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-700 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-green/50 focus:border-emerald-green transition-all duration-300"
              placeholder="name@company.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-semibold text-dark-sea mb-1.5" htmlFor="password">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-green transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-700 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-green/50 focus:border-emerald-green transition-all duration-300 font-medium tracking-wide"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-green transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-emerald-green focus:ring-emerald-green border-gray-300 rounded cursor-pointer transition-colors"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-semibold text-dark-sea hover:text-emerald-green transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="group w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-emerald-green hover:bg-[#0e9f6e] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-green transition-all duration-300 ease-in-out shadow-sm hover:shadow-md overflow-hidden relative disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In…
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </span>
            {/* Subtle light sweep effect on hover */}
            <div className="absolute inset-0 h-full w-full scale-x-0 group-hover:scale-x-100 bg-white/10 origin-left transition-transform duration-500 ease-out rounded-lg pointer-events-none"></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
