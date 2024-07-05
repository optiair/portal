import React, { useState } from 'react';

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
  // Airports
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const handleOriginChange = (newValue: string) => {
    setOrigin(newValue);
  };

  const handleDestinationChange = (newValue: string) => {
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
            <Button className={styles.primaryButton}>
              <Typography variant="small">Show Flights</Typography>
            </Button>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
