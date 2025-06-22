// frontend/src/components/ChatWithAI.jsx
import { useState } from 'react';
import { uploadImage, sendChatMessage, checkHealth } from '../services/api';

const ChatWithAI = ({ imageData }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const checkApiHealth = async () => {
    try {
      const isHealthy = await checkHealth();
      if (!isHealthy) {
        throw new Error('API is not available');
      }
      return true;
    } catch (error) {
      console.error('API Health Check Failed:', error);
      setApiError('Unable to connect to the server. Please try again later.');
      return false;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setApiError(null);
    const userMessage = { role: 'user', content: message };
    setConversation(prev => [...prev, userMessage]);
    setMessage('');

    try {
      // Check API health before proceeding
      const isApiHealthy = await checkApiHealth();
      if (!isApiHealthy) return;

      // If there's an image, upload it first
      let imagePath = null;
      if (imageData) {
        const blob = await fetch(imageData).then(r => r.blob());
        const file = new File([blob], 'captured-image.png', { type: 'image/png' });
        const uploadResponse = await uploadImage(file);
        imagePath = uploadResponse.imagePath;
      }

      // Send chat message
      const response = await sendChatMessage(message, imagePath);
      setConversation(prev => [...prev, { role: 'assistant', content: response.reply }]);
    } catch (error) {
      console.error('Error:', error);
      if (!apiError) { // Only set error if not already set by checkApiHealth
        setApiError('Failed to send message. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {apiError}
          <button
            onClick={() => setApiError(null)}
            className="ml-2 text-red-700 font-bold"
          >
            ×
          </button>
        </div>
      )}
      <div className="messages">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWithAI;