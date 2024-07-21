import { Send } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@/components/Typography';

import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate('/search');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={handleHeaderClick}>
        <Send size="40px" color="#549CDE" />
        <Typography variant="extra-extra-large" color="#549CDE">
          OptimalAir
        </Typography>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
