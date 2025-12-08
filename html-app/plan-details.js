function renderPlanDetails(plan) {

    const div = document.createElement('div');
    div.className = "bg-white";
       // Header
    let html = `
        <div class="px-3 border-b border-gray-100 pb-2">
            <div class="flex justify-between items-center">
                <h1 class="text-lg font-bold text-gray-800">My Journey</h1>
                <div class="flex space-x-3">
                    <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50">
                        <i data-lucide="bell" color="black" width="20"></i>
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
                <button onclick="setPlansMode('${UmrahPlan.OVERVIEW}')" class="px-4 py-1 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.OVERVIEW ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">Overview</button>
                <button onclick="setPlansMode('${UmrahPlan.UMRAH}')" class="px-4 py-1 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.UMRAH ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">My Umrah 2025</button>
                <button onclick="setPlansMode('${UmrahPlan.OTHERS}')" class="px-4 py-1 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.OTHERS ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">Parent's Umrah</button>
                <button id="create-plan-btn-header" class="flex items-center justify-center bg-[#E5EDF3] px-3 ml-3 py-1 rounded-full transition-all">
                    <i data-lucide="plus" color="#1E3A6D" width="12"></i>
                </button>
            </div>
        </div>
        `;
    }


    let secondDiv = `
        <div class="mb-4 p-5 rounded-2xl shadow min-h-screen flex flex-col">
            <div class="flex justify-between items-center mb-3">
                <h2 class="font-bold text-[#1E3A6D] text-lg">${plan.name} ${plan.year || ''}</h2>
            </div>

            <div class="flex justify-between bg-[#F4F8FB] rounded-xl p-4 mb-6">
                <div>
                    <p class="text-[#627497] text-sm">Total Saved</p>
                    <p class="font-bold text-xl text-[#1E3A6D]">PKR ${plan.paid.toLocaleString()}</p>
                </div>
                <div class="text-right">
                    <p class="text-[#627497] text-sm">Goal Amount</p>
                    <p class="font-bold text-xl text-[#1E3A6D]">PKR ${plan.goal.toLocaleString()}</p>
                </div>
            </div>

            <div class="bg-[#F4F8FB] p-4 rounded-xl mb-6">
                <div class="flex justify-between items-center py-3 mb-4">
                    <div class="flex items-center space-x-3">
                        <img src="assets/svgs/fast.svg" alt="Progress" class="w-10 h-10" onerror="this.src='https://placehold.co/64x64?text=Progress'">
                        <div>
                            <h3 class="font-bold text-md text-[#1E3A6D]">Pay early & save 2% instantly!</h3>
                            <span class="text-xs text-[#627497]">Unlock 2x Rewards & Priority</span>
                        </div>
                    </div>
                    <img src="assets/svgs/ArrowRight.svg" alt="Rewards" class="w-5 h-5"  onerror="this.src='https://placehold.co/64x64?text=Rewards'">
                </div>
                <div class="flex justify-between items-center mb-3">
                    <div>
                        <p class="text-[#627497] text-sm font-semibold">Upcoming payment</p>
                        <p class="text-[#1E3A6D] font-bold text-lg">PKR 25,000</p>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <p class="w-max h-min text-xs text-[#DC6E2A] bg-[#FFEADC] px-1 py-0 flex items-center gap-1"><i data-lucide="clock" color="#DC6E2A" width="10"></i> Due 11/11/2025</p>
                        <button onclick="openEditScheduleModal(${plan.id})"  class="mt-2 bg-[#F1FDFA] border border-[#24B3BA] rounded-xl py-1 px-3 text-sm font-semibold text-[#24B3BA] hover:bg-gray-50">Edit Schedule</button>
                    </div>
                </div>
                <div class="flex justify-between space-x-1 pt-4">
                    <button class="bg-transparent border border-[#DFE8EE] rounded-xl py-3 px-6 text-sm font-semibold text-[#1E3A6D] hover:bg-gray-50">Skip Month</button>
                    <button class="bg-[#E7EDF1] border border-[#DFE8EE] rounded-xl py-3 px-6 text-sm font-semibold text-[#1E3A6D] hover:bg-gray-50">Merge & Pay</button>
                    <button class="bg-primary text-white rounded-xl py-3 px-6 font-semibold text-sm hover:bg-[#16315b]">Pay Now</button>
                </div>
            </div>

            <div>
                <h3 class="font-bold text-[#1E3A6D] mb-4">Transaction History</h3>
                ${plan.transactions.map(tx => `
                    <div class="flex justify-between items-start">
                        <div class="w-5 ">
                            <img src="assets/svgs/check.svg" alt="check" class="">
                            <div class="border-l border-dashed h-24 ml-1"></div>
                        </div>
                        <div class="w-96 mb-4 p-4 rounded-xl bg-[#F4F8FB] shadow-sm">
                            <div class="flex justify-between mb-2 items-center">
                                <div>
                                    <p class="font-semibold text-sm text-[#1E3A6D]">${tx.title}</p>
                                    <p class="text-[#627497] text-xs mb-3">${tx.date}</p>
                                </div>

                                <div>
                                    <p class="text-xs text-right flex items-center gap-2 w-max px-2 text-[#41AB13] bg-[#E6FBDE] font-semibold"><i data-lucide="check" color="#41AB13" width="10"></i>${tx.status === 'paid' ? 'Paid' : ''}</p>
                                    <p class="font-bold text-right text-[#24B3BA]">PKR ${tx.amount.toLocaleString()}</p>
                                </div>

                            </div>
                    
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    div.innerHTML = html + secondDiv;

    return div;

}


function openEditScheduleModal(planId) {
    const plan = state.plansList.find(p => p.id === planId);

    if (!plan) return;

    renderInstallmentsModal(plan);

    document.getElementById("edit-schedule-modal").classList.remove("hidden");
}


function closeEditScheduleModal() {
    document.getElementById("edit-schedule-modal").classList.add("hidden");
}
function renderInstallmentsModal(plan) {
    const container = document.getElementById("installment-list");

    container.innerHTML = plan.installments.map((i, index) => `
        <div class=" mb-4 p-4 rounded-xl bg-[#F4F8FB] shadow-sm">
            <div class="flex justify-between mb-2 items-center">
                <div>
                    <p class="font-semibold text-sm text-[#1E3A6D]">Installment ${index + 1}</p>
                    <p class="text-[#627497] text-xs mb-3">${i.date}</p>
                </div>

                <div>
                    <p class="text-xs text-right flex items-center gap-2 w-max px-2 text-[#41AB13] bg-[#E6FBDE] font-semibold"><i data-lucide="check" color="#41AB13" width="10"></i>${i.status === 'paid' ? 'Paid' : 'Unpaid'}</p>
                    <p class="font-bold text-right text-[#24B3BA]">PKR ${i.amount.toLocaleString()}</p>
                </div>

            </div>
           

            <div class="flex justify-between items-center mt-2">

                 <div class="flex justify-between space-x-1 pt-4">
                    <button class="bg-transparent border border-[#DFE8EE] rounded-xl py-3 px-6 text-sm font-semibold text-[#1E3A6D] hover:bg-gray-50">Skip Month</button>
                    <button class="bg-[#E7EDF1] border border-[#DFE8EE] rounded-xl py-3 px-6 text-sm font-semibold text-[#1E3A6D] hover:bg-gray-50">Merge & Pay</button>
                    <button class="bg-primary text-white rounded-xl py-3 px-6 font-semibold text-sm hover:bg-[#16315b]">Pay Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

