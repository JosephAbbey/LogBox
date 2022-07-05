import { useRouter, useMutation, BlitzPage, Routes, useParam, useQuery } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { RepositoryForm, FORM_ERROR } from 'app/repository/components/RepositoryForm';
import updateRepository from 'app/repository/mutations/updateRepository';
import getRepository from 'app/repository/queries/getRepository';
import getApp from 'app/apps/queries/getApp';
import { Suspense } from 'react';

const EditRepositoryPageInner = () => {
    const router = useRouter();
    const appId = useParam('appId', 'number');
    const [app] = useQuery(getApp, { id: appId });
    const [repository, { setQueryData }] = useQuery(
        getRepository,
        { id: app.repository?.id },
        {
            // This ensures the query never refreshes and overwrites the form data while the user is editing.
            staleTime: Infinity,
        },
    );
    const [updateRepositoryMutation] = useMutation(updateRepository);

    return (
        <div>
            <h1>Edit Repository</h1>

            <RepositoryForm
                submitText="Edit Repository"
                // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                // schema={CreateRepository}
                initialValues={repository}
                onSubmit={async (values) => {
                    try {
                        const updated = await updateRepositoryMutation({
                            appId: appId!,
                            ...values,
                        });
                        await setQueryData(updated);
                        router.push(Routes.ShowAppPage({ appId: appId! }));
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

const EditRepositoryPage: BlitzPage = () => (
    <Suspense fallback="Loading...">
        <EditRepositoryPageInner />
    </Suspense>
);

EditRepositoryPage.authenticate = true;
EditRepositoryPage.getLayout = (page) => <Layout title={'Edit repository'}>{page}</Layout>;

export default EditRepositoryPage;
