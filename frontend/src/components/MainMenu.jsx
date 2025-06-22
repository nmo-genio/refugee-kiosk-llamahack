import React, { useState, useRef, useEffect } from 'react';

// All translations for the supported languages
const translations = {
  en: {
    welcome: 'Welcome',
    mapTitle: 'Refugee Camp Map',
    backButton: 'Back to Language Selection',
    buttons: {
      docs: { title: 'Docs', description: 'Translate or fill your documents' },
      sos: { title: 'SOS', description: 'Send an emergency alert' },
      family: { title: 'Find My Family', description: 'Help with tracing or contacting relatives' }
    }
  },
  // ... (add other languages here, as in your code above)
  // For brevity, only EN is shown; add your other languages' objects here
};

const MainMenu = ({ onBack, selectedLanguage }) => {
  // --- Camera modal state
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // --- Translation
  const langCode = selectedLanguage?.code || 'en';
  const t = translations[langCode] || translations.en;
  const isRTL = selectedLanguage?.dir === 'rtl';
  const textDirection = isRTL ? 'rtl' : 'ltr';

  // --- Camera handling
  const handleCameraAccess = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setCameraError('No camera found or permission denied');
    }
  };

  // Clean up camera on modal close/unmount
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCameraModal(false);
    setCameraError(null);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // --- Handle button click
  const handleButtonClick = (action) => {
    if (action === 'docs') {
      setShowCameraModal(true);
      setTimeout(() => { handleCameraAccess(); }, 200); // let modal mount
    }
    // TODO: handle other actions like 'sos', 'family'
  };

  // --- The actual UI ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="self-start mb-6 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} transform ${isRTL ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        {t.backButton}
      </button>

      {/* Map Section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center" dir={textDirection}>
          {t.mapTitle}
        </h2>
        <div className="w-full h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <iframe
            title="Diavata Refugee Camp Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.0537532424364!2d22.8609314!3d40.7011359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a8308f3226c0c1%3A0x30a296c1630ac937!2sRefugee%20Camp%20Anagnostopoulou!5e0!3m2!1sen!2sus!4v1719037016825!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6" dir={textDirection}>
        {[
          { id: 'docs', icon: '📄', ...t.buttons.docs },
          { id: 'sos', icon: '🆘', ...t.buttons.sos },
          { id: 'family', icon: '👨‍👩‍👧‍👦', ...t.buttons.family }
        ].map((button) => (
          <button
            key={button.id}
            onClick={() => handleButtonClick(button.id)}
            className="flex flex-col items-center justify-center p-8 min-h-[140px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
          >
            <span className="text-5xl mb-3">{button.icon}</span>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1" dir={textDirection}>
              {button.title}
            </h3>
            <p className="text-gray-500 text-base text-center" dir={textDirection}>
              {button.description}
            </p>
          </button>
        ))}
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {cameraError ? 'Camera Access' : 'Document Scanner'}
              </h3>
              <button 
                onClick={closeCamera}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {cameraError ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xl font-medium text-gray-800 mb-2">
                  {cameraError}
                </p>
                <p className="text-gray-600 mb-6">
                  Please check your device settings to enable camera access.
                </p>
                <button
                  onClick={handleCameraAccess}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto max-h-[60vh]"
                />
                <div className="absolute inset-0 border-2 border-blue-400 border-dashed m-4 pointer-events-none" />
              </div>
            )}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={closeCamera}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              {!cameraError && (
                <button
                  onClick={() => {
                    // Placeholder: document capture goes here
                    alert('Document capture functionality will be implemented here');
                  }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Capture
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;