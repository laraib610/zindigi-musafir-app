import React from 'react';
import { ArrowUpRight, Plus, Send, MoreHorizontal, CreditCard, Zap, Smartphone, Lightbulb } from 'lucide-react';
import { Transaction } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Travel', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Bills', value: 300 },
  { name: 'Shopping', value: 200 },
];
const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

const HomeTab: React.FC = () => {
  const transactions: Transaction[] = [
    { id: '1', title: 'PIA Flight Booking', date: 'Today, 10:23 AM', amount: 25000, type: 'debit', category: 'Travel' },
    { id: '2', title: 'Amir Khan (Transfer)', date: 'Yesterday', amount: 5000, type: 'credit', category: 'Transfer' },
    { id: '3', title: 'Foodpanda', date: 'Yesterday', amount: 1250, type: 'debit', category: 'Food' },
  ];

  return (
    <div className="pt-6 pb-24 px-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-gray-500 text-sm font-medium">Good Morning,</h1>
          <h2 className="text-xl font-bold text-gray-800">Ali Raza</h2>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
           <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Wallet Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-cyan-100 text-sm font-medium">Total Balance</p>
              <h3 className="text-3xl font-bold mt-1">Rs. 145,200</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <CreditCard size={20} />
            </div>
          </div>
          
          <div className="flex space-x-4 mt-4">
            <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-colors">
              <Plus size={16} />
              <span className="text-sm font-medium">Add Money</span>
            </button>
            <button className="flex-1 bg-white text-blue-600 py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-sm font-medium">
              <Send size={16} />
              <span>Transfer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-gray-800 font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Smartphone, label: 'Mobile Load', color: 'bg-green-100 text-green-600' },
            { icon: Lightbulb, label: 'Bill Payment', color: 'bg-yellow-100 text-yellow-600' },
            { icon: Zap, label: 'Easy Load', color: 'bg-orange-100 text-orange-600' },
            { icon: MoreHorizontal, label: 'More', color: 'bg-gray-100 text-gray-600' },
          ].map((action, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                <action.icon size={24} />
              </div>
              <span className="text-xs text-gray-600 font-medium text-center leading-tight">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Analysis */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Monthly Spending</h3>
          <span className="text-xs text-gray-400">Oct 2023</span>
        </div>
        <div className="h-40 flex items-center">
            <ResponsiveContainer width="40%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="w-[60%] pl-4 space-y-2">
               {data.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{Math.round((item.value/1200)*100)}%</span>
                 </div>
               ))}
            </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Transactions</h3>
          <button className="text-cyan-600 text-sm font-semibold">See All</button>
        </div>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  <ArrowUpRight size={20} className={tx.type === 'debit' ? 'rotate-45' : 'rotate-[225deg]'} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{tx.title}</h4>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
              <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
                {tx.type === 'credit' ? '+' : '-'} Rs. {tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;