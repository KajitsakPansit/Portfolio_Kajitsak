import * as THREE from '../vendor/three.module.js';
import {CameraRig} from './camera.js';
import {RenderSurface} from './renderer.js';
export class SceneView {
 constructor(container,input){
  this.input=input;this.scene=new THREE.Scene();this.rig=new CameraRig();this.camera=this.rig.camera;this.surface=new RenderSurface(container);this.renderer=this.surface.renderer;
  this.count=matchMedia('(pointer:coarse)').matches?4200:12000;this.positions=new Float32Array(this.count*3);this.velocity=new Float32Array(this.count*2);this.seeds=new Float32Array(this.count*3);
  for(let i=0;i<this.count;i++){const k=i*3;this.seeds[k]=Math.random();this.seeds[k+1]=Math.random();this.seeds[k+2]=Math.random();this.positions[k]=(Math.random()-.5)*12;this.positions[k+1]=(Math.random()-.5)*8;this.positions[k+2]=(Math.random()-.5)*1.4;}
  this.geometry=new THREE.BufferGeometry();this.geometry.setAttribute('position',new THREE.BufferAttribute(this.positions,3).setUsage(THREE.DynamicDrawUsage));this.geometry.setAttribute('seed',new THREE.BufferAttribute(this.seeds,3));
  this.material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uDpr:{value:1}},vertexShader:'attribute vec3 seed; varying vec3 vColor; uniform float uDpr; void main(){vColor=seed.z>.985?mix(vec3(.34,.48,1.),vec3(.63,.34,1.),seed.x):vec3(.9,.93,1.);vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=(.9+pow(seed.y,4.)*3.2)*uDpr;}',fragmentShader:'varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;float glow=1.-smoothstep(.12,1.,d);gl_FragColor=vec4(vColor,glow*.82);}'});
  this.points=new THREE.Points(this.geometry,this.material);this.points.frustumCulled=false;this.scene.add(this.points);this.abort=new AbortController();
  window.addEventListener('resize',()=>this.resize(),{signal:this.abort.signal});
  this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();this.dispose();document.body.classList.add('no-webgl');},{signal:this.abort.signal});
  this.resize();this.last=0;this.frame=requestAnimationFrame(t=>this.render(t));
 }
 resize(){this.rig.resize();this.surface.resize();this.material.uniforms.uDpr.value=this.renderer.getPixelRatio();this.height=2*Math.tan(THREE.MathUtils.degToRad(35)/2)*6.8;this.width=this.height*innerWidth/innerHeight;}
 render(ms){
  const dt=Math.min((ms-this.last)/1000||.016,.033);this.last=ms;const a=this.input;a.update(dt);
  if(!a.reduced.matches&&!document.hidden){
   const px=a.pointer.x*this.width/2,py=a.pointer.y*this.height/2,burst=a.burst; a.burst=0;
   const stage=Math.min(a.scroll/1.6,3),mix=stage%1,index=Math.floor(stage),time=ms*.0001;
   for(let i=0;i<this.count;i++){
    const k=i*3,j=i*2,s=this.seeds[k],r=this.seeds[k+1],angle=s*Math.PI*2;
    const shape=n=>{if(n===0)return [(s-.5)*this.width*1.28,(r-.5)*this.height*(.18+.55*Math.abs(Math.sin(s*Math.PI*3)))+Math.sin(s*Math.PI*5)*.28];if(n===1)return [Math.cos(angle)*(.8+r)*this.width*.29,Math.sin(angle)*(.8+r)*this.height*.32];if(n===2)return [(s-.5)*this.width*1.1,Math.sin(s*Math.PI*5+time)*.45+(r-.5)*.7];return [Math.cos(angle)*Math.sqrt(r)*this.width*.48,Math.sin(angle)*Math.sqrt(r)*this.height*.45];};
    const first=shape(index),next=shape(Math.min(index+1,3));const eased=mix*mix*(3-2*mix),tx=first[0]+(next[0]-first[0])*eased,ty=first[1]+(next[1]-first[1])*eased;
    let x=this.positions[k],y=this.positions[k+1],vx=this.velocity[j],vy=this.velocity[j+1],dx=px-x,dy=py-y,d2=dx*dx+dy*dy+.06;
    vx+=(tx-x)*dt*.32;vy+=(ty-y)*dt*.32;
    if(a.active){const near=Math.exp(-d2/3),force=near*(a.held?8:2.5)/Math.sqrt(d2);vx+=(dx*force-dy*force*.65+a.pointerVelocity.x*near*2.4)*dt;vy+=(dy*force+dx*force*.65+a.pointerVelocity.y*near*2.4)*dt;if(burst){const blast=Math.exp(-d2/4)*burst/Math.sqrt(d2);vx-=dx*blast;vy-=dy*blast;}}
    vx*=Math.exp(-dt*1.15);vy*=Math.exp(-dt*1.15);const speed=Math.hypot(vx,vy);if(speed>7){vx*=7/speed;vy*=7/speed;}
    this.positions[k]=x+vx*dt;this.positions[k+1]=y+vy*dt;this.velocity[j]=vx;this.velocity[j+1]=vy;
   }
   this.geometry.attributes.position.needsUpdate=true;
  }
  this.renderer.render(this.scene,this.camera);this.frame=requestAnimationFrame(t=>this.render(t));
 }
 dispose(){cancelAnimationFrame(this.frame);this.abort.abort();this.geometry.dispose();this.material.dispose();this.surface.dispose();}
}
