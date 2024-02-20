import React from 'react';
import { generatePerlinNoise } from 'perlin-noise';
import { Wireframe } from '@react-three/drei';
import { Vector3 } from 'three';
import { Instances } from '@react-three/drei';

/* noiseMap = [{noiseMin,noiseMax,meshComponent. meshProps}]
noiseMap={[
        { noiseMin: 0, noiseMax: 0.5, meshComponent: Box, meshProps: { args: [1, 1, 1] },
        { noiseMin: 0.5, noiseMax: 1, meshComponent: Sphere },
      ]}
      */
export default function GridGen({ noiseMap }) {
  const noiseData = generatePerlinNoise(100, 100);
  const instancePositions = [];
  const instanceComponents = [];

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const height = noiseData[i * 100 + j];
      for (const range of noiseMap) {
        if (height >= range.noiseMin && height <= range.noiseMax) {
          instancePositions.push(new Vector3(i - 10, height * 10, j - 10));
          instanceComponents.push(range.meshComponent);
          break;
        }
      }
    }
  }

  return (
    <>
      {instancePositions.map((position, index) => {
        const MeshComponent = instanceComponents[index];
        return (
          <MeshComponent key={index} position={position}/>
        );
      })}
    </>
  );
};