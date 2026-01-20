export interface Arrival {
  platform: string;
  line: string;
  destination: string;
  via: string;
  time: string;
  status: string;
  delayed: boolean;
}

export interface Station {
  id: string;
  name: string;
  lines: string[];
}

export interface MetroResponse {
  station: string;
  arrivals: Arrival[];
  lastUpdated: string;
}