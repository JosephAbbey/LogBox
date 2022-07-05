import { ForwardedRef, forwardRef, Suspense } from 'react';
import {
    Head,
    Link,
    useRouter,
    useQuery,
    useParam,
    BlitzPage,
    useMutation,
    Routes,
    RouteUrlObject,
} from 'blitz';
import Confirm from '../../core/components/Confirm';
import Layout from '../../core/layouts/Layout';
import getApp from '../../apps/queries/getApp';
import deleteApp from '../../apps/mutations/deleteApp';
import { Box, Button, Paper, PaperProps, Stack, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

export const Card = forwardRef(
    ({ children, ...props }: PaperProps & { xs?: number }, ref: ForwardedRef<HTMLDivElement>) => (
        <Paper
            {...props}
            sx={{
                padding: '.5em',
                maxWidth: '20em',
                backgroundColor: 'background.default',
                marginBottom: '10px',
                breakInside: 'avoid',
                ...props.sx,
            }}
            ref={ref}
        >
            {children}
        </Paper>
    ),
);

export const List = ({
    name,
    items,
    itemPage,
    listPage,
    newPage,
}: {
    name: string;
    items: { id: number; name: string }[];
    itemPage: (id: number) => RouteUrlObject;
    listPage: () => RouteUrlObject;
    newPage: () => RouteUrlObject;
}) => (
    <Card sx={{ display: 'grid', alignContent: 'space-between' }}>
        <Box>
            <Typography variant="h6" sx={{ margin: '.2em', fontSize: '1em' }}>
                {name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)}s:
            </Typography>
            <Stack spacing={1} maxHeight="20em">
                {items.map((item) => (
                    <Link key={item.id} href={itemPage(item.id)}>
                        <Paper
                            sx={{
                                cursor: 'pointer',
                                padding: '.5em',
                            }}
                        >
                            {item.name}
                        </Paper>
                    </Link>
                ))}
            </Stack>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href={listPage()}>
                <Typography
                    variant="body1"
                    sx={{ cursor: 'pointer', marginLeft: '.5em', fontSize: '1.5em' }}
                >
                    ...
                </Typography>
            </Link>
            <Link href={newPage()}>
                <Button
                    variant="contained"
                    sx={{
                        margin: '.5em',
                        marginRight: 0,
                        marginBottom: 0,
                        fontSize: '.75em',
                    }}
                >
                    Add {name.toLowerCase()}
                </Button>
            </Link>
        </Box>
    </Card>
);

export const App = () => {
    const router = useRouter();
    const appId = useParam('appId', 'number');
    const [deleteAppMutation] = useMutation(deleteApp);
    const [app] = useQuery(getApp, { id: appId });

    return (
        <>
            <Head>
                <title>{app.name}</title>
            </Head>

            <>
                <Typography variant="h5" sx={{ margin: '.5em' }}>
                    {app.name}
                </Typography>

                {/* <pre>{JSON.stringify(app, null, 2)}</pre> */}
                <Box
                    sx={{
                        margin: 'auto',
                        maxWidth: { xs: '20em', md: '41em', lg: '62em' },
                        columns: { xs: '1 20em', md: '2 20em', lg: '3 20em' },
                    }}
                >
                    {app.repository ? (
                        <Link href={app.repository.url}>
                            <Card sx={{ position: 'relative', cursor: 'pointer' }}>
                                {app.repository.name}
                                {app.repository.type === 'GitHub' ? (
                                    <GitHub
                                        sx={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            margin: 'calc(.25em + 2px)',
                                        }}
                                    />
                                ) : null}
                            </Card>
                        </Link>
                    ) : null}
                    <List
                        name="builder"
                        items={app.builders}
                        itemPage={(id) => Routes.ShowBuilderPage({ appId: app.id, builderId: id })}
                        listPage={() => Routes.BuildersPage({ appId: app.id })}
                        newPage={() => Routes.NewBuilderPage({ appId: app.id })}
                    />
                    <List
                        name="host"
                        items={app.hosts}
                        itemPage={(id) => Routes.ShowHostPage({ appId: app.id, hostId: id })}
                        listPage={() => Routes.HostsPage({ appId: app.id })}
                        newPage={() => Routes.NewHostPage({ appId: app.id })}
                    />
                </Box>

                {app.repository ? (
                    <Link href={Routes.EditRepositoryPage({ appId: app.id })}>
                        <Button variant="outlined" sx={{ margin: '.5em' }}>
                            Edit Repository
                        </Button>
                    </Link>
                ) : (
                    <Link href={Routes.AddRepositoryPage({ appId: app.id })}>
                        <Button variant="outlined" sx={{ margin: '.5em' }}>
                            Add Repository
                        </Button>
                    </Link>
                )}

                <Link href={Routes.EditAppPage({ appId: app.id })}>
                    <Button variant="outlined" sx={{ margin: '.5em' }}>
                        Edit
                    </Button>
                </Link>

                <Confirm
                    title="This will be deleted."
                    button="Delete"
                    handleYes={async () => {
                        await deleteAppMutation({ id: app.id });
                        router.push(Routes.AppsPage());
                    }}
                ></Confirm>
            </>
        </>
    );
};

const ShowAppPage: BlitzPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        </div>
    );
};

ShowAppPage.authenticate = true;
ShowAppPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowAppPage;
