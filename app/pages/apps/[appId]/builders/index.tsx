import { Suspense } from 'react';
import {
    Head,
    Link,
    usePaginatedQuery,
    useRouter,
    useParam,
    BlitzPage,
    Routes,
    useQuery,
} from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getBuilders from 'app/builders/queries/getBuilders';
import { Box, Breadcrumbs, Button, Pagination, Paper, Stack, Typography } from '@mui/material';
import getApp from 'app/apps/queries/getApp';

const ITEMS_PER_PAGE = 10;

export const BuildersList = ({ page, items }: { page?: number; items?: number }) => {
    const router = useRouter();
    const pagination = page === undefined;
    page = page || Number(router.query.page) || 0;
    const appId = useParam('appId', 'number')!;
    const [{ builders, count }] = usePaginatedQuery(getBuilders, {
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
                        Builders
                    </Typography>
                </Breadcrumbs>
            </Typography>

            <Typography variant="body1" sx={{ margin: '.5em' }}>
                <Link href={Routes.NewBuilderPage({ appId: appId! })}>
                    <Button>Create Builder</Button>
                </Link>
            </Typography>

            <Stack
                spacing={1}
                sx={{
                    marginX: '.5em',
                }}
            >
                {builders.map((builder) => (
                    <Link
                        key={builder.id}
                        href={Routes.ShowBuilderPage({ appId, builderId: builder.id })}
                    >
                        <Paper
                            sx={{
                                cursor: 'pointer',
                                padding: '.5em',
                            }}
                        >
                            {builder.name}
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

const BuildersPage: BlitzPage = () => {
    return (
        <>
            <Head>
                <title>Builders</title>
            </Head>

            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <BuildersList />
                </Suspense>
            </div>
        </>
    );
};

BuildersPage.authenticate = true;
BuildersPage.getLayout = (page) => <Layout>{page}</Layout>;

export default BuildersPage;
