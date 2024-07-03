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

export const Search: React.FC = () => {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>
          <Typography variant="extra-large" color="#4F4F4F">
            Where are you flying?
          </Typography>
        </CardTitle>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
