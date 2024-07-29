export interface PredictionRequest {
  userId: string;
  ticketType: TicketType;
  bets: Bet[];
}

export interface Bet {
  betType: BetType;
  amount: number;
  events: BetEvent[];
}

export interface BetEvent {
  eventId: number;
  eventName?: string;
  description?: string;
  prediction: number;
  odds: number;
}


export interface Outcome {
  id: number;
  imgUrl: string;
  eventId: number;
  eventName?: string;
  description: string;
  odds: number;
}

export interface Tournament {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  categoryId: number;
  link?: string;
  imgUrl?: string;
}

export interface Category {
  id: number;
  name: string;
  imgUrl: string;
  gameId: number;
}

export interface Game {
  id: number;
  name: string;
  imgUrl: string;
  status: string;
}

export interface BBNEvent {
  id: number;
  name: string;
  eventTypeTemplateId: number;
  type: EventType;
  outcome: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  eventDate: string;
  tournamentId: number;
  link?: string;
}

export interface UserBalance {
  id: number;
  lgUserId: string;
  dcurBalance: number;
  dwinBalance: number;
  dtCreated: string;
  dtUpdated: string;
}

export interface TransactionSearch {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  betType?: string;
  jackpotId?: string;
  status?: string;
}

export interface BetTransaction {
  id: number;
  betType: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  potentialWinnings: number;
  taxAmount: number;
  finalWinnings: number;
  amount: number;
  showDetails?: boolean; //used for ui expansion
  betItems: BetItem[];
  odds?: number; //added for ui
}

export interface BetItem {
  id: number;
  eventId: number;
  odds: number;
  status: string;
  outcomeId: number;
  outcomeName: string;
  eventName: string;
}

export type EventStatus = "SETTLED" | "PENDING" | "CANCELLED";

export type EventType = "NOMINATIONS" | "EVICTIONS" | "TASKS" | "WINNER" | "HEAD_OF_HOUSE" | "VETO_POWER" | "NOMINATION_REPLACEMENT" | "VETO_POWER_REPLACEMENT" | "DISQUALIFICATION" | "EVICTION_REPLACEMENT";

export type BetType = "SINGLE" | "MULTIPLE";

export type TicketType = "ODDS" | "JACKPOT";
