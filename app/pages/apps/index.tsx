import { Suspense } from 'react';
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getApps from 'app/apps/queries/getApps';
import { Box, Button, Pagination, Paper, Stack, Typography } from '@mui/material';

const ITEMS_PER_PAGE = 10;

export const AppsList = ({ page, items }: { page?: number; items?: number }) => {
    const router = useRouter();
    const pagination = page === undefined;
    page = page || Number(router.query.page) || 0;
    const [{ apps, count }] = usePaginatedQuery(getApps, {
        orderBy: { updatedAt: 'desc' },
        skip: (items || ITEMS_PER_PAGE) * page,
        take: items || ITEMS_PER_PAGE,
    });

    return (
        <div>
            <Stack
                spacing={1}
                sx={{
                    marginX: '.5em',
                }}
            >
                {apps.map((app) => (
                    <Link key={app.id} href={Routes.ShowAppPage({ appId: app.id })}>
                        <Paper
                            sx={{
                                cursor: 'pointer',
                                padding: '.5em',
                            }}
                        >
                            {app.name}
                        </Paper>
                    </Link>
                ))}
            </Stack>

            {pagination && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        sx={{ margin: '1em' }}
                        count={Math.ceil(count / ITEMS_PER_PAGE)}
                        page={page + 1}
                        onChange={(_, value) => router.push({ query: { page: value - 1 } })}
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </div>
    );
};

const AppsPage: BlitzPage = () => {
    return (
        <>
            <Head>
                <title>Apps</title>
            </Head>
            <div>
                <Typography variant="h5" sx={{ margin: '.5em' }}>
                    Apps
                </Typography>

                <Typography variant="body1" sx={{ margin: '.5em' }}>
                    <Link href={Routes.NewAppPage()}>
                        <Button>Create App</Button>
                    </Link>
                </Typography>

                <Suspense fallback={<div>Loading...</div>}>
                    <AppsList />
                </Suspense>
            </div>
        </>
    );
};

AppsPage.authenticate = true;
AppsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default AppsPage;
