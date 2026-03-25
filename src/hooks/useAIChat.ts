import axios from 'axios';
import { useState } from 'react';

import type { AIMessage, ApiError } from '@/ts/interfaces';

import { sendMessageAI } from '@/api/aiApi';

export const useAIChat = () => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const sendMessage = async (text: string, userId?: string) => {
    if (!text.trim()) return;

    const now = new Date().toISOString();

    const userMessage: AIMessage = {
      role: 'user',
      text,
      id: userId ?? crypto.randomUUID(),
      createdAt: now,
    };
    setMessages((prev) => [...prev, userMessage]);

    const typingMessageId = crypto.randomUUID();
    const typingMessage: AIMessage = {
      role: 'ai',
      text: 'AI is typing',
      id: typingMessageId,
    };
    setMessages((prev) => [...prev, typingMessage]);

    setLoading(true);

    try {
      const response = await sendMessageAI({
        message: text,
        ...(conversationId && { conversationId }),
      });

      setConversationId(response.conversationId);

      const now = new Date().toISOString();

      const aiMessage: AIMessage = {
        role: 'ai',
        text: response.reply,
        id: response.messageId,
        createdAt: now,
      };

      setMessages((prev) => prev.map((msg) => (msg.id === typingMessageId ? aiMessage : msg)));
    } catch (error) {
      let errorText = 'Unexpected error occurred';

      if (axios.isAxiosError<ApiError>(error)) {
        errorText = error.response?.data?.message || 'Sending request failed';
      }

      setMessages((prev) =>
        prev.map((msg) => (msg.id === typingMessageId ? { ...msg, text: errorText } : msg)),
      );
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  return {
    messages,
    loading,
    sendMessage,
    resetChat,
  };
};
