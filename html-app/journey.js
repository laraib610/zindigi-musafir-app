function renderJourney() {
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
                    <p class="text-xs text-[#627497] font-medium">Assalam o Alaikom</p>
                    <h1 class="text-lg font-bold text-gray-800">Abdullah!</h1>
                </div>
            </div>
            <div class="flex space-x-3">
                <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#627497] hover:bg-gray-50">
                    <i data-lucide="bell" width="20"></i>
                </button>
               
            </div>
        </div>
         <div class="grid grid-cols-2 gap-2 px-5">
            <div class="bg-[#F4F8FB] rounded-2xl p-4 shadow-sm">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-md font-semibold text-primary">Spend & Earn</span>
                    <img src="assets/svgs/wallet.svg" class="w-[30px]" alt="" onerror="this.style.display='none'">
                </div>
            <p class=" text-[#627497] text-sm mt-1">
                    Earn points on every transaction with your Ihram Debit Card.
                </p>
            </div>
            <div class="bg-[#F4F8FB] rounded-2xl p-4 shadow-sm">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-md font-semibold text-primary">Pay with Points</span>
                    <img src="assets/svgs/points.svg" class="w-[30px]" alt="" onerror="this.style.display='none'">
                </div>
            <p class=" text-[#627497] text-sm mt-1">
                    Redeem points on every transaction with your Ihram Debit Card.
                </p>
            </div>
            <div class="bg-[#F4F8FB] rounded-2xl p-4 shadow-sm">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-md font-semibold text-primary">Win Umrah</span>
                    <img src="assets/svgs/win.svg" class="w-[30px]" alt="" onerror="this.style.display='none'">
                </div>
            <p class="text-[#627497] text-sm mt-1">
                    Get 5x entries to the monthly Lucky Draw for free trips.
                </p>
            </div>
            <div class="bg-[#F4F8FB] rounded-2xl p-4 shadow-sm">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-md font-semibold text-primary">Exclusive Rates</span>
                    <img src="assets/svgs/points.svg" class="w-[30px]" alt="" onerror="this.style.display='none'">
                </div>
            <p class=" text-[#627497] text-sm mt-1">
                    Access discounted packages only for Ihram members.
                </p>
            </div>
        </div>

        <!-- Tip Card -->
        <div class="px-5">
            <div class="bg-[#F4F8FB] rounded-2xl p-5 border border-gray-100 px-5">
                <div class="flex items-center space-x-2 mb-3">
                    <h3 class="text-[12px] font-bold text-primary">Why Upgrade?</h3>
                </div>
                <ul class="list-none list-inside  text-[#627497] space-y-1">
                    <li class="flex justify-start items-center gap-2"><img src="assets/svgs/CheckCircle.svg"/>Priority Visa Processing.</li>
                    <li class="flex justify-start items-center gap-2"> <img src="assets/svgs/CheckCircle.svg"/>24/7 Dedicated Concierge.</li>
                    <li class="flex justify-start items-center gap-2"> <img src="assets/svgs/CheckCircle.svg"/>Secure, High-Yield Savings.</li>
                </ul>
            </div>
        </div>
       
    `;
    return div;
}