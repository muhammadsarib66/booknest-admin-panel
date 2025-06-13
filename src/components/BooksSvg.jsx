import PropTypes from 'prop-types';

const BooksSvg = ({ className = "w-full h-full" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="book1-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ee5a24" />
        </linearGradient>
        <linearGradient id="book2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ecdc4" />
          <stop offset="100%" stopColor="#44a08d" />
        </linearGradient>
        <linearGradient id="book3-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a8e6cf" />
          <stop offset="100%" stopColor="#88d8a3" />
        </linearGradient>
        <linearGradient id="book4-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd93d" />
          <stop offset="100%" stopColor="#ff9ff3" />
        </linearGradient>
        <linearGradient id="book5-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a8edea" />
          <stop offset="100%" stopColor="#fed6e3" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="400" height="300" fill="url(#bg-gradient)" />
      
      {/* Floating particles */}
      <circle cx="50" cy="50" r="2" fill="white" opacity="0.6" />
      <circle cx="350" cy="80" r="1.5" fill="white" opacity="0.4" />
      <circle cx="100" cy="40" r="1" fill="white" opacity="0.8" />
      <circle cx="320" cy="120" r="2.5" fill="white" opacity="0.3" />
      
      {/* Books on shelf */}
      {/* Book 1 - Red */}
      <rect x="80" y="180" width="25" height="90" fill="url(#book1-gradient)" rx="2" />
      <rect x="82" y="182" width="21" height="86" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" />
      <rect x="85" y="185" width="15" height="3" fill="rgba(255,255,255,0.8)" rx="1" />
      
      {/* Book 2 - Teal */}
      <rect x="110" y="170" width="28" height="100" fill="url(#book2-gradient)" rx="2" />
      <rect x="112" y="172" width="24" height="96" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" />
      <rect x="115" y="175" width="18" height="3" fill="rgba(255,255,255,0.8)" rx="1" />
      
      {/* Book 3 - Green */}
      <rect x="143" y="185" width="22" height="85" fill="url(#book3-gradient)" rx="2" />
      <rect x="145" y="187" width="18" height="81" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" />
      <rect x="147" y="190" width="14" height="3" fill="rgba(255,255,255,0.8)" rx="1" />
      
      {/* Book 4 - Yellow/Pink */}
      <rect x="170" y="175" width="26" height="95" fill="url(#book4-gradient)" rx="2" />
      <rect x="172" y="177" width="22" height="91" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" />
      <rect x="175" y="180" width="16" height="3" fill="rgba(255,255,255,0.8)" rx="1" />
      
      {/* Book 5 - Light Blue/Pink */}
      <rect x="201" y="190" width="24" height="80" fill="url(#book5-gradient)" rx="2" />
      <rect x="203" y="192" width="20" height="76" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" />
      <rect x="206" y="195" width="14" height="3" fill="rgba(255,255,255,0.8)" rx="1" />
      
      {/* Book 6 - Purple */}
      <rect x="230" y="180" width="27" height="90" fill="url(#book1-gradient)" rx="2" transform="rotate(5 243.5 225)" />
      <rect x="232" y="182" width="23" height="86" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" transform="rotate(5 243.5 225)" />
      
      {/* Book 7 - Tilted book */}
      <rect x="260" y="175" width="25" height="95" fill="url(#book2-gradient)" rx="2" transform="rotate(-8 272.5 222.5)" />
      <rect x="262" y="177" width="21" height="91" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" transform="rotate(-8 272.5 222.5)" />
      
      {/* Book 8 - Another book */}
      <rect x="290" y="185" width="23" height="85" fill="url(#book3-gradient)" rx="2" />
      <rect x="292" y="187" width="19" height="81" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" rx="1" />
      
      {/* Shelf */}
      <rect x="60" y="270" width="280" height="8" fill="rgba(255,255,255,0.2)" rx="4" />
      <rect x="60" y="272" width="280" height="4" fill="rgba(255,255,255,0.1)" rx="2" />
      
      {/* Decorative elements */}
      {/* Stars */}
      <g opacity="0.7">
        <path d="M120 120 L122 126 L128 126 L123 130 L125 136 L120 132 L115 136 L117 130 L112 126 L118 126 Z" fill="white" />
        <path d="M280 140 L282 146 L288 146 L283 150 L285 156 L280 152 L275 156 L277 150 L272 146 L278 146 Z" fill="white" />
        <path d="M160 80 L161 84 L165 84 L162 87 L163 91 L160 88 L157 91 L158 87 L155 84 L159 84 Z" fill="white" />
      </g>
      
      {/* BookNest text */}
      <text x="200" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="serif">
        BookNest
      </text>
      <text x="200" y="80" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="sans-serif">
        Your Digital Library
      </text>
    </svg>
  );
};

BooksSvg.propTypes = {
  className: PropTypes.string,
};

export default BooksSvg; 