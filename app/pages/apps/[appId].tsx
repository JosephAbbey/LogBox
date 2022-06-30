import { Suspense } from 'react';
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
import Confirm from 'app/core/components/Confirm';
import Layout from 'app/core/layouts/Layout';
import getApp from 'app/apps/queries/getApp';
import deleteApp from 'app/apps/mutations/deleteApp';
import { Box, Button, Grid, Paper, PaperProps, Stack, Typography } from '@mui/material';

export const Card = (props: PaperProps) => (
    <Paper
        {...props}
        sx={{
            margin: '.25em',
            padding: '.5em',
            width: '20em',
            backgroundColor: 'background.default',
            ...props.sx,
        }}
    ></Paper>
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
    <Card>
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

            <div>
                <Typography variant="h5" sx={{ margin: '.5em' }}>
                    {app.name}
                </Typography>

                {/* <pre>{JSON.stringify(app, null, 2)}</pre> */}
                <Grid
                    container
                    spacing={2}
                    sx={{ margin: 'auto', width: '75%', justifyContent: 'center' }}
                >
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
                </Grid>

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
            </div>
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
