import React from 'react';

import { Preferences } from '@/components/Preferences';
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
            <ComboBox combos={airports} />
          </div>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              To
            </Typography>
            <ComboBox combos={airports} />
          </div>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              Depart
            </Typography>
            <DatePicker />
          </div>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              Return
            </Typography>
            <DatePicker />
          </div>
        </CardContent>
        <CardFooter>
          <div className={styles.cardFooter}>
            <Preferences />
            <Button className={styles.primaryButton}>
              <Typography variant="small">Show Flights</Typography>
            </Button>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
