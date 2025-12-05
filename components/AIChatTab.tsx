import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Map, Clock, Sparkles } from 'lucide-react';
import { ChatMessage, ItineraryItem } from '../types';
import { generateTravelItinerary } from '../services/geminiService';

const AIChatTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '0', 
      role: 'model', 
      text: 'Hi! I am Musafir AI. 🌍\nI can help you plan your next trip, find flights, or explore new destinations. Where do you want to go?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const result = await generateTravelItinerary(input);
    
    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: result.text,
      suggestedItinerary: result.itinerary
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 pt-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-800">Musafir AI Assistant</h1>
            <p className="text-xs text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-gray-200' : 'bg-cyan-100 text-cyan-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className="space-y-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-cyan-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Itinerary Card Render */}
                {msg.suggestedItinerary && (
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md w-full animate-fade-in-up">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                       <Map size={16} className="mr-2 text-cyan-600" />
                       Suggested Itinerary
                    </h3>
                    <div className="space-y-4">
                      {msg.suggestedItinerary.map((item, idx) => (
                        <div key={idx} className="relative pl-6 border-l-2 border-cyan-100 pb-2 last:pb-0">
                          <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-white"></div>
                          <div className="flex justify-between items-start">
                             <div>
                                <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-1 block">Day {item.day}</span>
                                <p className="text-sm font-semibold text-gray-800">{item.activity}</p>
                                <p className="text-xs text-gray-500 mt-1">{item.location}</p>
                             </div>
                             <div className="flex items-center text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                <Clock size={12} className="mr-1" />
                                {item.time}
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-[80px] left-0 right-0 px-4 pb-2">
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Musafir AI (e.g., 'Plan 3 days in Skardu')"
            className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-cyan-600 text-white p-3 rounded-xl disabled:opacity-50 hover:bg-cyan-700 transition-colors shadow-md shadow-cyan-200"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatTab;