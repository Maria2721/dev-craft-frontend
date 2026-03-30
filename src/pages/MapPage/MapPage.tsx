import '@xyflow/react/dist/style.css';

import { ReactFlow } from '@xyflow/react';

const Nodes = [
  {
    id: 'html',
    position: { x: 240, y: 40 },
    data: { label: 'HTML' },
  },
  {
    id: 'css',
    position: { x: 0, y: 180 },
    data: { label: 'CSS' },
  },
  {
    id: 'javascript',
    position: { x: 120, y: 320 },
    data: { label: 'JavaScript' },
  },
];

const Edges = [
  {
    id: 'html-css',
    source: 'html',
    target: 'css',
    style: { stroke: '#3772ff', strokeWidth: 2 },
    animated: true,
  },
  { id: 'css-javascript', source: 'css', target: 'javascript' },
];

export default function MapPage() {
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
        <ReactFlow nodes={Nodes} edges={Edges}></ReactFlow>
      </div>
    </section>
  );
}
