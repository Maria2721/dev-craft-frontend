import axios from 'axios';
import { useEffect, useState } from 'react';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

import type { ApiError, TheoryQuestions } from '@/ts/interfaces';

import { getTheoryQuestions } from '@/api/knowledgeApi';

export const useTheoryQuestions = (topicId: string): TheoryQuestions | null => {
  const [questions, setQuestions] = useState<TheoryQuestions | null>(null);

  useEffect(() => {
    if (!topicId) return;

    const fetchQuestions = async () => {
      const toastId = toastLoading('Loading theory questions...');

      try {
        const data = await getTheoryQuestions(topicId);
        setQuestions(data);
        toastSuccess(toastId, 'Theory questions loaded successfully 🎉');
      } catch (error) {
        if (axios.isAxiosError<ApiError>(error)) {
          toastError(toastId, error.response?.data?.message || 'Failed to load theory questions');
        } else {
          toastError(toastId, 'Unexpected error occurred');
        }
      }
    };

    void fetchQuestions();
  }, [topicId]);

  return questions;
};
