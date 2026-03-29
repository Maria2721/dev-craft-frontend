import { useLocation, useSearchParams } from 'react-router-dom';

import { Container } from '@/components/Container/Container';
import { TheoryQuestions } from '@/components/TheoryQuestions/TheoryQuestions';
import { Button, Loader } from '@/components/ui';

import type { LocationState } from '@/ts/interfaces';
import type { TabType } from '@/ts/types';

import { useTopicPreview } from '@/hooks/useTopicPreview';

import styles from './TopicPage.module.scss';

export default function TopicPage() {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const topicId = state?.topicId;

  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab');

  const activeTab: TabType = tabParam === 'theory' || tabParam === 'code' ? tabParam : 'overview';

  const setTab = (tab: TabType) => {
    setSearchParams({ tab });
  };

  const data = useTopicPreview(topicId || '');

  if (!data) return <Loader size="lg" />;

  return (
    <Container>
      <div className={styles.header}>
        <h1>{data.topic.title}</h1>
        <p>Practice questions and improve your skills step by step</p>
      </div>

      <div className={styles.tabs}>
        <Button
          size="sm"
          variant="secondary"
          isActive={activeTab === 'overview'}
          onClick={() => setSearchParams({})}
        >
          Overview
        </Button>

        <Button
          size="sm"
          variant="secondary"
          isActive={activeTab === 'theory'}
          onClick={() => setTab('theory')}
        >
          Theory Questions
        </Button>

        <Button
          size="sm"
          variant="secondary"
          isActive={activeTab === 'code'}
          onClick={() => setTab('code')}
        >
          Code Tasks
        </Button>
      </div>

      {(!activeTab || activeTab === 'overview') && (
        <div className={styles.grid}>
          <div className={styles.card} onClick={() => setTab('theory')}>
            <h3>Theory Questions</h3>
            <ul>
              {data.questions.map((task) => (
                <li key={task.id}>{task.prompt}</li>
              ))}
            </ul>
          </div>

          <div className={styles.card} onClick={() => setTab('code')}>
            <h3>Code Tasks</h3>
            <ul>
              {data.codeTasks.map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'theory' && <TheoryQuestions topicId={data.topic.id} />}

      {activeTab === 'code' && <div className={styles.placeholder}>Code tasks loading...</div>}
    </Container>
  );
}
