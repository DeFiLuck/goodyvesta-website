const toast = document.getElementById('toast');
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)}

document.querySelectorAll('.enquire-property').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const name=btn.dataset.property;
    document.querySelector('#contact textarea').value=`I am interested in: ${name}. Please send me more details.`;
    document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
  });
});

document.getElementById('newsletterForm').addEventListener('submit',e=>{
  e.preventDefault(); showToast('Thank you. Newsletter subscription received.');
  e.target.reset();
});

document.getElementById('enquiryForm').addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  const text=`Hello Goodyvesta, my name is ${data.get('name')}. ${data.get('message')} Phone: ${data.get('phone')}`;
  const url=`https://wa.me/2340000000000?text=${encodeURIComponent(text)}`;
  window.open(url,'_blank');
});

const search=document.getElementById('search');
const filters=document.querySelectorAll('.filter');
function runFilter(){
  const q=search.value.toLowerCase().trim();
  const active=document.querySelector('.filter.active').dataset.filter;
  document.querySelectorAll('.searchable').forEach(card=>{
    const matchesText=!q||card.textContent.toLowerCase().includes(q);
    const matchesType=active==='all'||card.classList.contains(active);
    card.style.display=matchesText&&matchesType?'':'none';
  });
}
search.addEventListener('input',runFilter);
filters.forEach(f=>f.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');runFilter();
}));
