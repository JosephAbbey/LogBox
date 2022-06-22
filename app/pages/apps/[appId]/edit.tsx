import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getApp from "app/apps/queries/getApp"
import updateApp from "app/apps/mutations/updateApp"
import { AppForm, FORM_ERROR } from "app/apps/components/AppForm"

export const EditApp = () => {
  const router = useRouter()
  const appId = useParam("appId", "number")
  const [app, { setQueryData }] = useQuery(
    getApp,
    { id: appId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAppMutation] = useMutation(updateApp)

  return (
    <>
      <Head>
        <title>Edit App {app.id}</title>
      </Head>

      <div>
        <h1>Edit App {app.id}</h1>
        <pre>{JSON.stringify(app, null, 2)}</pre>

        <AppForm
          submitText="Update App"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateApp}
          initialValues={app}
          onSubmit={async (values) => {
            try {
              const updated = await updateAppMutation({
                id: app.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowAppPage({ appId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditAppPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditApp />
      </Suspense>

      <p>
        <Link href={Routes.AppsPage()}>
          <a>Apps</a>
        </Link>
      </p>
    </div>
  )
}

EditAppPage.authenticate = true
EditAppPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAppPage
