import React, { useContext, useState } from 'react';

import { FlightContext } from '@/App';
import { Preferences } from '@/components/Preferences';
import { PreferencesType } from '@/components/types';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ComboBox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/datepicker';
import airports from '@/data/airports.json';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const { flights, setFlights } = useContext(FlightContext);

  // Airports
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [airportError, setAirportError] = useState<boolean>(false);

  const handleOriginChange = (newValue: string) => {
    setAirportError(newValue == destination);
    setOrigin(newValue);
  };

  const handleDestinationChange = (newValue: string) => {
    setAirportError(newValue == origin);
    setDestination(newValue);
  };

  // Dates
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const handleDepartureDateChange = (newDate: Date) => {
    setDepartureDate(newDate);
  };

  const handleReturnDateChange = (newDate: Date) => {
    setReturnDate(newDate);
  };

  // Preferences
  const [preferences, setPreferences] = useState<PreferencesType>();

  const handlePreferencesChange = (newPreferences: PreferencesType) => {
    setPreferences(newPreferences);
  };

  const handleGetFlights = async () => {
    const apiUrl = 'http://127.0.0.1:5000/api/search';
    const params = new URLSearchParams({
      departure_id: origin,
      arrival_id: destination,
      outbound_date: departureDate?.toISOString().split('T')[0] || '',
      return_date: returnDate?.toISOString().split('T')[0] || '',
      cost_preference: preferences?.costPreference.toString() || '0',
      duration_preference: preferences?.durationPreference.toString() || '0',
      redeye_preference: preferences?.redeyePreference.toString() || '0',
    });

    try {
      const response = await fetch(`${apiUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching flights:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await handleGetFlights();
    setFlights(data.flights);
  };

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>
          <Typography variant="extra-large" color="#4F4F4F">
            Where are you flying?
          </Typography>
        </CardTitle>
        <CardContent className={styles.cardContent}>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              From
            </Typography>
            <ComboBox combos={airports} onValueChange={handleOriginChange} />
            {airportError && (
              <Typography variant="small" color="#FF6347">
                Origin and destination airports be the same.
              </Typography>
            )}
          </div>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              To
            </Typography>
            <ComboBox
              combos={airports}
              onValueChange={handleDestinationChange}
            />
          </div>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              Depart
            </Typography>
            <DatePicker onDateChange={handleDepartureDateChange} />
          </div>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              Return
            </Typography>
            <DatePicker onDateChange={handleReturnDateChange} />
          </div>
        </CardContent>
        <CardFooter>
          <div className={styles.cardFooter}>
            <Preferences onPreferencesChange={handlePreferencesChange} />
            <Button className={styles.primaryButton} onClick={handleSubmit}>
              <Typography variant="small">Show Flights</Typography>
            </Button>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
