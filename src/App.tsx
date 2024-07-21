import './App.css';

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PreferencesType } from '@/components/types';
import { ResultsPage } from '@/pages/ResultsPage';
import { SearchPage } from '@/pages/SearchPage';

type FlightContextType = {
  flights: any[];
  preferences: PreferencesType;
  googleFlightsURL: string;
  setFlights: React.Dispatch<React.SetStateAction<any[]>>;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesType>>;
  setGoogleFlightsURL: React.Dispatch<React.SetStateAction<string>>;
};

export const FlightContext = React.createContext<FlightContextType | null>(
  null
);

function App() {
  const [flights, setFlights] = useState<any[]>([]);
  const [preferences, setPreferences] = useState<PreferencesType>({
    costPreference: 50,
    durationPreference: 50,
    redeyePreference: 50,
  });
  const [googleFlightsURL, setGoogleFlightsURL] = useState<string>('');

  return (
    <div>
      <FlightContext.Provider
        value={{
          flights,
          preferences,
          googleFlightsURL,
          setFlights,
          setPreferences,
          setGoogleFlightsURL,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </BrowserRouter>
      </FlightContext.Provider>
    </div>
  );
}

export default App;
