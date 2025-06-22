import { useEffect, useCallback } from 'react';
import { tts } from '../utils/speech';

export const useTextToSpeech = (language = 'en', stopOnUnmount = true) => {
  useEffect(() => {
    if (language) {
      tts.setLanguage(language);
    }
    
    return () => {
      if (stopOnUnmount) {
        tts.stop();
      }
    };
  }, [language, stopOnUnmount]);

  const speak = useCallback((text) => {
    if (Array.isArray(text)) {
      // If text is an array, speak each item
      text.forEach((item, index) => {
        if (item) {
          // Add a small delay between items
          setTimeout(() => tts.speak(String(item)), index * 3000);
        }
      });
    } else if (text) {
      tts.speak(String(text));
    }
  }, []);

  const stop = useCallback(() => {
    tts.stop();
  }, []);

  return { 
    speak, 
    stop,
    isSpeaking: tts.isSpeaking
  };
};
