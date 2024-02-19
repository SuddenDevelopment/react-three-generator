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
function GridGen() {
  const noiseData = (0, _perlinNoise.generatePerlinNoise)(100, 100);
  const boxes = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const height = noiseData[i * 100 + j];
      boxes.push( /*#__PURE__*/_react.default.createElement(_drei.Box, {
        position: new _three.Vector3(i - 10, height * 10, j - 10),
        key: "".concat(i, "-").concat(j)
      }, /*#__PURE__*/_react.default.createElement(_drei.Wireframe, {
        stroke: "#ff0000"
      })));
    }
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, boxes);
}
;