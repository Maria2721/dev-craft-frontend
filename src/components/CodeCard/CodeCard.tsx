import Editor from '@monaco-editor/react';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { CodeCardProps } from '@/ts/interfaces';

import { Button } from '../ui';
import styles from './CodeCard.module.scss';

export const CodeCard = ({
  title,
  description,
  taskType,
  code,
  result,
  loading,
  onChange,
  onSubmit,
}: CodeCardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <div className={styles.description}>
        <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
      </div>

      <div className={styles.editorBlock}>
        <div className={styles.editorContent}>
          {taskType === 'AI_CHECK' ? (
            <Editor
              height="300px"
              language="javascript"
              value={code}
              onChange={(value) => onChange(value || '')}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
              }}
            />
          ) : (
            'Drag & Drop'
          )}
        </div>

        <div className={styles.editorFooter}>
          <Button
            onClick={onSubmit}
            disabled={!code.length || result?.isCorrect || loading}
            variant="primary"
            size="sm"
          >
            {loading ? 'Loading' : 'Check'}
          </Button>

          {result && (
            <span
              className={clsx(styles.result, {
                [styles.success]: result.isCorrect,
                [styles.error]: !result.isCorrect,
              })}
            >
              {result.isCorrect ? 'Correct' : 'Incorrect'}
              {result.hints && `: ${result.hints}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
