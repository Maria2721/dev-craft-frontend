import axios from 'axios';
import { useEffect, useState } from 'react';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

import type { ApiError, TopicPreview } from '@/ts/interfaces';

import { getTopicPreview } from '@/api/knowledgeApi';

export const useTopicPreview = (topicId: string): TopicPreview | null => {
  const [topic, setTopic] = useState<TopicPreview | null>(null);

  useEffect(() => {
    if (!topicId) return;

    const fetchTopic = async () => {
      const toastId = toastLoading('Loading topic...');

      try {
        const data = await getTopicPreview(topicId);
        setTopic(data);
        toastSuccess(toastId, 'Topic loaded successfully 🎉');
      } catch (error) {
        if (axios.isAxiosError<ApiError>(error)) {
          toastError(toastId, error.response?.data?.message || 'Failed to load topic');
        } else {
          toastError(toastId, 'Unexpected error occurred');
        }
      }
    };

    void fetchTopic();
  }, [topicId]);

  return topic;
};
