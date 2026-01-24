// Sidebar Logic
const sidebarHtml = `
    <!-- Sidebar Overlay -->
    <div id="sidebar-overlay" class="sidebar-overlay fixed inset-0"></div>

    <!-- Sidebar Container -->
    <div id="sidebar" class="fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 z-50">
        <div class="p-6">
            <!-- Close Button -->
            <div class="flex justify-end mb-8">
                <button id="close-sidebar" class="text-gray-400">
                    <i data-lucide="x" width="20"></i>
                </button>
            </div>

            <!-- Menu Items -->
            <nav class="space-y-2 text-left">
                <a href="journey.html" class="sidebar-item flex items-center gap-4 px-4 py-3 text-gray-400 rounded-xl transition-all">
                    <i data-lucide="user" width="18"></i>
                    <span class="text-sm font-semibold">Ihram Account</span>
                </a>
                <a href="terms-and-conditions.html" id="menu-tnc" class="sidebar-item flex items-center gap-4 px-4 py-3 text-gray-400 rounded-xl transition-all">
                    <i data-lucide="file-text" width="18"></i>
                    <span class="text-sm font-semibold">Terms & Conditions</span>
                </a>
                <a href="plans.html" class="sidebar-item flex items-center gap-4 px-4 py-3 text-gray-400 rounded-xl transition-all">
                    <i data-lucide="banknote" width="18"></i>
                    <span class="text-sm font-semibold">Umrah On Cash</span>
                </a>
                <a href="support.html" class="sidebar-item flex items-center gap-4 px-4 py-3 text-gray-400 rounded-xl transition-all">
                    <i data-lucide="help-circle" width="18"></i>
                    <span class="text-sm font-semibold">FAQs</span>
                </a>
            </nav>
        </div>
    </div>
`;

function initSidebar() {
    // Inject if not present
    if (!document.getElementById('sidebar')) {
        document.body.insertAdjacentHTML('afterbegin', sidebarHtml);
        // Refresh icons for injected content
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const menuBtn = document.getElementById('menu-btn');
    const closeSidebar = document.getElementById('close-sidebar');

    function toggleSidebar(show) {
        if (show) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }
    }

    // Use event delegation for robust handling
    document.addEventListener('click', (e) => {
        // Open
        if (e.target.closest('#menu-btn')) {
            e.preventDefault();
            toggleSidebar(true);
            return;
        }

        // Close via button
        if (e.target.closest('#close-sidebar')) {
            e.preventDefault();
            toggleSidebar(false);
            return;
        }

        // Close via overlay
        if (e.target.id === 'sidebar-overlay') {
            toggleSidebar(false);
            return;
        }
    });

    // highlight active page in sidebar & standard closing logic for links
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-item').forEach(link => {
        const h = link.getAttribute('href');
        if (h && (h === currentPath || (currentPath === 'index.html' && h === 'index.html'))) {
            link.classList.add('active');
            link.classList.remove('text-gray-400');
            link.classList.add('text-white');
        }

        link.addEventListener('click', (e) => {
            // Only stop if special logic handles it (like inquiry-form toggle)
            if (e.target.id !== 'menu-tnc') {
                toggleSidebar(false);
            }
        });
    });

    // Handle T&C toggle for inquiry-form.html
    const menuTnC = document.getElementById('menu-tnc');
    const inquiryContent = document.getElementById('inquiry-content');
    const tncContent = document.getElementById('tnc-content');
    const headerTitle = document.getElementById('header-title');

    if (menuTnC && inquiryContent && tncContent) {
        menuTnC.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar(false);
            inquiryContent.classList.add('hidden');
            tncContent.classList.remove('hidden');
            if (headerTitle) headerTitle.textContent = "Things to Know";

            // Mark T&C as active in sidebar
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active', 'text-white'));
            menuTnC.classList.add('active', 'text-white');
        });

        // Add back-to-form logic for other sidebar items if on inquiry page
        document.querySelectorAll('.sidebar-item').forEach(link => {
            if (link.id !== 'menu-tnc') {
                link.addEventListener('click', (e) => {
                    if (!tncContent.classList.contains('hidden')) {
                        tncContent.classList.add('hidden');
                        inquiryContent.classList.remove('hidden');
                        if (headerTitle) headerTitle.textContent = "Begin Your Umrah Journey";
                    }
                    toggleSidebar(false);
                });
            }
        });
    }
}

// Ensure init runs
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
} else {
    initSidebar();
}
