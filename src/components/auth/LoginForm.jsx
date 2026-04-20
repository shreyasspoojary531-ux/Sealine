import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Anchor } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white relative">
      {/* Logo */}
      <div className="w-12 h-12 bg-emerald-green rounded-xl flex items-center justify-center mb-8 shadow-sm">
        <Anchor className="text-white w-6 h-6" strokeWidth={2.5} />
      </div>

      <h1 className="text-3xl font-bold text-dark-sea mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8 text-sm md:text-base">Enter your credentials to access your account</p>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Email Input */}
        <div>
          <label className="block text-sm font-semibold text-dark-sea mb-1.5" htmlFor="email">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-green transition-colors" />
            </div>
            <input
              type="email"
              id="email"
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
              className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-700 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-green/50 focus:border-emerald-green transition-all duration-300 font-medium tracking-wide"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-green transition-colors"
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
            className="group w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-emerald-green hover:bg-[#0e9f6e] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-green transition-all duration-300 ease-in-out shadow-sm hover:shadow-md overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center">
              Sign In
              <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
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
