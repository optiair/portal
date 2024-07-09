import React, { useEffect, useState } from 'react';

import { PreferencesType } from '@/components/types';
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

interface RadioOptionsProps {
  defaultValue: string;
  onChange: (value: string) => void;
}

const RadioOptions: React.FC<RadioOptionsProps> = ({
  defaultValue,
  onChange,
}) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      className="grid-flow-col"
      onValueChange={onChange}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="1" id="option-one" />
        <Label htmlFor="option-one">1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="2" id="option-two" />
        <Label htmlFor="option-two">2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="3" id="option-three" />
        <Label htmlFor="option-three">3</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="4" id="option-four" />
        <Label htmlFor="option-four">4</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="5" id="option-five" />
        <Label htmlFor="option-five">5</Label>
      </div>
    </RadioGroup>
  );
};

interface PreferencesProps {
  onPreferencesChange: (preferences: PreferencesType) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ onPreferencesChange }) => {
  const [open, setOpen] = React.useState(false);
  const [preferences, setPreferences] = useState<PreferencesType>({
    costPreference: 3,
    durationPreference: 3,
    redeyePreference: 3,
  });

  const [initialPreferences, setInitialPreferences] =
    useState<PreferencesType>(preferences);

  useEffect(() => {
    onPreferencesChange(preferences);
  }, [preferences, onPreferencesChange]);

  const handlePreferenceChange =
    (key: keyof PreferencesType) => (value: string) => {
      setPreferences((prev) => ({ ...prev, [key]: parseInt(value, 10) }));
    };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setPreferences(initialPreferences); // Reset preferences if dialog is closed without saving
    } else {
      setInitialPreferences(preferences); // Store initial preferences when dialog is opened
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
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
            <RadioOptions
              defaultValue={preferences.costPreference.toString()}
              onChange={handlePreferenceChange('costPreference')}
            />
          </div>
          <div className={styles.radioContainer}>
            <div className={styles.radioHeader}>
              <Typography variant="small" color="#549CDE">
                Duration of flight
              </Typography>
              {/* <Info size={18} className={styles.icon} /> */}
            </div>
            <RadioOptions
              defaultValue={preferences.durationPreference.toString()}
              onChange={handlePreferenceChange('durationPreference')}
            />
          </div>
          <div className={styles.radioContainer}>
            <div className={styles.radioHeader}>
              <Typography variant="small" color="#549CDE">
                Avoid redeye flight
              </Typography>
              {/* <Info size={18} className={styles.icon} /> */}
            </div>
            <RadioOptions
              defaultValue={preferences.redeyePreference.toString()}
              onChange={handlePreferenceChange('redeyePreference')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { Preferences };
