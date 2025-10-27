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
  const container = document.querySelector('.carousel-container');

  let slideWidth = slides[0].getBoundingClientRect().width;
  let currentIndex = 0;

  // Set slide positions
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  // Resize handler
  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach(setSlidePosition);
    moveToSlide(currentIndex);
  });

  // Move function
  const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
    updateDots(index);
    currentIndex = index;
  };

  // Update active dot
  const updateDots = (index) => {
    dots.forEach(dot => dot.classList.remove('bg-orange-500'));
    if (dots[index]) dots[index].classList.add('bg-orange-500');
  };

  // Buttons
  if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) moveToSlide(currentIndex - 1);
    });
  }

  // 📱 Swipe (Touch) Support
  let startX = 0;
  let endX = 0;

  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // Mínimo desplazamiento
      if (diff > 0 && currentIndex < slides.length - 1) {
        moveToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        moveToSlide(currentIndex - 1);
      }
    }
  });

  // Auto-advance
  let autoSlide = setInterval(() => {
    if (currentIndex === slides.length - 1) {
      moveToSlide(0);
    } else {
      moveToSlide(currentIndex + 1);
    }
  }, 6000);

  // Pause on hover
  container.addEventListener('mouseenter', () => clearInterval(autoSlide));
  container.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      if (currentIndex === slides.length - 1) moveToSlide(0);
      else moveToSlide(currentIndex + 1);
    }, 6000);
  });

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

const intro = document.getElementById("intro");
  const enterBtn = document.querySelector('.enter-btn');
  const main = document.querySelector('main');
  const navbar = document.querySelector('custom-navbar');
  const footer = document.querySelector('custom-footer');

  // Ocultamos el contenido principal al cargar
  main.style.display = "none";
  navbar.style.display = "none";
  footer.style.display = "none";

  function enterSite() {
    intro.classList.add("hidden");
    setTimeout(() => {
      intro.remove();
      main.style.display = "block";
      navbar.style.display = "block";
      footer.style.display = "block";
    }, 800);
  }

  enterBtn.addEventListener("click", enterSite);