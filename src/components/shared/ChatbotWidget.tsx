'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiMinus, FiSend, FiMessageSquare } from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialBotMessages = [
  "Hello! I'm your StaffBook AI assistant. How can I help you today?",
  "I can help you with job searches, resume tips, networking advice, and more!",
  "Feel free to ask me anything about career development or job hunting."
];

import { THEME } from '@/styles/theme';



export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message when widget opens
  useEffect(() => {
    if (open && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: initialBotMessages[0],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [open]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // Simulate bot response after a short delay
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputMessage.trim()),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return "I can help you find job opportunities! Check our job market section for current openings.";
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return "For resume tips, visit our resume builder section. We offer ATS-friendly templates!";
    } else if (lowerMessage.includes('network') || lowerMessage.includes('connect')) {
      return "Networking is key! Use our networking feature to connect with professionals in your industry.";
    } else if (lowerMessage.includes('hire') || lowerMessage.includes('recruit')) {
      return "If you're looking to hire, check our hiring services for premium recruitment solutions.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with your career journey today?";
    } else if (lowerMessage.includes('help')) {
      return "I'm here to help! I can assist with job search, resume building, networking, and career advice.";
    } else {
      return initialBotMessages[Math.floor(Math.random() * initialBotMessages.length)];
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-[60]">
      {/* Chatbot Toggle Button - Only when widget is closed */}
      {!open && (
        <button
          aria-label="Open chatbot"
          className={`group relative w-14 h-14 md:w-20 md:h-20 rounded-full shadow-2xl bg-gradient-to-r from-indigo-300 to-purple-300 text-white hover:scale-105 transition-all duration-500 ease-out flex items-center justify-center ring-4 ring-white/30`}
          onClick={() => setOpen(true)}
        >
          {/* Outer glow/pulse ring - smoother */}
          <div className="absolute -inset-1 rounded-full bg-indigo-400/30 animate-pulse" />
          
          {/* Inner ambient glow */}
          <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse delay-75" />
          
          {/* Gradient background with blur effect */}
          <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-300 to-purple-300 opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-500`} />
          
          <RiRobot2Fill className="w-6 h-6 md:w-10 md:h-10 relative z-10 transform group-hover:rotate-6 transition-transform duration-500 ease-out drop-shadow-md" />
        </button>
      )}

      {/* Widget Panel */}
      {open && (
        <div className={`w-[90vw] md:w-[380px] bg-white/60 backdrop-blur-2xl rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border border-white/50 ring-1 ring-white/60 transform transition-all duration-300 origin-bottom-right animation-fade-in-up`}>
          {/* Header */}
          <div className={`relative px-6 py-5 bg-gradient-to-r from-indigo-300 to-purple-300`}>
            <div className="absolute inset-0 bg-white/10 pattern-dots opacity-20" />
            <div className="relative z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner border border-white/30">
                  <RiRobot2Fill className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">AI Assistant</h3>
                  <p className="text-xs text-white/80 font-medium">Online & Ready to Help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm" 
                  onClick={() => setMinimized(m => !m)}
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm" 
                  onClick={() => setOpen(false)}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          {!minimized ? (
            <div className="flex flex-col h-[450px] md:h-[500px] bg-gradient-to-b from-white/40 to-white/80">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-sm relative ${
                        message.sender === 'user'
                          ? `bg-gradient-to-br from-indigo-300 to-purple-300 text-white rounded-tr-sm`
                          : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
                      }`}
                    >
                      <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                      <div className={`flex items-center gap-1 mt-1.5 ${
                        message.sender === 'user' ? 'justify-end text-white/70' : 'justify-start text-gray-400'
                      }`}>
                        <span className="text-[10px] font-medium">{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/60 backdrop-blur-xl border-t border-white/50">
                <div className={`flex items-center gap-3 bg-white rounded-[1.5rem] p-1.5 shadow-sm border border-gray-100 focus-within:ring-2 focus-within:ring-[${THEME.colors.primary}]/50 transition-all duration-300`}>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className={`p-3 rounded-full bg-gradient-to-r from-indigo-300 to-purple-300 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    <FiSend className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-4 text-sm font-medium text-gray-500 bg-white/80 backdrop-blur-md flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Chat minimized
            </div>
          )}
        </div>
      )}
    </div>
  );
}
