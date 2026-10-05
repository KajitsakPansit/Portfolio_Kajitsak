import * as THREE from '../vendor/three.module.js';
export class Interaction {
 constructor(){
  this.pointer=new THREE.Vector2(0,0);this.target=new THREE.Vector2(0,0);this.previous=new THREE.Vector2(0,0);this.pointerVelocity=new THREE.Vector2(0,0);this.active=false;this.held=false;this.burst=0;this.scroll=0;
  this.reduced=matchMedia('(prefers-reduced-motion: reduce)');this.abort=new AbortController();this.cursor=document.querySelector('#cursor');this.sound=false;
  const opts={signal:this.abort.signal};
  const move=e=>{this.target.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);this.active=true;this.cursor.style.left=e.clientX+'px';this.cursor.style.top=e.clientY+'px';};
  window.addEventListener('pointermove',move,opts);
  window.addEventListener('pointerdown',e=>{if(e.target.closest('a,button,iframe'))return;move(e);this.held=true;this.burst=1;this.cursor.classList.add('held');this.tone(180);},opts);
  const release=()=>{if(this.held){this.burst=2.5;this.tone(320);}this.held=false;this.cursor.classList.remove('held');};
  window.addEventListener('pointerup',release,opts);window.addEventListener('pointercancel',release,opts);
  window.addEventListener('blur',()=>{release();this.active=false;},opts);
  document.documentElement.addEventListener('pointerleave',()=>{release();this.active=false;},opts);
  document.querySelector('#sound').addEventListener('click',e=>{this.sound=!this.sound;e.currentTarget.setAttribute('aria-pressed',String(this.sound));e.currentTarget.textContent=this.sound?'เสียง: เปิด':'เสียง: ปิด';if(this.sound)this.tone(260);},opts);
 }
 update(dt){this.previous.copy(this.pointer);this.pointer.lerp(this.target,1-Math.exp(-dt*22));this.pointerVelocity.set((this.pointer.x-this.previous.x)/Math.max(dt,.001),(this.pointer.y-this.previous.y)/Math.max(dt,.001)).multiplyScalar(.075);this.scroll=THREE.MathUtils.damp(this.scroll,scrollY/innerHeight,4,dt);}
 tone(frequency){if(!this.sound||this.reduced.matches)return;try{this.audio??=new AudioContext();this.audio.resume();const o=this.audio.createOscillator(),g=this.audio.createGain();o.frequency.setValueAtTime(frequency,this.audio.currentTime);o.frequency.exponentialRampToValueAtTime(frequency*.5,this.audio.currentTime+.25);g.gain.setValueAtTime(.025,this.audio.currentTime);g.gain.exponentialRampToValueAtTime(.0001,this.audio.currentTime+.35);o.connect(g).connect(this.audio.destination);o.start();o.stop(this.audio.currentTime+.4);}catch{this.sound=false;}}
 dispose(){this.abort.abort();this.audio?.close();}
}
