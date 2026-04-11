import axios from 'axios';
import { useState } from 'react';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

import type { ApiError, QuestionResult } from '@/ts/interfaces';

import { postTheoryQuestions } from '@/api/knowledgeApi';

export const useTheoryQuestionsAnswer = () => {
  const [results, setResults] = useState<Record<string, QuestionResult>>({});
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  const sendAnswer = async (topicId: string, questionId: string, selectedOptionIds: string[]) => {
    const toastId = toastLoading('Sending response...');

    setLoadingIds((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    try {
      const response = await postTheoryQuestions(topicId, questionId, selectedOptionIds);

      const question = response.results.find((el) => el.questionId === questionId);

      if (!question) return;

      if (question.isCorrect) {
        toastSuccess(toastId, 'Your answer is correct');
      } else {
        toastError(toastId, 'Your answer is incorrect');
      }

      setResults((prev) => ({
        ...prev,
        [questionId]: {
          isCorrect: question.isCorrect,
          correctOptionIds: question.correctOptionIds,
        },
      }));
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        toastError(toastId, error.response?.data?.message || 'Error checking answer');
      } else {
        toastError(toastId, 'Unexpected error occurred');
      }
    } finally {
      setLoadingIds((prev) => ({
        ...prev,
        [questionId]: false,
      }));
    }
  };

  return {
    results,
    setResults,
    loadingIds,
    sendAnswer,
  };
};
