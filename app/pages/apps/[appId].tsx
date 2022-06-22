import { Suspense } from 'react';
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getApp from 'app/apps/queries/getApp';
import deleteApp from 'app/apps/mutations/deleteApp';

export const App = () => {
    const router = useRouter();
    const appId = useParam('appId', 'number');
    const [deleteAppMutation] = useMutation(deleteApp);
    const [app] = useQuery(getApp, { id: appId });

    return (
        <>
            <Head>
                <title>App {app.id}</title>
            </Head>

            <div>
                <h1>App {app.id}</h1>
                <pre>{JSON.stringify(app, null, 2)}</pre>

                <Link href={Routes.EditAppPage({ appId: app.id })}>
                    <a>Edit</a>
                </Link>

                <button
                    type="button"
                    onClick={async () => {
                        if (window.confirm('This will be deleted')) {
                            await deleteAppMutation({ id: app.id });
                            router.push(Routes.AppsPage());
                        }
                    }}
                    style={{ marginLeft: '0.5rem' }}
                >
                    Delete
                </button>
            </div>
        </>
    );
};

const ShowAppPage: BlitzPage = () => {
    return (
        <div>
            <p>
                <Link href={Routes.AppsPage()}>
                    <a>Apps</a>
                </Link>
            </p>

            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        </div>
    );
};

ShowAppPage.authenticate = true;
ShowAppPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowAppPage;
