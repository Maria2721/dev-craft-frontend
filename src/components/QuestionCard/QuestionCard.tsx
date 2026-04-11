import clsx from 'clsx';

import type { QuestionCardProps } from '@/ts/interfaces';

import { Button } from '../ui';
import styles from './QuestionCard.module.scss';

export const QuestionCard = ({
  prompt,
  codeSnippet,
  options,
  selectedAnswers,
  onSelect,
  result,
  loading,
  onCheck,
}: QuestionCardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.question}>{prompt}</p>

      {codeSnippet && (
        <pre className={styles.code}>
          <code>{codeSnippet}</code>
        </pre>
      )}

      <p className={styles.hint}>Select one or more options</p>

      <ul className={styles.options}>
        {options.map((option) => {
          const isSelected = selectedAnswers.includes(option.id);
          const isCorrectAnswer = result?.isCorrect;

          return (
            <li
              key={option.id}
              className={clsx(styles.option, {
                [styles.selected]: isSelected,
                [styles.correct]: result && isSelected && isCorrectAnswer,
                [styles.wrong]: result && isSelected && !isCorrectAnswer,
              })}
              onClick={() => onSelect(option.id)}
            >
              <span className={styles.label}>{option.label}</span>
              <span>{option.text}</span>
            </li>
          );
        })}
      </ul>

      <div className={styles.actions}>
        <Button
          onClick={onCheck}
          disabled={!selectedAnswers.length || result?.isCorrect || loading}
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
          </span>
        )}
      </div>
    </div>
  );
};
