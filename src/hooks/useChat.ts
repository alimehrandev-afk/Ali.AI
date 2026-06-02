'use client';

import { useEffect, useState } from 'react';
import { useChatStore } from '@/store';
import { apiClient } from '@/lib/api-client';
import { IConversation, IMessage } from '@/types';

export function useChat() {
  const { conversations, currentConversation, messages, setConversations, setCurrentConversation, setMessages, addMessage } = useChatStore();

  const fetchConversations = async () => {
    try {
      const response = await apiClient.get<any>('/chat/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const fetchConversation = async (conversationId: string) => {
    try {
      const response = await apiClient.get<any>(`/chat/conversations/${conversationId}`);
      setCurrentConversation(response.data);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
    }
  };

  const createConversation = async (title: string, model: string) => {
    try {
      const response = await apiClient.post<any>('/chat/conversations', { title, model });
      setCurrentConversation(response.data);
      setConversations([response.data, ...conversations]);
      return response.data;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentConversation) return;

    try {
      const response = await apiClient.post<any>('/chat/messages', {
        conversationId: currentConversation._id,
        content,
      });
      addMessage(response.data.userMessage);
      addMessage(response.data.assistantMessage);
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  return {
    conversations,
    currentConversation,
    messages,
    fetchConversations,
    fetchConversation,
    createConversation,
    sendMessage,
  };
}
