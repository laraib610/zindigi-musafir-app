import React from 'react';
import { Home, Plane, MessageSquareText, Wallet, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, icon: Home, label: 'Home' },
    { id: Tab.TRAVEL, icon: Plane, label: 'Musafir' },
    { id: Tab.AI_PLANNER, icon: MessageSquareText, label: 'AI Plan' },
    { id: Tab.WALLET, icon: Wallet, label: 'Wallet' },
    { id: Tab.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 shadow-[0_-5px_10px_rgba(0,0,0,0.02)] z-50 max-w-md mx-auto rounded-t-2xl">
      <div className="flex justify-between items-center pb-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                isActive ? 'text-cyan-600 -translate-y-2' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-full transition-all ${isActive ? 'bg-cyan-50 shadow-lg shadow-cyan-100' : ''}`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;