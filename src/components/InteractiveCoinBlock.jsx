import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';

export default function InteractiveCoinBlock({ onCoinCollect, size = 48, label = '?' }) {
  const [bumping, setBumping] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [sparkles, setSparkles] = useState(false);

  const hitBlock = (e) => {
    e.stopPropagation();
    sound.playBump();
    sound.playCoin();
    setBumping(true);
    setSparkles(true);

    const coinId = Date.now() + Math.random();
    setFloatingCoins((prev) => [...prev, coinId]);

    if (onCoinCollect) {
      onCoinCollect();
    }

    setTimeout(() => setBumping(false), 220);
    setTimeout(() => setSparkles(false), 500);
    setTimeout(() => {
      setFloatingCoins((prev) => prev.filter((id) => id !== coinId));
    }, 950);
  };

  return (
    <div className="relative inline-block select-none">
      {/* Floating animated coin popup */}
      {floatingCoins.map((id) => (
        <div
          key={id}
          className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center animate-bounce"
          style={{ animation: 'coinFloatUp 0.9s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards' }}
        >
          {/* 3D Spinning Golden Coin */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EAB308] via-[#FDE047] to-[#CA8A04] border-2 border-white shadow-[0_0_15px_rgba(253,224,71,0.9)] flex items-center justify-center animate-spin">
            <span className="text-xs font-black text-[#713F12]">$</span>
          </div>
          <span className="text-xs font-black text-[#FDE047] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mt-1 whitespace-nowrap tracking-wider font-mono">
            +100 PTS
          </span>
        </div>
      ))}

      {/* Burst Sparkles */}
      {sparkles && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-16 h-16 bg-[#FCD116]/30 rounded-full blur-md animate-ping" />
        </div>
      )}

      {/* The Mario Question / Mystery Block */}
      <button
        onClick={hitBlock}
        type="button"
        title="Punch the mystery block!"
        className={`relative block transition-all duration-150 cursor-pointer group active:scale-90 ${
          bumping ? '-translate-y-4 scale-105' : 'hover:-translate-y-1 hover:scale-105'
        }`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#FDE047] via-[#F59E0B] to-[#D97706] border-3 border-[#92400E] rounded-xl shadow-[0_6px_0_#78350F,0_0_20px_rgba(245,158,11,0.4)] relative flex items-center justify-center p-1 group-hover:shadow-[0_8px_0_#78350F,0_0_30px_rgba(245,158,11,0.8)] transition-all overflow-hidden">
          {/* Subtle light sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {/* Corner golden rivets */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#78350F] rounded-full shadow-inner" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#78350F] rounded-full shadow-inner" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#78350F] rounded-full shadow-inner" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#78350F] rounded-full shadow-inner" />

          {/* Centered Question Mark with 3D Shadow */}
          <span className="font-pixel text-lg sm:text-xl font-black text-[#78350F] leading-none select-none drop-shadow-[1px_1px_0_#FEF08A]">
            {label}
          </span>
        </div>
      </button>

      <style>{`
        @keyframes coinFloatUp {
          0% { transform: translate(-50%, 0) scale(0.6); opacity: 1; }
          40% { transform: translate(-50%, -45px) scale(1.3); opacity: 1; }
          100% { transform: translate(-50%, -75px) scale(0.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
