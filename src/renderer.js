import * as THREE from '../vendor/three.module.js';
export class RenderSurface {
 constructor(container){this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});this.renderer.setClearColor(0x050508,1);this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;container.append(this.renderer.domElement);this.resize();}
 resize(){this.renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<800?1.25:1.75));this.renderer.setSize(innerWidth,innerHeight);}
 dispose(){this.renderer.dispose();this.renderer.domElement.remove();}
}
