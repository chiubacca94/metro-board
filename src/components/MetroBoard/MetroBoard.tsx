import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Train } from 'lucide-react';
import './MetroBoard.css'

interface Arrival {
  platform: string;
  line: string;
  destination: string;
  via: string;
  time: string;
  status: string;
  delayed: boolean;
}

const MetroBoard: React.FC = () => {
  const [currentStation, setCurrentStation] = useState<string>('Metro Center');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const stations: string[] = [
    'Metro Center',
    'Gallery Place',
    'Union Station',
    'L\'Enfant Plaza',
    'Dupont Circle',
    'Farragut North',
    'Foggy Bottom',
    'Rosslyn',
    'Pentagon',
    'Arlington Cemetery',
    'Crystal City',
    'Judiciary Square',
    'Eastern Market',
    'Capitol South',
    'Smithsonian',
    'Federal Triangle',
    'Archives',
    'Waterfront',
    'Navy Yard',
    'Anacostia',
    'Vienna'
  ].sort();

  const getArrivals = (station: string): Arrival[] => {
    // This function would normally fetch real-time data from an API
    // For this example, we will return hard-coded data
    return [];
  }

  // Hard codes the arrivals data for demonstration purposes
  const generateArrivals = (station: string): Arrival[] => {
    const arrivalsByStation: Record<string, Arrival[]> = {
      'Metro Center': [
        { platform: 'B1', line: 'Red', destination: 'Shady Grove', via: 'Dupont Circle, Farragut North', time: '2', status: 'BRD', delayed: false },
        { platform: 'A2', line: 'Orange', destination: 'Vienna', via: 'Foggy Bottom, Rosslyn', time: '3', status: 'ARR', delayed: false },
        { platform: 'B2', line: 'Red', destination: 'Glenmont', via: 'Gallery Place, Union Station', time: '5', status: 'ARR', delayed: false },
        { platform: 'A1', line: 'Blue', destination: 'Franconia-Springfield', via: 'Pentagon, Crystal City', time: '6', status: 'ARR', delayed: false },
        { platform: 'A2', line: 'Silver', destination: 'Ashburn', via: 'Foggy Bottom, Rosslyn', time: '9', status: 'DLY', delayed: true },
        { platform: 'A2', line: 'Orange', destination: 'Vienna', via: 'Foggy Bottom, Rosslyn', time: '11', status: 'ARR', delayed: false },
        { platform: 'B1', line: 'Red', destination: 'Shady Grove', via: 'Dupont Circle, Farragut North', time: '12', status: 'ARR', delayed: false }
      ],
      'Gallery Place': [
        { platform: 'A1', line: 'Red', destination: 'Shady Grove', via: 'Metro Center, Farragut North', time: '1', status: 'BRD', delayed: false },
        { platform: 'A2', line: 'Red', destination: 'Glenmont', via: 'Union Station, Rhode Island Ave', time: '4', status: 'ARR', delayed: false },
        { platform: 'B1', line: 'Green', destination: 'Branch Ave', via: 'Navy Yard, Anacostia', time: '6', status: 'ARR', delayed: false },
        { platform: 'B2', line: 'Yellow', destination: 'Huntington', via: 'L\'Enfant Plaza, Pentagon', time: '8', status: 'ARR', delayed: false },
        { platform: 'A1', line: 'Red', destination: 'Shady Grove', via: 'Metro Center, Farragut North', time: '10', status: 'ARR', delayed: false }
      ],
      'Union Station': [
        { platform: 'A1', line: 'Red', destination: 'Glenmont', via: 'Rhode Island Ave, Brookland', time: '3', status: 'BRD', delayed: false },
        { platform: 'A2', line: 'Red', destination: 'Shady Grove', via: 'Gallery Place, Metro Center', time: '5', status: 'ARR', delayed: false },
        { platform: 'A1', line: 'Red', destination: 'Glenmont', via: 'Rhode Island Ave, Brookland', time: '11', status: 'ARR', delayed: false },
        { platform: 'A2', line: 'Red', destination: 'Shady Grove', via: 'Gallery Place, Metro Center', time: '13', status: 'ARR', delayed: false }
      ],
      'L\'Enfant Plaza': [
        { platform: 'A1', line: 'Orange', destination: 'New Carrollton', via: 'Capitol South, Eastern Market', time: '2', status: 'BRD', delayed: false },
        { platform: 'B1', line: 'Blue', destination: 'Franconia-Springfield', via: 'Pentagon, Crystal City', time: '4', status: 'ARR', delayed: false },
        { platform: 'C1', line: 'Green', destination: 'Branch Ave', via: 'Waterfront, Navy Yard', time: '5', status: 'ARR', delayed: false },
        { platform: 'D1', line: 'Yellow', destination: 'Huntington', via: 'Pentagon, Crystal City', time: '7', status: 'ARR', delayed: false },
        { platform: 'A2', line: 'Silver', destination: 'Ashburn', via: 'Foggy Bottom, Rosslyn', time: '9', status: 'ARR', delayed: false },
        { platform: 'B2', line: 'Blue', destination: 'Largo Town Center', via: 'Capitol South, Stadium-Armory', time: '12', status: 'DLY', delayed: true }
      ],
      'Rosslyn': [
        { platform: 'A1', line: 'Orange', destination: 'New Carrollton', via: 'Foggy Bottom, Metro Center', time: '3', status: 'BRD', delayed: false },
        { platform: 'A2', line: 'Silver', destination: 'Ashburn', via: 'Tysons, Reston', time: '4', status: 'ARR', delayed: false },
        { platform: 'B1', line: 'Blue', destination: 'Franconia-Springfield', via: 'Pentagon, Crystal City', time: '6', status: 'ARR', delayed: false },
        { platform: 'A1', line: 'Orange', destination: 'Vienna', via: 'Ballston, East Falls Church', time: '8', status: 'ARR', delayed: false },
        { platform: 'A2', line: 'Silver', destination: 'Largo Town Center', via: 'Foggy Bottom, Metro Center', time: '10', status: 'ARR', delayed: false }
      ],
      'Vienna': [
        { platform: 'A1', line: 'Orange', destination: 'New Carrollton', via: 'Dunn Loring, Metro Center', time: '11', status: 'BRD', delayed: false },
        { platform: 'A1', line: 'Orange', destination: 'New Carrollton', via: 'Dunn Loring, Metro Center', time: '4', status: 'ARR', delayed: false },
      ]
    };

    return arrivalsByStation[station] || [
      { platform: 'A1', line: 'Red', destination: 'Shady Grove', via: 'Metro Center, Dupont Circle', time: '3', status: 'ARR', delayed: false },
      { platform: 'A2', line: 'Red', destination: 'Glenmont', via: 'Gallery Place, Union Station', time: '6', status: 'ARR', delayed: false },
      { platform: 'B1', line: 'Blue', destination: 'Franconia-Springfield', via: 'Pentagon, Crystal City', time: '8', status: 'ARR', delayed: false },
      { platform: 'B2', line: 'Orange', destination: 'Vienna', via: 'Rosslyn, Ballston', time: '11', status: 'ARR', delayed: false },
      { platform: 'C1', line: 'Green', destination: 'Branch Ave', via: 'Navy Yard, Anacostia', time: '13', status: 'ARR', delayed: false }
    ];
  };

  const [arrivals, setArrivals] = useState<Arrival[]>(generateArrivals(currentStation));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setArrivals(generateArrivals(currentStation));
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
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <select
                    value={currentStation}
                    onChange={(e) => setCurrentStation(e.target.value)}
                    className="bg-slate-800 text-white border border-slate-700 px-3 py-1 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-700 transition-colors"
                  >
                    {stations.map((station) => (
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
          <div className="col-span-4">Via</div>
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
              <div className="col-span-4">
                <div className="text-slate-400 text-sm">{arrival.via || '—'}</div>
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