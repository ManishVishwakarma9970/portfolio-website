// ---------------------------
// Smooth Scrolling
// ---------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });

        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
    });
});

// ---------------------------
// Intersection Observer Animations
// ---------------------------
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-fadeIn');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .project-card').forEach(el => observer.observe(el));

// ---------------------------
// Mobile Menu Toggle
// ---------------------------
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// ---------------------------
// Toast Message
// ---------------------------
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn { from { opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
.animate-fadeIn { animation: fadeIn 1s ease forwards; }
#toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: rgba(0,0,0,0.8); color:#fff; padding:12px 24px; border-radius:8px; opacity:0; pointer-events:none; transition: opacity 0.3s ease; z-index:1000; }
#toast.show { opacity:1; }
`;
document.head.appendChild(style);

const toast = document.createElement('div'); 
toast.id='toast'; 
document.body.appendChild(toast);

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------------------------
// Contact Form LocalStorage
// ---------------------------
const contactForm = document.querySelector('#contact form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
    const message = this.querySelector('textarea[placeholder="Your Message"]').value.trim();

    if (!name || !email || !message) {
        showToast('Please fill all fields!');
        return;
    }

    // Save message to localStorage
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    this.reset();
    showToast('Message saved successfully!');
});
