import React, { useState } from 'react';
import { Bell, Menu, Plus } from 'lucide-react';
import { UmrahPlan } from '../../core/types';
import CreatePlanWizard from "./CreatePlan";


const Plans: React.FC = () => {
  const [plan, setPlan] = useState<UmrahPlan>(UmrahPlan.OVERVIEW);

  // Empty array = show empty state
  const [plansList] = useState<any[]>([
    // { id: 1, name: 'My Umrah 2025', date: '2025-06-01', progress: 30, paid: 150000, goal: 500000 },
  ]); 
  const [creating, setCreating] = useState(false);


  return (
    <div className="pt-6 pb-28 space-y-6 bg-white min-h-screen">


      {/* HEADER */}
      <div className="px-5 border-b border-gray-100 pb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">My Journey</h1>

          <div className="flex space-x-3">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <Bell size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <Menu size={20} />
            </button>
          </div>
        </div>
        {plansList.length === 0 && (
        <div className="flex bg-white p-1 rounded-full mt-4 mb-6 shadow-sm border border-gray-100">
         
            <button
              className="flex-1 py-2.5 rounded-full text-xs font-bold transition-all bg-primary text-white shadow-md"
            >
              Overview
            </button>
            
          <button   onClick={() => setCreating(true)}
             className="flex items-center justify-center bg-gray-100 px-3 ml-3 py-2 rounded-full transition-all">
            <Plus color="#1E3A6D" size={12} />
          </button>
        </div>
        )}

        {/* SWITCHER */}
        {plansList.length > 0 && (

          <div className="flex bg-white p-1 rounded-full mt-4 mb-6 shadow-sm border border-gray-100">
            {[
              { id: UmrahPlan.OVERVIEW, label: 'Overview' },
              { id: UmrahPlan.UMRAH, label: 'My Umrah 2025' },
              { id: UmrahPlan.OTHERS, label: "Parent's Umrah" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPlan(m.id)}
                className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${plan === m.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50'
                  }`}
              >
                {m.label}
              </button>
            ))}

            <button onClick={() => setCreating(true)} className="flex items-center justify-center bg-gray-100 px-3 ml-3 py-2 rounded-full transition-all">
              <Plus color="#1E3A6D" size={12} />
            </button>
          </div>
        )}
      </div>

      {/* ----------------------- EMPTY STATE ----------------------- */}
{creating && (
  <CreatePlanWizard onClose={() => setCreating(false)} />
)}

{!creating && (
  <>
    {/* EMPTY STATE */}
    {plansList.length === 0 && (
      <div className="flex flex-col items-center justify-center px-5 mt-10 text-center">
        <img
          src="/assets/images/empty-list.png"
          alt="No Plans"
          className="object-contain mb-4"
        />

        <button
          onClick={() => setCreating(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-lg shadow-md text-sm font-semibold"
        >
          Start Your Umrah Journey
        </button>
      </div>
    )}

    {/* PLAN LIST */}
    {plansList.length > 0 && (
      <>
        <div className="px-5">
          <h5 className="text-lg font-bold text-primary">Your Plans</h5>
        </div>

        {[{ id: 0 }, { id: 1 }].map((m) => (
          <div className="px-5" key={m.id}>
            <div className="bg-[#F4F8FB] rounded-3xl p-4 shadow-sm border border-gray-100 mb-6">

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h6 className="text-normal font-bold text-primary">My Umrah 2025</h6>
                  <span className="text-sm text-[#627497]">2025-06-01</span>
                </div>

                <span className="text-xs bg-[#E6FBDE] text-[#41AB13] px-2 rounded-md">
                  Active
                </span>
              </div>

              <small className="flex justify-between items-center">
                <p className="font-bold text-xs text-[#627497]">Progress</p>
                <p className="font-bold text-xs text-[#627497]">30%</p>
              </small>

              <div className="w-full bg-gray-100 h-1.5 rounded-full my-2 overflow-hidden">
                <div className="bg-primary h-full w-1/2 rounded-full"></div>
              </div>

              <small className="flex justify-between items-center">
                <p className="font-normal text-xs text-[#627497]">PKR 150K Paid</p>
                <p className="font-normal text-xs text-[#627497]">Goal: 500K</p>
              </small>

              <button className="w-full mt-4 border border-[#BFD3E0] text-primary py-3.5 rounded-xl font-bold hover:bg-primary-light hover:text-white flex items-center justify-center space-x-2 text-sm transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </>
    )}
  </>
)}

      
      
    </div>
  );
};

export default Plans;
