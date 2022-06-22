import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBuilder from "app/builders/queries/getBuilder"
import updateBuilder from "app/builders/mutations/updateBuilder"
import { BuilderForm, FORM_ERROR } from "app/builders/components/BuilderForm"

export const EditBuilder = () => {
  const router = useRouter()
  const builderId = useParam("builderId", "number")
  const appId = useParam("appId", "number")
  const [builder, { setQueryData }] = useQuery(
    getBuilder,
    { id: builderId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBuilderMutation] = useMutation(updateBuilder)

  return (
    <>
      <Head>
        <title>Edit Builder {builder.id}</title>
      </Head>

      <div>
        <h1>Edit Builder {builder.id}</h1>
        <pre>{JSON.stringify(builder, null, 2)}</pre>

        <BuilderForm
          submitText="Update Builder"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBuilder}
          initialValues={builder}
          onSubmit={async (values) => {
            try {
              const updated = await updateBuilderMutation({
                id: builder.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowBuilderPage({ appId: appId!, builderId: updated.id }))
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

const EditBuilderPage: BlitzPage = () => {
  const appId = useParam("appId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBuilder />
      </Suspense>

      <p>
        <Link href={Routes.BuildersPage({ appId: appId! })}>
          <a>Builders</a>
        </Link>
      </p>
    </div>
  )
}

EditBuilderPage.authenticate = true
EditBuilderPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBuilderPage
