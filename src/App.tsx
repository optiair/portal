import './App.css';

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/pages/Dashboard';

type FlightContextType = {
  flights: any[];
  setFlights: React.Dispatch<React.SetStateAction<any[]>>;
};

export const FlightContext = React.createContext<FlightContextType | null>(
  null
);

function App() {
  const [flights, setFlights] = useState<any[]>([]);

  return (
    <div>
      <FlightContext.Provider value={{ flights, setFlights }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </FlightContext.Provider>
    </div>
  );
}

export default App;
