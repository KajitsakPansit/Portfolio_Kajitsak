import * as THREE from '../vendor/three.module.js';
export class CameraRig {
 constructor(){this.camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,40);this.camera.position.set(0,0,6.8);}
 resize(){this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();}
}
