import clsx from 'clsx';
import { useState } from 'react';

import type { TheoryQuestionsProps } from '@/ts/types';

import { useTheoryQuestions } from '@/hooks/useTheoryQuestions';

import { Loader } from '../ui';
import styles from './TheoryQuestions.module.scss';

export const TheoryQuestions = ({ topicId }: TheoryQuestionsProps) => {
  const data = useTheoryQuestions(topicId);

  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  if (!data) return <Loader size="lg" />;

  const handleSelect = (taskId: string, optionId: string) => {
    setAnswers((prev) => {
      const current = prev[taskId] || [];

      const isSelected = current.includes(optionId);

      return {
        ...prev,
        [taskId]: isSelected ? current.filter((id) => id !== optionId) : [...current, optionId],
      };
    });
  };

  return (
    <div className={styles.wrapper}>
      {data.questions.map((task) => (
        <div key={task.id} className={styles.card}>
          <p className={styles.question}>{task.prompt}</p>

          {task.codeSnippet && (
            <pre className={styles.code}>
              <code>{task.codeSnippet}</code>
            </pre>
          )}

          <p className={styles.hint}>Select one or more options</p>

          <ul className={styles.options}>
            {task.options.map((option) => {
              const isSelected = answers[task.id]?.includes(option.id);

              return (
                <li
                  key={option.id}
                  className={clsx(styles.option, {
                    [styles.selected]: isSelected,
                  })}
                  onClick={() => handleSelect(task.id, option.id)}
                >
                  <span className={styles.label}>{option.label}</span>
                  <span>{option.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
