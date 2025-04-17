let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const totalImages = images.length;
const caption = document.querySelector('.caption');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dotContainer = document.querySelector('.dots');
const thumbnailImages = document.querySelectorAll('.thumbnails img');

// Create dots dynamically
images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dotContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    thumbnailImages.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    caption.textContent = images[index].dataset.caption;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
    });
});

thumbnailImages.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
    });
});

// Touch/Swipe Support
let startX = 0;
document.querySelector('.carousel').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.carousel').addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        nextButton.click();
    } else if (endX - startX > 50) {
        prevButton.click();
    }
});

// Auto-slide every 3 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}, 3000);

// Initialize
showImage(currentIndex);
