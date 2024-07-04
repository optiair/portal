import React from 'react';
import styles from './Dashboard.module.scss';
import { Typography } from '@/components/Typography';
import { Send } from 'lucide-react';
import { Search } from '@/components/Search';
import { Results } from '@/components/Results';

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Send size="40px" color="#549CDE" />
        <Typography variant="extra-extra-large" color="#549CDE">
          OptimalAir
        </Typography>
      </div>

      <div className={styles.content}>
        <Search />
        <Results />
      </div>
    </div>
  );
};
