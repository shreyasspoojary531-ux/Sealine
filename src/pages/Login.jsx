import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import WelcomePanel from '../components/auth/WelcomePanel';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      {/* Main Card */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100">
        
        {/* Left Half - Form */}
        <LoginForm />

        {/* Right Half - Welcome Graphic */}
        <WelcomePanel />
        
      </div>
      
      {/* Temporary Developer Link outside the card */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm shadow-xl hover:bg-gray-700 transition font-medium">
          Register (Dev)
        </button>
      </div>
    </div>
  );
};

export default Login;
