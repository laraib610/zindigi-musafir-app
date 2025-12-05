import React, { useState } from 'react';
import { Plane, Bus, Building, Search, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { TravelMode, FlightOffer } from '../types';

const TravelTab: React.FC = () => {
  const [mode, setMode] = useState<TravelMode>(TravelMode.FLIGHT);

  const offers: FlightOffer[] = [
    { id: '1', airline: 'PIA', price: '25,400', time: '10:00 AM - 12:00 PM', duration: '2h', logo: 'PK' },
    { id: '2', airline: 'Airblue', price: '23,100', time: '02:00 PM - 04:00 PM', duration: '2h', logo: 'PA' },
    { id: '3', airline: 'Serene', price: '26,500', time: '06:00 PM - 08:00 PM', duration: '2h', logo: 'ER' },
  ];

  return (
    <div className="pt-6 pb-24 px-4 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Musafir Booking</h1>

      {/* Mode Switcher */}
      <div className="flex bg-gray-200 p-1 rounded-xl mb-6">
        {[
          { id: TravelMode.FLIGHT, icon: Plane, label: 'Flights' },
          { id: TravelMode.BUS, icon: Bus, label: 'Bus' },
          { id: TravelMode.HOTEL, icon: Building, label: 'Hotels' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === m.id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <m.icon size={16} />
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="relative mb-4">
          <div className="absolute top-3.5 left-0 pl-3 flex items-center pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-cyan-500 ring-4 ring-cyan-100"></div>
          </div>
          <label className="block text-xs font-semibold text-gray-400 pl-8 mb-1">From</label>
          <input 
            type="text" 
            defaultValue="Karachi (KHI)" 
            className="w-full pl-8 pr-4 py-2 bg-gray-50 rounded-lg text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div className="relative mb-4">
          <div className="absolute top-3.5 left-0 pl-3 flex items-center pointer-events-none">
             <MapPin size={12} className="text-red-500" fill="currentColor" />
          </div>
          <label className="block text-xs font-semibold text-gray-400 pl-8 mb-1">To</label>
          <input 
            type="text" 
            defaultValue="Islamabad (ISB)" 
            className="w-full pl-8 pr-4 py-2 bg-gray-50 rounded-lg text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div className="flex gap-4 mb-6">
            <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-400 mb-1">Departure</label>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Calendar size={16} className="text-gray-400"/>
                    <span className="text-sm font-semibold">15 Oct</span>
                </div>
            </div>
             <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-400 mb-1">Return</label>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Calendar size={16} className="text-gray-400"/>
                    <span className="text-sm font-semibold text-gray-400">Add Date</span>
                </div>
            </div>
        </div>

        <button className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-cyan-200 hover:bg-cyan-600 transition-colors flex items-center justify-center space-x-2">
            <Search size={20} />
            <span>Search {mode === TravelMode.FLIGHT ? 'Flights' : mode === TravelMode.BUS ? 'Buses' : 'Hotels'}</span>
        </button>
      </div>

      {/* Results Preview */}
      <div className="flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Popular Deals</h3>
            <span className="text-cyan-600 text-xs font-semibold">View All</span>
        </div>
        
        <div className="space-y-3">
            {offers.map((offer) => (
                <div key={offer.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                            {offer.logo}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">{offer.airline}</h4>
                            <p className="text-xs text-gray-400">{offer.time} • {offer.duration}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-cyan-600">Rs. {offer.price}</span>
                        <button className="bg-gray-100 hover:bg-gray-200 p-1.5 rounded-lg mt-1 transition-colors">
                            <ArrowRight size={16} className="text-gray-600"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TravelTab;