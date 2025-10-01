import React, { useState, useEffect } from 'react';

interface BunnyCheerleaderProps {
  userMessage?: string;
}

const BunnyCheerleader: React.FC<BunnyCheerleaderProps> = ({ userMessage = '' }) => {
  const [mood, setMood] = useState('neutral');
  const [isExpanded, setIsExpanded] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);
  const [earWiggle, setEarWiggle] = useState(false);
  const [inputText, setInputText] = useState('');
  const [cheerText, setCheerText] = useState('');

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  // Ear wiggling animation
  useEffect(() => {
    const wiggleInterval = setInterval(() => {
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 500);
    }, 5000 + Math.random() * 3000);
    
    return () => clearInterval(wiggleInterval);
  }, []);

  // Simple sentiment + mood detection
  const analyzeAndRespond = (messageRaw: string) => {
    const message = messageRaw.toLowerCase();

    const positive = ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'good', 'proud'];
    const negative = ['sad', 'depressed', 'down', 'upset', 'crying', 'unhappy', 'stressed', 'anxious', 'worried', 'nervous', 'overwhelmed', 'demotivated', 'bad'];

    const isPositive = positive.some((w) => message.includes(w));
    const isNegative = negative.some((w) => message.includes(w));

    if (isPositive && !isNegative) {
      setMood('happy');
      setCheerText("That's awesome! Keep shining—I'm cheering for you! ✨");
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 500);
      return;
    }

    if (isNegative && !isPositive) {
      setMood('sad');
      setCheerText("I'm here with you. You matter—let's take it one step at a time 💚");
      return;
    }

    setMood('neutral');
    setCheerText("Thanks for sharing. I'm listening—tell me more.");
  };

  // Detect mood from external userMessage (e.g., sidebar input)
  useEffect(() => {
    if (userMessage) {
      analyzeAndRespond(userMessage);
    }
  }, [userMessage]);

  const handleBunnyDoubleClick = () => {
    setIsExpanded(true);
    setEarWiggle(true);
    setTimeout(() => setEarWiggle(false), 500);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleSend = (text?: string) => {
    const toSend = (text ?? inputText).trim();
    if (!toSend) return;
    analyzeAndRespond(toSend);
    if (!text) setInputText('');
  };

  // Close on Escape key
  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded]);

  const getBunnyAnimation = () => {
    switch (mood) {
      case 'happy': return 'animate-bounce';
      case 'sad': return '';
      case 'demotivated': return 'animate-pulse';
      default: return '';
    }
  };

  // Compact widget (idle)
  if (!isExpanded) {
    return (
      <div className="relative">
        <div 
          className={`transition-all duration-500 ease-in-out cursor-pointer w-[80px]`}
          onDoubleClick={handleBunnyDoubleClick}
        >
          <div className={`bg-accent rounded-2xl shadow-lg border border-border p-2`}>
            {/* Bunny SVG */}
            <div className={`relative flex justify-center ${getBunnyAnimation()}`}>
              <svg 
                width={"60"} 
                height={"60"} 
                viewBox="0 0 100 100" 
                className="transition-all duration-300"
              >
              {/* Ears */}
              <ellipse 
                cx="30" cy="25" rx="8" ry="20" 
                fill="#f8f8f8" stroke="#e5e5e5" strokeWidth="1"
                className={`transform-gpu transition-transform duration-300 ${
                  earWiggle ? 'rotate-12' : 'rotate-6'
                } ${mood === 'sad' ? 'translate-y-1' : ''}`}
                style={{ transformOrigin: '30px 45px' }}
              />
              <ellipse 
                cx="70" cy="25" rx="8" ry="20" 
                fill="#f8f8f8" stroke="#e5e5e5" strokeWidth="1"
                className={`transform-gpu transition-transform duration-300 ${
                  earWiggle ? '-rotate-12' : '-rotate-6'
                } ${mood === 'sad' ? 'translate-y-1' : ''}`}
                style={{ transformOrigin: '70px 45px' }}
              />
              
              {/* Inner ears */}
              <ellipse cx="30" cy="25" rx="4" ry="12" fill="#ffc0cb" />
              <ellipse cx="70" cy="25" rx="4" ry="12" fill="#ffc0cb" />
              
              {/* Head */}
              <circle cx="50" cy="55" r="28" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1" />
              
              {/* Eyes */}
              <circle cx="42" cy="48" r="4" fill="#333" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
              <circle cx="58" cy="48" r="4" fill="#333" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
              
              {/* Eye closed lines (when blinking) */}
              <line x1="38" y1="48" x2="46" y2="48" stroke="#333" strokeWidth="2" strokeLinecap="round" className={eyeBlink ? 'opacity-100' : 'opacity-0'} />
              <line x1="54" y1="48" x2="62" y2="48" stroke="#333" strokeWidth="2" strokeLinecap="round" className={eyeBlink ? 'opacity-100' : 'opacity-0'} />
              
              {/* Eye shine */}
              <circle cx="44" cy="46" r="1" fill="white" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
              <circle cx="60" cy="46" r="1" fill="white" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
              
              {/* Nose */}
              <ellipse cx="50" cy="58" rx="2" ry="3" fill="#ff69b4" />
              
              {/* Mouth - changes based on mood */}
              {mood === 'sad' && (
                <path d="M 45 66 Q 50 72 55 66" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round" />
              )}
              {/* Tears when sad */}
              <ellipse cx="43" cy="54" rx="1.3" ry="2.6" fill="#93c5fd" className={mood === 'sad' ? 'opacity-100' : 'opacity-0'} />
              <ellipse cx="57" cy="54" rx="1.3" ry="2.6" fill="#93c5fd" className={mood === 'sad' ? 'opacity-100' : 'opacity-0'} />
              {mood === 'happy' && (
                <path d="M 45 63 Q 50 68 55 63" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round" />
              )}
              {(mood === 'neutral' || mood === 'demotivated') && (
                <line x1="47" y1="65" x2="53" y2="65" stroke="#666" strokeWidth="2" strokeLinecap="round" />
              )}
              
              {/* Whiskers */}
              <line x1="35" y1="55" x2="42" y2="57" stroke="#ccc" strokeWidth="1" />
              <line x1="35" y1="60" x2="42" y2="60" stroke="#ccc" strokeWidth="1" />
              <line x1="58" y1="57" x2="65" y2="55" stroke="#ccc" strokeWidth="1" />
              <line x1="58" y1="60" x2="65" y2="60" stroke="#ccc" strokeWidth="1" />
              
              {/* Body (when expanded) */}
              {isExpanded && (
                <ellipse cx="50" cy="85" rx="18" ry="15" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1" />
              )}
              
              {/* Arms waving when happy and expanded */}
              {mood === 'happy' && isExpanded && (
                <>
                  <ellipse cx="32" cy="80" rx="6" ry="3" fill="#ffffff" className="animate-bounce" />
                  <ellipse cx="68" cy="80" rx="6" ry="3" fill="#ffffff" className="animate-bounce" />
                </>
              )}
              </svg>
            </div>
            {/* Hint */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">Double click me</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expanded side panel (right side)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={handleClose}>
      <div className="relative bg-accent rounded-2xl shadow-lg border border-border p-8 w-[820px] max-w-[98vw]" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Close dialog"
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-3 text-xl leading-none text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
        <div className="flex items-start justify-between mb-3">
          <div className="font-medium text-foreground">Your Wellness Buddy</div>
          <button
            aria-label="Close"
            type="button"
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>

        <div className={`relative flex justify-center mb-6 ${getBunnyAnimation()}`}>
          <svg 
            width={"240"}
            height={"240"}
            viewBox="0 0 100 100" 
            className="transition-all duration-300"
          >
            {/* Ears */}
            <ellipse 
              cx="30" cy="25" rx="8" ry="20" 
              fill="#f8f8f8" stroke="#e5e5e5" strokeWidth="1"
              className={`transform-gpu transition-transform duration-300 ${
                earWiggle ? 'rotate-12' : 'rotate-6'
              }`}
              style={{ transformOrigin: '30px 45px' }}
            />
            <ellipse 
              cx="70" cy="25" rx="8" ry="20" 
              fill="#f8f8f8" stroke="#e5e5e5" strokeWidth="1"
              className={`transform-gpu transition-transform duration-300 ${
                earWiggle ? '-rotate-12' : '-rotate-6'
              }`}
              style={{ transformOrigin: '70px 45px' }}
            />
            {/* Inner ears */}
            <ellipse cx="30" cy="25" rx="4" ry="12" fill="#ffc0cb" />
            <ellipse cx="70" cy="25" rx="4" ry="12" fill="#ffc0cb" />
            {/* Body (draw first so head renders on top) */}
            <ellipse cx="50" cy="88" rx="26" ry="20" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1" />
            {/* Head (slightly smaller) */}
            <circle cx="50" cy="54" r="24" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1" />
            {/* Eyes */}
            <circle cx="42" cy="48" r="4" fill="#333" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
            <circle cx="58" cy="48" r="4" fill="#333" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
            {/* Eye closed lines (when blinking) */}
            <line x1="38" y1="48" x2="46" y2="48" stroke="#333" strokeWidth="2" strokeLinecap="round" className={eyeBlink ? 'opacity-100' : 'opacity-0'} />
            <line x1="54" y1="48" x2="62" y2="48" stroke="#333" strokeWidth="2" strokeLinecap="round" className={eyeBlink ? 'opacity-100' : 'opacity-0'} />
            {/* Eye shine */}
            <circle cx="44" cy="46" r="1" fill="white" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
            <circle cx="60" cy="46" r="1" fill="white" className={eyeBlink ? 'opacity-0' : 'opacity-100'} />
            {/* Nose */}
            <ellipse cx="50" cy="58" rx="2" ry="3" fill="#ff69b4" />
            {/* Mouth - changes based on mood */}
            {mood === 'sad' && (
              <path d="M 45 65 Q 50 62 55 65" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
            {mood === 'happy' && (
              <path d="M 45 63 Q 50 68 55 63" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
            {(mood === 'neutral' || mood === 'demotivated') && (
              <line x1="47" y1="65" x2="53" y2="65" stroke="#666" strokeWidth="2" strokeLinecap="round" />
            )}
            {/* Whiskers */}
            <line x1="35" y1="55" x2="42" y2="57" stroke="#ccc" strokeWidth="1" />
            <line x1="35" y1="60" x2="42" y2="60" stroke="#ccc" strokeWidth="1" />
            <line x1="58" y1="57" x2="65" y2="55" stroke="#ccc" strokeWidth="1" />
            <line x1="58" y1="60" x2="65" y2="60" stroke="#ccc" strokeWidth="1" />
            {/* Arms (repositioned for larger body) */}
            <line x1="38" y1="84" x2="30" y2="87" stroke="#f0f0f0" strokeWidth="2" />
            <line x1="62" y1="84" x2="70" y2="87" stroke="#f0f0f0" strokeWidth="2" />
            <ellipse cx="28" cy="90" rx="7" ry="9" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1.2" className={mood === 'happy' ? 'animate-bounce' : ''} />
            <ellipse cx="72" cy="90" rx="7" ry="9" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1.2" className={mood === 'happy' ? 'animate-bounce' : ''} />
            {/* Friendly greeting */}
            <text x="78" y="76" textAnchor="start" fontSize="8" fill="#334155" className={mood === 'happy' ? 'animate-bounce' : ''}>hii</text>
            {/* Legs / Feet (bigger and lower) */}
            <ellipse cx="42" cy="100" rx="10" ry="5" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1" />
            <ellipse cx="58" cy="100" rx="10" ry="5" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1" />
            {/* Ground shadow */}
            <ellipse cx="50" cy="104" rx="20" ry="3.5" fill="#000" opacity="0.06" />
          </svg>
        </div>

        {cheerText && (
          <div className="mb-3 text-sm text-foreground/90">{cheerText}</div>
        )}

        {/* Quick replies */}
        <div className="flex gap-2 mb-2">
          <button
            className="px-3 py-1 rounded-md text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => handleSend('I am happy')}
          >
            I am happy
          </button>
          <button
            className="px-3 py-1 rounded-md text-xs bg-muted text-foreground hover:bg-muted/80 border border-border"
            onClick={() => handleSend('I am sad')}
          >
            I am sad
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="flex-1 h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Share what's on your mind..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 disabled:opacity-50"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BunnyCheerleader;