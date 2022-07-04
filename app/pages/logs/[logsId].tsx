import { Suspense } from 'react';
import { Head, useQuery, useParam, BlitzPage, Link } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import Logs from 'app/core/components/Logs';
import getLogs from 'app/logses/queries/getLogs';
import { Breadcrumbs, Typography } from '@mui/material';

export const LogsPage = () => {
    const logsId = useParam('logsId', 'number');
    const [logs] = useQuery(
        getLogs,
        { id: logsId, take: 50 },
        {
            enabled: true,
        },
    );
    const connection =
        logs.host ||
        logs.builder ||
        (() => {
            throw new Error('Logs must be associated with a host or builder');
        })();
    const connectionType = logs.builder ? 'builder' : 'host';
    const app = connection.app;

    return (
        <>
            <Head>
                <title>
                    {app.name} / {connection.name} / {logs.name}
                </title>
            </Head>

            <div>
                <Typography variant="h5" sx={{ margin: '.5em' }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 'inherit' }}>
                        <Link href={`/apps/${app.id}`}>
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
                        <Link href={`/apps/${app.id}/${connectionType}s`}>
                            <Typography
                                sx={{
                                    fontSize: 'inherit',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                {connectionType.charAt(0).toUpperCase() +
                                    connectionType.toLowerCase().slice(1)}
                                s
                            </Typography>
                        </Link>
                        <Link href={`/apps/${app.id}/${connectionType}s/${connection.id}`}>
                            <Typography
                                sx={{
                                    fontSize: 'inherit',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                {connection.name}
                            </Typography>
                        </Link>
                        <Link href={`/apps/${app.id}/${connectionType}s/${connection.id}`}>
                            <Typography
                                sx={{
                                    fontSize: 'inherit',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                Logs
                            </Typography>
                        </Link>
                        <Typography sx={{ fontSize: 'inherit' }} color="text.primary">
                            {logs.name}
                        </Typography>
                    </Breadcrumbs>
                </Typography>

                <Logs
                    name={logs.name}
                    //@ts-expect-error
                    logs={logs.messages.slice().reverse()}
                />
            </div>
        </>
    );
};

const ShowLogsPage: BlitzPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LogsPage />
            </Suspense>
        </div>
    );
};

ShowLogsPage.authenticate = true;
ShowLogsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowLogsPage;
