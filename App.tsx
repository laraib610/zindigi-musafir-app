import React, { useState } from 'react';
import BottomNav from './shared/components/BottomNav';
import Home from './features/home/Home';
import Journey from './features/Journey/Journey';
import Plans from './features/plans/Plans';
import { Tab } from './core/types';
import './App.css';
import { PartyPopper } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [showBonusModal, setShowBonusModal] = useState(false);

  // Updated handler to accept optional bonus flag
  const handleChangeTab = (tab: Tab, bonus?: boolean) => {
    setActiveTab(tab);

    if (bonus) {
      setTimeout(() => setShowBonusModal(true), 300);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Home onChangeTab={handleChangeTab} />;

      case Tab.JOURNEY:
        return <Journey onChangeTab={handleChangeTab} />;

      case Tab.PLANS:
        return <Plans onChangeTab={handleChangeTab} />;

      case Tab.POINTS:
        return (
          <div className="flex items-center justify-center h-screen text-gray-400 bg-gray-50">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <p className="text-lg font-bold text-gray-600">Ihram Points Store</p>
              <p className="text-sm mt-2">Redeem your points for exclusive discounts.</p>
            </div>
          </div>
        );

      case Tab.PROFILE:
        return (
          <div className="flex items-center justify-center h-screen text-gray-400 bg-gray-50">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-lg font-bold text-gray-600">User Profile</p>
              <p className="text-sm mt-2">Preferences & Settings</p>
            </div>
          </div>
        );

      default:
        return <Home onChangeTab={handleChangeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center font-sans">
      {/* Mobile Frame */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden">

        {/* Main Content */}
        <main className="h-full overflow-y-auto no-scrollbar bg-gray-50 pb-20">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* BONUS MODAL */}
        {showBonusModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-2xl shadow-xl text-center">

              <div className="flex justify-center items-center w-full">
                <img src="/assets/svgs/bonus.svg" alt="" />
              </div>
              <h2 className="text-lg font-bold text-primary">You Won</h2>

              <p className="text-sm text-[#627497] ">
                May this bring you blessings.
              </p>
              <div className="relative lucky-draw rounded-2xl p-5 mt-5 text-white ">
                <div className="relative z-10 w-full flex justify-between items-center">
                  <h5 className="text-md font-bold text-[#1E3A6D] mb-1">Bonus Reward</h5>
                  <div className="">
                    <h3 className="font-bold text-lg text-[#24B3BA]">+50</h3>
                    <p className="text-primary text-xs font-normal">Ihram Points</p>


                  </div>
                </div>
              </div>


              <button
                onClick={() => setShowBonusModal(false)}
                className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Continue
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
