// Countdown Timer
function updateCountdown() {
    const now = new Date();

    // Configurar inicio: hoy a las 00:00 (medianoche)
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);

    // Configurar fin: viernes a las 22:00
    const endOfWeek = new Date(startOfWeek);
    // 5 días después (viernes) a las 22:00
    endOfWeek.setDate(startOfWeek.getDate() + (5 - startOfWeek.getDay()));
    endOfWeek.setHours(22, 0, 0, 0);

    // Si ya pasó el viernes 10:00pm, saltar al siguiente viernes
    if (now > endOfWeek) {
        endOfWeek.setDate(endOfWeek.getDate() + 7);
    }

    const distance = endOfWeek - now;

    // Calcular tiempo restante
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar valores
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


setInterval(updateCountdown, 1000);
updateCountdown();

// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    
    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    
    // Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);
    
    // Update carousel on resize
    window.addEventListener('resize', () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach(setSlidePosition);
        moveToSlide(currentIndex);
    });
    
    // Move to specific slide
    const moveToSlide = (index) => {
        track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
        updateDots(index);
        currentIndex = index;
    };
    
    // Update active dot
    const updateDots = (index) => {
        dots.forEach(dot => dot.classList.remove('bg-orange-500'));
        dots[index].classList.add('bg-orange-500');
    };
    
    // Click next button
    nextButton.addEventListener('click', () => {
        if (currentIndex === slides.length - 1) return;
        currentIndex++;
        moveToSlide(currentIndex);
    });
    
    // Click prev button
    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) return;
        currentIndex--;
        moveToSlide(currentIndex);
    });
    
    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
    
    // Auto-advance carousel
    let autoSlide = setInterval(() => {
        if (currentIndex === slides.length - 1) {
            moveToSlide(0);
        } else {
            moveToSlide(currentIndex + 1);
        }
    }, 5000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (currentIndex === slides.length - 1) {
                moveToSlide(0);
            } else {
                moveToSlide(currentIndex + 1);
            }
        }, 5000);
    });
    
    // Initialize dots
    updateDots(0);
    
    // Form Submission
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const guests = document.getElementById('guests').value;
            const costume = document.getElementById('costume').value;
            
            // Here you would typically send this data to a server
            console.log('RSVP Submitted:', { name, email, guests, costume });
            
            // Show success message
            alert(`Thanks ${name}! Your RSVP has been received. We'll see you on Halloween!`);
            
            // Reset form
            rsvpForm.reset();
        });
    }
});