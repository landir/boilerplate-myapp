import * as React from 'react';
import Head from 'next/head';
import { Avatar, Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import messages from 'src/messages';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default
    },
    hero: {
      backgroundColor: theme.palette.background.dark,
      paddingTop: 200,
      paddingBottom: 200,
      [theme.breakpoints.down('md')]: {
        paddingTop: 60,
        paddingBottom: 60
      }
    },
    image: {
      perspectiveOrigin: 'left center',
      transformStyle: 'preserve-3d',
      perspective: 1500,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
        transform: 'rotateY(-35deg) rotateX(15deg)',
        backfaceVisibility: 'hidden',
        boxShadow: theme.shadows[16]
      }
    },
    feat: {
      backgroundColor: theme.palette.background.default,
      paddingTop: 128,
      paddingBottom: 128
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },
    cta: {
      backgroundColor: theme.palette.background.dark,
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      '& dt': {
        marginTop: theme.spacing(2)
      }
    }
  })
);
const Index: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <div className={classes.root}>
      <Head>
        <title>| {t(messages.NAME)}</title>
      </Head>
      <div className={classes.hero}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                <Typography variant="overline" color="secondary">
                  heroSubTitulo
                </Typography>
                <Typography variant="h1" color="textPrimary">
                  heroTitulo
                </Typography>
                <Box mt={3}>
                  <Typography variant="body1" color="textSecondary">
                    heroDesc
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Typography variant="h1" color="secondary">
                        heroTitulo1
                      </Typography>
                      <Typography variant="overline" color="textSecondary">
                        heroSubTitulo1
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h1" color="secondary">
                        heroTitulo2
                      </Typography>
                      <Typography variant="overline" color="textSecondary">
                        heroSubTitulo2
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h1" color="secondary">
                        heroTitulo3
                      </Typography>
                      <Typography variant="overline" color="textSecondary">
                        heroSubTitulo3
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box position="relative">
                <div className={classes.image}>IMAGE</div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.feat}>
        <Container maxWidth="lg">
          <Typography component="p" variant="overline" color="secondary" align="center">
            caracteristicasSubTitulo
          </Typography>
          <Typography variant="h1" align="center" color="textPrimary">
            caracteristicasTitulo
          </Typography>
          <Box mt={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <Avatar className={classes.avatar}>caracteristicasNumero1</Avatar>
                  <Box ml={2}>
                    <Typography variant="h4" gutterBottom color="textPrimary">
                      caracteristicasTitulo1
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      caracteristicasSubTitulo1
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <Avatar className={classes.avatar}>caracteristicasNumero2</Avatar>
                  <Box ml={2}>
                    <Typography variant="h4" gutterBottom color="textPrimary">
                      caracteristicasTitulo2
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      caracteristicasSubTitulo2
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <Avatar className={classes.avatar}>caracteristicasNumero3</Avatar>
                  <Box ml={2}>
                    <Typography variant="h4" gutterBottom color="textPrimary">
                      caracteristicasTitulo3
                    </Typography>
                    <Typography variant="body1" color="textPrimary" gutterBottom>
                      caracteristicasSubTitulo3
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <div className={classes.cta}>
        <Container maxWidth="lg">
          <Typography variant="h1" color="textPrimary">
            Frequently asked questions
          </Typography>
          <Box my={3}>
            <Divider />
          </Box>
          <Grid container spacing={3} component="dl">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="secondary">
                Technical &amp; Licensing
              </Typography>
              <Box mt={6}>
                <dt>
                  <Typography variant="h4" color="textPrimary">
                    What do we use for styling our components?
                  </Typography>
                </dt>
                <dd>
                  <Typography variant="body1" color="textSecondary">
                    We use Material-ui&apos;s hooks api as we think it’s the best way of avoiding clutter.
                  </Typography>
                </dd>
              </Box>
              <Box mt={6}>
                <dt>
                  <Typography variant="h4" color="textPrimary">
                    Is Typescript available?
                  </Typography>
                </dt>
                <dd>
                  <Typography variant="body1" color="textSecondary">
                    Yes, we have the Typescript version available for Standard Plus and Extended license.
                  </Typography>
                </dd>
              </Box>
              <Box mt={6}>
                <dt>
                  <Typography variant="h4" color="textPrimary">
                    Are you providing support for setting up my project?
                  </Typography>
                </dt>
                <dd>
                  <Typography variant="body1" color="textSecondary">
                    Yes, we offer email support for all our customers &amp; even skype meetings for our extended license
                    customers.
                  </Typography>
                </dd>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="secondary">
                Design
              </Typography>
              <Box mt={6}>
                <dt>
                  <Typography variant="h4" color="textPrimary">
                    Are the design files (Sketch, Figma) included in the Standard License?
                  </Typography>
                </dt>
                <dd>
                  <Typography variant="body1" color="textSecondary">
                    No, we offer the design source file only to Standard Plus and Extended License.
                  </Typography>
                </dd>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'pt-br', ['common']))
  }
});

export default Index;
