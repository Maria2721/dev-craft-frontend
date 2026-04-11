import { useState } from 'react';

import type { TopicIdProps } from '@/ts/types';

import { useCodeTasks } from '@/hooks/useCodeTasks';
import { useCodeTasksAIAnswer } from '@/hooks/useCodeTasksAnswer';

import { CodeCard } from '../CodeCard/CodeCard';
import { Loader } from '../ui';
import styles from './CodeTasks.module.scss';

export const CodeTasks = ({ topicId }: TopicIdProps) => {
  const data = useCodeTasks(topicId);
  const { results, setResults, loadingIds, sendAnswer } = useCodeTasksAIAnswer();

  const [codes, setCodes] = useState<Record<string, string>>({});

  const handleCodeChange = (taskId: string, code: string) => {
    setResults((prev) => {
      const currentResult = prev[taskId];

      if (currentResult && !currentResult.isCorrect) {
        const newResults = { ...prev };
        delete newResults[taskId];
        return newResults;
      }

      return prev;
    });

    setCodes((prev) => ({
      ...prev,
      [taskId]: code,
    }));
  };

  if (!data) return <Loader size="lg" />;

  return (
    <div className={styles.wrapper}>
      {data.codeTasks.map((task) => (
        <CodeCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          taskType={task.taskType}
          referenceSolution={task.referenceSolution}
          code={codes[task.id] || ''}
          result={results[task.id]}
          loading={loadingIds[task.id]}
          onChange={(code: string) => handleCodeChange(task.id, code)}
          onSubmit={() =>
            void sendAnswer(topicId, task.id, codes[task.id] || '', task.referenceSolution)
          }
        />
      ))}
    </div>
  );
};
