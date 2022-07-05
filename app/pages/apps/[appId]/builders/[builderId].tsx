import { Suspense } from 'react';
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz';
import Layout from '../../../../core/layouts/Layout';
import getBuilder from '../../../../builders/queries/getBuilder';
import deleteBuilder from '../../../../builders/mutations/deleteBuilder';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import getApp from '../../../../apps/queries/getApp';
import Confirm from '../../../../core/components/Confirm';
import Logs from '../../../../core/components/Logs';

export const Builder = () => {
    const router = useRouter();
    const builderId = useParam('builderId', 'number');
    const appId = useParam('appId', 'number');
    const [deleteBuilderMutation] = useMutation(deleteBuilder);
    const [builder] = useQuery(getBuilder, { id: builderId });
    const [app] = useQuery(getApp, { id: appId });

    return (
        <>
            <Head>
                <title>
                    {app.name} / {builder.name}
                </title>
            </Head>

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
                        <Link href={`/apps/${appId}/builders`}>
                            <Typography
                                sx={{
                                    fontSize: 'inherit',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                Builders
                            </Typography>
                        </Link>
                        <Typography sx={{ fontSize: 'inherit' }} color="text.primary">
                            {builder.name}
                        </Typography>
                    </Breadcrumbs>
                </Typography>

                {/* <pre>{JSON.stringify(builder, null, 2)}</pre> */}

                {builder.logs.map((log, index) => (
                    <Link href={Routes.ShowLogsPage({ logsId: log.id })} key={index}>
                        <Box sx={{ cursor: 'pointer' }}>
                            <Logs
                                name={log.name}
                                //@ts-expect-error
                                logs={log.messages
                                    .slice()
                                    .concat(
                                        log.messages.length === 10
                                            ? [
                                                  {
                                                      id: NaN,
                                                      message: '...',
                                                      level: 'none',
                                                      createdAt: new Date(),
                                                  },
                                              ]
                                            : [],
                                    )
                                    .reverse()}
                            />
                        </Box>
                    </Link>
                ))}

                <Link href={Routes.CreateBuilderLogsPage({ appId: appId!, builderId: builder.id })}>
                    <Button variant="outlined" sx={{ margin: '.5em' }}>
                        Create Log
                    </Button>
                </Link>

                <Link href={Routes.EditBuilderPage({ appId: appId!, builderId: builder.id })}>
                    <Button variant="outlined" sx={{ margin: '.5em' }}>
                        Edit
                    </Button>
                </Link>

                <Confirm
                    title="This will be deleted."
                    button="Delete"
                    handleYes={async () => {
                        await deleteBuilderMutation({ id: builder.id });
                        router.push(Routes.BuildersPage({ appId: appId! }));
                    }}
                ></Confirm>
            </div>
        </>
    );
};

const ShowBuilderPage: BlitzPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Builder />
            </Suspense>
        </div>
    );
};

ShowBuilderPage.authenticate = true;
ShowBuilderPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowBuilderPage;
