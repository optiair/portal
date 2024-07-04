import React from 'react';
import styles from './Search.module.scss';
import { Typography } from '@/components/Typography';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ComboBox } from '@/components/ui/combobox';
import airports from '@/data/airports.json';
import { DatePicker } from '../ui/datepicker';

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
            <ComboBox combos={airports} objName={'Airport'} />
          </div>
          <div className={styles.searchInput}>
            <Typography variant="small" color="#549CDE">
              To
            </Typography>
            <ComboBox combos={airports} objName={'Airport'} />
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
      </CardHeader>
    </Card>
  );
};
