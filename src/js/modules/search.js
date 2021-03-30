export function initSearch() {
    const navMenu = document.querySelector('.nav');
    const searchForm = document.querySelector('.search');
    const searchButton = searchForm.querySelector('.search__button');
    const searchInput = searchForm.querySelector('.search__input');
    const headerInfo = document.querySelector('.header__info');
    const headerLogo = document.querySelector('.header__logo');

    searchButton.addEventListener('click', (event) => {
        if (searchInput.value) {
            searchInput.value = "";
            searchForm.classList.add('search_active');
            return;
        }
        event.preventDefault();
        searchForm.classList.toggle('search_active');
        headerInfo.classList.toggle('search_active');
        navMenu.classList.toggle('search_active');
        headerLogo.classList.toggle('search_active');
        searchInput.focus();
    });
}