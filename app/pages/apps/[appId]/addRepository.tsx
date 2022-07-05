import { useRouter, useMutation, BlitzPage, Routes, useParam } from 'blitz';
import Layout from '../../../core/layouts/Layout';
import createRepository from '../../../repository/mutations/createRepository';
import { RepositoryForm, FORM_ERROR } from '../../../repository/components/RepositoryForm';

const AddRepositoryPage: BlitzPage = () => {
    const router = useRouter();
    const appId = useParam('appId', 'number');
    const [createRepositoryMutation] = useMutation(createRepository);

    return (
        <div>
            <h1>Add Repository</h1>

            <RepositoryForm
                submitText="Add Repository"
                // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                // schema={CreateRepository}
                // initialValues={{}}
                onSubmit={async (values) => {
                    try {
                        const repository = await createRepositoryMutation({
                            ...values,
                            appId: appId!,
                        });
                        if (!repository) throw new Error('Failed to create repository');
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

AddRepositoryPage.authenticate = true;
AddRepositoryPage.getLayout = (page) => <Layout title={'Add new repository'}>{page}</Layout>;

export default AddRepositoryPage;
