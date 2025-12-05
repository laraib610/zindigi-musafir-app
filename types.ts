export enum Tab {
  HOME = 'HOME',
  TRAVEL = 'TRAVEL',
  AI_PLANNER = 'AI_PLANNER',
  WALLET = 'WALLET',
  PROFILE = 'PROFILE'
}

export interface FlightOffer {
  id: string;
  airline: string;
  price: string;
  time: string;
  duration: string;
  logo: string;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
  suggestedItinerary?: ItineraryItem[];
}

export interface ItineraryItem {
  day: number;
  activity: string;
  time: string;
  location: string;
}

export enum TravelMode {
  FLIGHT = 'FLIGHT',
  BUS = 'BUS',
  HOTEL = 'HOTEL'
}
