

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
}

export interface Category {
  id: number;
  name: string;
  imgUrl: string;
  gameId: number;
}

export interface Event {
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
}

export type EventStatus = "SETTLED" | "PENDING" | "CANCELLED";

export type EventType = "NOMINATIONS" | "EVICTIONS" | "TASKS" | "WINNER" | "HEAD_OF_HOUSE" | "VETO_POWER" | "NOMINATION_REPLACEMENT" | "VETO_POWER_REPLACEMENT" | "DISQUALIFICATION" | "EVICTION_REPLACEMENT";
