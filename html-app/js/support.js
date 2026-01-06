const FAQ_LIST = [
    {
        q: "Can I get the real-time updates on app?",
        a: `Absolutely! With our app, you can receive real-time updates on your Umrah journey. 
        Stay informed with instant notifications about booking confirmations, itinerary 
        changes, and exclusive offers. Get the latest information at your fingertips to 
        ensure a seamless and worry-free pilgrimage.`
    },
    {
        q: "What does the app offer?",
        a: "The app offers trip planning, savings tracking, booking management, real-time notifications and more."
    },
    {
        q: "Is the app available offline?",
        a: "Basic features are available offline. For updates & syncing, internet is required."
    },
    {
        q: "What does the app provide?",
        a: "It provides affordable Umrah saving plans, reminders, tracking, and rewards."
    },
    {
        q: "How can I contact your support team?",
        a: "You can contact support through chat, email, or WhatsApp inside the app."
    }
];

function renderSupport() {
    const div = document.createElement('div');
    div.className = "bg-white min-h-screen pt-6";

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
        <div class="px-5 mt-6 mb-10">
            <h1 class="text-center text-lg font-bold text-primary mb-6">
                Frequently Asked Questions
            </h1>

            <div id="faq-list">
                ${FAQ_LIST.map((item, i) => `
                    <button 
                        onclick="openFaqModal(${i})"
                        class="w-full flex justify-between items-center bg-white border p-4 rounded-xl mb-3 shadow-sm"
                    >
                        <span class="text-sm font-semibold text-[#1E3A6D]">${item.q}</span>
                        <i data-lucide="chevron-down" class="text-gray-500"></i>
                    </button>
                `).join('')}
            </div>
        
        </div>


       
    `;

    return div;
}

function openFaqModal(index) {
    const item = FAQ_LIST[index];

    document.getElementById("faq-modal-title").textContent = item.q;
    document.getElementById("faq-modal-body").textContent = item.a;

    const modal = document.getElementById("faq-modal");
    modal.classList.remove("hidden");

    // Dim background of app
    app.style.filter = "blur(3px)";
}

function closeFaqModal() {
    const modal = document.getElementById("faq-modal");
    modal.classList.add("hidden");

    // Restore background
    app.style.filter = "none";
}
