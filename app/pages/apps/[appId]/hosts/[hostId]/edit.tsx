import { Suspense } from 'react';
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from 'blitz';
import Layout from '../../../../../core/layouts/Layout';
import getHost from '../../../../../hosts/queries/getHost';
import updateHost from '../../../../../hosts/mutations/updateHost';
import { HostForm, FORM_ERROR } from '../../../../../hosts/components/HostForm';

export const EditHost = () => {
    const router = useRouter();
    const hostId = useParam('hostId', 'number');
    const appId = useParam('appId', 'number');
    const [host, { setQueryData }] = useQuery(
        getHost,
        { id: hostId },
        {
            // This ensures the query never refreshes and overwrites the form data while the user is editing.
            staleTime: Infinity,
        },
    );
    const [updateHostMutation] = useMutation(updateHost);

    return (
        <>
            <Head>
                <title>Edit Host {host.id}</title>
            </Head>

            <div>
                <h1>Edit Host {host.id}</h1>
                <pre>{JSON.stringify(host, null, 2)}</pre>

                <HostForm
                    submitText="Update Host"
                    // TODO use a zod schema for form validation
                    //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                    //         then import and use it here
                    // schema={UpdateHost}
                    initialValues={host}
                    onSubmit={async (values) => {
                        try {
                            const updated = await updateHostMutation({
                                id: host.id,
                                ...values,
                            });
                            await setQueryData(updated);
                            router.push(Routes.ShowHostPage({ appId: appId!, hostId: updated.id }));
                        } catch (error: any) {
                            console.error(error);
                            return {
                                [FORM_ERROR]: error.toString(),
                            };
                        }
                    }}
                />
            </div>
        </>
    );
};

const EditHostPage: BlitzPage = () => {
    const appId = useParam('appId', 'number');

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <EditHost />
            </Suspense>

            <p>
                <Link href={Routes.HostsPage({ appId: appId! })}>
                    <a>Hosts</a>
                </Link>
            </p>
        </div>
    );
};

EditHostPage.authenticate = true;
EditHostPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditHostPage;
