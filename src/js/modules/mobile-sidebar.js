export function initMobileSidebar() {
    const sidebarButton = document.querySelector('.sidebar__button');
    const sidebar = document.querySelector('.sidebar');

    sidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar_active');
    });
}