import { type Edge, type Node } from '@xyflow/react';

import type { Topic, TopicNodeData } from '@/ts/interfaces';

const NODE_POSITION_RIGHT = 300;
const NODE_POSITION_LEFT = 0;
const NODE_VERTICAL_GAP = 150;

const getMapTranslateExtent = (nodesCount: number) => {
  if (nodesCount === 0) {
    return undefined;
  }

  const maxY = nodesCount * NODE_VERTICAL_GAP;

  return [
    [-Infinity, -20],
    [Infinity, maxY],
  ] as [[number, number], [number, number]];
};

const createNodes = (topics: Topic[]): Node<TopicNodeData>[] => {
  return topics.map((topic, index) => ({
    id: topic.id,
    position: {
      x: index % 2 === 0 ? NODE_POSITION_RIGHT : NODE_POSITION_LEFT,
      y: index * NODE_VERTICAL_GAP,
    },
    data: {
      label: topic.title,
      topicId: topic.id,
      title: topic.title,
      slug: topic.slug,
    },
  }));
};

const createEdges = (topics: Topic[]): Edge[] => {
  return topics.slice(0, -1).map((topic, index) => ({
    id: `${topic.id}-->${topics[index + 1].id}`,
    source: topic.id,
    target: topics[index + 1].id,
    style: { stroke: '#3772ff', strokeWidth: 2 },
    animated: true,
    type: 'smoothstep',
  }));
};

export { createEdges, createNodes, getMapTranslateExtent };
