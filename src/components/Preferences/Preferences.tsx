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
import { Slider } from '@/components/ui/slider';

import styles from './Preferences.module.scss';

interface PreferenceSliderProps {
  defaultValue: number;
  onChange: (value: string) => void;
}

const PreferenceSlider: React.FC<PreferenceSliderProps> = ({
  defaultValue,
  onChange,
}) => {
  return (
    <div className={styles.preferenceSlider}>
      <Slider
        defaultValue={[defaultValue]}
        max={100}
        step={1}
        onValueChange={onChange}
      />
      <div className={styles.preferenceSliderText}>
        <Typography variant="small">Not Important</Typography>
        <Typography variant="small">Important</Typography>
      </div>
    </div>
  );
};

interface PreferencesProps {
  onPreferencesChange: (preferences: PreferencesType) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ onPreferencesChange }) => {
  const [open, setOpen] = React.useState(false);
  const [preferences, setPreferences] = useState<PreferencesType>({
    costPreference: 50,
    durationPreference: 50,
    redeyePreference: 50,
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
          <Typography variant="small">Edit Preferences</Typography>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className={styles.header}>
            <DialogTitle>Search Preferences</DialogTitle>
            <DialogDescription>
              <div className={styles.description}>
                <Typography variant="small" color="#4F4F4F">
                  Please enter your search preferences here.
                </Typography>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className={styles.container}>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderHeader}>
              <Typography variant="small" color="#549CDE">
                How important is the cost of flight?
              </Typography>
              <Typography variant="small" color="#549CDE">
                {preferences.costPreference}
              </Typography>
            </div>
            <PreferenceSlider
              defaultValue={preferences.costPreference}
              onChange={handlePreferenceChange('costPreference')}
            />
          </div>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderHeader}>
              <Typography variant="small" color="#549CDE">
                How important is the duration of the flight?
              </Typography>
              <Typography variant="small" color="#549CDE">
                {preferences.durationPreference}
              </Typography>
            </div>
            <PreferenceSlider
              defaultValue={preferences.durationPreference}
              onChange={handlePreferenceChange('durationPreference')}
            />
          </div>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderHeader}>
              <Typography variant="small" color="#549CDE">
                How important is avoiding a departure time between 12:00AM to
                4:00AM?
              </Typography>
              <Typography variant="small" color="#549CDE">
                {preferences.redeyePreference}
              </Typography>
            </div>
            <PreferenceSlider
              defaultValue={preferences.redeyePreference}
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
