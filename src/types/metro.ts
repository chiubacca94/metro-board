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
  Code: string;
  Name: string;
  StationTogether1: string;
  StationTogether2: string;
  LineCode1: string;
  LineCode2: string | null;
  LineCode3: string | null;
  LineCode4: string | null;
  Lat: number;
  Lon: number;
  Address: {
    Street: string;
    City: string;
    State: string;
    Zip: string;
  };
}

export interface MetroResponse {
  station: string;
  arrivals: Arrival[];
  lastUpdated: string;
}