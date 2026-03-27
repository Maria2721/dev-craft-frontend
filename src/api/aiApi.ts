import type { AIChatRequest, AIChatResponse } from '@/ts/interfaces';

import { api } from './axiosInstance';

export const sendMessageAI = async (data: AIChatRequest): Promise<AIChatResponse> => {
  const response = await api.post<AIChatResponse>('/ai/chat', {
    message: data.message,
    ...(data.conversationId && { conversationId: data.conversationId }),
  });

  return response.data;
};
