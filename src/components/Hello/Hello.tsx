import React, { useEffect, useState } from 'react';
import { getHello } from '../../services/api';

export const Hello: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHello();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchData();
  }, []);

  return <h1>{message}</h1>;
};