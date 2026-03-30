import '@xyflow/react/dist/style.css';

import { type Node, ReactFlow } from '@xyflow/react';
import { type MouseEvent } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { useTopics } from '@/hooks/useTopics';

import { ROUTES } from '@/constants';

import { createEdges, createNodes } from './mapFlow';

export default function MapPage() {
  const topics = useTopics();

  const navigate = useNavigate();

  const nodes = createNodes(topics);
  const edges = createEdges(topics);

  const handleNodeClick = (_event: MouseEvent, node: Node) => {
    const topic = topics.find((item) => item.id === node.id);

    if (!topic) {
      return;
    }

    const path = generatePath(ROUTES.TOPIC, { slug: topic.slug });

    void navigate(path, { state: { topicId: topic.id } });
  };

  return (
    <section>
      <h1>Knowledge Map</h1>
      <div
        style={{
          width: '100%',
          height: '500px',
          marginTop: '20px',
          padding: '16px',
          border: '2px solid #000',
        }}
      >
        <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
      </div>
    </section>
  );
}
