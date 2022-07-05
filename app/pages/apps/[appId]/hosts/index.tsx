import { Suspense } from 'react';
import {
    Head,
    Link,
    usePaginatedQuery,
    useRouter,
    BlitzPage,
    Routes,
    useParam,
    useQuery,
} from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getHosts from 'app/hosts/queries/getHosts';
import { Box, Breadcrumbs, Button, Pagination, Paper, Stack, Typography } from '@mui/material';
import getApp from 'app/apps/queries/getApp';

const ITEMS_PER_PAGE = 10;

export const HostsList = ({ page, items }: { page?: number; items?: number }) => {
    const router = useRouter();
    const pagination = page === undefined;
    page = page || Number(router.query.page) || 0;
    const appId = useParam('appId', 'number')!;
    const [{ hosts, count }] = usePaginatedQuery(getHosts, {
        where: { app: { id: appId! } },
        orderBy: { updatedAt: 'desc' },
        skip: (items || ITEMS_PER_PAGE) * page,
        take: items || ITEMS_PER_PAGE,
    });
    const [app] = useQuery(getApp, { id: appId });

    return (
        <div>
            <Typography variant="h5" sx={{ margin: '.5em' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 'inherit' }}>
                    <Link href={`/apps/${appId}`}>
                        <Typography
                            sx={{
                                fontSize: 'inherit',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            {app.name}
                        </Typography>
                    </Link>
                    <Typography sx={{ fontSize: 'inherit' }} color="text.primary">
                        Hosts
                    </Typography>
                </Breadcrumbs>
            </Typography>

            <Typography variant="body1" sx={{ margin: '.5em' }}>
                <Link href={Routes.NewHostPage({ appId: appId! })}>
                    <Button>Create Host</Button>
                </Link>
            </Typography>

            <Stack
                spacing={1}
                sx={{
                    marginX: '.5em',
                }}
            >
                {hosts.map((host) => (
                    <Link key={host.id} href={Routes.ShowHostPage({ appId, hostId: host.id })}>
                        <Paper
                            sx={{
                                cursor: 'pointer',
                                padding: '.5em',
                            }}
                        >
                            {host.name}
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

const HostsPage: BlitzPage = () => {
    const appId = useParam('appId', 'number');

    return (
        <>
            <Head>
                <title>Hosts</title>
            </Head>

            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <HostsList />
                </Suspense>
            </div>
        </>
    );
};

HostsPage.authenticate = true;
HostsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default HostsPage;
