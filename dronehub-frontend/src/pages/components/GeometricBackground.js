import React from 'react';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
  0% { transform: translateY(0) }
  50% { transform: translateY(-20px) }
  100% { transform: translateY(0) }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #300048, #1c0030, #0a0018);
  overflow: hidden;
  z-index: -1;
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: ${move} 10s ease-in-out infinite;
`;

const Line = styled.div`
  position: absolute;
  width: 2px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  animation: ${rotate} 20s linear infinite;
`;

const circles = Array.from({ length: 10 });
const lines = Array.from({ length: 5 });

const GeometricBackground = () => {
  return (
    <Background>
      {circles.map((_, index) => (
        <Circle
          key={index}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            animationDuration: `${Math.random() * 10 + 5}s`,
          }}
        />
      ))}
      {lines.map((_, index) => (
        <Line
          key={index}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            height: `${Math.random() * 200 + 100}px`,
            animationDuration: `${Math.random() * 20 + 10}s`,
          }}
        />
      ))}
    </Background>
  );
};

export default GeometricBackground;
