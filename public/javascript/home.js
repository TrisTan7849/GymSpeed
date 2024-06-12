document.addEventListener('DOMContentLoaded', (event) => {
    const images = [
        "images/salle1.jpg",
        "images/salle2.jpg", 
        "images/salle3.jpg",
        "images/salle4.jpg",
    ];

    let currentIndex = 0; 
    const carouselImageWrapper = document.getElementById('carouselImageWrapper');
    const carouselImage = document.getElementById('carouselImage');

    carouselImage.src = images[currentIndex];
    carouselImage.classList.add('active');

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    function changeImage(nextIndex) {
        carouselImage.classList.remove('active');
        setTimeout(() => {
            carouselImage.src = images[nextIndex];
            carouselImage.classList.add('active');
        }, 500); 
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex + images.length - 1) % images.length;
        changeImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        changeImage(currentIndex);
    });
});

document.querySelector('.burger-menu').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});

document.querySelector('.burger-menu').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('open');
});