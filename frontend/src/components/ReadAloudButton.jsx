// src/components/ReadAloudButton.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

const ReadAloudButton = ({ 
  text, 
  language = 'en', 
  className = '',
  stopOnUnmount = true,
  showStopButton = false
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speak: speakText, stop, isSpeaking: ttsIsSpeaking } = useTextToSpeech(language, stopOnUnmount);

  // Update local speaking state when TTS state changes
  useEffect(() => {
    if (ttsIsSpeaking !== undefined) {
      setIsSpeaking(ttsIsSpeaking);
    }
  }, [ttsIsSpeaking]);

  const handleClick = useCallback(() => {
    if (!text) return;

    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      // Handle different types of content
      let contentToSpeak = text;
      
      if (Array.isArray(text)) {
        // Filter out any empty strings or invalid items
        contentToSpeak = text.filter(item => item && String(item).trim());
      } else if (typeof text === 'object' && text !== null) {
        // Convert object to array of its values
        contentToSpeak = Object.values(text).filter(item => item && String(item).trim());
      } else if (typeof text === 'string') {
        contentToSpeak = text.trim();
      }

      if (contentToSpeak) {
        speakText(contentToSpeak);
        setIsSpeaking(true);
      }
    }
  }, [text, isSpeaking, speakText, stop]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stopOnUnmount) {
        stop();
      }
    };
  }, [stop, stopOnUnmount]);

  const buttonLabel = isSpeaking ? 'Stop reading' : 'Read aloud';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        onClick={handleClick}
        className={`p-2 rounded-full transition-colors ${
          isSpeaking 
            ? 'bg-red-100 hover:bg-red-200 text-red-600' 
            : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
        }`}
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        {isSpeaking ? (
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" 
            />
          </svg>
        ) : (
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
            />
          </svg>
        )}
      </button>
      {showStopButton && isSpeaking && (
        <button
          onClick={stop}
          className="ml-2 p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
          aria-label="Stop reading"
          title="Stop reading"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ReadAloudButton;