import { Info } from 'lucide-react';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import styles from './Preferences.module.scss';

export const RadioOptions: React.FC = () => {
  return (
    <RadioGroup defaultValue="option-three" className="grid-flow-col">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-two">1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-two">3</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-four" id="option-four" />
        <Label htmlFor="option-two">4</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-five" id="option-five" />
        <Label htmlFor="option-two">5</Label>
      </div>
    </RadioGroup>
  );
};

export const Preferences: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={styles.ghostButton}>
          <Typography variant="small">Preferences</Typography>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className={styles.header}>
            <DialogTitle>Search Preferences</DialogTitle>
            <DialogDescription>
              <div className={styles.description}>
                <Typography variant="small" color="#4F4F4F">
                  Please enter your search preferences here.
                </Typography>
                <Typography variant="small" color="#4F4F4F">
                  1 is least preferred, 5 is most preferred.
                </Typography>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className={styles.container}>
          <div className={styles.radioContainer}>
            <div className={styles.radioHeader}>
              <Typography variant="small" color="#549CDE">
                Cost of ticket
              </Typography>
              {/* <Info size={18} className={styles.icon} /> */}
            </div>
            <RadioOptions />
          </div>
          <div className={styles.radioContainer}>
            <div className={styles.radioHeader}>
              <Typography variant="small" color="#549CDE">
                Duration of flight
              </Typography>
              {/* <Info size={18} className={styles.icon} /> */}
            </div>
            <RadioOptions />
          </div>
          <div className={styles.radioContainer}>
            <div className={styles.radioHeader}>
              <Typography variant="small" color="#549CDE">
                Redeye flight
              </Typography>
              {/* <Info size={18} className={styles.icon} /> */}
            </div>
            <RadioOptions />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
