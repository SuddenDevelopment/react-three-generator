# React Three Generator

INPIRED BY: https://jeff-beene.com/portfolio/synthcity/

## Install

```bash npm install react-three-generator```

## Usage

```javascript
    import { GridGen } from 'react-three-generator';
    ...
    function R3fScene() {
    return (
        <Canvas style={{height:'100%',width:'100%'}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <GridGen />
            <OrbitControls />
        </Canvas>
    );
}
```

## References

- https://github.com/IceCreamYou/THREE.Terrain
- 