import type { Topic, TopicPreview } from '@/ts/interfaces';

import { api } from './axiosInstance';

export const getTopics = async (): Promise<Topic[]> => {
  const response = await api.get<Topic[]>('/knowledge/topics');
  return response.data;
};

export const getTopicPreview = async (topicId: string): Promise<TopicPreview> => {
  const response = await api.get<TopicPreview>(`/knowledge/topics/${topicId}/preview`);
  return response.data;
};
