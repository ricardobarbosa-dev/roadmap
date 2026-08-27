const topButton = document.getElementById('topButton');

window.addEventListener('scroll', () => {
    topButton.classList.toggle('hidden', window.scrollY < 500);
});

topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

