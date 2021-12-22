import * as React from 'react';
import Head from 'next/head';
import { Container } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import messages from 'src/messages';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default
    }
  })
);
const About: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <div className={classes.root}>
      <Head>
        <title>{t(messages.ABOUT)} | {t(messages.NAME)}</title>
      </Head>

      <Container maxWidth="sm">
      Lorem Ipsum - {t(messages.TODO)} | {t(messages.NAME)}
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'pt-br', ['common']))
  }
});

export default About;
