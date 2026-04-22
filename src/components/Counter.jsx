import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCount = useRef(count);
  const animationRef = useRef(null);

  // Smooth number animation
  useEffect(() => {
    if (count !== displayCount) {
      const diff = count - displayCount;
      const step = diff > 0 ? 1 : -1;
      const duration = 300;
      const steps = Math.min(Math.abs(diff), 20);
      const interval = duration / steps;

      let current = displayCount;
      animationRef.current = setInterval(() => {
        current += step;
        setDisplayCount(current);
        if (current === count) {
          clearInterval(animationRef.current);
        }
      }, interval);

      return () => clearInterval(animationRef.current);
    }
  }, [count]);

  // Direction tracking
  useEffect(() => {
    if (count > prevCount.current) setDirection('up');
    else if (count < prevCount.current) setDirection('down');
    prevCount.current = count;
    
    const timer = setTimeout(() => setDirection(null), 400);
    return () => clearTimeout(timer);
  }, [count]);

  const increment = useCallback(() => {
    setIsAnimating(true);
    setCount(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const decrement = useCallback(() => {
    if (count > 0) {
      setIsAnimating(true);
      setCount(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [count]);

  const reset = useCallback(() => {
    setCount(0);
    setDisplayCount(0);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === '+') increment();
      if (e.key === 'ArrowDown' || e.key === '-') decrement();
      if (e.key === 'r' || e.key === 'R') reset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [increment, decrement, reset]);

  // Calculate progress for circular indicator
  const maxCount = 100;
  const progress = Math.min((count / maxCount) * 100, 100);
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="counter-page">
      {/* Animated Background */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      {/* Main Card - CENTERED */}
      <div className="counter-card-wrapper">
        <div className="counter-card">
          {/* Glow Effect */}
          <div className="card-glow"></div>

          {/* Header */}
          <div className="card-header">
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span className="live-text">Live Counter</span>
            </div>
            <div className="badge">React + Vite</div>
          </div>

          {/* Circular Progress & Number */}
          <div className="counter-circle-container">
            <svg className="progress-ring" viewBox="0 0 260 260">
              <circle className="progress-ring-bg" cx="130" cy="130" r="120" />
              <circle 
                className="progress-ring-fill" 
                cx="130" 
                cy="130" 
                r="120"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>
            
            <div className={`counter-number-wrapper ${direction ? `animate-${direction}` : ''}`}>
              <div className={`counter-number ${isAnimating ? 'pulse' : ''}`}>
                {displayCount}
              </div>
              <div className="counter-label">Count</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="linear-progress">
            <div className="linear-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Controls */}
          <div className="controls">
            <button 
              className="control-btn btn-minus" 
              onClick={decrement}
              disabled={count === 0}
              aria-label="Decrease"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            <button 
              className="control-btn btn-reset" 
              onClick={reset}
              aria-label="Reset"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Reset</span>
            </button>

            <button 
              className="control-btn btn-plus" 
              onClick={increment}
              aria-label="Increase"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="shortcuts">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span>Navigate</span>
            <span className="dot">•</span>
            <kbd>R</kbd>
            <span>Reset</span>
          </div>

          {/* Stats Grid */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">×2</div>
              <div className="stat-value">{count * 2}</div>
              <div className="stat-label">Double</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">x²</div>
              <div className="stat-value">{count ** 2}</div>
              <div className="stat-label">Square</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">{count % 2 === 0 ? '⚡' : '🔢'}</div>
              <div className="stat-value">{count % 2 === 0 ? 'Even' : 'Odd'}</div>
              <div className="stat-label">Parity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;