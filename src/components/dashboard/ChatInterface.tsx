'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Send, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { SyntaxHighlighter } from 'react-syntax-highlighter';

export function ChatInterface() {
  const { currentConversation, messages, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !currentConversation || isLoading) return;

    setIsLoading(true);
    const userMessage = input;
    setInput('');

    try {
      await sendMessage(userMessage);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentConversation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full flex items-center justify-center bg-dark-950"
      >
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
            <Plus size={40} className="text-primary-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Conversation</h2>
          <p className="text-dark-400 mb-6">
            Create a new conversation to start chatting with AI.
          </p>
          <Button>Start Chatting</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-dark-950">
      {/* Header */}
      <div className="border-b border-dark-800 p-4">
        <h1 className="text-xl font-bold text-white">{currentConversation.title}</h1>
        <p className="text-sm text-dark-400 mt-1">Model: {currentConversation.model}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-dark-400">
              <p>No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-100 border border-dark-700'
                }`}
              >
                {message.contentType === 'markdown' ? (
                  <div className="prose prose-invert max-w-none">
                    <Markdown>{message.content}</Markdown>
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-dark-800 p-4 bg-dark-900">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            isLoading={isLoading}
            disabled={!input.trim() || isLoading}
            className="gap-2"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
