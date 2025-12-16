function renderBonusModal() {
    if (!state.showBonusModal) {
        modalContainer.innerHTML = '';
        return;
    }

    modalContainer.innerHTML = `
        <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white w-96 p-6 rounded-2xl shadow-xl text-center">
                <div class="flex justify-center items-center w-full">
                    <img src="/assets/svgs/bonus.svg" alt="" onerror="this.style.display='none'">
                </div>
                <h2 class="text-lg font-bold text-primary text-[#1E3A6D]">You Won</h2>
                <p class="text-sm text-[#627497]">May this bring you blessings.</p>
                <div class="relative lucky-draw rounded-2xl p-5 mt-5 text-white">
                    <div class="relative z-10 w-full flex justify-between items-center">
                        <h5 class="text-md font-bold text-[#1E3A6D] mb-1">Bonus Reward</h5>
                        <div>
                            <h3 class="font-bold text-lg text-[#24B3BA]">+50</h3>
                            <p class="text-primary text-xs font-normal text-[#1E3A6D]">Ihram Points</p>
                        </div>
                    </div>
                </div>
                <button onclick="closeBonusModal()" class="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold" style="background-color: #1E3A6D;">
                    Continue
                </button>
            </div>
        </div>
    `;
}
