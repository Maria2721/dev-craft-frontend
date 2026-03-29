import { useState } from 'react';

import type { TheoryQuestionsProps } from '@/ts/types';

import { useTheoryQuestions } from '@/hooks/useTheoryQuestions';

import { QuestionCard } from '../QuestionCard/QuestionCard';
import { Loader } from '../ui';
import styles from './TheoryQuestions.module.scss';

export const TheoryQuestions = ({ topicId }: TheoryQuestionsProps) => {
  const data = useTheoryQuestions(topicId);

  const [answers, setAnswers] = useState<Record<string, string[]>>({});

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

  if (!data) return <Loader size="lg" />;

  return (
    <div className={styles.wrapper}>
      {data.questions.map((question) => (
        <QuestionCard
          key={question.id}
          id={question.id}
          prompt={question.prompt}
          {...(question.codeSnippet && { codeSnippet: question.codeSnippet })}
          options={question.options}
          selectedAnswers={answers[question.id] || []}
          onSelect={(optionId) => handleSelect(question.id, optionId)}
        />
      ))}
    </div>
  );
};
