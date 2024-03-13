"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _fastnoiseLite = _interopRequireDefault(require("fastnoise-lite"));
var _three = require("three");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// https://www.npmjs.com/package/fastnoise-lite

/* 
TODO:
- optional plane from noiseMap, apply material to it

*/
/* noiseMap = [{noiseMin,noiseMax,meshComponent. meshProps}]
noiseMap={[
        { noiseMin: 0, noiseMax: 0.5, probability: 0.5, meshComponent: Box, rotation: [0,0,0]},
        { noiseMin: 0.5, noiseMax: 1, probability: 1, meshComponent: Sphere, scale: 0.5, noiseHeight:1 }
      ]}
      */
const GridGen = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    noiseMap,
    newRange = {
      x: [0, 100],
      y: [0, 100],
      z: [0, 100]
    },
    noiseSettings = {
      NoiseType: _fastnoiseLite.default.NoiseType.Perlin,
      Seed: 0,
      Frequency: 0.01
    }
  } = _ref;
  const noise = new _fastnoiseLite.default();
  const setNoise = () => {
    //apply all of the noise settings given
    for (const strSetting of Object.keys(noiseSettings)) {
      const methodName = "Set".concat(strSetting);
      if (typeof noise[methodName] === 'function') {
        noise[methodName](noiseSettings[strSetting]);
      } else {
        console.warn("No method ".concat(methodName, " on noise object"));
      }
    }
  };
  const testProbability = function testProbability(fltProbabiltiy) {
    return Math.random() <= fltProbabiltiy;
  };
  const degreesToRadians = function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  };
  const getRotation = function getRotation(intRotate) {
    if (intRotate === 0) return 0;
    const intRotateMax = 360 / intRotate;
    const intRandom = Math.floor(Math.random() * intRotateMax);
    return degreesToRadians(intRandom * intRotate);
  };
  const getScale = function getScale(fltScale) {
    if (!fltScale) return 1;
    // get a random number between 1-fltscale and 1+fltscale
    const fltRandom = Math.random() * fltScale;
    return 1 - fltRandom;
  };
  const addRange = function addRange(objRange) {
    //{ x:[0,100], y:[0,100], z:[0,100]}
    setInstances(prevInstances => [...prevInstances, ...getInstances(objRange)]);
  };
  const removeRange = function removeRange(objRange) {
    //{ x:[0,100], y:[0,100], z:[0,100]}
    setInstances(prevInstances => prevInstances.filter(instance => {
      return !(instance.position.x >= objRange.x[0] && instance.position.x <= objRange.x[1] && instance.position.y >= objRange.y[0] && instance.position.y <= objRange.y[1] && instance.position.z >= objRange.z[0] && instance.position.z <= objRange.z[1]);
    }));
  };
  const getInstances = objRange => {
    let arrNewInstances = [];
    for (let x = objRange['x'][0]; x < objRange['x'][1]; x++) {
      for (let z = objRange['z'][0]; z < objRange['z'][1]; z++) {
        //const height = noiseData[i * 100 + j];
        const noiseValue = noise.GetNoise(x * 10, z * 10);
        for (const range of noiseMap) {
          if (range.probability && !testProbability(range.probability)) {
            continue;
          }
          const intNoiseHeight = range.noiseHeight ? range.noiseHeight : 10;
          if (noiseValue >= range.noiseMin && noiseValue <= range.noiseMax) {
            if (!range.rotation) range.rotation = 0;
            const uuid = _three.MathUtils.generateUUID();
            arrNewInstances.push({
              id: uuid,
              meshComponent: range.meshComponent,
              position: new _three.Vector3(x, noiseValue * intNoiseHeight, z),
              rotation: [0, getRotation(range.rotation), 0],
              scale: getScale(range.scale)
            });
          }
        }
      }
    }
    return arrNewInstances;
  };
  GridGen.displayName = 'GridGen';
  const [arrInstances, setInstances] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    // update the instances map anytime the inputs change
    // it can be used to create the first instances then update the genRange to add new instances
    setNoise();
    setInstances(prevInstances => [...prevInstances, ...getInstances(newRange)]);
  }, []);
  (0, _react.useImperativeHandle)(ref, () => ({
    addRange,
    removeRange,
    noise
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, arrInstances.map(instance => {
    const MeshComponent = instance.meshComponent;
    return /*#__PURE__*/_react.default.createElement(MeshComponent, {
      key: instance.id,
      position: instance.position,
      rotation: instance.rotation,
      scale: [instance.scale, instance.scale, instance.scale]
    });
  }));
});
var _default = exports.default = GridGen;