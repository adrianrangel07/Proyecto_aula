document.addEventListener('DOMContentLoaded', function () {
    const offerContainers = document.querySelectorAll('.offer');
    const footer = document.querySelector('.footer');

    function checkOfferPresence() {
        if (offerContainers.length === 0) {
            footer.style.position = 'fixed';
        } else {
            footer.style.position = 'relative';
        }
    }

    checkOfferPresence();

    window.addEventListener('resize', checkOfferPresence);
});

