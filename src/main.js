const bar=document.querySelector('.loading-line i'),status=document.querySelector('#loading-status');
let scene,interaction;
const finish=()=>{bar.style.width='100%';setTimeout(()=>document.body.classList.add('ready'),200);};
bar.style.width='20%';
try{
 const [{Interaction},{SceneView}]=await Promise.all([import('./interaction.js'),import('./scene.js')]);bar.style.width='70%';
 interaction=new Interaction();scene=new SceneView(document.querySelector('#scene'),interaction);
 status.textContent='พร้อมให้คุณสำรวจ';finish();
}catch(error){console.warn('Particle scene unavailable',error);interaction?.dispose();document.body.classList.add('no-webgl');status.textContent='พอร์ตโฟลิโอพร้อมแล้ว';finish();}
const navigationLabels=['ABOUT ME','SKILLS','PROJECT','CERTIFICATE','CONTACT'];
document.querySelectorAll('header nav a').forEach((link,index)=>{
 link.textContent=navigationLabels[index];
 link.addEventListener('click',event=>{
  const target=document.querySelector(link.hash);
  if(!target)return;
  event.preventDefault();
  const headerHeight=document.querySelector('header').offsetHeight;
  const top=target.getBoundingClientRect().top+scrollY-headerHeight;
  scrollTo({top,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  history.replaceState(null,'',link.hash);
 });
});
const introText=document.querySelector('.intro-text');
if(introText)introText.innerHTML='<span>สถาบันเทคโนโลยีไทย-ญี่ปุ่น</span><span>คณะเทคโนโลยีสารสนเทศ · สาขาเทคโนโลยีสารสนเทศ</span><span>นักศึกษาชั้นปีที่ 4</span>';
document.querySelector('.hero-actions')?.remove();
document.querySelector('.interaction-tools')?.remove();
document.querySelector('.hero-bottom')?.remove();
document.querySelector('#work .section-heading > p')?.remove();
const sectionHeadings=[
 ['#about h2','ABOUT ME','Personal information.'],
 ['#skills h2','SKILLS','Hard skills & soft skills.'],
 ['#work h2','PROJECT','Automation / RPA'],
 ['#learning h2','CERTIFICATE','Certificates & community.']
];
sectionHeadings.forEach(([selector,title,caption])=>{const heading=document.querySelector(selector);if(heading)heading.innerHTML=`${title}<span class="english-caption">${caption}</span>`});
const communityHeading=document.querySelector('.event h3');
if(communityHeading)communityHeading.innerHTML='Cloud Native Bangkok &amp;<br>Cloud Native AI';
const workshop=document.querySelector('.event');
if(workshop)workshop.insertAdjacentHTML('beforebegin','<h2 class="workshop-heading">Workshop</h2>');
document.querySelector('.event .muted')?.remove();
document.querySelector('footer a[href*="github.com"]')?.remove();
window.addEventListener('pagehide',e=>{if(!e.persisted){scene?.dispose();interaction?.dispose();}});
