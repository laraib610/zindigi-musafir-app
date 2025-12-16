function renderBottomNav() {
    const navItems = [
        { id: Tab.HOME, icon: 'home', label: 'Home' },
        { id: Tab.JOURNEY, icon: 'package', label: 'Ihram' },
        { id: Tab.PLANS, icon: 'calendar', label: 'Plans' },
        { id: Tab.POINTS, icon: 'trophy', label: 'Rewards' },
        { id: Tab.PROFILE, icon: 'user', label: 'Profile' },
        { id: Tab.SUPPORT, icon: 'help-circle', label: 'Support' },
    ];

    const html = `
        <div class="flex justify-between items-center pb-4 pt-2">
            ${navItems.map(item => {
        const isActive = state.activeTab === item.id;
        return `
                    <button onclick="switchTab('${item.id}')" class="flex flex-col items-center space-y-1.5 transition-all duration-300 w-1/5 ${isActive ? 'text-accent' : 'text-blue-200'}" style="${isActive ? 'color: #26d0ce;' : 'color: #bfdbfe;'}">
                        <div class="transition-all duration-300 ${isActive ? '-translate-y-1' : ''}">
                            <i data-lucide="${item.icon}" width="22" stroke-width="${isActive ? 2.5 : 2}"></i>
                        </div>
                        <span class="text-[9px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}">
                            ${item.label}
                        </span>
                    </button>
                `;
    }).join('')}
        </div>
    `;
    bottomNav.innerHTML = html;
}