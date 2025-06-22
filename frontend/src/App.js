import React from "react";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  // Optional: handle language select event
  const handleSelect = (lang) => {
    alert(`Selected language: ${lang.text}`);
    // Navigate to next screen, set language in state/context, etc.
  };

  return <LanguageSelector onSelect={handleSelect} />;
}

export default App;
