function renderCreatePlanWizard() {
    const div = document.createElement('div');
    div.className = " pt-2 bg-white";
    const { wizardStep, wizardData } = state;

    let content = '';
      // Header
    let html = `
        <div class="px-5 pb-2 border-b border-gray-100">
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
            <div class="flex bg-[#F4F8FB] justify-between items-center p-1 rounded-full mt-4 mb-3 shadow-sm">
                <button class="px-4 py-2 rounded-full text-xs font-bold transition-all bg-primary text-white shadow-md">Overview</button>
                <button id="create-plan-btn-header" class="flex items-center justify-center bg-[#E5EDF3] px-3 ml-3 py-1 rounded-full transition-all">
                    <i data-lucide="plus" color="#1E3A6D" width="12"></i>
                </button>
            </div>
        </div>
        `;
    } else {
        html += `
            <div class=" ">
                <div class="flex bg-[#F4F8FB] justify-between items-center p-1 rounded-full mt-4 mb-3 shadow-sm">
                    <button onclick="setPlansMode('${UmrahPlan.OVERVIEW}')" class="px-4 py-0 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.OVERVIEW ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">Overview</button>
                    <button onclick="setPlansMode('${UmrahPlan.UMRAH}')" class="px-4 py-0 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.UMRAH ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">My Umrah 2025</button>
                    <button onclick="setPlansMode('${UmrahPlan.OTHERS}')" class="px-4 py-0 rounded-full text-xs font-bold transition-all ${state.plansMode === UmrahPlan.OTHERS ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}">Parent's Umrah</button>
                    <button id="create-plan-btn-header" class="flex items-center justify-center bg-[#E5EDF3] px-4 ml-3 py-1 rounded-full transition-all">
                        <i data-lucide="plus" color="#1E3A6D" width="12"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    }

    // Step 1: Journey Name
    if (wizardStep === 1) {
        content = `
            <div class="px-5 pt-3 space-y-4 pb-10">
                <h2 class="font-bold text-lg text-primary mb-3 text-[#1E3A6D]">Name Your Journey</h2>
                <div class="bg-[#F4F8FB] p-5 rounded-2xl">
                    <h2 class="font-bold text-primary text-center text-lg mb-1 text-[#1E3A6D]">Name Your Journey</h2>
                    <p class="font-normal text-[#627497] text-center text-sm mb-3">Give your savings plan a personal name.</p>
                    <input type="text" id="journey-name-input" placeholder="e.g., My Umrah 2025" value="${wizardData.journeyName}" class="w-full border rounded-lg px-3 py-2 mb-4">
                    <div class="flex justify-between gap-2">
                        <button onclick="closeWizard()" class="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE] text-[#1E3A6D]">Back</button>
                        <button onclick="setWizardStep(2)" class="w-3/6 bg-primary text-white px-5 py-2 rounded-lg" style="background-color: #1E3A6D;">Generate Plan</button>
                    </div>
                </div>
            </div>
        `;
    }
    // Step 2: Departure City
    else if (wizardStep === 2) {
        const cities = ["Karachi", "Lahore", "Islamabad", "Multan", "Quetta", "Peshawar"];
        content = `
            <div class="px-5 pt-3 space-y-4 pb-10">
                <h2 class="font-bold text-primary text-lg mb-3 text-[#1E3A6D]">Choose your departure City in Pakistan</h2>
                <div class="bg-[#F4F8FB] p-5 rounded-2xl">
                    <div class="grid grid-cols-2 gap-4">
                        ${cities.map(city => `
                            <button onclick="setWizardData('departureCity', '${city}')" class="flex justify-between items-center w-full py-2 px-3 rounded-lg border border-[#DFE8EE] ${wizardData.departureCity === city ? 'bg-primary text-white' : 'bg-transparent text-[#627497]'}" ${wizardData.departureCity === city ? 'style="background-color: #1E3A6D;"' : ''}>
                                ${city}
                                ${wizardData.departureCity === city ? '<i data-lucide="circle-check" color="#F4F8FB" width="16"></i>' : ''}
                            </button>
                        `).join('')}
                    </div>
                    <div class="flex justify-between gap-2 mt-4">
                        <button onclick="setWizardStep(1)" class="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE] text-[#1E3A6D]">Back</button>
                        <button onclick="setWizardStep(3)" class="w-3/6 bg-primary text-white px-5 py-2 rounded-lg" style="background-color: #1E3A6D;">Continue</button>
                    </div>
                </div>
            </div>
        `;
    }
    // Step 3: Pilgrims
    else if (wizardStep === 3) {
        content = `
            <div class="px-5 pt-3 space-y-4 pb-10">
                <h2 class="font-bold text-primary text-lg mb-3">Choose Number of Pilgrims</h2>
                <div class="bg-[#F4F8FB] p-5 rounded-2xl shadow-sm space-y-4">
                    ${pilgrimTypes.map((item, index) => `
                        <div class="bg-white p-3 rounded-lg flex items-center justify-between">
                            <div>
                                <p class="text-primary m-0 text-[#1E3A6D]">${item.label}</p>
                                <sup class="text-sm text-[#627497]">${item.sub}</sup>
                            </div>
                            <div class="flex items-center space-x-1">
                                <button onclick="updatePilgrims(${index}, -1)" class="w-8 h-8 rounded-full text-primary flex items-center justify-center text-[#1E3A6D]">−</button>
                                <span class="text-sm bg-[#D8E9F2] rounded-full py-1 px-3">${wizardData.pilgrims[index]}</span>
                                <button onclick="updatePilgrims(${index}, 1)" class="w-8 h-8 rounded-full text-primary flex items-center justify-center text-[#1E3A6D]">+</button>
                            </div>
                        </div>
                    `).join('')}
                    <div class="flex justify-between gap-2 pt-4">
                        <button onclick="setWizardStep(2)" class="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE] text-[#1E3A6D]">Back</button>
                        <button onclick="setWizardStep(4)" class="w-3/6 bg-primary text-white px-5 py-2 rounded-lg" style="background-color: #1E3A6D;">Continue</button>
                    </div>
                </div>
            </div>
        `;
    }
    // Step 4: Dates & Duration
    else if (wizardStep === 4) {
        content = `
            <div class="px-5 pt-3 space-y-4 pb-10">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="font-bold text-primary text-lg mb-0">Travel Month & Duration</h2>
                        <p class="text-sm text-gray-500 m-0">When do you plan to perform Umrah?</p>
                    </div>
                    <div><span class="bg-[#F1FDFA] text-xs p-1 rounded-xl text-[#24B3BA] border border-[#24B3BA]">Gregorian Mode</span></div>
                </div>
                <!-- Years -->
                <div class="flex space-x-2 py-"2>
                    ${years.map(yr => `
                        <button onclick="setWizardData('year', ${yr}); setWizardData('month', '')" class="px-4 py-2 text-xs rounded-full font-medium ${wizardData.year === yr ? 'bg-primary text-white' : 'bg-white text-[#627497]'}" ${wizardData.year === yr ? 'style="background-color: #1E3A6D;"' : ''}>${yr}</button>
                    `).join('')}
                </div>
                <div class="bg-[#F4F8FB] p-5 rounded-2xl shadow-sm space-y-4">
                    <!-- Months -->
                    <div class="grid grid-cols-3 gap-2">
                        ${(monthsByYear[wizardData.year] || []).map(month => `
                            <button onclick="setWizardData('month', '${month}')" class="py-3 px-2 rounded-lg ${wizardData.month === month ? 'gradient text-white' : 'bg-white text-[#627497]'}" ${wizardData.month === month ? 'style="background: linear-gradient(to right, #1E3A6D, #24B3BA);"' : ''}>${month}</button>
                        `).join('')}
                    </div>
                    <!-- Duration -->
                    <h3 class="font-bold text-primary mt-4 mb-1 text-[#1E3A6D]">Duration</h3>
                    <div class="grid grid-cols-3 gap-3">
                        ${durations.map(d => `
                            <button onclick="setWizardData('duration', ${d.days})" class="p-4 rounded-xl relative ${wizardData.duration === d.days ? 'gradient text-white' : 'bg-white text-[#627497] border-[#DFE8EE]'}" ${wizardData.duration === d.days ? 'style="background: linear-gradient(to right, #1E3A6D, #24B3BA);"' : ''}>
                                ${d.popular ? '<span class="absolute -top-2 right-2 bg-[#DEC55D] text-white text-xs px-2 py-1 rounded-xl">Popular</span>' : ''}
                                <div class="flex justify-center mb-2"><img src="${d.icon}" alt="${d.label}" class="w-6 h-6" onerror="this.style.display='none'"></div>
                                ${d.label}
                            </button>
                        `).join('')}
                    </div>
                    <!-- Buttons -->
                    <div class="flex justify-between gap-2 mt-4">
                        <button onclick="setWizardStep(3)" class="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE] text-[#1E3A6D]">Back</button>
                        <button onclick="setWizardStep(5)" class="w-3/6 text-white px-5 py-2 rounded-lg ${(!wizardData.month || !wizardData.duration) ? 'bg-gray-400' : 'bg-primary'}" ${(!wizardData.month || !wizardData.duration) ? '' : 'style="background-color: #1E3A6D;"'} ${(!wizardData.month || !wizardData.duration) ? 'disabled' : ''}>Next</button>
                    </div>
                </div>
            </div>
        `;
    }
    // Step 5: Budget
    else if (wizardStep === 5) {
        const budgetSummary = [
            { heading: "Total Budget", value: `PKR ${wizardData.budget.toLocaleString()}`, sup: "(Monthly 12mo)", sub: `~ ${Math.round(wizardData.budget / 12).toLocaleString()}` }
        ];
        content = `
            <div class="bg-white p-5 rounded-2xl shadow-sm  space-y-5">
                <h2 class="font-bold text-primary text-lg mb-3">Budget</h2>
                <!-- Tabs -->
                <div class="bg-[#F4F8FB] p-5 rounded-2xl shadow-sm space-y-4">
                    <div class="grid grid-cols-3 gap-3">
                        ${PLAN_TABS.map(plan => `
                            <button onclick="setWizardData('budgetPlan', '${plan.label}')" class="flex flex-col items-center justify-center p-4 rounded-xl transition ${wizardData.budgetPlan === plan.label ? 'gradient text-white border-transparent' : 'bg-white text-[#627497] border-[#DDE7F1]'}" ${wizardData.budgetPlan === plan.label ? 'style="background: linear-gradient(to right, #1E3A6D, #24B3BA);"' : ''}>
                                <div class="text-2xl mb-1"><i data-lucide="${plan.icon}" class="w-6 h-6 ${wizardData.budgetPlan === plan.label ? 'text-white' : 'text-primary'}"></i></div>
                                <p class="font-semibold text-sm">${plan.label}</p>
                                ${(plan.popular && wizardData.budgetPlan !== plan.label) ? '<span class="text-[10px] bg-[#DEC55D] text-white px-2 py-0.5 rounded-full mt-1">Popular</span>' : ''}
                            </button>
                        `).join('')}
                    </div>
                    <!-- Budget Card -->
                    <div class="bg-white rounded-xl border shadow p-4 space-y-4">
                        ${budgetSummary.map(item => `
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="text-xs text-gray-500">${item.heading}</p>
                                    <p class="text-2xl font-bold text-primary text-[#1E3A6D]">${item.value}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-[#627497]">${item.sup}</p>
                                    <p class="text-sm font-bold text-[#24B3BA] text-end">${item.sub}</p>
                                </div>
                            </div>
                        `).join('')}
                        <!-- Progress -->
                        <div>
                            <div class="flex justify-between text-xs my-0 text-gray-500"><span>Progress</span><span>${wizardData.progress}%</span></div>
                            <div class="w-full bg-gray-200 h-2 rounded-full"><div class="bg-[#0B4DA9] h-2 rounded-full" style="width: ${wizardData.progress}%"></div></div>
                        </div>
                        <!-- Range -->
                        <div class="flex justify-between text-xs m-0 text-gray-500">
                            ${RANGE_LIMITS.map(r => `<span>${r.label}: ${r.value}</span>`).join('')}
                        </div>
                        <!-- Notes -->
                        ${BUDGET_NOTES.map(note => `
                            <div class="lucky-draw p-2 rounded-lg">
                                <p class="text-xs text-[#3B6F67] leading-relaxed">${note.text} <span class="font-semibold">${note.highlight}</span>.</p>
                            </div>
                        `).join('')}
                    </div>
                    <!-- Buttons -->
                    <div class="flex justify-between gap-2 mt-4">
                        <button onclick="setWizardStep(4)" class="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE] text-[#1E3A6D]">Back</button>
                        <button onclick="setWizardStep(6)" class="w-3/6 bg-primary text-white px-5 py-2 rounded-lg" style="background-color: #1E3A6D;">Generate</button>
                    </div>
                </div>
            </div>
        `;
    }
    // Step 6: Installments
    else if (wizardStep === 6) {
         
        content = `
        <div class="px-3 pt-3 pb-10">
           <h2 class="font-bold text-primary text-lg mb-3">Total Budget</h2>
            <div class="bg-[#F4F7FE] p-2 rounded-xl mb-4">
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
                <div class="w-full bg-white mt-5 p-2 rounded-md ">

                        <div class="flex justify-between  gap-1 text-xs mt-3">
                            <span class="bg-[#F6F9FC] px-2 py-1 rounded-lg  text-[#627497]">Departure: <span class="font-bold"> ${budgetData.departure} </span></span>
                            <span class="bg-[#F6F9FC] px-2 py-1 rounded-lg text-[#627497]">Travelers: <span class="font-bold">${budgetData.travelers} Persons </span></span>
                            <span class="bg-[#F6F9FC] px-2 py-1  rounded-lg text-[#627497]">Target Date: <span class="font-bold">${budgetData.targetDate}</span></span>
                        </div>
                

                    <h3 class="font-semibold text-primary my-3">Monthly Breakdown</h3>
                    <div class="grid grid-cols-3 gap-3 mb-5">
                        ${budgetData.monthlyBreakdown.map((item, index) => `
                            <div class="${index === 0 ? 'gradient text-white' : 'bg-gray-100 text-[#627497]'} p-3 rounded-lg text-center">
                                <p class="text-sm">${item.date}</p>
                                <p class="font-bold ${index === 0 ? 'text-white' : ''}">${formatPKR(item.amount)}</p>
                            </div>
                        `).join('')}
                    </div>

                    <button onclick="setWizardStep(7)"  class="w-full bg-[#1E3A6D] text-white py-3 rounded-xl font-semibold">
                    Confirm & Pay First Installment
                    </button>
                </div>
            </div>
        </div>
        `;

    }
    // Step 7: Success
    else if (wizardStep === 7) {
    content = `
        <div class=" pt-3 ">
            <div class="px-5 mb-6 w-100 border-b border-gray-200">
                <button onclick="setWizardStep(6)" class="text-primary mb-5  flex items-center gap-2 font-semibold">
                    <span class=" bg-primary rounded-full px-1">
                        <i data-lucide="chevron-left" color="white" width="16"></i>

                    </span>
                    
                    Start Saving
                </button>
            </div>
            <div class="px-5 mb-6 ">
            <h3 class="text-primary font-bold mb-2">Complete Your Down Payment</h3>
            <p class="text-[#627497] mb-6 text-sm ">
                To confirm your Umrah package, please pay the required down payment using your Zindigi Wallet.
            </p>

            <div class="bg-[#F4F8FB] p-4 rounded-lg mb-6 text-left text-sm">
                <strong class="block mb-2">Payment Summary:</strong>
                <ul class="list-disc list-inside text-[#627497]">
                    <li>Down Payment: <strong class="text-primary">PKR 25,000</strong></li>
                    <li>Remaining Payment Method: Will be paid later after confirmation</li>
                    <li>Payment Method: Zindigi Wallet (Auto-selected)</li>
                </ul>
                <div class="lucky-draw mt-5 text-green-900 px-3 py-1 rounded-lg mb-6 text-xs">
                    Note: This amount will be deducted instantly from your Zindigi Wallet.
                </div>
            </div>

            

            <button onclick="setWizardStep(8)" class="w-full bg-[#1E3A6D] text-white py-3 rounded-xl font-semibold hover:bg-[#16315b] transition">
                Pay Now
            </button>
            </div>
        </div>
    `;
    }
   else if (wizardStep === 8) {
    content = `
        <div class="pt-3">
            <div class="px-5 mb-6 w-100 border-b border-gray-200">
                <button onclick="setWizardStep(7)" class="text-primary mb-5  flex items-center gap-2 font-semibold">
                    <span class=" bg-primary rounded-full px-1">
                        <i data-lucide="chevron-left" color="white" width="16"></i>

                    </span>
                    
                    OTP Verification
                </button>
            </div>
            <div class="px-5 mb-6 ">

                <h3 class="font-semibold text-[#1E3A6D] mb-2">Enter Verification Code</h3>
                <p class="text-[#627497] text-sm mb-6 leading-relaxed">
                    A 4-digit code has been sent to your mobile number. Enter it below to confirm your payment.
                </p>

                <div class="bg-[#F4F8FB] p-6 rounded-xl text-center mb-6">
                    <div class="flex justify-center gap-4 mb-6">
                        <input type="text" maxlength="1" class="w-12 h-12 bg-[#E0EAF0] text-center rounded-lg bg-white  text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6D]" />
                        <input type="text" maxlength="1" class="w-12 h-12 bg-[#E0EAF0] text-center rounded-lg bg-white  text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6D]" />
                        <input type="text" maxlength="1" class="w-12 h-12 bg-[#E0EAF0] text-center rounded-lg bg-white  text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6D]" />
                        <input type="text" maxlength="1" class="w-12 h-12 bg-[#E0EAF0] text-center rounded-lg bg-white  text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6D]" />
                    </div>
                    <button onclick="confirmOTP()" class="w-full bg-[#1E3A6D] text-white py-3 rounded-xl font-semibold hover:bg-[#16315b] transition">
                        Confirm
                    </button>
                     <p class="text-xs text-[#627497] text-start">Resend Code in <span id="resendTimer">30s</span></p>

                </div>

            </div
        </div>
    `;
}


    div.innerHTML = html+ content;

    // Add event listener for input if in step 1
    if (wizardStep === 1) {
        const input = div.querySelector('#journey-name-input');
        if (input) {
            input.addEventListener('input', (e) => {
                state.wizardData.journeyName = e.target.value;
            });
            // Restore focus hack not needed if we don't re-render on every keystroke, 
            // but we are not re-rendering on keystroke here, only on state change.
            // However, input value is set in HTML.
        }
    }

    return div;
}
