// Sidebar Logic
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('menu-close-btn');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('side-menu-overlay');

function openMenu() {
    if (!sideMenu || !overlay) return;
    // Show overlay
    overlay.classList.remove('hidden');
    // Trigger reflow for transition
    void overlay.offsetWidth;
    overlay.classList.remove('opacity-0');

    // Slide in menu and add shadow
    sideMenu.classList.remove('translate-x-full');
    sideMenu.classList.add('shadow-2xl');
}

function closeMenu() {
    if (!sideMenu || !overlay) return;
    // Hide overlay
    overlay.classList.add('opacity-0');
    // Wait for transition to finish before hiding
    setTimeout(() => {
        if (overlay.classList.contains('opacity-0')) {
            overlay.classList.add('hidden');
        }
        // Remove shadow after transition is complete to avoid it popping out
        sideMenu.classList.remove('shadow-2xl');
    }, 300);

    // Slide out menu
    sideMenu.classList.add('translate-x-full');
}

if (menuBtn) menuBtn.addEventListener('click', openMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);
