import axios from 'axios';
import { useState } from 'react';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

import type { ApiError, CodeTasksResult } from '@/ts/interfaces';

import { postCodeTasksAI, postCodeTasksDragDrop } from '@/api/knowledgeApi';

export const useCodeTasksAIAnswer = () => {
  const [results, setResults] = useState<Record<string, CodeTasksResult>>({});
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  const sendAnswer = async (
    topicId: string,
    codeTaskId: string,
    code: string,
    referenceSolution: string,
  ) => {
    const toastId = toastLoading('Sending response...');

    setLoadingIds((prev) => ({
      ...prev,
      [codeTaskId]: true,
    }));

    try {
      let response;

      if (referenceSolution) {
        response = await postCodeTasksDragDrop(topicId, codeTaskId, code);
      } else {
        response = await postCodeTasksAI(topicId, codeTaskId, code);
      }

      if (response.valid) {
        toastSuccess(toastId, 'Your answer is correct');
      } else {
        toastError(toastId, 'Your answer is incorrect');
      }

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
