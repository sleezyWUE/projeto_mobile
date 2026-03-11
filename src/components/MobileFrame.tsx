import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-[400px] h-[800px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-neutral-900 overflow-hidden relative flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-50"></div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pt-8">
          {children}
        </div>
        
        {/* Home Indicator */}
        <div className="h-6 bg-white flex items-center justify-center pb-2">
          <div className="w-24 h-1 bg-neutral-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
