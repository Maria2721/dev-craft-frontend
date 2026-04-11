import axios from 'axios';
import { useState } from 'react';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

import type { ApiError, CodeTasksAIResult } from '@/ts/interfaces';

import { postCodeTasksAI } from '@/api/knowledgeApi';

export const useCodeTasksAIAnswer = () => {
  const [results, setResults] = useState<Record<string, CodeTasksAIResult>>({});
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  const sendAnswer = async (topicId: string, codeTaskId: string, code: string) => {
    const toastId = toastLoading('Sending response...');

    setLoadingIds((prev) => ({
      ...prev,
      [codeTaskId]: true,
    }));

    try {
      const response = await postCodeTasksAI(topicId, codeTaskId, code);

      toastSuccess(toastId, 'The answer has been verified');

      setResults((prev) => ({
        ...prev,
        [codeTaskId]: {
          isCorrect: response.valid,
          hints: response.hints,
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
        [codeTaskId]: false,
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
