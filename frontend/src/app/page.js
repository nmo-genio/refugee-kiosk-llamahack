'use client';

import LanguageCarousel from '@/components/LanguageCarousel';

export default function Home() {
  const handleLanguageSelect = (languageCode) => {
    // TODO: Save selected language to state/context/URL
    console.log('Selected language:', languageCode);
    // You can add routing logic here if needed
  };

  return (
    <main>
      <LanguageCarousel onSelect={handleLanguageSelect} />
    </main>
  );
}
