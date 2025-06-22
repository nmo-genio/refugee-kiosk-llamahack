// frontend/src/App.js
import React, { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import MainMenu from "./components/MainMenu";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [currentView, setCurrentView] = useState('language');
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setCurrentView('main');
  };

  const handleBackToLanguage = () => {
    setCurrentView('language');
  };

  return (
    <ErrorBoundary>
      <div className="App min-h-screen bg-gray-100">
        {currentView === 'language' ? (
          <LanguageSelector onSelect={handleLanguageSelect} />
        ) : (
          <MainMenu 
            onBack={handleBackToLanguage} 
            selectedLanguage={selectedLanguage}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;