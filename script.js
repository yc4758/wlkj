// DOM 元素获取
const navLinks = document.querySelectorAll('nav a');
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const mobileMenuBtn = document.querySelector('.md\:hidden');
const heroSection = document.getElementById('hero');

// 平滑滚动功能
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 滚动触发动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

scrollRevealElements.forEach(element => {
    observer.observe(element);
});

// 视差效果
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // 英雄区域背景移动
    if (heroSection) {
        const heroBackground = heroSection.querySelector('.grid-pattern');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
        
        // 球体旋转速度调整
        const spheres = heroSection.querySelectorAll('.rounded-full');
        spheres.forEach((sphere, index) => {
            const rotationSpeed = (index + 1) * 0.02;
            sphere.style.transform = `rotate(${scrollY * rotationSpeed}deg)`;
        });
    }
    
    // 导航栏背景透明度
    const nav = document.querySelector('nav');
    if (nav) {
        if (scrollY > 100) {
            nav.classList.add('bg-tech-dark/95');
            nav.classList.remove('bg-tech-dark/80');
        } else {
            nav.classList.add('bg-tech-dark/80');
            nav.classList.remove('bg-tech-dark/95');
        }
    }
});

// 鼠标悬停效果增强
const hoverElements = document.querySelectorAll('.hover-lift');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0) scale(1)';
    });
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化滚动触发动画
    const initialElements = document.querySelectorAll('.scroll-reveal');
    initialElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            element.classList.add('active');
        }
    });
});

// 移动菜单功能
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const navMenu = document.querySelector('nav .hidden');
        if (navMenu) {
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('flex');
            navMenu.classList.toggle('flex-col');
            navMenu.classList.toggle('absolute');
            navMenu.classList.toggle('top-full');
            navMenu.classList.toggle('left-0');
            navMenu.classList.toggle('right-0');
            navMenu.classList.toggle('bg-tech-dark/95');
            navMenu.classList.toggle('py-4');
            navMenu.classList.toggle('px-4');
            navMenu.classList.toggle('border-t');
            navMenu.classList.toggle('border-tech-blue/20');
            navMenu.classList.toggle('z-50');
        }
    });
}

// 鼠标跟随粒子效果
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full bg-tech-blue/30';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = `${Math.random() * 4 + 2}px`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.animation = `float ${Math.random() * 2 + 1}s ease-out forwards`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
};

// 鼠标移动时创建粒子
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
        createParticle(e.clientX, e.clientY);
    }
});

// 滚动进度指示器
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-tech-blue via-tech-cyan to-tech-purple z-50';
    indicator.style.width = '0%';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = `${scrolled}%`;
    });
};

// 初始化滚动指示器
createScrollIndicator();

// 图片加载动画
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    img.onload = () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    };
    
    // 触发图片加载
    if (img.complete) {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }
});

// 按钮点击效果
const buttons = document.querySelectorAll('a, button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // 创建点击波纹效果
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(10, 132, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 添加波纹动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes float {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
    @keyframes spin-slow {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
    }
`;
document.head.appendChild(style);

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy(0, 100);
    } else if (e.key === 'ArrowUp') {
        window.scrollBy(0, -100);
    } else if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// 触摸设备支持
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndY < touchStartY - swipeThreshold) {
        // 向上滑动
        window.scrollBy(0, 150);
    } else if (touchEndY > touchStartY + swipeThreshold) {
        // 向下滑动
        window.scrollBy(0, -150);
    }
}