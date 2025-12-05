
export enum Tab {
  HOME = 'HOME',
  JOURNEY = 'JOURNEY',
  PLANS = 'PLANS',
  POINTS = 'POINTS',
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

export enum IhramMode {
  OVERVIEW= 'OVERVIEW',
  UMRAH = 'UMRAH',
  OTHERS = 'OTHERS'
}

export enum UmrahPlan {
  OVERVIEW= 'OVERVIEW',
  UMRAH = 'UMRAH',
  OTHERS = 'OTHERS'
}
export enum PilgrimType{
  ADULT=1,
  CHILDREN=0,
  INFANT=0
}

