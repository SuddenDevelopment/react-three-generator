import React from 'react';
import { generatePerlinNoise } from 'perlin-noise';
import { Box, Wireframe } from '@react-three/drei';
import { Vector3 } from 'three';

export default function GridGen(){
  const noiseData = generatePerlinNoise(100, 100);
  const boxes = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const height = noiseData[i * 100 + j];
      boxes.push(
      <Box position={new Vector3(i - 10, height * 10, j - 10)} key={`${i}-${j}`}>
        <Wireframe stroke={"#ff0000"}/>
      </Box>);
    }
  }
  return <>{boxes}</>;
};