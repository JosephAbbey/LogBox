import { useRouter, useMutation, BlitzPage, Routes, useParam } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import createLogs from 'app/logses/mutations/createLogs';
import { LogsForm, FORM_ERROR } from 'app/logses/components/LogsForm';

const CreateBuilderLogsPage: BlitzPage = () => {
    const router = useRouter();
    const builderId = useParam('builderId', 'number');
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
                            builderId: builderId!,
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

CreateBuilderLogsPage.authenticate = true;
CreateBuilderLogsPage.getLayout = (page) => <Layout title={'Create new log'}>{page}</Layout>;

export default CreateBuilderLogsPage;
