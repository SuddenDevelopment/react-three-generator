"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GridGen;
var _react = _interopRequireDefault(require("react"));
var _fastnoiseLite = _interopRequireDefault(require("fastnoise-lite"));
var _three = require("three");
var _drei = require("@react-three/drei");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* noiseMap = [{noiseMin,noiseMax,meshComponent. meshProps}]
noiseMap={[
        { noiseMin: 0, noiseMax: 0.5, meshComponent: Box, meshProps: { args: [1, 1, 1] },
        { noiseMin: 0.5, noiseMax: 1, meshComponent: Sphere },
      ]}
      */
function GridGen(_ref) {
  let {
    noiseMap
  } = _ref;
  let noise = new _fastnoiseLite.default();
  noise.SetNoiseType(_fastnoiseLite.default.NoiseType.Perlin);
  const instancePositions = [];
  const instanceComponents = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const noiseValue = noise.GetNoise(i * 10, j * 10);
      for (const range of noiseMap) {
        if (noiseValue >= range.noiseMin && noiseValue <= range.noiseMax) {
          instancePositions.push(new _three.Vector3(i, noiseValue * 10, j));
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