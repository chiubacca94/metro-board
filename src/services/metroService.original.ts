import apiService from './baseAPI';
import { MetroResponse, Station, Arrival } from '../types/metro';

class MetroService {
  private readonly BASE_PATH = '/metro';

  /**
   * Get all available stations
   */
  async getStations(): Promise<Station[]> {
    try {
      return await apiService.get<Station[]>(`${this.BASE_PATH}/stations`);
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  }

  /**
   * Get arrivals for a specific station
   */
  async getArrivals(stationName: string): Promise<MetroResponse> {
    try {
      return await apiService.get<MetroResponse>(
        `${this.BASE_PATH}/arrivals/${encodeURIComponent(stationName)}`
      );
    } catch (error) {
      console.error(`Error fetching arrivals for ${stationName}:`, error);
      throw error;
    }
  }

  /**
   * Get arrivals by line
   */
  async getArrivalsByLine(line: string): Promise<Arrival[]> {
    try {
      return await apiService.get<Arrival[]>(`${this.BASE_PATH}/arrivals/line/${line}`);
    } catch (error) {
      console.error(`Error fetching arrivals for line ${line}:`, error);
      throw error;
    }
  }

  /**
   * Get real-time train updates for a station
   */
  async getRealTimeUpdates(stationName: string): Promise<MetroResponse> {
    try {
      return await apiService.get<MetroResponse>(
        `${this.BASE_PATH}/realtime/${encodeURIComponent(stationName)}`
      );
    } catch (error) {
      console.error(`Error fetching real-time updates for ${stationName}:`, error);
      throw error;
    }
  }

  /**
   * Report a delay
   */
  async reportDelay(data: { station: string; line: string; description: string }): Promise<void> {
    try {
      await apiService.post(`${this.BASE_PATH}/report-delay`, data);
    } catch (error) {
      console.error('Error reporting delay:', error);
      throw error;
    }
  }
}

export default new MetroService();