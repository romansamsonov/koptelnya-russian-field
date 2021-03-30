export function initBurger() {
    const hamburgerButton = document.querySelector('.hamburger');
    const body = document.querySelector('body');

    hamburgerButton.addEventListener('click', () => {
        body.classList.toggle('active');
    });
}