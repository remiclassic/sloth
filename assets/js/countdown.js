function updateTimer() {
    const countdownElement = document.querySelector('.countdown .text-light');
    if (!countdownElement) return;

    // Get the current time string
    const currentTime = countdownElement.textContent.replace('Offer ends in ', '');
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);

    // Calculate total seconds
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Decrease by 1 second
    totalSeconds--;

    if (totalSeconds <= 0) {
        countdownElement.textContent = '00:00:00';
        countdownElement.parentElement.classList.add('urgent');
        return;
    }

    // Calculate new hours, minutes, seconds
    const newHours = Math.floor(totalSeconds / 3600);
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSeconds = totalSeconds % 60;

    // Format time with leading zeros
    const formattedTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
    
    // Update the display
    countdownElement.textContent = formattedTime;

    // Add urgent class when less than 1 hour remains
    if (totalSeconds < 3600) {
        countdownElement.parentElement.classList.add('urgent');
    }

    // Continue countdown
    setTimeout(updateTimer, 1000);
}

// Start the countdown when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    updateTimer();
}); 