import axios from 'axios';
import { useEffect, useState } from 'react';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

import type { ApiError, Topic } from '@/ts/interfaces';

import { getTopics } from '@/api/knowledgeApi';

export const useTopics = (): Topic[] => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const toastId = toastLoading('Loading topics...');

      try {
        const data = await getTopics();
        setTopics(data);
        toastSuccess(toastId, 'Topics loaded successfully 🎉');
      } catch (error) {
        if (axios.isAxiosError<ApiError>(error)) {
          toastError(toastId, error.response?.data?.message || 'Failed to load topics');
        } else {
          toastError(toastId, 'Unexpected error occurred');
        }
      }
    };

    void fetchTopics();
  }, []);

  return topics;
};
