function renderPlans() {
    if (state.isCreatingPlan) {
        return renderCreatePlanWizard();
    }

    const div = document.createElement('div');
    div.className = "pt-2 pb-5 space-y-6 bg-white min-h-screen";

    // Header
    let html = `
        <div class="px-3 border-b border-gray-100 pb-2">
            <div class="flex justify-between items-center">
                <h1 class="text-lg font-bold text-gray-800">My Journey</h1>
                <div class="flex space-x-3">
                    <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#627497] hover:bg-gray-50">
                        <i data-lucide="bell" width="20"></i>
                    </button>
                  
                </div>
            </div>
    `;

    if (state.plansList.length === 0) {
        html += `
            <div class="flex justify-between bg-[#F4F8FB] p-1 rounded-full mt-4 mb-3 shadow-sm ">
                <button class=" px-4 py-0 rounded-full text-xs font-bold transition-all bg-primary text-white shadow-md">Overview</button>
                <button id="create-plan-btn-header" class="flex items-center justify-center bg-[#E5EDF3] px-3 ml-3 py-1 rounded-full transition-all">
                    <i data-lucide="plus" color="#1E3A6D" width="12"></i>
                </button>
            </div>
        </div>
        `;
    } else {
        html += `
            <div class="flex justify-between bg-[#F4F8FB] p-1 rounded-full mt-4 mb-3 shadow-sm ">
                <button onclick="setPlansMode('${UmrahPlan.OVERVIEW}')" class="px-4 py-0 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.OVERVIEW ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">Overview</button>
                <button onclick="setPlansMode('${UmrahPlan.UMRAH}')" class="px-4 py-0 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.UMRAH ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">My Umrah 2025</button>
                <button onclick="setPlansMode('${UmrahPlan.OTHERS}')" class="px-4 py-0 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.OTHERS ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">Parent's Umrah</button>
                <button id="create-plan-btn-header" class="flex items-center justify-center bg-[#E5EDF3] px-3 ml-3 py-1 rounded-full transition-all">
                    <i data-lucide="plus" color="#1E3A6D" width="12"></i>
                </button>
            </div>
        </div>
        `;
    }

    // Empty State
    if (state.plansList.length === 0) {
        html += `
            <div class="  px-5 mt-10 text-center">
                <div class="bg-[#F4F8FB] rounded-md p-4 flex flex-col items-center justify-center">
                    <img src="assets/svgs/empty_plans.svg" alt="No Plans" class="w-[50px] mb-4" onerror="this.src='https://placehold.co/200x200?text=No+Plans'">
                    <h5 class="text-lg font-bold text-primary text-[#1E3A6D] mb-2">Your Journey Begins</h5>
                    <p class="text-sm text-[#627497] mb-6">Start planning your spiritual trip today. Create a personalized savings plan taht fits your life.</p>
                    <button id="create-plan-btn-main" class="bg-primary text-white px-5 py-2.5 rounded-lg shadow-md text-sm font-semibold" style="background-color: #1E3A6D;">
                      +  Start New Plan
                    </button>
                </div>
            </div>
        `;
    } else {
        // Plans List
        html += `
            <div class="px-5">
                <h5 class="text-lg font-bold text-primary text-[#1E3A6D]">Your Plans</h5>
            </div>
        `;
        state.plansList.forEach((plan, index) => {
            html += `
                <div class="px-5">
                    <div class="bg-[#F4F8FB] rounded-3xl p-4 shadow-sm border border-gray-100 mb-6">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h6 class="text-normal font-bold text-primary text-[#1E3A6D]">${plan.name}</h6>
                                <span class="text-sm text-[#627497]">${plan.date}</span>
                            </div>
                            <span class="text-xs bg-[#E6FBDE] text-[#41AB13] px-2 rounded-md">Active</span>
                        </div>
                        <small class="flex justify-between items-center">
                            <p class="font-bold text-xs text-[#627497]">Progress</p>
                            <p class="font-bold text-xs text-[#627497]">${plan.progress}%</p>
                        </small>
                        <div class="w-full bg-gray-100 h-1.5 rounded-full my-2 overflow-hidden">
                            <div class="bg-primary h-full w-1/2 rounded-full" style="width: ${plan.progress}%; background-color: #1E3A6D;"></div>
                        </div>
                        <small class="flex justify-between items-center">
                            <p class="font-normal text-xs text-[#627497]">PKR ${plan.paid.toLocaleString()} Paid</p>
                            <p class="font-normal text-xs text-[#627497]">Goal: ${plan.goal.toLocaleString()}</p>
                        </small>
                        <button class="w-full mt-4 border border-[#BFD3E0] text-primary py-3.5 rounded-xl font-bold hover:bg-primary-light hover:text-white flex items-center justify-center space-x-2 text-sm transition-colors text-[#1E3A6D]">
                            View Details
                        </button>
                    </div>
                </div>
            `;
        });
    }

    div.innerHTML = html;

    // Event Listeners
    const createBtnHeader = div.querySelector('#create-plan-btn-header');
    if (createBtnHeader) createBtnHeader.addEventListener('click', () => { state.isCreatingPlan = true; renderApp(); });

    const createBtnMain = div.querySelector('#create-plan-btn-main');
    if (createBtnMain) createBtnMain.addEventListener('click', () => { state.isCreatingPlan = true; renderApp(); });

    return div;
}