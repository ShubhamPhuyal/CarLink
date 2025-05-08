import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  const loadingStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  return (
    <div style={loadingStyle}>
      <ReactLoading type="spin" color="#3498db" height={60} width={60} />
    </div>
  );
}
