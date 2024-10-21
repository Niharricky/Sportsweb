let slideIndex = 0;
const slides = document.getElementsByClassName('mySlides');

function showSlides() {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Increment the slide index
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Show the current slide
    slides[slideIndex - 1].classList.add('active');

    // Change slide every 5 seconds
    setTimeout(showSlides, 5000); // 5 seconds per slide
}

// Start the slideshow
showSlides();
