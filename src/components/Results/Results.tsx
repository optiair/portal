import { PlaneTakeoff } from 'lucide-react';
import { useContext } from 'react';

import { FlightContext } from '@/App';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Typography } from '../Typography';
import styles from './Results.module.scss';

const BestFlightBadge: React.FC = () => {
  return (
    <Badge>
      <div className={styles.badge}>
        <PlaneTakeoff size={16} />
        <Typography variant="tiny">Best Flight</Typography>
      </div>
    </Badge>
  );
};

export const Results: React.FC = () => {
  const { flights, setFlights } = useContext(FlightContext);
  const bestScore = Math.max(...flights.map((result) => result.score));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Typography variant="small" color="#549CDE">
              Airline
            </Typography>
          </TableHead>
          <TableHead>
            <Typography variant="small" color="#549CDE">
              Departure
            </Typography>
          </TableHead>
          <TableHead>
            <Typography variant="small" color="#549CDE">
              Arrival
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
        {flights.map((result) => (
          <TableRow>
            <TableCell>{result.airline}</TableCell>
            <TableCell>{result.departure_time}</TableCell>
            <TableCell>{result.arrival_time}</TableCell>
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
