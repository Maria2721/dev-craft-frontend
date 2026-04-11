import Editor from '@monaco-editor/react';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { CodeCardProps } from '@/ts/interfaces';

import { DragDropCode } from '../DragDropCode/DragDropCode';
import { Button } from '../ui';
import styles from './CodeCard.module.scss';

export const CodeCard = ({
  title,
  description,
  taskType,
  referenceSolution,
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

      <p className={styles.hint}>
        {taskType === 'AI_CHECK'
          ? 'Write your version of the code in the editor'
          : 'Drag the blocks and arrange them in the correct order'}
      </p>

      <div
        className={clsx(styles.editorBlock, {
          [styles.correct]: result && result?.isCorrect,
          [styles.wrong]: result && !result?.isCorrect,
        })}
      >
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
            referenceSolution && (
              <DragDropCode referenceSolution={referenceSolution} onChange={onChange} />
            )
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
