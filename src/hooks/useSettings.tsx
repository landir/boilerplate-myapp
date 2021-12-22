import { useContext } from 'react';
import SettingsContext, { ISettingsCtx } from './SettingsContext';

const useSettings = (): ISettingsCtx => useContext(SettingsContext);

export default useSettings;
