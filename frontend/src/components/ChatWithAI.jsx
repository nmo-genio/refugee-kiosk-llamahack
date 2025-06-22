// frontend/src/components/ChatWithAI.jsx
import { useState, useEffect, useRef } from 'react';
import { uploadImage, sendChatMessage, checkHealth } from '../services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatWithAI = ({ image, selectedLanguage, sessionId, onClose }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const uploadedImage = useRef(null);

  useEffect(() => {
    if (image && image !== uploadedImage.current) {
      uploadedImage.current = image;
      handleImageUpload();
    }
  }, [image]);

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

  const handleImageUpload = async () => {
    if (isLoading) return; // Prevent multiple calls
    setIsLoading(true);
    setApiError(null);

    try {
      const isApiHealthy = await checkApiHealth();
      if (!isApiHealthy) {
        uploadedImage.current = null; // Allow retry
        return;
      }

      const blob = await fetch(image).then((r) => r.blob());
      const file = new File([blob], 'captured-image.png', { type: 'image/png' });
      const response = await uploadImage(file, selectedLanguage.code); // Pass language code

      setConversation((prev) => [
        ...prev,
        { role: 'assistant', content: response.reply },
      ]);
    } catch (error) {
      console.error('Image upload failed:', error);
      setApiError('Failed to upload image. Please try again.');
      uploadedImage.current = null; // Allow retry
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setApiError(null);
    const userMessage = { role: 'user', content: message.trim() };
    setConversation((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const isApiHealthy = await checkApiHealth();
      if (!isApiHealthy) return;

      const response = await sendChatMessage(
        userMessage.content,
        selectedLanguage,
        sessionId
      );

      setConversation((prev) => [
        ...prev,
        { role: 'assistant', content: response.reply },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setApiError('Failed to send message. Please try again.');
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
            {msg.role === 'assistant' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            ) : (
              msg.content
            )}
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
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Close Chat
      </button>
    </div>
  );
};

export default ChatWithAI;