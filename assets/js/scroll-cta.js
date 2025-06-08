document.addEventListener('DOMContentLoaded', function() {
    const scrollCta = document.getElementById('scroll-cta');
    const closeButton = document.querySelector('.scroll-cta__close');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds'); // Get seconds element
    const spotsLeftEl = document.querySelector('.scroll-cta__header .highlight');
    const timerContainerEl = document.querySelector('.scroll-cta__timer-compact');

    let hasShown = false;
    let allowShow = true;
    let countdownInterval; // Variable to store the interval ID

    // Show CTA on Scroll
    window.addEventListener('scroll', function() {
        if (allowShow && !hasShown && window.scrollY > 300) {
            setTimeout(function() {
                if (scrollCta) {
                    scrollCta.classList.add('active');
                }
                hasShown = true;
            }, 1000);
        }
    });

    // Close CTA
    if (closeButton && scrollCta) {
        closeButton.addEventListener('click', function() {
            scrollCta.classList.remove('active');
            allowShow = false;
            hasShown = true;

            setTimeout(function() {
                allowShow = true;
                hasShown = false;
            }, 5 * 60 * 1000);
        });
    }

    // "Spots Left" Functionality
    if (spotsLeftEl) {
        const randomSpots = Math.floor(Math.random() * 4) + 2;
        spotsLeftEl.textContent = randomSpots + ' نفر ظرفیت';
    }

    // Countdown Timer Logic
    function initCountdown() {
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !timerContainerEl) return;

        const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
        const endDate = new Date(Date.now() + fourteenDaysInMs);

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endDate - now;

            if (timeLeft < 0) {
                clearInterval(countdownInterval); // Clear the interval
                if (timerContainerEl) {
                    timerContainerEl.innerHTML = '<p style="text-align:center; color: #e74c3c; font-weight:bold;">پیشنهاد به پایان رسید!</p>';
                }
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Calculate seconds

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0'); // Update seconds element
        }

        updateCountdown(); // Initial call
        countdownInterval = setInterval(updateCountdown, 1000); // Update every second
    }

    initCountdown();
});
