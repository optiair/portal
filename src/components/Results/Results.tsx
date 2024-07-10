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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes.toString().padStart(2, '0')}min`;
};

export const Results: React.FC = () => {
  const { flights } = useContext(FlightContext);

  // Sort flights by weighted_score in descending order
  const sortedFlights = [...flights].sort(
    (a, b) => b.weighted_score - a.weighted_score
  );
  const bestScore = Math.max(
    ...sortedFlights.map((result) => result.weighted_score)
  );

  const tableHeads = [
    { title: 'Airline', description: 'The airline operating the flight' },
    {
      title: 'Flight Number',
      description: 'The flight number assigned by the airline',
    },
    {
      title: 'Departure',
      description: 'The departure time of the flight in EST',
    },
    { title: 'Duration', description: 'The total duration of the flight' },
    { title: 'Arrival', description: 'The arrival time of the flight in EST' },
    { title: 'Cost', description: 'The cost of the flight in CAD' },
    {
      title: 'Score',
      description:
        'Calculated based on a weighted average calculation of user preferences and flight variables',
    },
    {
      title: '',
      description: 'Badge indicating the best flight based on user preferences',
    }, // best flight badge
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeads.map((head) => (
            <TableHead key={head.title}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Typography variant="small" color="#549CDE">
                      {head.title}
                    </Typography>
                  </TooltipTrigger>
                  <TooltipContent className="w-[80%]">
                    <p>{head.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedFlights.map((result) => (
          <TableRow key={result.flight_number}>
            <TableCell>
              <div className={styles.airline}>
                <img
                  src={result.airline_logo}
                  alt={`${result.airline} logo`}
                  width={24}
                  height={24}
                />
                {result.airline}
              </div>
            </TableCell>
            <TableCell>{result.flight_number}</TableCell>
            <TableCell>{formatToEST(result.departure_time)}</TableCell>
            <TableCell>
              {convertMinutesToHoursAndMinutes(result.duration)}
            </TableCell>
            <TableCell>{formatToEST(result.arrival_time)}</TableCell>
            <TableCell>${result.cost} CAD</TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div>{result.weighted_score}/100</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Typography variant="small" color="#549CDE">
                      Score Calculation:
                    </Typography>
                    <Typography variant="small" color="#4F4F4F">
                      {result.weighted_bin_score[0] === 0
                        ? '0 - Cost is above average.'
                        : `${result.weighted_bin_score[0]} - Cost is below average.`}
                    </Typography>
                    <Typography variant="small" color="#4F4F4F">
                      {result.weighted_bin_score[1] === 0
                        ? '0 - Duration is above average.'
                        : `${result.weighted_bin_score[1]} - Duration is below average.`}
                    </Typography>
                    <Typography variant="small" color="#4F4F4F">
                      {result.weighted_bin_score[2] === 0
                        ? '0 - Redeye flight.'
                        : `${result.weighted_bin_score[2]} - Not a redeye flight.`}
                    </Typography>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>
              {result.weighted_score === bestScore ? <BestFlightBadge /> : ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
