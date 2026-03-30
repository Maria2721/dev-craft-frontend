import { type Edge, type Node } from '@xyflow/react';

import type { Topic } from '@/ts/interfaces';

const NODE_POSITION_RIGHT = 200;
const NODE_POSITION_LEFT = 0;
const NODE_VERTICAL_GAP = 100;

const createNodes = (topics: Topic[]): Node[] => {
  return topics.map((topic, index) => ({
    id: topic.id,
    position: {
      x: index % 2 === 0 ? NODE_POSITION_RIGHT : NODE_POSITION_LEFT,
      y: index * NODE_VERTICAL_GAP,
    },
    data: { label: topic.title },
  }));
};

const createEdges = (topics: Topic[]): Edge[] => {
  return topics.slice(0, -1).map((topic, index) => ({
    id: `${topic.id}-->${topics[index + 1].id}`,
    source: topic.id,
    target: topics[index + 1].id,
    style: { stroke: '#3772ff', strokeWidth: 2 },
    animated: true,
  }));
};

export { createEdges, createNodes };
