import React from 'react';
import styles from './WelcomePanel.module.css';

const WelcomePanel = () => {
  return (
    <div className={`hidden md:flex flex-col w-1/2 relative overflow-hidden text-white p-12 justify-center items-start ${styles.bgWavy}`}>
      {/* Container to vertically center content while keeping left alignment */}
      <div className="relative z-10 w-full max-w-sm -mt-12">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="px-4 py-1.5 rounded-full border border-white/30 text-xs font-semibold tracking-wider bg-white/5 backdrop-blur-sm shadow-sm transition-colors hover:bg-white/10">
            SECURE PORTAL
          </span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight drop-shadow-sm">
          Seamless<br/>Operations.
        </h2>
        
        <p className="text-emerald-green text-opacity-90 font-medium text-sm lg:text-base leading-relaxed max-w-[280px]">
          Manage fleet and supply data effectively with our marine administration engine.
        </p>
      </div>
    </div>
  );
};

export default WelcomePanel;
