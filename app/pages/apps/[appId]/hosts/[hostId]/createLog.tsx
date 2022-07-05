import { useRouter, useMutation, BlitzPage, Routes, useParam } from 'blitz';
import Layout from '../../../../../core/layouts/Layout';
import createLogs from '../../../../../logses/mutations/createLogs';
import { LogsForm, FORM_ERROR } from '../../../../../logses/components/LogsForm';

const CreateHostLogsPage: BlitzPage = () => {
    const router = useRouter();
    const hostId = useParam('hostId', 'number');
    const [createLogMutation] = useMutation(createLogs);

    return (
        <div>
            <h1>Create Logs</h1>

            <LogsForm
                submitText="Create Logs"
                // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                // schema={CreateLog}
                // initialValues={{}}
                onSubmit={async (values) => {
                    try {
                        const log = await createLogMutation({
                            ...values,
                            hostId: hostId!,
                        });
                        if (!log) throw new Error('Failed to create log');
                        router.push(Routes.ShowLogsPage({ logsId: log.id }));
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

CreateHostLogsPage.authenticate = true;
CreateHostLogsPage.getLayout = (page) => <Layout title={'Create new log'}>{page}</Layout>;

export default CreateHostLogsPage;
