import { BlitzPage, Link, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { AppsList } from './apps';
import { Suspense } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import Aside from 'app/core/components/Aside';

const Home: BlitzPage = () => {
    return (
        <div className="container">
            <Aside>
                <h2>Recent Apps:</h2>
                <Suspense fallback={<div>Loading...</div>}>
                    <AppsList items={5} page={0} />
                </Suspense>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: '.5em' }}>
                    <Link href={Routes.AppsPage()}>
                        <Typography
                            variant="body1"
                            sx={{ cursor: 'pointer', marginLeft: '.5em', fontSize: '1.5em' }}
                        >
                            ...
                        </Typography>
                    </Link>
                    <Link href={Routes.NewAppPage()}>
                        <Button
                            variant="contained"
                            sx={{
                                margin: '.5em',
                                marginRight: 0,
                                marginBottom: 0,
                                fontSize: '.75em',
                            }}
                        >
                            New app
                        </Button>
                    </Link>
                </Box>
                <hr />
            </Aside>
        </div>
    );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
