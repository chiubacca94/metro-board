import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Train } from 'lucide-react';
import './MetroBoard.css'
import metroService from '../../services/metroService';
import { Arrival } from '../../types/metro';

const MetroBoard: React.FC = () => {
  const [currentStation, setCurrentStation] = useState<string>('Metro Center');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const [arrivals, setArrivals] = useState<Arrival[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const data = await metroService.getArrivals(currentStation);
        setArrivals(data.Trains);
      } catch (error) {
        console.error('Failed to fetch arrivals:', error);
      }
    };
    fetchArrivals();
    const poll = setInterval(fetchArrivals, 30_000);
    return () => clearInterval(poll);
  }, [currentStation]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getLineColor = (line: string): string => {
    const colors: Record<string, string> = {
      'Red': 'bg-red-600',
      'Blue': 'bg-blue-600',
      'Orange': 'bg-orange-500',
      'Silver': 'bg-slate-400',
      'Green': 'bg-green-600',
      'Yellow': 'bg-yellow-500'
    };
    return colors[line] || 'bg-gray-500';
  };

  const getStatusDisplay = (status: string, delayed: boolean): { text: string; color: string } => {
    if (delayed) {
      return { text: 'DLY', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    }
    switch(status) {
      case 'BRD':
        return { text: 'BRD', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      case 'ARR':
        return { text: 'ARR', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      default:
        return { text: status, color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
    }
  };

  // Get all stations from the metroService
  const [allStations, setAllStations] = useState<string[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stations = await metroService.getStations();
        const stationNames = stations;
        
        console.log('Station Names:', stationNames);
        setAllStations(Array.from(new Set(stationNames)).sort());
        console.log('All Stations:', stations);
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      }
    };
    fetchStations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Train className="w-10 h-10 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Departures</h1>
                <div className="flex items-center gap-3 mt-1">
                  <MapPin className="w-4 h-4 text-slate-400 mt-3" />
                  <select
                    value={currentStation}
                    onChange={(e) => setCurrentStation(e.target.value)}
                    className="bg-slate-800 text-white border border-slate-700 px-2 py-0.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-700 transition-colors mt-2 max-w-[180px] truncate"
                  >
                    {allStations.map((station) => (
                      <option key={station} value={station} className="bg-slate-800">
                        {station}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="text-4xl font-bold tracking-tight tabular-nums">{formatTime(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Table Header */}
        <div className="grid grid-cols-11 gap-6 px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
          <div className="col-span-1">Line</div>
          <div className="col-span-3">Destination</div>
          <div className="col-span-2">Departs In</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        {/* Arrivals */}
        <div className="space-y-2 mt-2">
          {arrivals.map((arrival, idx) => (
            <div 
              key={idx} 
              className={`grid grid-cols-11 gap-6 items-center px-6 py-5 rounded-xl transition-all hover:bg-slate-800/50 ${
                arrival.delayed ? 'bg-red-950/20 border border-red-900/30' : 'bg-slate-900/30 border border-slate-800/50'
              }`}
            >
              <div className="col-span-1">
                <div className={`h-8 ${getLineColor(arrival.line)} rounded flex items-center justify-center font-bold text-xs px-2 border-2 border-white/20`}>
                </div>
              </div>
              <div className="col-span-3">
                <div className="font-semibold text-lg">{arrival.destination}</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tabular-nums">{arrival.time}</span>
                  <span className="text-slate-500 text-sm">min</span>
                </div>
              </div>
              <div className="col-span-1 text-right">
                {(() => {
                  const statusInfo = getStatusDisplay(arrival.status, arrival.delayed);
                  return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color} border`}>
                      {statusInfo.text}
                    </span>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Notice */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-center text-slate-500 text-sm">
            Real-time updates • Check platform displays before boarding
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetroBoard;