"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GridGen;
var _react = _interopRequireDefault(require("react"));
var _perlinNoise = require("perlin-noise");
var _drei = require("@react-three/drei");
var _three = require("three");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* noiseMap = [{noiseMin,noiseMax,meshComponent. meshProps}]
noiseRanges={[
        { noiseMin: 0, noiseMax: 0.5, meshComponent: Box, meshProps: { args: [1, 1, 1] },
        { noiseMin: 0.5, noiseMax: 1, meshComponent: Sphere },
      ]}
      */
function GridGen(_ref) {
  let {
    noiseMap
  } = _ref;
  const noiseData = (0, _perlinNoise.generatePerlinNoise)(100, 100);
  const instancePositions = [];
  const instanceComponents = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const height = noiseData[i * 100 + j];
      for (const range of noiseMap) {
        if (height >= range.noiseMin && height <= range.noiseMax) {
          instancePositions.push(new _three.Vector3(i - 10, height * 10, j - 10));
          instanceComponents.push(range.meshComponent);
          break;
        }
      }
    }
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, instancePositions.map((position, index) => {
    const MeshComponent = instanceComponents[index];
    return /*#__PURE__*/_react.default.createElement(MeshComponent, {
      key: index,
      position: position
    });
  }));
}
;