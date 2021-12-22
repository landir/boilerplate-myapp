import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Link from 'src/Link';
import { AppBar, Box, Divider, Toolbar, Hidden, Typography, Grid, Switch, NativeSelect } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { APP_VERSION } from 'src/constants';
import Image from 'next/image';
import LightModeIcon from '@material-ui/icons/LightMode';
import DarkModeIcon from '@material-ui/icons/DarkMode';
import useSettings from 'src/hooks/useSettings';
import { THEMES } from 'src/constants';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import TranslateIcon from '@material-ui/icons/Translate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default
    },
    toolbar: {
      height: 64
    },
    logo: {
      marginRight: theme.spacing(2),
      padding: theme.spacing(2)
    },
    link: {
      fontWeight: theme.typography.fontWeightMedium,
      '& + &': {
        marginLeft: theme.spacing(2)
      }
    },
    divider: {
      width: 1,
      height: 32,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  })
);

const TopBar: React.FC<{ className?: string }> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { settings, saveSettings } = useSettings();
  const [modeTheme, setModeTheme] = React.useState(settings.theme === THEMES.LIGHT);
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModeTheme(event.target.checked);
    saveSettings({
      theme: event.target.checked ? THEMES.LIGHT : THEMES.ONE_DARK
    });
  };

  const handleLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const locale = event.target.value;
      Cookies.set('NEXT_LOCALE', locale);
      const { pathname, query } = router;
      router.push({ pathname, query }, undefined, { locale });
    } catch (err) {
      console.error(err);
      // If stored data is not a strigified JSON this will fail,
      // that's why we catch the error
    }
  };

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <Link href="/" color="secondary" className={classes.logo}>
          <Image src="/logo3c-32.svg" height={32} width={32} />
        </Link>
        <Hidden mdDown>
          <Divider className={classes.divider} />
          <Typography variant="caption" color="textSecondary">
            {'  '}
            {APP_VERSION}
          </Typography>
        </Hidden>
        <Divider className={classes.divider} />
        <Box flexGrow={1} />
        <Link href="/about" color="secondary" className={classes.link}>
          {t('about')}
        </Link>
        <Link href="/" color="secondary" className={classes.link}>
          HOME
        </Link>
        <Box flexGrow={1} />
        <Divider className={classes.divider} />

        <TranslateIcon color="primary" />
        <NativeSelect onChange={handleLocale} defaultValue={router.locale}>
          {['pt-BR', 'en'].map((e: string) => (
            <option key={e} disabled={router.locale === e} value={e} label={t(e)} />
          ))}
        </NativeSelect>

        <Divider className={classes.divider} />

        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <DarkModeIcon color="primary" />
            </Grid>
            <Grid item>
              <Switch
                checked={modeTheme}
                onChange={handleChange}
                name="changeMode"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
            <Grid item>
              <LightModeIcon color="primary" />
            </Grid>
          </Grid>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
