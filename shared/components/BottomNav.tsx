import React from 'react';
import { Home, Package, Calendar, ShoppingBag, User } from 'lucide-react';
import { Tab } from '../../core/types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, icon: Home, label: 'Home' },
    { id: Tab.JOURNEY, icon: Package, label: 'Ihram' },
    { id: Tab.PLANS, icon: Calendar, label: 'Plans' },
    { id: Tab.POINTS, icon: ShoppingBag, label: 'Ihram Points' },
    { id: Tab.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white pb-safe pt-2 px-4 z-50 max-w-md mx-auto  rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center pb-4 pt-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1.5 transition-all duration-300 w-1/5 ${
                isActive ? 'text-accent' : 'text-blue-200'
              }`}
            >
              <div className={`transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
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