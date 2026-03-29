import clsx from 'clsx';

import type { QuestionCardProps } from '@/ts/interfaces';

import styles from './QuestionCard.module.scss';

export const QuestionCard = ({
  prompt,
  codeSnippet,
  options,
  selectedAnswers,
  onSelect,
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

          return (
            <li
              key={option.id}
              className={clsx(styles.option, {
                [styles.selected]: isSelected,
              })}
              onClick={() => onSelect(option.id)}
            >
              <span className={styles.label}>{option.label}</span>
              <span>{option.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
