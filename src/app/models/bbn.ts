export interface PredictionRequest {
  userId: string;
  ticketType: TicketType;
  bets: BetEvent[];
}

export interface Bet {
  betType: BetType;
  amount: number;
  events: BetEvent[];
}

export interface BetEvent {
  eventId: number;
  prediction: number;
  odds: number;
}


export interface Outcome {
  id: number;
  imgUrl: string;
  eventId: number;
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

export type EventStatus = "SETTLED" | "PENDING" | "CANCELLED";

export type EventType = "NOMINATIONS" | "EVICTIONS" | "TASKS" | "WINNER" | "HEAD_OF_HOUSE" | "VETO_POWER" | "NOMINATION_REPLACEMENT" | "VETO_POWER_REPLACEMENT" | "DISQUALIFICATION" | "EVICTION_REPLACEMENT";

export type BetType = "SINGLE" | "COMBINATION";

export type TicketType = "ODDS" | "JACKPOT";
