function renderJourney() {
    const div = document.createElement('div');
    div.className = "pt-6 pb-28 space-y-6 bg-white min-h-screen";
    div.innerHTML = `
        <!-- Header -->
        <div class="px-5 border-b border-gray-100 pb-2">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <h1 class="text-lg font-bold text-gray-800">My Journey</h1>
                </div>
                <div class="flex space-x-3">
                    <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#627497] hover:bg-gray-50">
                        <i data-lucide="bell" width="20"></i>
                    </button>
                </div>
            </div>
            <!-- Mode Switcher -->
            <div class="flex bg-white p-1 rounded-full mt-4 mb-6 shadow-sm border border-gray-100">
                <button onclick="setJourneyMode('${IhramMode.OVERVIEW}')" class="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-full text-xs font-bold transition-all ${state.journeyMode === IhramMode.OVERVIEW ? 'bg-primary text-white shadow-md' : 'text-[#627497] hover:text-gray-700 hover:bg-gray-50'}">
                    <span>Overview</span>
                </button>
                <button onclick="setJourneyMode('${IhramMode.UMRAH}')" class="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-full text-xs font-bold transition-all ${state.journeyMode === IhramMode.UMRAH ? 'bg-primary text-white shadow-md' : 'text-[#627497] hover:text-gray-700 hover:bg-gray-50'}">
                    <span>My Umrah 2025</span>
                </button>
                <button onclick="setJourneyMode('${IhramMode.OTHERS}')" class="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-full text-xs font-bold transition-all ${state.journeyMode === IhramMode.OTHERS ? 'bg-primary text-white shadow-md' : 'text-[#627497] hover:text-gray-700 hover:bg-gray-50'}">
                    <span>Parent's Umrah</span>
                </button>
                <button class="flex items-center justify-center bg-[#E5EDF3] ml-3 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-all">
                    <i data-lucide="plus" color="#1E3A6D" width="12"></i>
                </button>
            </div>
        </div>

        <!-- Registry Card -->
        <div class="px-5">
            <div class="relative px-5 rounded-2xl top-card mt-5 text-white p-5 shadow-lg shadow-blue-900/10" style="background-color: #1E3A6D;">
                <div class="relative z-10 w-full">
                    <div class="flex justify-between items-start">
                        <div>
                            <h2 class="text-lg font-bold mb-1">Get Registry</h2>
                            <p class="text-xs text-blue-100 mb-1 leading-relaxed">Help Abdullah Reach Makkah</p>
                            <div class="flex -space-x-2 mb-5">
                                <div class="w-6 h-6 rounded-full border-2 border-white bg-gray-300"></div>
                                <div class="w-6 h-6 rounded-full border-2 border-white bg-gray-400"></div>
                            </div>
                        </div>
                        <div class="text-right">
                            <h2 class="text-lg text-end font-bold mb-1">PKR 25,000</h2>
                            <p class="text-xs text-blue-100 mb-1 leading-relaxed">Gifted by family</p>
                        </div>
                    </div>
                    <button class="bg-white w-full text-center gap-1 hover:bg-primary hover:text-white text-primary text-xs font-bold py-2.5 px-5 rounded-lg transition-colors shadow-md text-[#1E3A6D]">
                        Invite Family
                    </button>
                </div>
                <div class="absolute top-[-50px] left-[-50px] w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            </div>
        </div>

        <div class="px-5">
            <h5 class="text-lg font-bold text-primary text-[#1E3A6D]">Your Plans</h5>
        </div>

        <!-- Mock Plans List -->
        ${[0, 1].map(() => `
            <div class="px-5">
                <div class="bg-[#F4F8FB] rounded-3xl p-4 shadow-sm border border-gray-100 mb-6">
                    <div class="flex gap-4 mb-6">
                        <div class="flex justify-between items-center w-full">
                            <div>
                                <h6 class="text-normal font-bold text-primary text-[#1E3A6D]">My Umrah 2025</h6>
                                <span class="text-sm text-[#627497]">2025-06-01</span>
                            </div>
                            <div>
                                <span class="text-xs bg-[#E6FBDE] text-[#41AB13] px-2 rounded-md">Active</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="font-bold text-xs text-[#627497]">Progress</p>
                        <p class="font-bold text-medium text-[#627497]">30%</p>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full my-2 overflow-hidden">
                        <div class="bg-primary h-full w-1/2 rounded-full" style="background-color: #1E3A6D;"></div>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="font-normal text-xs text-[#627497]">PKR 150K Paid</p>
                        <p class="font-normal text-medium text-[#627497]">Goal: 500K</p>
                    </div>
                    <button class="w-full mt-4 border border-[#BFD3E0] text-primary py-3.5 rounded-xl font-bold hover:bg-primary-light hover:text-white transition-colors flex items-center justify-center space-x-2 text-sm text-[#1E3A6D]">
                        View Details
                    </button>
                </div>
            </div>
        `).join('')}
    `;
    return div;
}