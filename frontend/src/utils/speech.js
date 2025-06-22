class TextToSpeech {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.voice = null;
    this.isSpeaking = false;
    this.queue = [];
    this.loadVoices();
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    this.voice = this.voices.find(voice => voice.lang.includes('en'));
  }

  setLanguage(language) {
    const langPrefix = language.split('-')[0];
    this.voice = this.voices.find(voice => 
      voice.lang.startsWith(language) || 
      voice.lang.startsWith(langPrefix) ||
      voice.lang === language.replace('_', '-') // Handle different locale formats
    ) || this.voice;
  }

  speak(text) {
    if (!text) return;

    const speakNext = () => {
      if (this.queue.length === 0) {
        this.isSpeaking = false;
        return;
      }

      const { text, onEnd } = this.queue[0];
      this.isSpeaking = true;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.voice;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        this.queue.shift();
        if (onEnd) onEnd();
        speakNext();
      };

      this.synth.speak(utterance);
    };

    this.queue.push({ 
      text,
      onEnd: () => {
        // Small delay between queued messages
        return new Promise(resolve => setTimeout(resolve, 500));
      }
    });

    if (!this.isSpeaking) {
      speakNext();
    }
  }

  stop() {
    this.synth.cancel();
    this.queue = [];
    this.isSpeaking = false;
  }
}

export const tts = new TextToSpeech();

// Initialize voices when they are loaded
window.speechSynthesis.onvoiceschanged = () => {
  tts.loadVoices();
};

// Also try to load voices immediately in case they're already loaded
tts.loadVoices();
