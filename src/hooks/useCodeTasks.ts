import axios from 'axios';
import { useEffect, useState } from 'react';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

import type { ApiError, CodeTasks } from '@/ts/interfaces';

import { getCodeTasks } from '@/api/knowledgeApi';

export const useCodeTasks = (topicId: string): CodeTasks | null => {
  const [codeTasks, setCodeTasks] = useState<CodeTasks | null>(null);

  useEffect(() => {
    if (!topicId) return;

    const fetchCodeTasks = async () => {
      const toastId = toastLoading('Loading code tasks...');

      try {
        const data = await getCodeTasks(topicId);
        setCodeTasks(data);
        toastSuccess(toastId, 'Code tasks loaded successfully 🎉');
      } catch (error) {
        if (axios.isAxiosError<ApiError>(error)) {
          toastError(toastId, error.response?.data?.message || 'Failed to load code tasks');
        } else {
          toastError(toastId, 'Unexpected error occurred');
        }
      }
    };

    void fetchCodeTasks();
  }, [topicId]);

  return codeTasks;
};
