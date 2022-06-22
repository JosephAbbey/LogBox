import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createApp from "app/apps/mutations/createApp"
import { AppForm, FORM_ERROR } from "app/apps/components/AppForm"

const NewAppPage: BlitzPage = () => {
    const router = useRouter()
    const [createAppMutation] = useMutation(createApp)

    return (
        <div>
            <h1>Create New App</h1>

            <AppForm
                submitText="Create App"
                // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                // schema={CreateApp}
                // initialValues={{}}
                onSubmit={async (values) => {
                    try {
                        const app = await createAppMutation(values)
                        router.push(Routes.ShowAppPage({ appId: app.id }))
                    } catch (error: any) {
                        console.error(error)
                        return {
                            [FORM_ERROR]: error.toString(),
                        }
                    }
                }}
            />

            <p>
                <Link href={Routes.AppsPage()}>
                    <a>Apps</a>
                </Link>
            </p>
        </div>
    )
}

NewAppPage.authenticate = true
NewAppPage.getLayout = (page) => <Layout title={"Create New App"}>{page}</Layout>

export default NewAppPage
