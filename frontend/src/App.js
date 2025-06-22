// CODE FOR REFUGEE KIOSK WELCOME SCREEN
// import React, { useState } from "react";
// import LanguageSelector from "./components/LanguageSelector";
// import MainMenu from "./components/MainMenu";

// function App() {
//   const [currentView, setCurrentView] = useState('language');
//   const [selectedLanguage, setSelectedLanguage] = useState(null);

//   const handleLanguageSelect = (lang) => {
//     setSelectedLanguage(lang);
//     setCurrentView('main');
//   };

//   const handleBackToLanguage = () => {
//     setCurrentView('language');
//   };

//   return (
//     <div className="App">
//       {currentView === 'language' ? (
//         <LanguageSelector onSelect={handleLanguageSelect} />
//       ) : (
//         <MainMenu onBack={handleBackToLanguage} selectedLanguage={selectedLanguage} />
//       )}
//     </div>
//   );
// }

// export default App;


// CODE FOR Screen2 - Main Menu

import React, { useState } from 'react';
import MainMenu from './components/MainMenu';

function App() {
  // This is just for the back button demo, you can wire it to your language screen
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div>
      {showMenu ? (
        <MainMenu onBack={() => setShowMenu(false)} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold">Language Selection Placeholder</h1>
          <button onClick={() => setShowMenu(true)} className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg">
            Go to Main Menu
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
