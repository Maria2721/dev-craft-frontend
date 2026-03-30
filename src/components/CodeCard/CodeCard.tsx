import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { CodeCardProps } from '@/ts/interfaces';

import styles from './CodeCard.module.scss';

export const CodeCard = ({ title, description, taskType }: CodeCardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <div className={styles.description}>
        <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
      </div>

      <div className={styles.content}>
        {taskType === 'AI_CHECK' ? 'Monaco Editor' : 'Drag & Drop'}
      </div>
    </div>
  );
};
