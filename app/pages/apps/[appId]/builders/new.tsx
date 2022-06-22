import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBuilder from "app/builders/mutations/createBuilder"
import { BuilderForm, FORM_ERROR } from "app/builders/components/BuilderForm"

const NewBuilderPage: BlitzPage = () => {
  const router = useRouter()
  const appId = useParam("appId", "number")
  const [createBuilderMutation] = useMutation(createBuilder)

  return (
    <div>
      <h1>Create New Builder</h1>

      <BuilderForm
        submitText="Create Builder"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBuilder}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const builder = await createBuilderMutation({ ...values, appId: appId! })
            router.push(Routes.ShowBuilderPage({ appId: appId!, builderId: builder.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.BuildersPage({ appId: appId! })}>
          <a>Builders</a>
        </Link>
      </p>
    </div>
  )
}

NewBuilderPage.authenticate = true
NewBuilderPage.getLayout = (page) => <Layout title={"Create New Builder"}>{page}</Layout>

export default NewBuilderPage
