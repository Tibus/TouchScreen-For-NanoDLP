/**
 * @author jonaskello / https://github.com/jonaskello
 * Simple example that renders a scene with a cube to a PNG image file.
 */
'use strict';
require("babel-polyfill");

const THREE = require("three");
global.THREE = THREE;

require("./threejs-extras/STLLoader.js");
const SoftwareRenderer = require("./3D/software-renderer");
const PNG = require("pngjs").PNG;
const fs = require("fs");

// Build scene with cube
const width = 200;
const height = 200;


export default class STL2PNG {
  constructor() {
    
  }
  
  
  async getPNG(stl, name, orientation){
    var date = new Date().getTime();

    return new Promise(function(resolve, reject) {
      const scene = new THREE.Scene();
      const material = new THREE.MeshBasicMaterial({color: 0xffffff});
      const camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
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
      
      var mesh = new THREE.Mesh( geometry, material );
      
      scene.add( mesh );
      
      var fov = camera.fov * ( Math.PI / 180 ); 
      var distance = Math.abs( geometry.boundingSphere.radius / Math.sin( fov / 2 ) );
      var newPosition = camera.position.clone().normalize().multiplyScalar(distance);
      camera.position.set(newPosition.x,newPosition.y,newPosition.z);
      camera.needsUpdate = true;
      camera.updateProjectionMatrix();
      switch (orientation) {
        case 0:
          camera.rotation.x = 90 * Math.PI / 180
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

      const renderer = new SoftwareRenderer();
      renderer.setSize(width, height);
      var imagedata = renderer.render(scene, camera);
      
      // Create a PNG from the pixels array (RGBA)
      const png = new PNG({
        width: width,
        height: height,
        filterType: -1
      });
      
      for(var i=0;i<imagedata.data.length;i++) {
        png.data[i] = imagedata.data[i];
      }
      //console.log(png.data);
      console.log("rendered in", new Date().getTime()-date);
      
      if (!fs.existsSync("temp")) {
        fs.mkdirSync("temp");
      }
      png.pack().pipe(fs.createWriteStream("temp/example.png"));
      var buffer = PNG.sync.write(png);
      
      if (!fs.existsSync("temp")) {
        fs.mkdirSync("temp");
      }
      var buffer = PNG.sync.write(png);
      fs.writeFile(`temp/${name}_${orientation}.png`, buffer);

      
      return resolve(buffer);
    });
  }
}