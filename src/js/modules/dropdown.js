export function initDropdown() {
    const  dropdowns = document.querySelectorAll('.sidebar__dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownButton = dropdown.querySelector('.sidebar__dropdown-button');
        dropdownButton.addEventListener('click', () => {
            dropdown.classList.toggle('sidebar__dropdown_active');
        });
    });
}