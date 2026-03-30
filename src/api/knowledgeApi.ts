import type {
  CodeTasks,
  TheoryQuestions,
  TheoryQuestionsResponse,
  Topic,
  TopicPreview,
} from '@/ts/interfaces';

import { api } from './axiosInstance';

export const getTopics = async (): Promise<Topic[]> => {
  const response = await api.get<Topic[]>('/knowledge/topics');
  return response.data;
};

export const getTopicPreview = async (topicId: string): Promise<TopicPreview> => {
  const response = await api.get<TopicPreview>(`/knowledge/topics/${topicId}/preview`);
  return response.data;
};

export const getTheoryQuestions = async (topicId: string): Promise<TheoryQuestions> => {
  const response = await api.get<TheoryQuestions>(`/knowledge/topics/${topicId}/questions`);
  return response.data;
};

export const postTheoryQuestions = async (
  topicId: string,
  questionId: string,
  selectedOptionIds: string[],
): Promise<TheoryQuestionsResponse> => {
  const response = await api.post<TheoryQuestionsResponse>(
    `/knowledge/topics/${topicId}/questions/attempts`,
    {
      attempts: [
        {
          questionId: questionId,
          selectedOptionIds: selectedOptionIds,
        },
      ],
    },
  );

  return response.data;
};

export const getCodeTasks = async (topicId: string): Promise<CodeTasks> => {
  const response = await api.get<CodeTasks>(`/knowledge/topics/${topicId}/code-tasks`);
  return response.data;
};
