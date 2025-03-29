document.addEventListener('DOMContentLoaded', function() {

	var products = document.querySelectorAll('[data-bss-dynamic-product]');

	for (var product of products) {
		var param = product.dataset.bssDynamicProductParam;
		product.dataset.reflowProduct = new URL(location.href).searchParams.get(param)
	}

	// Testimonial Slider
	const testimonialWrapper = document.querySelector('.testimonial-wrapper');
	const slides = document.querySelectorAll('.testimonial-slide');
	const dots = document.querySelectorAll('.testimonial-dots button');
	let currentSlide = 0;
	let touchStartX = 0;
	let touchEndX = 0;

	// Initialize slider
	if (testimonialWrapper && slides.length > 1) {
		// Set initial state
		slides.forEach((slide, index) => {
			if (index === 0) {
				slide.classList.add('active');
			} else {
				slide.classList.remove('active');
			}
		});

		// Handle dot clicks
		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				goToSlide(index);
			});
		});

		// Handle touch events
		testimonialWrapper.addEventListener('touchstart', (e) => {
			touchStartX = e.touches[0].clientX;
		});

		testimonialWrapper.addEventListener('touchmove', (e) => {
			touchEndX = e.touches[0].clientX;
		});

		testimonialWrapper.addEventListener('touchend', () => {
			const diff = touchStartX - touchEndX;
			if (Math.abs(diff) > 50) { // Minimum swipe distance
				if (diff > 0 && currentSlide < slides.length - 1) {
					goToSlide(currentSlide + 1);
				} else if (diff < 0 && currentSlide > 0) {
					goToSlide(currentSlide - 1);
				}
			}
		});

		// Auto-advance slides
		setInterval(() => {
			goToSlide((currentSlide + 1) % slides.length);
		}, 5000);
	}

	function goToSlide(index) {
		// Remove active class from current slide
		slides[currentSlide].classList.remove('active');
		
		// Update current slide index
		currentSlide = index;
		
		// Add active class to new slide
		slides[currentSlide].classList.add('active');
		
		// Update dots
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === currentSlide);
		});
	}

}, false);