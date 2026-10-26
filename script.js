const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('nav a');
const nav = document.querySelector('nav');

function countUp(el){
  const target = +el.dataset.count; let n = 0;
  const t = setInterval(()=>{ n++; el.textContent = n; if(n>=target) clearInterval(t); }, 1200/target);
}

function showPage(){
  const id = location.hash.slice(1) || 'accueil';
  pages.forEach(p => p.classList.toggle('show', p.id === id));
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  nav.classList.remove('open');
  window.scrollTo({top:0});
  const current = document.getElementById(id) || pages[0];
  current.classList.add('show');
  current.querySelectorAll('.reveal').forEach((el,i)=>{
    el.classList.remove('in');
    setTimeout(()=>el.classList.add('in'), 120 + i*110);
  });
  current.querySelectorAll('[data-count]').forEach(countUp);
}
window.addEventListener('hashchange', showPage);
showPage();

document.querySelector('.burger').onclick = () => nav.classList.toggle('open');

// Ondulation au clic
document.addEventListener('click', e => {
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.left = e.clientX + 'px';
  r.style.top = e.clientY + 'px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 800);
});

// Lightbox galerie
const lb = document.getElementById('lb');
document.querySelectorAll('.tile').forEach(t => t.onclick = e => {
  e.stopPropagation();
  document.getElementById('lbCap').textContent = t.dataset.cap;
  lb.classList.add('open');
});
lb.onclick = () => lb.classList.remove('open');
