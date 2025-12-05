import React from 'react';
import { Bell, Menu, ChevronRight, Gift } from 'lucide-react';
import { Tab } from '../../core/types';

interface HomeProps {
  onChangeTab: (tab: Tab, bonusPopup?: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeTab }) => {
  return (
    <div className="pt-6 pb-28 space-y-6 bg-white min-h-screen">
      
      {/* Header */}
      <div className="flex px-5 justify-between items-center border-b border-gray-100 pb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
            <img src="https://picsum.photos/seed/abdullah/100/100" alt="Abdullah" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Assalam o Alaikom</p>
            <h1 className="text-lg font-bold text-gray-800">Abdullah!</h1>
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

      {/* Upgrade Banner */}
      <div className="px-5">
        <div className="relative px-5 rounded-2xl top-card mt-5 text-white p-5 shadow-lg shadow-blue-900/10">
          <div className="relative z-10 w-2/3">
            <h2 className="text-lg font-bold mb-1">Upgrade to Ihram Account</h2>
            <p className="text-xs text-blue-100 mb-4 leading-relaxed">
              Unlock exclusive savings, earn double points, and priority support.
            </p>

            {/* IMPORTANT: bonusPopup = true */}
            <button
              onClick={() => onChangeTab(Tab.JOURNEY, true)}
              className="bg-[#24B3BA] flex items-center gap-1 hover:bg-primary hover:text-white text-white text-xs font-bold py-2.5 px-5 rounded-lg transition-colors shadow-md"
            >
              <img src="/assets/svgs/sparkles.svg" alt="" /> Upgrade Now
            </button>
          </div>

          <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40">
            <img
              src="/assets/images/ihram.png"
              alt="Pilgrim"
              className="pi"
              style={{ height: '203px', transform: 'translateY(-62px)' }}
            />
          </div>

          <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 px-5">
        <div className="bg-[#F4F8FB] rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-gray-500">Umrah Savings</span>
            <img src="/assets/svgs/savings.svg" className="w-[25px]" alt="" />
          </div>
          <h3 className="font-bold text-[12px] text-gray-800">PKR 250,000</h3>
          <p className="text-[10px] text-gray-400 mt-1">
            You’re getting close to your Umrah - keep moving at your pace.
          </p>
        </div>

        <div className="bg-[#F4F8FB] rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-gray-500">Ihram Points</span>
            <img src="/assets/svgs/ihram_points.svg" className="w-[25px]" alt="" />
          </div>
          <h3 className="text-[12px] font-bold text-gray-800">1,259</h3>
          <p className="text-[10px] text-gray-400 mt-1">
            Collect points with every booking and step closer to exclusive Umrah rewards.
          </p>
        </div>
      </div>

      {/* Tip Card */}
      <div className="px-5">
        <div className="bg-[#F4F8FB] rounded-2xl p-5 border border-gray-100 px-5">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-primary-pale text-primary rounded-full flex items-center justify-center">
              <span className="text-xs">💡</span>
            </div>
            <h3 className="text-[12px] font-bold text-gray-800">Ibrahim's Tip</h3>
          </div>
          <p className="text-[10px] text-gray-600 leading-relaxed mb-3">
            "Based on your saving rate, if you invite 2 family members to contribute, you could reach your goal 
            <span className="font-bold text-gray-800"> 2 months earlier!</span>"
          </p>

          <button
            onClick={() => onChangeTab(Tab.PLANS)}
            className="text-primary text-xs font-bold flex items-center hover:underline"
          >
            Ask Ibrahim <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Lucky Draw */}
      <div className="px-5">
        <div className="relative lucky-draw rounded-2xl p-5 text-white ">
          <div className="relative z-10 w-2/3">
            <h3 className="text-sm font-bold text-[#1E3A6D] mb-1">Umrah Lucky Draw</h3>

            <div className="flex items-center space-x-2 text-[10px] text-[#1E3A6D] mb-3">
              <span>Next Draw: 01/11/2025</span>
              <span className="bg-white/10 px-1.5 py-0.5 rounded">Entries: 5</span>
            </div>

            <div className="w-full bg-gray-100 h-1.5 rounded-full my-2">
              <div className="bg-primary h-full w-1/2 rounded-full"></div>
            </div>

            <button className="w-[80%] bg-[#1E3A6D] hover:bg-blue-600 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-colors border border-white/10">
              <Gift size={12} />
              <span>Spin Used Today</span>
            </button>
          </div>

          <div className="absolute right-[-25px] bottom-0">
            <img src="/assets/images/gift.png" className="w-[190px]" alt="" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
