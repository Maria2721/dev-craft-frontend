import type { TopicIdProps } from '@/ts/types';

import { useCodeTasks } from '@/hooks/useCodeTasks';

import { CodeCard } from '../CodeCard/CodeCard';
import { Loader } from '../ui';
import styles from './CodeTasks.module.scss';

export const CodeTasks = ({ topicId }: TopicIdProps) => {
  const data = useCodeTasks(topicId);

  if (!data) return <Loader size="lg" />;

  return (
    <div className={styles.wrapper}>
      {data.codeTasks.map((task) => (
        <CodeCard
          key={task.id}
          title={task.title}
          description={task.description}
          taskType={task.taskType}
        />
      ))}
    </div>
  );
};
