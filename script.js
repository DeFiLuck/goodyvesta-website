const toast = document.getElementById('toast');

function showToast(message) {
if (!toast) return;
toast.textContent = message;
toast.classList.add('show');
setTimeout(() => toast.classList.remove('show'), 2800);
}

// Mobile navigation menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.site-header nav');

if (menuBtn && nav) {
menuBtn.addEventListener('click', () => {
const isOpen = nav.classList.toggle('nav-open');
menuBtn.setAttribute('aria-expanded', String(isOpen));
menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
nav.classList.remove('nav-open');
menuBtn.setAttribute('aria-expanded', 'false');
menuBtn.setAttribute('aria-label', 'Open menu');
});
});
}

// Property enquiry buttons
document.querySelectorAll('.enquire-property').forEach(btn => {
btn.addEventListener('click', () => {
const name = btn.dataset.property || 'a property';
const messageBox = document.querySelector('#contact textarea');

if (messageBox) {
  messageBox.value = `I am interested in: ${name}. Please send me more details.`;
}

document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

});
});

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
newsletterForm.addEventListener('submit', e => {
e.preventDefault();
showToast('Thank you for your interest! Newsletter subscriptions are not yet stored.');
newsletterForm.reset();
});
}

// Property enquiry form: open WhatsApp
const enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm) {
enquiryForm.addEventListener('submit', e => {
e.preventDefault();

const data = new FormData(enquiryForm);
const text = `Hello Goodyvesta, my name is ${data.get('name')}. ${data.get('message')} Email: ${data.get('email')}. Phone: ${data.get('phone')}`;

const url = `https://wa.me/2348138239695?text=${encodeURIComponent(text)}`;
window.open(url, '_blank');

});
}

// Search and filters
const search = document.getElementById('search');
const filters = document.querySelectorAll('.filter');

function runFilter() {
const q = search ? search.value.toLowerCase().trim() : '';
const activeFilter = document.querySelector('.filter.active');
const active = activeFilter ? activeFilter.dataset.filter : 'all';

document.querySelectorAll('.searchable').forEach(card => {
const matchesText = !q || card.textContent.toLowerCase().includes(q);
const matchesType = active === 'all' || card.classList.contains(active);

card.style.display = matchesText && matchesType ? '' : 'none';

});
}

if (search) {
search.addEventListener('input', runFilter);
}

filters.forEach(filter => {
filter.addEventListener('click', () => {
filters.forEach(item => item.classList.remove('active'));
filter.classList.add('active');
runFilter();
});
});
