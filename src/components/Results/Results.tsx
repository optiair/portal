import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Typography } from '../Typography';
import { PlaneTakeoff } from 'lucide-react';

import styles from './Results.module.scss';

const MOCK_RESULTS = [
  {
    time: '8:00 AM - 10:00 AM',
    airline: 'Air Canada',
    duration: '4h 15m',
    cost: '$367',
    score: 14.5,
  },
  {
    time: '11:30 AM - 2:45 PM',
    airline: 'WestJet',
    duration: '3h 30m',
    cost: '$299',
    score: 10,
  },
  {
    time: '1:00 PM - 4:20 PM',
    airline: 'Porter Airlines',
    duration: '3h 50m',
    cost: '$320',
    score: 12.5,
  },
  {
    time: '6:00 PM - 8:10 PM',
    airline: 'Air Transat',
    duration: '2h 50m',
    cost: '$280',
    score: 8,
  },
];

const BestFlightBadge: React.FC = () => {
  return (
    <Badge>
      <div className={styles.badge}>
        <PlaneTakeoff size={16}/>
        <Typography variant="tiny">Best Flight</Typography>
      </div>
    </Badge>
  );
};

export const Results: React.FC = () => {
  const bestScore = Math.max(...MOCK_RESULTS.map((result) => result.score));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Typography variant="small" color="#549CDE">
              Time
            </Typography>
          </TableHead>
          <TableHead>
            <Typography variant="small" color="#549CDE">
              Airline
            </Typography>
          </TableHead>
          <TableHead>
            <Typography variant="small" color="#549CDE">
              Duration
            </Typography>
          </TableHead>
          <TableHead>
            <Typography variant="small" color="#549CDE">
              Cost
            </Typography>
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {MOCK_RESULTS.map((result) => (
          <TableRow>
            <TableCell>{result.time}</TableCell>
            <TableCell>{result.airline}</TableCell>
            <TableCell>{result.duration}</TableCell>
            <TableCell>{result.cost}</TableCell>
            <TableCell>
              {result.score === bestScore ? <BestFlightBadge /> : ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
