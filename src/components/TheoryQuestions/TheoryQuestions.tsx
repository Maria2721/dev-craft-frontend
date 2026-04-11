import { useState } from 'react';

import type { TopicIdProps } from '@/ts/types';

import { useTheoryQuestions } from '@/hooks/useTheoryQuestions';
import { useTheoryQuestionsAnswer } from '@/hooks/useTheoryQuestionsAnswer';

import { QuestionCard } from '../QuestionCard/QuestionCard';
import { Loader } from '../ui';
import styles from './TheoryQuestions.module.scss';

export const TheoryQuestions = ({ topicId }: TopicIdProps) => {
  const data = useTheoryQuestions(topicId);
  const { results, setResults, loadingIds, sendAnswer } = useTheoryQuestionsAnswer();

  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleSelect = (questionId: string, optionId: string) => {
    setResults((prev) => {
      const currentResult = prev[questionId];

      if (currentResult && !currentResult.isCorrect) {
        const newResults = { ...prev };
        delete newResults[questionId];
        return newResults;
      }

      return prev;
    });

    setAnswers((prev) => {
      const current = prev[questionId] || [];

      const isSelected = current.includes(optionId);

      return {
        ...prev,
        [questionId]: isSelected ? current.filter((id) => id !== optionId) : [...current, optionId],
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
          result={results[question.id]}
          loading={loadingIds[question.id]}
          onCheck={() => void sendAnswer(topicId, question.id, answers[question.id] || [])}
        />
      ))}
    </div>
  );
};
