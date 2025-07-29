const partyDate = new Date('2025-08-02T15:00:00').getTime();


const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');


function updateCountdown() {
    const now = new Date().getTime();
    const difference = partyDate - now;


    if (difference < 0) {
        document.querySelector('.countdown-title').textContent = '🎉 Вечеринка началась! 🎉';
        document.querySelector('.countdown').innerHTML = '<div class="party-started">Добро пожаловать на вечеринку!</div>';
        return;
    }


    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);


    updateTimeUnit(daysEl, days);
    updateTimeUnit(hoursEl, hours);
    updateTimeUnit(minutesEl, minutes);
    updateTimeUnit(secondsEl, seconds);
}


function updateTimeUnit(element, value) {
    const formattedValue = value.toString().padStart(2, '0');
    
    if (element.textContent !== formattedValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#FF1493';
        
        setTimeout(() => {
            element.textContent = formattedValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#FFD700';
        }, 150);
    }
}




function addFloatingElement() {
    const emojis = ['🪔', '🕉️', '💃', '✨', '🎵', '🌸', '🧿', '🌟'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.cssText = `
        position: fixed;
        font-size: 2rem;
        opacity: 0.6;
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}vw;
        top: 100vh;
    `;
    
    document.body.appendChild(element);
    

    const duration = Math.random() * 5000 + 5000;
    element.animate([
        {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: 0.6
        },
        {
            transform: `translateY(-100vh) rotate(360deg)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => {
        document.body.removeChild(element);
    };
}


updateCountdown();
setInterval(updateCountdown, 1000);

setInterval(addFloatingElement, 3000);

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        const title = document.querySelector('.title');
        title.style.animation = 'bounce 0.8s ease';
    }, 1000);
    
    // Инициализируем прогрессивную загрузку изображений
    setTimeout(() => {
        initProgressiveLoading(); // Используем прогрессивную загрузку с красивым эффектом
    }, 1000);
});


window.addEventListener('resize', function() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const positions = [
            { top: '20%', left: '10%' },
            { top: '60%', left: '80%' },
            { top: '30%', left: '70%' },
            { top: '80%', left: '20%' },
            { top: '10%', left: '90%' },
            { top: '70%', left: '5%' }
        ];
        
        if (positions[index]) {
            element.style.top = positions[index].top;
            element.style.left = positions[index].left;
        }
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Прогрессивная загрузка изображений
function loadImageProgressively(img) {
    return new Promise((resolve, reject) => {
        // Добавляем класс загрузки
        img.classList.add('image-loading');
        
        // Создаем новый объект изображения для предзагрузки
        const imageLoader = new Image();
        
        imageLoader.onload = function() {
            // Когда изображение загружено, убираем blur эффект
            img.src = imageLoader.src;
            img.classList.remove('image-loading');
            img.classList.add('image-loaded');
            resolve(img);
        };
        
        imageLoader.onerror = function() {
            console.error('Ошибка загрузки изображения:', img.dataset.src);
            img.classList.remove('image-loading');
            reject(new Error('Failed to load image'));
        };
        
        // Начинаем загрузку изображения
        imageLoader.src = img.dataset.src;
    });
}

// Инициализация прогрессивной загрузки
function initProgressiveLoading() {
    const images = document.querySelectorAll('.mehandi-image, .activity-image');
    
    images.forEach((img, index) => {
        // Создаем placeholder
        const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';
        
        // Сохраняем оригинальный src
        const originalSrc = img.src;
        img.dataset.src = originalSrc;
        
        // Устанавливаем placeholder
        img.src = placeholder;
        img.classList.add('image-loading');
        
        // Добавляем задержку для создания эффекта последовательной загрузки
        setTimeout(() => {
            loadImageProgressively(img).catch(error => {
                console.error('Error loading image:', error);
            });
        }, index * 300); // Загружаем изображения с интервалом 300мс
    });
}

// Intersection Observer для ленивой загрузки
function initLazyLoading() {
    const images = document.querySelectorAll('.mehandi-image, .activity-image');
    
    images.forEach(img => {
        // Создаем placeholder
        const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';
        
        // Сохраняем оригинальный src
        const originalSrc = img.src;
        img.dataset.src = originalSrc;
        
        // Устанавливаем placeholder
        img.src = placeholder;
        img.classList.add('image-loading');
    });
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImageProgressively(img).catch(error => {
                    console.error('Error loading image:', error);
                });
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Начинаем загрузку за 50px до появления изображения
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}
