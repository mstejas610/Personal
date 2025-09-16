// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Add fade-in animation to elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(el);
    });

    // Add slide-up animation to elements with .slide-up class
    const slideElements = document.querySelectorAll('.slide-up');
    slideElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(el);
    });
});

// Particle background animation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 100;

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = Math.random() * 0.5 - 0.25;
                this.vy = Math.random() * 0.5 - 0.25;
                this.size = Math.random() * 2;
                this.color = Math.random() < 0.5 ? '#58A6FF' : '#6E40C9';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(88, 166, 255, ${0.1 * (1 - distance/150)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    const userProfileToggle = document.querySelector('.user-profile-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (userProfileToggle && dropdownMenu) {
        userProfileToggle.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!userProfileToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
});

function handleLogout() {
    sessionStorage.clear();
    localStorage.removeItem('user_token');
    window.location.href = 'login.html';
}