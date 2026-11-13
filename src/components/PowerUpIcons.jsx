import React from 'react';

export function PowerUpIcon({ type, size = 48, className = '' }) {
  const pixelStyle = { imageRendering: 'pixelated' };

  switch (type) {
    case 'flower': // Fire Flower (React.js)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          {/* Petals */}
          <rect x="4" y="0" width="8" height="2" fill="#E52521" />
          <rect x="2" y="2" width="12" height="2" fill="#E52521" />
          <rect x="2" y="4" width="3" height="4" fill="#E52521" />
          <rect x="11" y="4" width="3" height="4" fill="#E52521" />
          <rect x="2" y="8" width="12" height="2" fill="#E52521" />
          {/* Inner Orange */}
          <rect x="5" y="2" width="6" height="2" fill="#FF9900" />
          <rect x="4" y="4" width="8" height="4" fill="#FF9900" />
          <rect x="5" y="8" width="6" height="2" fill="#FF9900" />
          {/* Center White Face */}
          <rect x="5" y="4" width="6" height="4" fill="#FFFFFF" />
          <rect x="6" y="5" width="1" height="2" fill="#000000" />
          <rect x="9" y="5" width="1" height="2" fill="#000000" />
          {/* Stem & Leaves */}
          <rect x="7" y="10" width="2" height="6" fill="#00A800" />
          <rect x="4" y="11" width="3" height="2" fill="#00A800" />
          <rect x="9" y="11" width="3" height="2" fill="#00A800" />
          <rect x="3" y="13" width="2" height="2" fill="#00A800" />
          <rect x="11" y="13" width="2" height="2" fill="#00A800" />
        </svg>
      );

    case 'mushroom': // Super Mushroom (JavaScript)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          {/* Cap Red */}
          <rect x="4" y="1" width="8" height="2" fill="#E52521" />
          <rect x="2" y="3" width="12" height="2" fill="#E52521" />
          <rect x="1" y="5" width="14" height="4" fill="#E52521" />
          {/* White Spots */}
          <rect x="6" y="2" width="4" height="4" fill="#FFFFFF" />
          <rect x="2" y="5" width="2" height="3" fill="#FFFFFF" />
          <rect x="12" y="5" width="2" height="3" fill="#FFFFFF" />
          {/* Cap Base */}
          <rect x="1" y="9" width="14" height="1" fill="#000000" />
          {/* Face */}
          <rect x="3" y="10" width="10" height="5" fill="#FCD8A8" />
          <rect x="4" y="11" width="2" height="3" fill="#000000" />
          <rect x="10" y="11" width="2" height="3" fill="#000000" />
          {/* Base bottom */}
          <rect x="4" y="15" width="8" height="1" fill="#D4A373" />
        </svg>
      );

    case 'green-mushroom': // 1-Up Mushroom (Java)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          {/* Cap Green */}
          <rect x="4" y="1" width="8" height="2" fill="#00D000" />
          <rect x="2" y="3" width="12" height="2" fill="#00D000" />
          <rect x="1" y="5" width="14" height="4" fill="#00D000" />
          {/* White Spots */}
          <rect x="6" y="2" width="4" height="4" fill="#FFFFFF" />
          <rect x="2" y="5" width="2" height="3" fill="#FFFFFF" />
          <rect x="12" y="5" width="2" height="3" fill="#FFFFFF" />
          {/* Cap Base */}
          <rect x="1" y="9" width="14" height="1" fill="#004D00" />
          {/* Face */}
          <rect x="3" y="10" width="10" height="5" fill="#FCD8A8" />
          <rect x="4" y="11" width="2" height="3" fill="#000000" />
          <rect x="10" y="11" width="2" height="3" fill="#000000" />
        </svg>
      );

    case 'star': // Star Power (Node.js)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <rect x="7" y="0" width="2" height="3" fill="#FCD116" />
          <rect x="6" y="3" width="4" height="2" fill="#FCD116" />
          <rect x="1" y="5" width="14" height="3" fill="#FCD116" />
          <rect x="3" y="8" width="10" height="3" fill="#FCD116" />
          <rect x="2" y="11" width="4" height="4" fill="#FCD116" />
          <rect x="10" y="11" width="4" height="4" fill="#FCD116" />
          {/* Cute Star Eyes */}
          <rect x="5" y="6" width="1.5" height="3" fill="#000000" />
          <rect x="9.5" y="6" width="1.5" height="3" fill="#000000" />
          {/* Highlights */}
          <rect x="7" y="1" width="1" height="2" fill="#FFF59D" />
          <rect x="3" y="6" width="2" height="1" fill="#FFF59D" />
        </svg>
      );

    case 'shell': // Green Shell (MongoDB)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          {/* Outer Shell Green */}
          <rect x="4" y="2" width="8" height="2" fill="#00A800" />
          <rect x="2" y="4" width="12" height="8" fill="#00A800" />
          {/* Shell Pattern */}
          <rect x="5" y="5" width="6" height="4" fill="#70D000" />
          <rect x="7" y="4" width="2" height="6" fill="#FFFFFF" opacity="0.6" />
          {/* White rim */}
          <rect x="1" y="12" width="14" height="3" fill="#FFFFFF" />
          <rect x="2" y="13" width="12" height="1" fill="#E0E0E0" />
        </svg>
      );

    case 'leaf': // Super Leaf (Next.js)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          {/* Tan/Brown Raccoon Leaf */}
          <rect x="11" y="1" width="3" height="3" fill="#B87333" />
          <rect x="7" y="3" width="6" height="4" fill="#D29944" />
          <rect x="4" y="6" width="8" height="6" fill="#D29944" />
          <rect x="2" y="11" width="4" height="3" fill="#B87333" />
          <rect x="1" y="13" width="2" height="2" fill="#6B3300" />
          {/* Leaf vein */}
          <rect x="6" y="5" width="4" height="2" fill="#FCD8A8" />
          <rect x="5" y="7" width="2" height="3" fill="#FCD8A8" />
        </svg>
      );

    case 'block': // Coin Block / Question Block (HTML & CSS)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <rect x="0" y="0" width="16" height="16" fill="#FCD116" />
          <rect x="1" y="1" width="14" height="14" fill="#FF9900" />
          <rect x="2" y="2" width="12" height="12" fill="#FCD116" />
          {/* Rivets */}
          <rect x="2" y="2" width="1" height="1" fill="#000000" />
          <rect x="13" y="2" width="1" height="1" fill="#000000" />
          <rect x="2" y="13" width="1" height="1" fill="#000000" />
          <rect x="13" y="13" width="1" height="1" fill="#000000" />
          {/* Question Mark */}
          <rect x="5" y="4" width="6" height="2" fill="#6B3300" />
          <rect x="9" y="6" width="2" height="3" fill="#6B3300" />
          <rect x="6" y="8" width="3" height="2" fill="#6B3300" />
          <rect x="6" y="11" width="2" height="2" fill="#6B3300" />
        </svg>
      );

    case 'feather': // Super Feather / Cape (Responsive Design)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <rect x="10" y="1" width="4" height="3" fill="#FFD700" />
          <rect x="7" y="3" width="5" height="5" fill="#FFFFFF" />
          <rect x="5" y="7" width="5" height="5" fill="#5C94FC" />
          <rect x="2" y="11" width="4" height="4" fill="#0026FF" />
          <rect x="8" y="4" width="1" height="8" fill="#FCD8A8" />
        </svg>
      );

    case 'key': // Golden Key (Git & GitHub)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          {/* Key Ring */}
          <rect x="2" y="2" width="6" height="6" fill="#FCD116" />
          <rect x="3" y="3" width="4" height="4" fill="#0f172a" />
          {/* Key Shaft */}
          <rect x="7" y="4" width="7" height="2" fill="#FCD116" />
          {/* Key Teeth */}
          <rect x="11" y="6" width="2" height="3" fill="#FCD116" />
          <rect x="13" y="6" width="1" height="2" fill="#FCD116" />
        </svg>
      );

    case 'wing': // P-Wing (Vercel)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <rect x="2" y="3" width="12" height="3" fill="#FFFFFF" />
          <rect x="1" y="6" width="11" height="3" fill="#5C94FC" />
          <rect x="3" y="9" width="8" height="3" fill="#0026FF" />
          {/* Red P */}
          <rect x="6" y="2" width="4" height="5" fill="#E52521" />
          <rect x="7" y="3" width="2" height="2" fill="#FFFFFF" />
        </svg>
      );

    case 'hammer': // Power Hammer (VS Code & Figma)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          {/* Hammer Head */}
          <rect x="7" y="1" width="8" height="5" fill="#A3A3A3" />
          <rect x="8" y="2" width="6" height="3" fill="#FFFFFF" />
          {/* Handle */}
          <rect x="2" y="6" width="6" height="2" fill="#8B4513" />
          <rect x="1" y="8" width="4" height="2" fill="#8B4513" />
        </svg>
      );

    case 'wand': // Magic Wand (AI-Assisted Tools)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <rect x="11" y="1" width="4" height="4" fill="#FCD116" />
          <rect x="12" y="2" width="2" height="2" fill="#FFFFFF" />
          <rect x="8" y="5" width="4" height="4" fill="#9933FF" />
          <rect x="5" y="8" width="4" height="4" fill="#FFFFFF" />
          <rect x="2" y="11" width="4" height="4" fill="#9933FF" />
        </svg>
      );

    case 'pow': // POW Block (DSA)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <rect x="1" y="1" width="14" height="14" fill="#0026FF" />
          <rect x="2" y="2" width="12" height="12" fill="#5C94FC" />
          <rect x="3" y="5" width="10" height="6" fill="#000000" />
          {/* P O W letters */}
          <rect x="4" y="6" width="2" height="4" fill="#FFFFFF" />
          <rect x="7" y="6" width="2" height="4" fill="#FFFFFF" />
          <rect x="10" y="6" width="2" height="4" fill="#FFFFFF" />
        </svg>
      );

    case 'brick': // Castle Brick (OOP)
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <rect x="0" y="0" width="16" height="16" fill="#B84418" />
          <rect x="0" y="7" width="16" height="2" fill="#000000" />
          <rect x="7" y="0" width="2" height="7" fill="#000000" />
          <rect x="3" y="9" width="2" height="7" fill="#000000" />
          <rect x="11" y="9" width="2" height="7" fill="#000000" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} className={className} style={pixelStyle}>
          <circle cx="8" cy="8" r="7" fill="#FCD116" />
          <rect x="6" y="4" width="4" height="8" fill="#FF9900" />
        </svg>
      );
  }
}
