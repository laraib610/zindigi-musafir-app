function renderProfile() {
    const div = document.createElement('div');
    div.className = "flex items-center justify-center h-screen text-primary/80 bg-gray-50";
    div.innerHTML = `
        <div class="text-center p-8">
            <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl">👤</span>
            </div>
            <p class="text-lg font-bold text-[#627497]">User Profile</p>
            <p class="text-sm mt-2">Preferences & Settings</p>
        </div>
    `;
    return div;
}