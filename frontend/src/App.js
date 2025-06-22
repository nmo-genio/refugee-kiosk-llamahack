import React, { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import MainMenu from "./components/MainMenu";

function App() {
  const [currentView, setCurrentView] = useState('language');
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // User selects a language from Welcome
  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setCurrentView('main');
  };

  // Back button from Main Menu returns to Welcome
  const handleBackToLanguage = () => {
    setCurrentView('language');
  };

  return (
    <div className="App">
      {currentView === 'language' ? (
        <LanguageSelector onSelect={handleLanguageSelect} />
      ) : (
        <MainMenu 
          onBack={handleBackToLanguage} 
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
}

export default App;
