import React from 'react';

const MainMenu = ({ onBack }) => {
  const handleButtonClick = (action) => {
    console.log(`Action selected: ${action}`);
    // TODO: Connect these actions to your routing/logic!
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="self-start mb-6 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Language Selection
      </button>

      {/* Map Section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          MAP of the Refugee Camp
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
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            id: 'docs', 
            title: 'Docs', 
            icon: '📄',
            description: 'Translate or fill your documents' 
          },
          { 
            id: 'sos', 
            title: 'SOS', 
            icon: '🆘',
            description: 'Send an emergency alert' 
          },
          { 
            id: 'family', 
            title: 'Find My Family', 
            icon: '👨‍👩‍👧‍👦',
            description: 'Help with tracing or contacting relatives' 
          }
        ].map((button) => (
          <button
            key={button.id}
            onClick={() => handleButtonClick(button.id)}
            className="flex flex-col items-center justify-center p-8 min-h-[140px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
          >
            <span className="text-5xl mb-3">{button.icon}</span>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1">{button.title}</h3>
            <p className="text-gray-500 text-base text-center">{button.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;