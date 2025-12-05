import React, { useState } from "react";
import CreatePlanWizard from "./CreatePlan";
import { Bell, Menu, Plus, CircleCheck, Wallet, Coins, Crown } from 'lucide-react';
import { PilgrimType } from "@/core/types";
import { pilgrimTypes, years, monthsByYear, durations, RANGE_LIMITS, BUDGET_NOTES, PROGRESS_DATA, BUDGET_SUMMARY, PLAN_TABS } from "@/core/data";



interface Props {
  onClose: () => void;
}

const CreatePlan: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [journeyName, setJourneyName] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [budgetPlan, setBudgetPlan] = useState("Economy");
  const [progress, setProgress] = useState(30);




const [pilgrims, setPilgrims] = useState([1, 0, 0]); 
// pilgrims[0]=adults, pilgrims[1]=children, pilgrims[2]=infants

const updateCount = (type: PilgrimType, value: number) => {
  setPilgrims(prev => {
    const updated = [...prev];
    updated[type] = Math.max(0, updated[type] + value);
    return updated;
  });
};



  const [dates, setDates] = useState({ start: "", end: "" });
  const [budget, setBudget] = useState(230000);
const [installments, setInstallments] = useState(3);
    

  return (
    <div className="px-5 mt-4">

      {/* STEP 1 — Journey Name */}
          {step === 1 && (
              
            <div>
               <h2 className="font-bold text-md text-primary mb-3">Name Your Journey</h2>
                <div className="bg-[#F4F8FB] p-5 rounded-2xl">
                      <h2 className="font-bold text-primary text-center text-md mb-1">Name Your Journey</h2>
                      <p className="font-normal text-[#627497] text-center text-sm mb-3">Give your savings plan a personal name.</p>

                    <input
                        type="text"
                        placeholder="e.g., My Umrah 2025"
                        value={journeyName}
                        onChange={(e) => setJourneyName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 mb-4"
                    />

                    <div className="flex justify-between gap-2">
                        <button className="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE ]" onClick={onClose}>
                        Back
                        </button>
                        <button
                        className="w-3/6 bg-primary text-white px-5 py-2 rounded-lg"
                        onClick={() => setStep(2)}
                        >
                        Generate Plan
                        </button>
                    </div>
                </div>
            </div>
      )}

      {/* STEP 2 — Departure City */}
      {step === 2 && (
        <div>
          <h2 className="font-bold text-primary text-lg mb-3">
            Choose your departure City in Pakistan
          </h2>

          <div className="bg-[#F4F8FB]  p-5 rounded-2xl">
            <div class="grid grid-cols-2 gap-4">
            {/* Cities Array */}
            {[
              "Karachi",
              "Lahore",
              "Islamabad",
              "Multan",
              "Quetta",
              "Peshawar",
            ].map((city) => (
              <button
                key={city}
                className={`flex justify-between items-center w-full  py-2 px-3 rounded-lg border border-[#DFE8EE] ${
                  departureCity === city ? "bg-primary text-white": "bg-transparent text-[#627497]"
                }`}
                onClick={() => setDepartureCity(city)}  
              >
                {city}
                <CircleCheck color="#F4F8FB" size={16}/>
              </button>
            ))}
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button onClick={() => setStep(1)} className="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE ]">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-3/6 bg-primary text-white px-5 py-2 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}


      {/* STEP 3 — Pilgrims */}
      {step === 3 && (
  <div>
    <h2 className="font-bold text-lg mb-3">Choose Number of Pilgrims</h2>

    <div className="bg-[#F4F8FB] p-5 rounded-2xl shadow-sm  space-y-4">

      {pilgrimTypes.map((item, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-lg flex items-center justify-between"
        >
          <div>
            <p className="text-primary m-0">{item.label}</p>
            <sup className="text-sm text-[#627497]">{item.sub}</sup>
          </div>

          <div className="flex items-center space-x-1">
            <button
              className="w-8 h-8 rounded-full text-primary flex items-center justify-center"
              onClick={() => updateCount(index, -1)}
            >
              −
            </button>

            <span className="text-sm bg-[#D8E9F2] rounded-full py-1 px-3">
              {pilgrims[index]}
            </span>

            <button
              className="w-8 h-8 rounded-full text-primary flex items-center justify-center"
              onClick={() => updateCount(index, +1)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between gap-2 pt-4">
        <button onClick={() => setStep(2)}  className="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE ]">
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          className="w-3/6 bg-primary text-white px-5 py-2 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}


      {/* STEP 4 — Dates */}
     {step === 4 && (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg mb-0">Travel Month & Duration</h2>
              <p className="text-sm text-gray-500 m-0">
                When do you plan to perform Umrah?
              </p>
            </div>
            <div>
              <span className="bg-#F1FDFA text-xs p-1 rounded-xl text-[#24B3BA] border border-[#24B3BA]">Gregorian Mode</span>
            </div>

          </div>
    
      {/* YEAR TABS */}
      <div className="flex space-x-2 py-3">
        {years.map((yr) => (
          <button
            key={yr}
            className={`px-4 py-2 text-xs rounded-full font-medium ${
              selectedYear === yr 
                ? "bg-primary text-white" 
                : "bg-white text-[#627497]"
            }`}
            onClick={() => {
              setSelectedYear(yr);
              setSelectedMonth(""); // reset month when year changes
            }}
          >
            {yr}
          </button>
        ))}
      </div>

    <div className="bg-[#F4F8FB] p-5 rounded-2xl shadow-sm space-y-4">

      

      {/* MONTHS GRID */}
      <div className="grid grid-cols-3 gap-2">
        {monthsByYear[selectedYear].map((month) => (
          <button
            key={month}
            className={`py-3 px-2 rounded-lg border ${
              selectedMonth === month 
                ? "gradient text-white" 
                : "bg-white text-[#627497]"
            }`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>

      {/* DURATION */}
      <h3 className="font-bold text-primary mt-4 mb-1">Duration</h3>

      <div className="grid grid-cols-3 gap-3">
        {durations.map((d) => (
          <button
            key={d.days}
            onClick={() => setSelectedDuration(d.days)}
            className={`p-4 rounded-xl border relative
              ${selectedDuration === d.days 
                ? "gradient text-white"
                : "bg-white text-[#627497] border-[#DFE8EE]"
              }`}
          >
            {d.popular && (
              <span className="absolute -top-2 right-2 bg-[#DEC55D] text-white text-xs px-2 py-1 rounded-xl">
                Popular
              </span>
            )}
            {d.icon && (
              <div className="flex justify-center mb-2">
                <img src={d.icon} alt={d.label} className="w-6 h-6" />
              </div>
            )}
            {d.label}
          </button>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between gap-2 mt-4">
        <button onClick={() => setStep(3)}  className="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE ]">
          Back
        </button>

        <button
          disabled={!selectedMonth || !selectedDuration}
          onClick={() => setStep(5)}
          className={`w-3/6 text-white px-5 py-2 rounded-lg
            ${!selectedMonth || !selectedDuration 
              ? "bg-gray-400" 
              : "bg-primary"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  </div>
)}


      {/* STEP 5 — Estimated Budget */}
      {step === 5 && (
  <div className="bg-white p-5 rounded-2xl shadow-sm border space-y-5">

    <h2 className="font-bold text-lg mb-3">Budget</h2>

    {/* Plan Tabs */}
    <div className="grid grid-cols-3 gap-3">
      {PLAN_TABS.map((plan, idx) => (
        <button
          key={idx}
          onClick={() => setBudgetPlan(plan.label)}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition
            ${budgetPlan === plan.label 
              ? "gradient text-white border-transparent" 
              : "bg-[#F8FBFF] text-[#627497] border-[#DDE7F1]"
            }
          `}
        >
          <div className="text-2xl mb-1">
            {plan.icon && <plan.icon className={`w-6 h-6 text-primary  ${budgetPlan === plan.label
              ? " text-white "
              : "text-primary "
              }`} />}
            </div>


          <p className="font-semibold text-sm">{plan.label}</p>

          {plan.popular && budgetPlan !== plan.label && (
            <span className="text-[10px] bg-[#DEC55D] text-white px-2 py-0.5 rounded-full mt-1">
              Popular
            </span>
          )}
        </button>
      ))}
    </div>

    {/* Budget Card */}
    <div className="bg-white rounded-xl border shadow p-4 space-y-4">

      {/* Summary */}
      {BUDGET_SUMMARY(budget).map((item, idx) => (
        <div key={idx} className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">{item.heading}</p>
            <p className="text-2xl font-bold text-primary">{item.value}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{item.sup}</p>
            <p className="text-sm font-bold text-[#24B3BA] text-end">{item.sub}</p>
          </div>
          
        </div>
      ))}

      {/* Progress */}
      {PROGRESS_DATA(progress).map((bar, idx) => (
        <div key={idx} className="">
          <div className="flex justify-between text-xs my-0 text-gray-500" >
            <span>{bar.label}</span>
            <span>{bar.value}%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-[#0B4DA9] h-2 rounded-full"
              style={{ width: `${bar.value}%` }}
            ></div>
          </div>
        </div>
      ))}

      {/* Range */}
      <div className="flex justify-between text-xs m-0 text-gray-500">
        {RANGE_LIMITS.map((r, idx) => (
          <span key={idx}>
            {r.label}: {r.value}
          </span>
        ))}
      </div>

      {/* Notes */}
      {BUDGET_NOTES.map((note, idx) => (
        <div key={idx} className="lucky-draw  p-2 rounded-lg">
          <p className="text-xs text-[#3B6F67] leading-relaxed">
            {note.text} <span className="font-semibold">{note.highlight}</span>.
          </p>
        </div>
      ))}

    </div>

    {/* Buttons */}
    <div className="flex justify-between gap-2 mt-4">
        <button onClick={() => setStep(4)}  className="w-3/6 text-primary rounded-lg bg-white border border-[#DFE8EE ]">
          Back
        </button>

        <button
          disabled={!selectedMonth || !selectedDuration}
          onClick={() => setStep(6)}
          className={`w-3/6 text-white px-5 py-2 rounded-lg
            ${!selectedMonth || !selectedDuration 
              ? "bg-gray-400" 
              : "bg-primary"
            }`}
        >
          Next
        </button>
      </div>

  </div>
)}

      {/* STEP 6 — Installments */}
      {step === 6 && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="font-bold text-lg mb-4">Number of Installments</h2>

          <div className="flex items-center justify-between mb-4">
            {[3, 6, 9, 12].map((i) => (
              <button
                key={i}
                onClick={() => setInstallments(i)}
                className={`px-4 py-2 rounded-xl border ${
                  installments === i
                    ? "bg-primary text-white"
                    : "bg-gray-100"
                }`}
              >
                {i}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(5)} className="text-gray-500">
              Back
            </button>
            <button
              onClick={() => setStep(7)}
              className="bg-primary text-white px-5 py-2 rounded-lg"
            >
              Finish
            </button>
          </div>
        </div>
      )}

      {/* STEP 7 — Success */}
      {step === 7 && (
        <div className="bg-white p-7 rounded-2xl shadow-sm border text-center">
          <h2 className="text-lg font-bold text-green-600 mb-3">
            Plan Created 🎉
          </h2>
          <p className="text-gray-600 mb-4">
            Your Umrah plan is now ready.
          </p>

          <button
            className="bg-primary text-white px-5 py-2 rounded-lg"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePlan;
