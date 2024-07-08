import { format, toZonedTime } from 'date-fns-tz';
import { PlaneTakeoff } from 'lucide-react';
import { useContext } from 'react';

import { FlightContext } from '@/App';
import { Typography } from '@/components/Typography';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

const formatToEST = (dateString: string) => {
  const date = new Date(dateString);
  const timeZone = 'America/New_York'; // EST time zone
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'hh:mm aaaa'); // 12-hour format
};

export const Results: React.FC = () => {
  const { flights } = useContext(FlightContext);
  const bestScore = Math.max(...flights.map((result) => result.score));

  const tableHeads = [
    'Airline',
    'Flight Number',
    'Departure',
    'Duration',
    'Arrival',
    'Cost',
    'Score',
    '', // best flight badge
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeads.map((head) => (
            <TableHead key={head}>
              <Typography variant="small" color="#549CDE">
                {head}
              </Typography>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {flights.map((result) => (
          <TableRow key={result.flight_number}>
            <TableCell>{result.airline}</TableCell>
            <TableCell>{result.flight_number}</TableCell>
            <TableCell>{formatToEST(result.departure_time)}</TableCell>
            <TableCell>{result.duration}</TableCell>
            <TableCell>{formatToEST(result.arrival_time)}</TableCell>
            <TableCell>${result.cost} CAD</TableCell>
            <TableCell>{result.score}</TableCell>
            <TableCell>
              {result.score === bestScore ? <BestFlightBadge /> : ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
