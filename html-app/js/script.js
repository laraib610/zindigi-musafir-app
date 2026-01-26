
// --- Constants & Data ---
const Tab = {
    HOME: 'home',
    JOURNEY: 'journey',
    PLANS: 'plans',
    POINTS: 'points',
    PROFILE: 'profile',
    SUPPORT: 'support'
};

const IhramMode = {
    OVERVIEW: 'overview',
    UMRAH: 'umrah',
    OTHERS: 'others'
};

const UmrahPlan = {
    OVERVIEW: 'overview',
    UMRAH: 'umrah',
    OTHERS: 'others'
};

const PilgrimType = {
    ADULT: 0,
    CHILDREN: 1,
    INFANT: 2
};

const years = [2025, 2026, 2027, 2028];

const monthsByYear = {
    2025: ["Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025"],
    2026: ["Jan 2026", "Feb 2026", "Mar 2026"],
    2027: ["Jan 2027", "Feb 2027"],
    2028: ["Jan 2028"],
};

const durations = [
    { days: 7, label: "7 Days", icon: 'assets/svgs/watch.svg' },
    { days: 14, label: "14 Days", popular: true, icon: 'assets/svgs/star.svg' },
    { days: 21, label: "21 Days", icon: 'assets/svgs/premium.svg' },
];

const pilgrimTypes = [
    { label: 'Adults', sub: "12+ years", value: PilgrimType.ADULT },
    { label: 'Children', sub: "2-11 years", value: PilgrimType.CHILDREN },
    { label: 'Infant', sub: "Below 2 years", value: PilgrimType.INFANT },
];

const PLAN_TABS = [
    { label: "Saver", icon: 'wallet' },
    { label: "Economy", icon: 'coins', popular: true },
    { label: "Premium", icon: 'crown' }
];

const RANGE_LIMITS = [
    { label: "Min", value: "PKR 150K" },
    { label: "Max", value: "10 Lacs+" }
];

const BUDGET_NOTES = [
    {
        text: "Note: Based on current market rates, packages for your criteria start from",
        highlight: "PKR 1,343,434"
    }
];
const budgetData = {
    totalBudget: 212000, // PKR
    monthlyBudget: 178500, // PKR
    departure: "Karachi",
    travelers: 9,
    targetDate: "May 2025",
    monthlyBreakdown: [
        { date: "07th Mar", amount: 15600 },
        { date: "07th Apr", amount: 15600 },
        { date: "07th May", amount: 15600 },
        { date: "07th Jun", amount: 15600 },
        { date: "07th Jul", amount: 15600 },
        { date: "07th Aug", amount: 15600 },
    ]
};

// --- State ---
const state = {
    activeTab: Tab.HOME,
    showBonusModal: false,
    journeyMode: IhramMode.OVERVIEW,
    plansMode: UmrahPlan.OVERVIEW,
    plansList: [
        // Sample plan
        {
            id: 1,
            name: "Family Umrah 2025",
            date: "2025-06",
            progress: 45, // percentage
            paid: 95000, // PKR
            goal: 200000, // PKR
            transactions: [
                { title: "Initial Deposit", date: "2024-01-15", amount: 50000, status: "paid" },
                { title: "Second Installment", date: "2024-02-15", amount: 45000, status: "paid" },
            ],
            installments: [
                { id: 1, date: "2024-09-01", amount: 5000, status: "paid" },
                { id: 2, date: "2024-10-01", amount: 5000, status: "unpaid" },
                { id: 3, date: "2024-11-01", amount: 5000, status: "unpaid" }
            ],
        },
    ], // Start empty
    isCreatingPlan: false,
    wizardStep: 1,
    wizardData: {
        journeyName: '',
        departureCity: '',
        pilgrims: [1, 0, 0], // adults, children, infants
        year: 2025,
        month: '',
        duration: null,
        budgetPlan: 'Economy',
        installments: 3,
        budget: 230000,
        progress: 30
    }
};

// --- DOM Elements ---
const app = document.getElementById('app');
const bottomNav = document.getElementById('bottom-nav');
const modalContainer = document.getElementById('modal-container');

// --- Main Render Loop ---
function renderApp() {
    // Clear content
    app.innerHTML = '';

    // Render active tab content
    switch (state.activeTab) {
        case Tab.HOME:
            app.appendChild(renderHome());
            break;
        case Tab.JOURNEY:
            app.appendChild(renderJourney());
            break;
        case Tab.PLANS:
            app.appendChild(renderPlans());
            break;
        case Tab.POINTS:
            app.appendChild(renderPoints());
            break;
        case Tab.PROFILE:
            app.appendChild(renderProfile());
            break;
        case Tab.SUPPORT:
            app.appendChild(renderSupport());
            break;
        default:
            app.appendChild(renderHome());
    }

    // Render Bottom Nav
    renderBottomNav();

    // Render Modals
    renderBonusModal();

    // Initialize Icons
    lucide.createIcons();
}

// --- Tab Switching ---
function switchTab(tab, bonus = false) {
    state.activeTab = tab;
    if (bonus) {
        setTimeout(() => {
            state.showBonusModal = true;
            renderApp();
        }, 300);
    }
    renderApp();
}

// --- Components ---

function renderHome() {
    const div = document.createElement('div');
    div.className = "pt-6 pb-28 space-y-6 bg-white min-h-screen";
    div.innerHTML = `
        <!-- Header -->
        <div class="flex px-5 justify-between items-center border-b border-gray-100 pb-2">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                    <img src="https://picsum.photos/seed/abdullah/100/100" alt="Abdullah" class="w-full h-full object-cover" />
                </div>
                <div>
                    <p class="text-xs text-[#627497] font-medium">Assalam O Alaikum</p>
                    <h1 class="text-lg font-bold text-gray-800">Abdullah!</h1>
                </div>
            </div>
            <div class="flex space-x-3">
                <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#627497] hover:bg-gray-50">
                    <i data-lucide="bell" width="20"></i>
                </button>
               
            </div>
        </div>

        <!-- Upgrade Banner -->
        <div class="px-5">
            <div class="relative px-5 rounded-lg top-card mt-5 text-white p-5 shadow-lg shadow-blue-900/10" style="background-color: #1E3A6D;">
                <div class="relative z-10 w-2/3">
                    <h2 class="text-lg font-bold mb-1">Upgrade to Ihram Account</h2>
                    <p class="text-sm text-blue-100 mb-4 leading-relaxed">
                        Unlock exclusive savings, earn double points, and priority support.
                    </p>
                    <button id="upgrade-btn" class="bg-[#24B3BA] flex items-center gap-1 hover:bg-primary hover:text-white text-white text-xs font-bold py-2.5 px-5 rounded-lg transition-colors shadow-md">
                        <img src="assets/svgs/sparkles.svg" alt="" onerror="this.style.display='none'"> Upgrade Now
                    </button>
                </div>
                <div class="absolute right-[-20px] bottom-[-20px] w-40 h-40">
                    <img src="assets/images/ihram.png" alt="Pilgrim" style="height: 203px; transform: translateY(-62px);" onerror="this.style.display='none'">
                </div>
                <div class="absolute top-[-50px] left-[-50px] w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-2 px-5">
            <div class="bg-[#F4F8FB] rounded-lg p-4 shadow-sm">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-md font-semibold text-[#627497]">Umrah Savings</span>
                    <img src="assets/svgs/savings.svg" class="w-[25px]" alt="" onerror="this.style.display='none'">
                </div>
                <h3 class="font-bold text-lg text-primary">PKR 250,000</h3>
                <p class="text-sm text-primary/80 mt-1">
                    You’re getting close to your Umrah - keep moving at your pace.
                </p>
            </div>
            <div class="bg-[#F4F8FB] rounded-lg p-4 shadow-sm">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-md font-semibold text-[#627497]">Ihram Points</span>
                    <img src="assets/svgs/ihram_points.svg" class="w-[25px]" alt="" onerror="this.style.display='none'">
                </div>
                <h3 class="text-lg font-bold text-primary">1,259</h3>
                <p class="text-sm text-primary/80 mt-1">
                    Collect points with every booking and step closer to exclusive Umrah rewards.
                </p>
            </div>
        </div>

        <!-- Tip Card -->
        <div class="px-5">
            <div class="bg-[#F4F8FB] rounded-lg p-5 border border-gray-100 px-5">
                <div class="flex items-center space-x-2 mb-3">
                    <div class="w-6 h-6 bg-primary-pale text-primary rounded-full flex items-center justify-center bg-[#E8EDF5] text-[#1E3A6D]">
                        <span class="text-xs">💡</span>
                    </div>
                    <h3 class="text-md font-bold text-primary">Ibrahim's Tip</h3>
                </div>
                <p class="text-sm text-[#627497] leading-relaxed mb-3">
                    "Based on your saving rate, if you invite 2 family members to contribute, you could reach your goal 
                    <span class="font-bold text-gray-800"> 2 months earlier!</span>"
                </p>
                <button id="ask-ibrahim-btn" class="text-primary text-xs font-bold flex items-center hover:underline text-[#1E3A6D]">
                    Ask Ibrahim <i data-lucide="chevron-right" width="14"></i>
                </button>
            </div>
        </div>

        <!-- Lucky Draw -->
        <div class="px-5">
            <div class="relative lucky-draw rounded-lg p-5 text-white overflow-hidden">
                <div class="relative z-10 w-2/3">
                    <h3 class="text-md font-bold text-[#1E3A6D] mb-1">Umrah Lucky Draw</h3>
                    <div class="flex items-center space-x-2 text-sm text-[#1E3A6D] mb-3">
                        <span>Next Draw: 01/11/2025</span>
                        <span class="bg-[#CFE5D9] px-1.5 py-0.5 rounded">Entries: 5</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full my-2">
                        <div class="bg-primary h-full w-1/2 rounded-full" style="background-color: #1E3A6D;"></div>
                    </div>
                    <button class="w-[80%] bg-[#1E3A6D] hover:bg-blue-600 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-colors border border-white/10 text-white">
                        <i data-lucide="gift" width="12"></i>
                        <span>Spin Used Today</span>
                    </button>
                </div>
                <div class="absolute right-[-25px] bottom-0">
                    <img src="assets/images/gift.png" class="w-[190px]" alt="" onerror="this.style.display='none'">
                </div>
            </div>
        </div>
    `;

    // Event Listeners
    div.querySelector('#upgrade-btn').addEventListener('click', () => switchTab(Tab.JOURNEY, true));
    div.querySelector('#ask-ibrahim-btn').addEventListener('click', () => switchTab(Tab.PLANS));

    return div;
}



function setJourneyMode(mode) {
    state.journeyMode = mode;
    renderApp();
}



function setPlansMode(mode) {
    state.plansMode = mode;
    renderApp();
}


function setWizardStep(step) {
    state.wizardStep = step;
    renderApp();
}

function setWizardData(key, value) {
    state.wizardData[key] = value;
    renderApp();
}

function updatePilgrims(index, delta) {
    const current = state.wizardData.pilgrims[index];
    const newValue = Math.max(0, current + delta);
    state.wizardData.pilgrims[index] = newValue;
    renderApp();
}

function closeWizard() {
    state.isCreatingPlan = false;
    state.wizardStep = 1;
    renderApp();
}
function formatPKR(amount) {
    return `PKR ${amount.toLocaleString()}`;
}

function finishWizard() {
    // Add the new plan to plansList
    state.plansList.push({
        id: Date.now(),
        name: state.wizardData.journeyName || 'My Umrah',
        date: `${state.wizardData.year}-${state.wizardData.month}`,
        progress: state.wizardData.progress,
        paid: 150000,
        goal: state.wizardData.budget
    });
    closeWizard();
}






function closeBonusModal() {
    state.showBonusModal = false;
    renderApp();
}

// --- Initialization ---
function init() {
    renderApp();
}

// Start the app
init();
