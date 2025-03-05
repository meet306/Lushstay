import { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const botResponses = {
    'hello': 'Hi! How can I help you today?',
    'hi': 'Hello! How can I assist you?',
    'booking': 'To make a booking, simply choose a property and click the Reserve button.',
    'payment': 'We accept all major credit cards for payment.',
    'cancel': 'You can cancel your booking up to 48 hours before check-in.',
    'help': 'I can help you with bookings, payments, and general information. What would you like to know?',
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Find matching response or use default
    let botResponse = 'I apologize, but I can only answer basic questions. For specific help, please contact our support.';
    for (const [key, value] of Object.entries(botResponses)) {
      if (userMessage.includes(key)) {
        botResponse = value;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-airbnb-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          <FaComments className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="p-4 bg-airbnb-red text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-airbnb-red text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-airbnb-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}