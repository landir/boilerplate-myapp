import React, { createContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { THEMES } from 'src/constants';

enum Direction {
  ltr = 'ltr',
  rtl = 'rtl'
}

export interface ISettings {
  direction?: Direction;
  responsiveFontSizes?: boolean;
  theme?: string;
}

export interface ISettingsCtx {
  settings: ISettings;
  saveSettings: (update: ISettings) => void;
}

const defaultSettings: ISettings = {
  direction: Direction.ltr,
  responsiveFontSizes: true,
  theme: THEMES.ONE_DARK
};

const prefModeDark = () => {
  if (typeof window !== 'undefined') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      // if found system pref use it
      return mql.matches ? THEMES.ONE_DARK : THEMES.LIGHT;
    }
  }
  // if not found pref in the system use dark
  return THEMES.ONE_DARK;
};

export const restoreSettings = (): ISettings => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }
  return settings;
};

export const storeSettings = (settings: ISettings): void => {
  window.localStorage.setItem('settings', JSON.stringify(settings));
};

const SettingsContext = createContext<ISettingsCtx>({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveSettings: () => {}
});

export const SettingsProvider: React.FC<{ settings?: ISettings }> = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(settings || defaultSettings);

  const handleSaveSettings = (update: ISettings) => {
    const mergedSettings = _.merge({}, currentSettings, update);

    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
  };

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setCurrentSettings(restoredSettings);
    } else {
      setCurrentSettings({ theme: prefModeDark() });
    }
  }, []);

  useEffect(() => {
    document.dir = currentSettings.direction || Direction.ltr;
  }, [currentSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
