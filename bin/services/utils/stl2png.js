/**
 * @author jonaskello / https://github.com/jonaskello
 * Simple example that renders a scene with a cube to a PNG image file.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("babel-polyfill");

var THREE = require("three");
global.THREE = THREE;

require("./threejs-extras/STLLoader.js");
var SoftwareRenderer = require("./3D/software-renderer");
var PNG = require("pngjs").PNG;
var fs = require("fs");

// Build scene with cube
var width = 200;
var height = 200;

var STL2PNG = function () {
  function STL2PNG() {
    _classCallCheck(this, STL2PNG);
  }

  _createClass(STL2PNG, [{
    key: "getPNG",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(stl, name, orientation) {
        var date;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date().getTime();
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var scene = new THREE.Scene();
                  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                  var camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
                  switch (orientation) {
                    case 0:
                      camera.position.x = 10;
                      break;
                    case 1:
                      camera.position.y = -10;
                      break;
                    case 2:
                      camera.position.z = 10;
                      break;
                    case 3:
                      camera.position.x = 10;
                      camera.position.y = -10;
                      break;
                    default:

                  }
                  camera.lookAt(scene.position);

                  var loader = new THREE.STLLoader(),
                      geometry = loader.parse(stl);

                  geometry.computeVertexNormals();
                  geometry.computeBoundingSphere();
                  geometry.computeBoundingBox();
                  geometry.center();

                  var mesh = new THREE.Mesh(geometry, material);

                  scene.add(mesh);

                  var fov = camera.fov * (Math.PI / 180);
                  var distance = Math.abs(geometry.boundingSphere.radius / Math.sin(fov / 2));
                  var newPosition = camera.position.clone().normalize().multiplyScalar(distance);
                  camera.position.set(newPosition.x, newPosition.y, newPosition.z);
                  camera.needsUpdate = true;
                  camera.updateProjectionMatrix();
                  switch (orientation) {
                    case 0:
                      camera.rotation.x = 90 * Math.PI / 180;
                      break;
                    case 1:
                      break;
                    case 2:
                      break;
                    case 3:
                      camera.rotation.z = 0;
                      break;
                    default:
                  }

                  var renderer = new SoftwareRenderer();
                  renderer.setSize(width, height);
                  var imagedata = renderer.render(scene, camera);

                  // Create a PNG from the pixels array (RGBA)
                  var png = new PNG({
                    width: width,
                    height: height,
                    filterType: -1
                  });

                  for (var i = 0; i < imagedata.data.length; i++) {
                    png.data[i] = imagedata.data[i];
                  }
                  //console.log(png.data);
                  console.log("rendered in", new Date().getTime() - date);

                  if (!fs.existsSync("temp")) {
                    fs.mkdirSync("temp");
                  }
                  png.pack().pipe(fs.createWriteStream("temp/example.png"));
                  var buffer = PNG.sync.write(png);

                  if (!fs.existsSync("temp")) {
                    fs.mkdirSync("temp");
                  }
                  var buffer = PNG.sync.write(png);
                  fs.writeFile("temp/" + name + "_" + orientation + ".png", buffer);

                  return resolve(buffer);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPNG(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return getPNG;
    }()
  }]);

  return STL2PNG;
}();

exports.default = STL2PNG;