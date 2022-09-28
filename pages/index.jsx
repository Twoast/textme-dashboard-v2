import { Container, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import PageHeader from 'src/components/Headers/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import MixPanelUniqueSessions from 'src/content/MixPanel/UniqueSessions';
import SidebarLayout from 'src/layouts/SidebarLayout';

function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>TextMe Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          illustration={session.user.image}
          title={['Welcome, ', session.user.name, '!']}
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
            <MixPanelUniqueSessions />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;

Home.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
