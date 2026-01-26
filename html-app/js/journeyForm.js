const state = {
    wizardStep: 1,
    isUpgraded: localStorage.getItem('isUpgraded') === 'true',
    wizardData: {
        journeyName: '',
        departureCity: 'Karachi',
        pilgrims: [1, 0, 0], // Adult, Child, Infant
        year: 2025,
        month: 'Jan 2025',
        duration: 14,
        estimatedCost: 250000,
        budget: 250000, // Initialize budget
        budgetPlan: 'Standard', // Default plan
        otp: ['', '', '', ''],
        useIhramPoints: true
    },
    error: ''
};

const steps = ['Home', 'City', 'Pilgrims', 'Duration', 'Budget', 'Payment'];

const CITIES = ["Karachi", "Lahore", "Islamabad", "Multan", "Quetta", "Peshawar"];

const PILGRIM_TYPES = [
    { label: 'Adults', sub: '12+ years', index: 0 },
    { label: 'Children', sub: '2-11 years', index: 1 },
    { label: 'Infants', sub: 'Under 2 years', index: 2 }
];

const YEARS = [2025, 2026, 2027, 2028];
const MONTHS = ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025"];

const DURATIONS = [
    { days: 7, label: "7 Days", icon: "assets/svgs/calender.svg" },
    { days: 14, label: "14 Days", icon: "assets/svgs/star.svg", popular: true },
    { days: 21, label: "21 Days", icon: "assets/svgs/premium.svg" }
];



// Helper to format currency
const formatPKR = (amount) => `PKR ${amount.toLocaleString()}`;

function renderApp() {
    const headerEl = document.getElementById('header');
    const appEl = document.getElementById('app');

    if (headerEl) headerEl.innerHTML = renderHeader();
    if (appEl) appEl.innerHTML = renderWizardStep();

    if (window.lucide) window.lucide.createIcons();
}

function renderHeader() {
    const progress = (state.wizardStep / steps.length) * 100;
    return `
        <div class="px-4 pt-2 pb-4">
            <div class="flex justify-between items-center mb-6">
                <div class="flex items-center gap-3">
                    <button id="menu-btn" class="w-10 h-10 rounded-full bg-[#F1F6FA] flex items-center justify-center text-primary">
                        <i data-lucide="menu" width="20"></i>
                    </button>
                    <div class="w-[1px] h-6 bg-gray-200"></div>
                    <h2 class="text-[#1E3A6D] font-bold text-[14px] tracking-tight">Your Umrah Overview</h2>
                </div>
                <div class="bg-[#24B2B9] pl-3 pr-4 py-2 rounded-full flex items-center gap-1 shadow-sm">
                    <span class="text-white font-bold text-sm leading-none">${state.isUpgraded ? '120' : '0'}+</span>
                    <span class="text-white text-[10px] font-medium leading-none">Points</span>
                </div>
            </div>
            
            ${state.wizardStep < 7 ? `
            <div class="space-y-4">
                <div class="flex justify-between px-1">
                    ${steps.map((step, i) => {
        const isActive = state.wizardStep === (i + 1);
        return `<span class="text-[10px] font-extrabold ${isActive ? 'text-primary' : 'text-gray-300'} transition-colors">${step}</span>`;
    }).join('')}
                </div>
                <div class="relative h-3 bg-gray-50 rounded-full mx-1">
                    <div class="absolute inset-y-0 left-0 bg-[#24B2B9] rounded-full transition-all duration-500 ease-out" style="width: ${progress}%"></div>
                    <div class="absolute inset-0 flex items-center">
                        ${steps.map((_, i) => {
        const stepNum = i + 1;
        const isReached = stepNum <= state.wizardStep;
        return `
                                <div class="flex-1 flex justify-center">
                                    <div class="w-3 h-3 rounded-full border-[2px] transition-all z-10 
                                        ${isReached ? 'bg-white border-[#24B2B9] shadow-sm' : 'bg-white border-transparent'}">
                                    </div>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>
            </div>` : ''}
        </div>
    `;
}

function setWizardStep(step) {
    if (step > state.wizardStep) {
        if (!validateStep(state.wizardStep)) return;
    }
    state.error = '';
    state.wizardStep = step;

    // Scroll to top
    const appEl = document.getElementById('app');
    if (appEl) appEl.scrollTop = 0;

    renderApp();
}

function validateStep(step) {
    state.error = '';
    if (step === 1) {
        if (!state.wizardData.journeyName.trim()) {
            state.error = 'Please enter a name for your journey';
            renderApp();
            return false;
        }
    }
    if (step === 3) {
        if (state.wizardData.pilgrims[0] < 1) {
            state.error = 'At least one adult pilgrim is required';
            renderApp();
            return false;
        }
    }
    return true;
}

function setWizardData(key, value) {
    state.wizardData[key] = value;
    if (key === 'estimatedCost') {
        state.wizardData.budget = value; // Sync budget with estimated cost
    }
    state.error = '';
    renderApp();
}

function updatePilgrims(index, delta) {
    state.wizardData.pilgrims[index] = Math.max(0, state.wizardData.pilgrims[index] + delta);
    state.error = '';
    renderApp();
}

// Step Header Template
const stepHeader = (title, backStep) => `
    <div class="px-5 py-3 flex items-center gap-4 border-b border-[#DEE5F1]">
        <button onclick="${backStep ? `setWizardStep(${backStep})` : 'window.history.back()'}" class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 transition-transform">
            <i data-lucide="chevron-left" width="16"></i>
        </button>
        <h2 class="font-semibold text-md text-primary">${title}</h2>
    </div>
`;

function renderWizardStep() {
    const { wizardStep, wizardData } = state;

    switch (wizardStep) {
        case 1: return renderStep1(wizardData);
        case 2: return renderStep2(wizardData);
        case 3: return renderStep3(wizardData);
        case 4: return renderStep4(wizardData);
        case 5: return renderStep5(wizardData);
        // case 6 removed
        case 7: return renderStep7(wizardData);
        case 8: return renderStep8(wizardData); // Payment Timeline View
        case 9: return renderStep9(wizardData); // Payment Action
        case 10: return renderStep10(wizardData); // OTP
        case 11: return renderStep11(wizardData); // Modify Plan
        case 12: return renderStep12(wizardData); // Success
        default: return '';
    }
}

function renderStep1(data) {
    return `
        ${stepHeader('Give Your Umrah Journey A Name')}
        <div class="px-4 pt-8 space-y-6">
            <div class="bg-white rounded-3xl p-4 border border-[#DEE5F1] space-y-2 shadow-xl shadow-blue-100/20">
                <input type="text" 
                    class="w-full bg-[#F7F7F7] border-none rounded-xl p-4 text-base font-semibold text-primary placeholder:text-gray-300 focus:ring-1 focus:ring-primary outline-none transition-all" 
                    placeholder="e.g. My Umrah"
                    value="${data.journeyName}"
                    oninput="state.wizardData.journeyName = this.value; state.error = ''; document.getElementById('step1-error').innerText = '';">
                
                <p id="step1-error" class="text-red-500 text-xs mt-1 font-medium">${state.error}</p>

                <button onclick="setWizardStep(2)" class="w-full bg-primary text-white py-3 rounded-3xl text-base font-bold hover:bg-primary-light active:scale-[0.98] transition-all">
                    Bismillah
                </button>
            </div>
        </div>
    `;
}

function renderStep2(data) {
    return `
        ${stepHeader('Choose your departure City', 1)}
        <div class="px-5 pt-8 space-y-6 ">
            <div class="border border-[#DEE5F1] shadow-xl shadow-blue-100/20 rounded-3xl p-4">
            <div class="grid grid-cols-2 gap-4 ">
                    ${CITIES.map(city => `
                        <button onclick="setWizardData('departureCity', '${city}')" 
                        class="py-3 px-4 rounded-xl border flex items-center justify-between text-sm font-bold transition-all
                        ${data.departureCity === city ? 'bg-[#24B2B9] text-white border-transparent scale-[1.02]' : 'bg-[#F7F7F7] text-primary/80 border-gray-100 hover:border-gray-200'}">
                            ${city}
                        <i data-lucide="circle-check" width="16" class="ml-2 text-white ${data.departureCity === city ? 'block' : 'hidden'}"></i>
                        </button>
                    `).join('')}
                </div>
            <div class="flex justify-between gap-4 pt-6">
                <button onclick="setWizardStep(1)" class="w-1/3 py-3 rounded-3xl border border-gray-100 text-sm font-bold text-primary/80 hover:bg-gray-50 transition-colors">Back</button>
                <button onclick="setWizardStep(3)" class="w-1/3 bg-primary text-white py-3 rounded-3xl text-sm font-bold  hover:bg-primary-light active:scale-[0.98] transition-all">Next</button>
                </div>
            </div>
        </div>
    `;
}

function renderStep3(data) {
    return `
        ${stepHeader('Number Of Pilgrims', 2)}
        <div class="px-5 pt-8 space-y-6">
            <div class="border border-[#DEE5F1] shadow-xl shadow-blue-100/20 rounded-3xl p-4">
                <div class="space-y-4">
                    ${PILGRIM_TYPES.map(t => `
                    <div class="bg-[#F7F7F7] p-5 rounded-2xl border border-gray-50 flex items-center justify-between shadow-sm">
                            <div>
                            <h4 class="= text-primary text-base">${t.label}</h4>
                                <p class="text-[11px] text-primary/80 font-medium">${t.sub}</p>
                            </div>
                        <div class="flex items-center gap-3">
                            <button onclick="updatePilgrims(${t.index}, -1)" class="w-6 h-6 rounded-full  flex items-center justify-center text-[#24B2B9] border border-[#24B3BA] hover:bg-[#24B3BA] hover:text-white"><i data-lucide="minus" width="14"></i></button>
                            <span class="bg-[#24B3BA] text-lg  text-white w-6 h-6 rounded-full flex items-center justify-center text-center">${data.pilgrims[t.index]}</span>
                            <button onclick="updatePilgrims(${t.index}, 1)" class="w-6 h-6 rounded-full  flex items-center justify-center text-[#24B2B9] border border-[#24B3BA] hover:bg-[#24B3BA] hover:text-white"><i data-lucide="plus" width="14"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p id="step3-error" class="text-red-500 text-xs mt-3 font-medium text-center">${state.error}</p>
            <div class="flex justify-between gap-4 pt-6">
                <button onclick="setWizardStep(2)" class="w-1/3 py-3 rounded-3xl border border-gray-100 text-sm font-bold text-primary/80">Back</button>
                <button onclick="setWizardStep(4)" class="w-1/3 bg-primary text-white py-3 rounded-3xl text-sm font-bold ">Next</button>
                </div>
            </div>
        </div>
    `;
}

function renderStep4(data) {
    return `
        ${stepHeader('Travel Month', 3)}
        <div class="px-5 py-5 space-y-3">
            <div class="flex gap-3 justify-center">
                ${YEARS.map(y => `<button onclick="setWizardData('year', ${y})" class="px-3 py-1 rounded-full text-[12px] transition-all ${data.year === y ? 'bg-[#24B2B9] text-white ' : 'bg-[#F7F7F7] text-primary/80'}">${y}</button>`).join('')}
            </div>
            <div class="border py-5 border-[#DEE5F1] shadow-xl shadow-blue-100/20 rounded-3xl p-2">

            <div class="grid grid-cols-3 gap-3">
                ${MONTHS.map(m => `<button onclick="setWizardData('month', '${m}')" class="py-3 px-2 rounded-xl text-[14px] transition-all ${data.month === m ? 'bg-[#24B2B9] text-white shadow-md' : 'bg-[#F7F7F7] text-primary/80 border border-gray-50'}">${m}</button>`).join('')}
            </div>
            <h3 class="text-lg text-primary font-bold pt-4 pb-4">Umrah Duration</h3>
            <div class="grid grid-cols-3 gap-3 pt-4">
                ${DURATIONS.map(d => `
                    <button onclick="setWizardData('duration', ${d.days})" class="p-4 rounded-[24px] relative border flex flex-col font-normal items-center gap-3 transition-all ${data.duration === d.days ? 'bg-[#24B2B9] text-[#F7F7F7] border-transparent' : 'bg-[#F7F7F7] text-primary/80 border-gray-50'}">
                        ${d.popular ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2  bg-[#FFD700] text-primary  text-[8px] font-black px-3 py-1 rounded-full shadow-md">POPULAR</span>' : ''}
                        <img src="${d.icon}"/>
                        <span class="text-[14px] ">${d.label}</span>
                    </button>
                `).join('')}
            </div>
            <div class="flex justify-between gap-4 pt-6">
                <button onclick="setWizardStep(3)" class="w-1/3 py-3 rounded-3xl border border-gray-100 text-sm font-bold text-primary/80">Back</button>
                <button onclick="setWizardStep(5)" class="w-2/3 bg-primary text-white py-3 rounded-3xl text-sm font-bold">Continue the Journey</button>
                </div>
            </div>
        </div>
    `;
}

function renderStep5(data) {
    const progressPercentage = ((data.estimatedCost - 150000) / (1000000 - 150000)) * 100;
    return `
        ${stepHeader('Set Budget Range', 4)}
        <div class="px-5 pt-8 space-y-4 pb-10">
            <div class="relative banner-gradient rounded-2xl p-3 text-white overflow-hidden text-center">
                <p class="text-[14px] mb-2 font-medium tracking-wide">Estimated Umrah Cost</p>
                <div class="flex items-baseline justify-center gap-2 mb-2">
                    <span class="text-sm font-bold opacity-80">PKR</span>
                    <span class="text-4xl font-black tracking-tight">${data.estimatedCost.toLocaleString()}</span>
                    <span class="text-sm opacity-80 ml-1">/ Total</span>
                </div>
                <div class="px-2">
                    <input type="range" 
                        min="150000" max="1000000" step="10000" 
                        value="${data.estimatedCost}" 
                        oninput="state.wizardData.estimatedCost = parseInt(this.value); renderApp();" 
                        style="--progress: ${progressPercentage}%"
                        class="cursor-pointer">
                </div>
                <div class="flex justify-between items-center text-[12px] opacity-90">
                    <span>Budget</span>
                    <span>Economy</span>
                    <span>Premium</span>
                </div>
                
            </div>
            <button onclick="setWizardStep(7)" class="w-full bg-primary text-white py-3 rounded-3xl text-lg font-bold active:scale-[0.98] transition-all">Continue</button>
        </div>
    `;
}



function renderStep7(data) {
    return `
        ${stepHeader('Package Summary', 5)}
        <div class="bg-white p-5 rounded-lg shadow-sm  space-y-5">
            <div class="bg-white p-5 rounded-lg border shadow-sm space-y-6">
                <div>
                    <h2 class="font-bold text-primary text-center text-lg m-0">Package Summary</h2>
                    <h4 class="text-md font-bold text-primary m-0 my-2"> Umrah Package</h4>
                </div>
                                            
                <div class="grid grid-cols-2 gap-4">   
                    <div class="text-sm text-[#627497] flex items-center gap-2">
                        <div class="p-2 bg-[#EDF5F9] rounded-lg">
                            <img class="w-4 h-4 " src="assets/svgs/AirplaneTilt.svg"/> 
                        </div>
                        <div>
                            <p class="text-[#24B3BA]">Departure City</p>
                            <p>${data.departureCity}</p>
                        </div>
                    </div> 
                    <div class="text-sm text-[#627497] flex items-center gap-2">
                        <div class="p-2 bg-[#EDF5F9] rounded-lg">
                            <img class="w-4 h-4" src="assets/svgs/User.svg"/> 
                        </div>
                        <div>
                            <p class="text-[#24B3BA]"> Number of travelers</p>
                            <p> ${data.pilgrims[0]} Adult, ${data.pilgrims[1]} Child</p>
                        </div>
                    </div>
                    <div class="text-sm text-[#627497] flex items-center gap-2">
                        <div class="p-2 bg-[#EDF5F9] rounded-lg">
                            <img class="w-4 h-4" src="assets/svgs/CalendarDots.svg"/> 
                        </div>
                        <div>
                            <p class="text-[#24B3BA]"> Travel Month</p>
                            <p> ${data.month}</p>
                        </div>
                    </div>
                    <div class="text-sm text-[#627497] flex items-center gap-2">
                        <div class="p-2 bg-[#EDF5F9] rounded-lg">
                            <img class="w-4 h-4" src="assets/svgs/Seat.svg"/> 
                        </div> 
                        <div>
                            <p class="text-[#24B3BA]"> Cabin class </p>
                            <p> ${data.budgetPlan} </p>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <span class="bg-[#F7F7F7] w-1/2 text-center rounded-xl mt-3 text-sm px-2 py-2 text-primary">Makkah 5 Nights</span>
                    <span class="bg-[#F7F7F7] w-1/2 text-center rounded-xl mt-3 text-sm px-2 py-2 text-primary">Madinah 5 Nights</span>
                </div>
                <div class="flex justify-between gap-2 mt-4">

                    <button onclick="setWizardStep(8)"  class="w-full bg-[#1E3A6D] text-white py-3 rounded-3xl font-semibold">
                        Confirm & Continue
                </button>
                </div>
            </div>
        </div>
    `;
}

function renderStep8(data) {
    // Generate dummy breakdown data based on start date
    const monthlyBreakdown = [
        { date: 'Jan 2025', amount: 25000 },
        { date: 'Feb 2025', amount: 25000 },
        { date: 'Mar 2025', amount: 25000 },
        { date: 'Apr 2025', amount: 25000 },
        { date: 'May 2025', amount: 25000 },
        { date: 'Jun 2025', amount: 25000 },
    ];

    const budgetData = {
        totalBudget: data.budget,
        monthlyBudget: Math.round(data.budget / 12),
        departure: data.departureCity,
        travelers: data.pilgrims.reduce((a, b) => a + b, 0),
        targetDate: data.month,
        monthlyBreakdown: monthlyBreakdown
    };

    return `
    ${stepHeader('Total Budget', 7)}
    <div class="px-4 pt-3 pb-10">
        <div class="">
            <div class="flex justify-between items-center mb-2">
                <div>
                    <p class="text-[#627497] text-xs">Total Budget</p>
                    <p class="font-bold text-primary text-lg">${formatPKR(budgetData.totalBudget)}</p>
                </div>
                <div class="text-right">
                    <p class="text-[#627497] text-sm">Monthly (12mo)</p>
                    <p class="text-[#24B3BA] font-semibold">~ ${formatPKR(budgetData.monthlyBudget)}</p>
                </div>
            </div>
            <div class="w-full bg-white mt-5 p-4 rounded-lg border shadow-sm border-gray-100 ">

                    <div class="flex justify-between  gap-1 text-xs mt-3">
                        <span class="bg-[#F7F7F7] px-2 py-1 rounded-lg  text-[#627497]">Departure: <span class="font-bold"> ${budgetData.departure} </span></span>
                        <span class="bg-[#F7F7F7] px-2 py-1 rounded-lg text-[#627497]">Travelers: <span class="font-bold">${budgetData.travelers} Persons </span></span>
                        <span class="bg-[#F7F7F7] px-2 py-1  rounded-lg text-[#627497]">Target Date: <span class="font-bold">${budgetData.targetDate}</span></span>
                    </div>
            

                <h3 class="font-semibold text-primary my-3">Monthly Breakdown</h3>
                <div class="grid grid-cols-3 gap-3 mb-5">
                    ${budgetData.monthlyBreakdown.map((item, index) => `
                        <div class="${index === 0 ? 'bg-[#24B3BA] text-white' : 'bg-gray-100 text-[#627497]'} p-3 rounded-3xl text-center">
                            <p class="text-sm">${item.date}</p>
                            <p class="font-bold ${index === 0 ? 'text-white' : ''}">${formatPKR(item.amount)}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="flex gap-3">
                    <button onclick="setWizardStep(11)" class="w-1/2 bg-white border border-gray-100 text-primary py-3 rounded-3xl font-bold hover:bg-gray-200 transition">
                        Modify my plan
                    </button>
                    <button onclick="setWizardStep(9)" class="w-1/2 bg-[#1E3A6D] text-white py-3 rounded-3xl font-bold hover:bg-[#16315b] transition">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderStep11(data) { // Modify Plan View
    return `
    ${stepHeader('Modify Installment Details', 8)}
        <div class="px-5">
                <div class="flex justify-between items-end justify-end mb-4">
                <span class="text-xs text-gray-500">5 Total</span>
                </div>

            <div class="space-y-3 bg-white  rounded-xl">
                <!-- Header Row -->
                <div class="flex justify-between text-xs text-gray-400 px-4 mb-2">
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Manage</span>
                </div>

                <!-- Editable Item -->
                <div class="flex bg-[#F4F8FB] justify-between items-center p-4 rounded-xl ">
                    <div>
                        <p class="font-bold text-[#1E3A6D] text-sm">07th March</p>
                        <sup class="text-[10px] text-[#24B3BA] font-semibold px-1.5 py-0.5 rounded">SCHEDULED</sup>
                    </div>
                    <div>
                            <div class="border border-[#BFD3E0] rounded-lg px-2 py-1.5 flex items-center bg-white ">
                            <span class="text-[10px] text-gray-500 mr-1">PKR</span>
                            <input type="text" value="10,000" class="w-12 bg-transparent text-sm font-bold text-[#1E3A6D] focus:outline-none text-right">
                        </div>
                    </div>
                    <button class="bg-[#24B3BA] text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold shadow-sm hover:bg-[#1e959b]">
                        <i data-lucide="check-circle" width="12"></i> Save
                    </button>
                </div>

                    <!-- Readonly Item -->
                <div class="flex justify-between items-center bg-white p-4 rounded-xl ">
                    <div>
                        <p class="font-bold text-[#1E3A6D] text-sm">07th March</p>
                        <sup class="text-[10px] text-[#24B3BA] font-semibold  px-1.5 py-0.5 rounded">SCHEDULED</sup>
                    </div>
                    <div>
                            <p class="font-bold text-[#1E3A6D] text-sm">10,000</p>
                            <p class="text-[10px] text-gray-400">UPCOMING</p>
                    </div>
                    <button class="text-[#627497] bg-gray-50 border border-gray-200 text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100">
                        Modify
                    </button>
                </div>
                    <!-- Readonly Item -->
                <div class="flex justify-between items-center bg-white p-4 rounded-xl ">
                    <div>
                        <p class="font-bold text-[#1E3A6D] text-sm">07th March</p>
                        <sup class="text-[10px] text-[#24B3BA] font-semibold px-1.5 py-0.5 rounded">SCHEDULED</sup>
                    </div>
                    <div>
                            <p class="font-bold text-[#1E3A6D] text-sm">10,000</p>
                            <p class="text-[10px] text-gray-400">UPCOMING</p>
                    </div>
                    <button class="text-[#627497] bg-gray-50 border border-gray-200 text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100">
                        Modify
                    </button>
                </div>
                    <!-- Readonly Item -->
                <div class="flex justify-between items-center bg-white p-4 rounded-xl ">
                    <div>
                        <p class="font-bold text-[#1E3A6D] text-sm">07th March</p>
                        <sup class="text-[10px] text-[#24B3BA] font-semibold px-1.5 py-0.5 rounded">SCHEDULED</sup>
                    </div>
                    <div>
                            <p class="font-bold text-[#1E3A6D] text-sm">10,000</p>
                            <p class="text-[10px] text-gray-400">UPCOMING</p>
                    </div>
                    <button class="text-[#627497] bg-gray-50 border border-gray-200 text-xs px-3 py-1.5 rounded-3xl font-bold hover:bg-gray-100">
                        Modify
                    </button>
                </div>
            </div>

            <div class="mt-6 mb-6">
                <h4 class="font-bold text-[#1E3A6D] text-sm mb-2">Payment Summary:</h4>
                <ul class="text-xs text-gray-500 space-y-1 ml-4 list-disc mb-4">
                    <li>Down Payment: <span class="font-bold text-[#1E3A6D]">PKR 25,000</span></li>
                    <li>Remaining Payment Method: Will be paid later after confirmation</li>
                    <li>Payment Method: Zindigi Wallet (Auto-selected)</li>
                </ul>
                
                <div class="lucky-draw p-3 rounded-lg text-[10px] text-[#3B6F67] mb-6">
                    <span class="font-bold">Note:</span> This amount will be deducted instantly from your Zindigi Wallet.
                </div>
                <div class="flex justify-between items-center">
                    <div class="w-1/2">
                        <span class="text-[#1E3A6D] text-sm">Total Package</span>
                        <h5 class="font-bold text-[#1E3A6D] text-md">PKR 212K</h5>
                    </div>
                    <button onclick="setWizardStep(9)" class="w-1/2 bg-[#1E3A6D] text-white py-3 rounded-xl font-bold hover:bg-[#16315b] transition flex justify-center px-6 items-center">
                    <span class="text-md">Pay Now</span>
                </button>
                </div>  

                
            </div>
        </div>
        `;

}

function renderStep9(data) {
    const availablePoints = 1249;
    return `
        ${stepHeader('Pay Your Installment', 8)}
        <div class="px-5 pt-4 space-y-4 pb-10">
            <div class="bg-white shadow-premium rounded-3xl p-3 space-y-6">
                <div class="space-y-2">
                    <h3 class="font-bold text-primary text-xl">Complete Your Payment</h3>
                    <p class="text-sm text-primary/80 font-medium leading-relaxed">To confirm your Umrah package, please pay the required amount using your Zindigi Account.</p>
                </div>
                
                
                <div class="bg-[#F5F5F5] p-4 rounded-2xl space-y-4">
                    <div class="flex justify-between items-center px-1">
                        <span class="text-sm text-primary/80">Monthly Installment:</span>
                        <span class="text-sm font-bold text-primary">PKR 25,000</span>
                    </div>
                    <div class="bg-[#24B2B9] rounded-xl p-3 flex justify-between items-center text-white relative overflow-hidden">
                        <div class="flex items-center gap-3 relative z-10">
                            <div class="flex items-center justify-center">
                                <i data-lucide="crown" width="18" class="text-white"></i>
                            </div>
                            <div>
                                <p class="text-sm font-bold">Use Ihram Points</p>
                                <p class="text-[10px] opacity-80">Available Points: ${availablePoints}</p>
                            </div>
                        </div>
                        <button onclick="setWizardData('useIhramPoints', ${!data.useIhramPoints})" 
                            class="w-10 h-5 rounded-full relative transition-colors duration-300 ${data.useIhramPoints ? 'bg-white' : 'bg-white/30'}">
                            <div class="absolute top-1 left-1 w-3 h-3 rounded-full transition-transform duration-300 ${data.useIhramPoints ? 'translate-x-5 bg-[#24B2B9]' : 'bg-white'}"></div>
                        </button>
                    </div>
                </div>

                <div class=" ">
        
                    <div class="bg-[#F5F5F5] p-3 rounded-xl">
                        <p class="text-sm text-gray-500 font-medium"><strong>Note:</strong> This amount will be deducted instantly from your Ihram Account.</p>
                    </div>
                    <div class="flex justify-between border-t border-gray-100 items-center mb-4 mt-4">
                        <span class="text-sm text-primary/80">Total  amount:</span>
                        <div class="text-right">
                            <span class="text-[10px] font-bold text-primary mr-1">PKR</span>
                            <span class="text-2xl font-bold text-primary">15,000</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3 pt-2">
                    <label class="relative flex items-center cursor-pointer">
                        <input type="checkbox"  class="w-5 h-5 border-2 border-[#24B2B9] rounded peer-checked:bg-[#24B2B9] flex items-center justify-center transition-all" checked>
                    </label>
                    <span class="text-sm text-primary/80">I agree to the terms & conditions.</span>
                </div>

                <div class="flex justify-between gap-4 pt-2">
                    <button onclick="setWizardStep(5)" class="w-1/2 py-3 border border-gray-200 rounded-3xl text-primary/80 font-bold text-sm tracking-wide">Cancel</button>
                    <button onclick="setWizardStep(10)" class="w-1/2 py-3 bg-primary text-white rounded-3xl font-bold text-sm tracking-wide">Pay Securely</button>
                </div>
            </div>
        </div>
    `;
}

function renderStep10(data) {
    return `
        ${stepHeader('OTP Verification', 9)}
        <div class="px-4 pt-6">
            <div class="bg-white border border-[#DEE5F1] shadow-sm rounded-[32px] p-6 space-y-8">
                <div class="space-y-2">
                    <h3 class="font-bold text-primary text-lg">Enter Verification Code</h3>
                    <p class="text-sm text-primary/80 font-medium leading-relaxed">A 4-digit code has been sent to your mobile number. Enter it below to confirm your payment.</p>
                </div>
                
                <div class="bg-[#F5F5F5] p-6 rounded-2xl flex justify-center gap-3">
                    ${[0, 1, 2, 3].map(i => `
                        <input type="text" maxlength="1" 
                            class="w-12 h-14 bg-white border border-gray-50 rounded-xl text-center text-xl font-bold text-primary shadow-sm focus:border-primary outline-none transition-all" 
                            value="${data.otp[i]}" 
                            oninput="state.wizardData.otp[${i}] = this.value; if(this.value && this.nextElementSibling) this.nextElementSibling.focus()">
                    `).join('')}
                </div>
                
                <div class="text-left">
                    <p class="text-sm text-primary/80 font-medium">Resend Code in 30s</p>
                </div>
                
                <button onclick="setWizardStep(12)" class="w-full bg-primary text-white py-3 rounded-3xl text-lg font-bold  active:scale-[0.98] transition-all">Submit</button>
            </div>
        </div>
    `;
}

function renderStep12(data) {
    return `
        ${stepHeader('Confirmation', 10)}
        <div class="px-5 pt-8 space-y-8 text-center">
            <div class="bg-white border border-[#DEE5F1] shadow-sm rounded-[32px] p-10 space-y-6">
                <div class="w-20 h-20 bg-[#24B2B9] rounded-full flex items-center justify-center text-white mx-auto">
                    <i data-lucide="check" width="40" height="40" stroke-width="3"></i>
                </div>
                
                <div class="space-y-4">
                    <h2 class="text-2xl font-bold text-primary">Payment Successful!</h2>
                    <p class="text-[14px] text-primary/80 font-medium leading-relaxed">
                        Your payment of <span class="text-primary font-bold">PKR 25,000</span> has been successfully received. If you need any assistance, please feel free to contact us..
                    </p>
                </div>
            </div>
            
            <button onclick="window.location.href='index.html'" class="w-full bg-primary text-white py-4 rounded-3xl text-lg font-bold shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all">Back to Home</button>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderApp);
