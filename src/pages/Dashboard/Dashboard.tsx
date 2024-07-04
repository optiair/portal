import { Send } from 'lucide-react';
import React from 'react';

import { Results } from '@/components/Results';
import { Search } from '@/components/Search';
import { Typography } from '@/components/Typography';

import styles from './Dashboard.module.scss';

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
