import { Link, useRouter, useMutation, BlitzPage, Routes, useParam } from 'blitz';
import Layout from '../../../../core/layouts/Layout';
import createHost from '../../../../hosts/mutations/createHost';
import { HostForm, FORM_ERROR } from '../../../../hosts/components/HostForm';

const NewHostPage: BlitzPage = () => {
    const router = useRouter();
    const appId = useParam('appId', 'number');
    const [createHostMutation] = useMutation(createHost);

    return (
        <div>
            <h1>Create New Host</h1>

            <HostForm
                submitText="Create Host"
                // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                // schema={CreateHost}
                // initialValues={{}}
                onSubmit={async (values) => {
                    try {
                        const host = await createHostMutation({ ...values, appId: appId! });
                        router.push(Routes.ShowHostPage({ appId: appId!, hostId: host.id }));
                    } catch (error: any) {
                        console.error(error);
                        return {
                            [FORM_ERROR]: error.toString(),
                        };
                    }
                }}
            />
        </div>
    );
};

NewHostPage.authenticate = true;
NewHostPage.getLayout = (page) => <Layout title={'Create New Host'}>{page}</Layout>;

export default NewHostPage;
