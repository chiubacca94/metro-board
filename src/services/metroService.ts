import apiService from './baseAPI';
import { Arrival, MetroResponse, Station, WMATATrain } from '../types/metro';

const LINE_CODES: Record<string, string> = {
  RD: 'Red', BL: 'Blue', OR: 'Orange', SV: 'Silver', GR: 'Green', YL: 'Yellow',
};

class MetroService {
  private readonly BASE_PATH = 'http://api.wmata.com/';
  private stationCache: Station[] = [];

  async getStations(): Promise<string[]> {
    try {
      const response = await apiService.get<{ Stations: Station[] }>(`${this.BASE_PATH}Rail.svc/json/jStations`);
      this.stationCache = response.Stations;
      return response.Stations.map(s => s.Name);
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  }

  async getArrivals(stationName: string): Promise<MetroResponse> {
    try {
      if (this.stationCache.length === 0) {
        await this.getStations();
      }
      const station = this.stationCache.find(s => s.Name === stationName);
      const stationCode = station?.Code ?? 'A01';

      const response = await apiService.get<{ Trains: WMATATrain[] }>(
        `${this.BASE_PATH}StationPrediction.svc/json/GetPrediction/${stationCode}`
      );

      const trains: Arrival[] = response.Trains.map(train => {
        const isBoarding = train.Min === 'BRD';
        const isArriving = train.Min === 'ARR';
        const isDelayed = train.Min === 'DLY';
        return {
          platform: train.Group,
          line: LINE_CODES[train.Line] ?? train.Line,
          destination: train.DestinationName,
          via: '',
          time: isBoarding || isArriving ? '0' : isDelayed ? '?' : train.Min,
          status: isBoarding ? 'BRD' : isArriving ? 'ARR' : isDelayed ? 'DLY' : 'SCH',
          delayed: isDelayed,
        };
      });

      return { station: stationName, Trains: trains, lastUpdated: new Date().toISOString() };
    } catch (error) {
      console.error(`Error fetching arrivals for ${stationName}:`, error);
      throw error;
    }
  }
}

const metroService = new MetroService();
export default metroService;
