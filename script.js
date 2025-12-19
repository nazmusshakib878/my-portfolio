// Name Typing Animation
document.addEventListener('DOMContentLoaded', function () {
    const nameElement = document.getElementById('animatedName');
    const fullName = "Md. Nazmus Shakib"; // Change this to your name
    const speed = 150;

    nameElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < fullName.length) {
            nameElement.textContent += fullName.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start animation after a short delay
    setTimeout(typeWriter, 500);

    // Title Typing Effect
    const typingText = document.getElementById('typingText');
    const texts = [
        "Aspiring Web Developer",
        "Computer Science Student",
        "Frontend Learner",
        "Problem Solver"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start title typing effect
    setTimeout(typeEffect, 1000 + fullName.length * speed);
});

// Scroll Animation
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Image Upload
const uploadBtn = document.getElementById('uploadBtn');
const profileImage = document.getElementById('profileImage');

uploadBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;

                // Show success message
                const uploadBtnIcon = uploadBtn.querySelector('i');
                uploadBtnIcon.className = 'fas fa-check';
                uploadBtnIcon.style.color = 'var(--accent)';

                setTimeout(() => {
                    uploadBtnIcon.className = 'fas fa-camera';
                    uploadBtnIcon.style.color = '';
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    };

    input.click();
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.disabled = true;

    // In real application, send data to server here
    console.log('Form submitted:', { name, email });

    setTimeout(() => {
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
    }, 3000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
});
