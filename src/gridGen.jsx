import React from 'react';
import FastNoiseLite from "fastnoise-lite";
import { Vector3 } from 'three';
import { Instances } from '@react-three/drei';

/* noiseMap = [{noiseMin,noiseMax,meshComponent. meshProps}]
noiseMap={[
        { noiseMin: 0, noiseMax: 0.5, meshComponent: Box, meshProps: { args: [1, 1, 1] },
        { noiseMin: 0.5, noiseMax: 1, meshComponent: Sphere },
      ]}
      */
export default function GridGen({ noiseMap }) {
  let noise = new FastNoiseLite();
  noise.SetNoiseType(FastNoiseLite.NoiseType.Perlin);
  const instancePositions = [];
  const instanceComponents = [];

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const noiseValue = noise.GetNoise(i*10, j*10);
      for (const range of noiseMap) {
        if (noiseValue >= range.noiseMin && noiseValue <= range.noiseMax) {
          instancePositions.push(new Vector3(i, noiseValue * 10, j ));
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