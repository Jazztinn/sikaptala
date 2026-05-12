import React from 'react';

export default function RemovedTabScreen({ title }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{title}</h2>
      <p>This screen has been removed.</p>
    </div>
  );
}
