import React from 'react';
import useSettings from 'src/hooks/useSettings';
import { ISettings } from 'src/hooks/SettingsContext';
import createTheme from 'src/theme/theme';
import { ThemeProvider } from '@material-ui/core/styles';

const MyThemeProvider: React.FC = ({ children }) => {
  const { settings } = useSettings();

  const myConfig: ISettings = {
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  };

  const theme = createTheme(myConfig);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  //prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }
  return body;
};

export default MyThemeProvider;
