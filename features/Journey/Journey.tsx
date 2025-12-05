import React, { useState } from 'react';
import { Bell, Menu, Plane, Bus, Building, Search, Calendar, MapPin, ArrowRight, CirclePlus, Plus } from 'lucide-react';
import { IhramMode, FlightOffer } from '../../core/types';

const Journey: React.FC = () => {
  const [mode, setMode] = useState<IhramMode>(IhramMode.OVERVIEW);

  const offers: FlightOffer[] = [
    { id: '1', airline: 'PIA', price: '25,400', time: '10:00 AM - 12:00 PM', duration: '2h', logo: 'PK' },
    { id: '2', airline: 'Airblue', price: '23,100', time: '02:00 PM - 04:00 PM', duration: '2h', logo: 'PA' },
    { id: '3', airline: 'Serene', price: '26,500', time: '06:00 PM - 08:00 PM', duration: '2h', logo: 'ER' },
  ];

  return (
    <div className="pt-6 pb-28  space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="px-5 border-b border-gray-100 pb-2">
        <div className="flex  justify-between items-center ">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800">My Journey</h1>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <Bell size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <Menu size={20} />
            </button>
          </div>

        </div>
        {/* Mode Switcher */}
        <div className="flex bg-white p-1 rounded-full p-2 mt-4 mb-6 shadow-sm border border-gray-100">
          {[
            { id: IhramMode.OVERVIEW, label: 'Overview' },
            { id: IhramMode.UMRAH , label: 'My Umrah 2025' },
            { id: IhramMode.OTHERS, label: "Parent's Umrah" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-full text-xs font-bold transition-all ${
                mode === m.id ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{m.label}</span>
            </button>
            
          ))}
          <button className="flex items-center justify-center bg-[#E5EDF3] ml-3 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-all">
            <Plus color="#1E3A6D" size={12} />

          </button>
        </div>
      </div>
      <div className="px-5">
          <div className="relative px-5  rounded-2xl top-card mt-5 text-white p-5 shadow-lg shadow-blue-900/10">
          <div className="relative z-10 w-full">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold mb-1">Get Registry</h2>
                <p className="text-xs text-blue-100 mb-1 leading-relaxed">
                  Help Abdullah Reach Makkah
                </p>
                <div className="flex -space-x-2 mb-5">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-400"></div>
                </div>

              </div>
              <div className="text-right">
                <h2 className="text-lg text-end font-bold mb-1">PKR 25,000</h2>
                <p className="text-xs text-blue-100 mb-1 leading-relaxed">
                  Gifted by family
                </p>

              </div>
              
              </div>
              
            <button className="bg-white w-full text-center  gap-1 hover:bg-primary hover:text-white text-primary text-xs font-bold py-2.5 px-5 rounded-lg transition-colors shadow-md">
              Invite Family
              </button>
            </div>
            {/* Decorative circle */}
            <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            </div>
      </div>
      <div className="px-5">
        <h5 className="text-lg font-bold text-primary">Your Plans</h5>
      </div>
      
      

      {/* Search Form */}
       {[
            { id: 0},
            { id: 1 },
          ].map((m) => (
      <div className="px-5">

        <div className=" bg-[#F4F8FB] rounded-3xl p-4 shadow-sm border border-gray-100 mb-6">
          

          <div className="flex gap-4 mb-6">
            <div className="flex justify-between items-center w-full">
              <div>
                <h6 className="text-normal font-bold text-primary">
                  My Umrah 2025 
                </h6>
                <span className="text-sm text-[#627497]">2025-06-01</span>
              </div>
              <div>
                <span className="text-xs bg-[#E6FBDE] text-[#41AB13] px-2 rounded-md ">Active</span>
              </div>

            </div>
          </div>
          <sub className="flex justify-between items-center ">
            <p className="font-bold text-xs text-[#627497]">Progress</p>
            <p className="font-bold text-medium text-[#627497]">30%</p>

          </sub>
          <div className="w-full bg-gray-100 h-1.5 rounded-full my-2 overflow-hidden">
              <div className="bg-primary h-full w-1/2 rounded-full"></div>
          </div>
          <sup className="flex justify-between items-center ">
            <p className="font-normal text-xs text-[#627497]">PKR 150K  Paid</p>
            <p className="font-normal text-medium text-[#627497]">Goal: 500K</p>

          </sup>

          <button className="w-full mt-4 border border-[#BFD3E0] text-primary py-3.5 rounded-xl font-bold hover:bg-primary-light hover:text-white transition-colors flex items-center justify-center space-x-2 text-sm">
              View Details
          </button>
        </div>
            </div>
      ))}
    </div>
  );
};

export default Journey;