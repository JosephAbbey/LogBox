import { Suspense } from 'react';
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz';
import Layout from '../../../../core/layouts/Layout';
import getHost from '../../../../hosts/queries/getHost';
import deleteHost from '../../../../hosts/mutations/deleteHost';
import getApp from '../../../../apps/queries/getApp';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import Confirm from '../../../../core/components/Confirm';
import Logs from '../../../../core/components/Logs';

export const Host = () => {
    const router = useRouter();
    const hostId = useParam('hostId', 'number');
    const appId = useParam('appId', 'number');
    const [deleteHostMutation] = useMutation(deleteHost);
    const [host] = useQuery(getHost, { id: hostId });
    const [app] = useQuery(getApp, { id: appId });

    return (
        <>
            <Head>
                <title>
                    {app.name} / {host.name}
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
                        <Link href={`/apps/${appId}/hosts`}>
                            <Typography
                                sx={{
                                    fontSize: 'inherit',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                Hosts
                            </Typography>
                        </Link>
                        <Typography sx={{ fontSize: 'inherit' }} color="text.primary">
                            {host.name}
                        </Typography>
                    </Breadcrumbs>
                </Typography>

                {/* <pre>{JSON.stringify(host, null, 2)}</pre> */}

                {host.logs.map((log, index) => (
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

                <Link href={Routes.CreateHostLogsPage({ appId: appId!, hostId: host.id })}>
                    <Button variant="outlined" sx={{ margin: '.5em' }}>
                        Create Log
                    </Button>
                </Link>

                <Link href={Routes.EditHostPage({ appId: appId!, hostId: host.id })}>
                    <Button variant="outlined" sx={{ margin: '.5em' }}>
                        Edit
                    </Button>
                </Link>

                <Confirm
                    title="This will be deleted."
                    button="Delete"
                    handleYes={async () => {
                        await deleteHostMutation({ id: host.id });
                        router.push(Routes.HostsPage({ appId: appId! }));
                    }}
                ></Confirm>
            </div>
        </>
    );
};

const ShowHostPage: BlitzPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Host />
            </Suspense>
        </div>
    );
};

ShowHostPage.authenticate = true;
ShowHostPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowHostPage;
