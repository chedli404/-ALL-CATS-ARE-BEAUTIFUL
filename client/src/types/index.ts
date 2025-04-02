export interface Character {
  id: number;
  name: string;
  tribe: string;
  tribeColor: string;
  description: string;
  traits: string[];
  image: string;
}

export interface Tribe {
  id: number;
  name: string;
  description: string;
  color: string;
  strengths: string[];
  icon: string;
}

export interface Territory {
  id: string;
  name: string;
  description: string;
  tribe: string;
  path: string;
  color: string;
}

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  color: string;
  image: string;
}

export interface GameCard {
  id: number;
  name: string;
  type: string;
  tribe?: string;
  strength: number;
  description: string;
  color: string;
  icon: string;
}

export interface Poll {
  id: number;
  title: string;
  description: string;
  active: boolean;
  expiresAt?: string;
  options: PollOption[];
}

export interface PollOption {
  id: number;
  pollId: number;
  option: string;
  voteCount?: number;
}

export interface Vote {
  userId: number;
  optionId: number;
}
