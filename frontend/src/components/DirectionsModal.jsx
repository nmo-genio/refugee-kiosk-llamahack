import React, { useState, useEffect } from 'react';

const DirectionsModal = ({ onClose, language = 'en' }) => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [directions, setDirections] = useState('');
  const [error, setError] = useState('');

  // Sample destinations - in a real app, these would come from your backend/API
  const destinations = [
    { id: 'medical', name: 'Medical Center' },
    { id: 'food', name: 'Food Distribution' },
    { id: 'shelter', name: 'Shelter' },
    { id: 'admin', name: 'Administration' },
    { id: 'water', name: 'Water Point' },
    { id: 'sanitation', name: 'Sanitation' },
  ];

  // Translations
  const translations = {
    en: {
      title: 'Get Directions',
      selectDestination: 'Select a destination',
      loading: 'Finding the best route...',
      getDirections: 'Get Directions',
      close: 'Close',
      error: 'Failed to get directions. Please try again.',
      noDestination: 'Please select a destination',
    },
    // Add other languages as needed
  };

  const t = translations[language] || translations.en;

  const handleGetDirections = async () => {
    if (!selectedDestination) {
      setError(t.noDestination);
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, you would call your backend API here
      // const response = await getDirections(selectedDestination);
      // setDirections(response.directions);
      
      // Mock response for demo
      setTimeout(() => {
        setDirections(`Walk 200m north to the main path. Turn right and continue for 150m. The ${selectedDestination} will be on your left.`);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Error getting directions:', err);
      setError(t.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
          
          <div className="mb-4">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              {t.selectDestination}
            </label>
            <select
              id="destination"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              <option value="">-- {t.selectDestination} --</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2">{t.loading}</span>
            </div>
          ) : directions ? (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Directions to {destinations.find(d => d.id === selectedDestination)?.name || 'destination'}:</h3>
              <p className="whitespace-pre-line">{directions}</p>
            </div>
          ) : null}
        </div>

        <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            disabled={isLoading}
          >
            {t.close}
          </button>
          <button
            onClick={handleGetDirections}
            disabled={!selectedDestination || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t.getDirections}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectionsModal;
