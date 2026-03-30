import '@xyflow/react/dist/style.css';

import { type Node, PanOnScrollMode, ReactFlow } from '@xyflow/react';
import { type MouseEvent } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { Container } from '@/components/Container/Container';

import type { TopicNodeData } from '@/ts/interfaces';

import { useTopics } from '@/hooks/useTopics';

import { ROUTES } from '@/constants';

import { createEdges, createNodes, getMapTranslateExtent } from './mapFlow';
import styles from './MapPage.module.scss';

export default function MapPage() {
  const topics = useTopics();
  const navigate = useNavigate();

  const nodes = createNodes(topics);
  const edges = createEdges(topics);
  const translateExtent = getMapTranslateExtent(nodes.length);

  const handleNodeClick = (_event: MouseEvent, node: Node<TopicNodeData>) => {
    const path = generatePath(ROUTES.TOPIC, { slug: node.data.slug });

    void navigate(path, { state: { topicId: node.data.topicId } });
  };

  return (
    <Container>
      <section className={styles.mapPage}>
        <h1>Knowledge Map</h1>

        <div className={styles.flowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={1}
            maxZoom={1.5}
            nodesDraggable={false}
            nodesConnectable={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnDrag={false}
            panOnScroll
            panOnScrollMode={PanOnScrollMode.Vertical}
            translateExtent={translateExtent}
          />
        </div>
      </section>
    </Container>
  );
}
