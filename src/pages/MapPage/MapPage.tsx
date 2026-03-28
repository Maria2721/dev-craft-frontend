import { useNavigate } from 'react-router-dom';

import { useTopics } from '@/hooks/useTopics';

export default function MapPage() {
  const topics = useTopics();
  const navigate = useNavigate();

  const openTopic = (topicId: string, slug: string) => {
    void navigate(`/topics/${slug}`, { state: { topicId } });
  };

  return (
    <div>
      <h1>Map Page</h1>

      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <button onClick={() => openTopic(topic.id, topic.slug)}>{topic.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
