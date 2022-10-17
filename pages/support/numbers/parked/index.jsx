import Head from 'next/head';

import { Container, Grid } from '@mui/material';
import 'react-loading-skeleton/dist/skeleton.css';

import PageHeader from 'src/components/Headers/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ParkedNumberComponent from 'src/content/Support/Numbers/Parked';
import SidebarLayout from 'src/layouts/SidebarLayout';

const ParkedNumbers = () => {
  return (
    <>
      <Head>
        <title>TextMe Dashboard - Parked numbers</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          title="List of parked numbers"
          content={
            <>
              If you encounter any problem, please reach out to the <a href="mailto:backend@go-text.me">Backend Team</a>
            </>
          }
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={4}>
          <Grid item xs={12}>
            <ParkedNumberComponent />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ParkedNumbers;

ParkedNumbers.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
