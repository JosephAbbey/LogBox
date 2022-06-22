import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBuilder from "app/builders/queries/getBuilder"
import deleteBuilder from "app/builders/mutations/deleteBuilder"

export const Builder = () => {
  const router = useRouter()
  const builderId = useParam("builderId", "number")
  const appId = useParam("appId", "number")
  const [deleteBuilderMutation] = useMutation(deleteBuilder)
  const [builder] = useQuery(getBuilder, { id: builderId })

  return (
    <>
      <Head>
        <title>Builder {builder.id}</title>
      </Head>

      <div>
        <h1>Builder {builder.id}</h1>
        <pre>{JSON.stringify(builder, null, 2)}</pre>

        <Link href={Routes.EditBuilderPage({ appId: appId!, builderId: builder.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBuilderMutation({ id: builder.id })
              router.push(Routes.BuildersPage({ appId: appId! }))
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowBuilderPage: BlitzPage = () => {
  const appId = useParam("appId", "number")

  return (
    <div>
      <p>
        <Link href={Routes.BuildersPage({ appId: appId! })}>
          <a>Builders</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Builder />
      </Suspense>
    </div>
  )
}

ShowBuilderPage.authenticate = true
ShowBuilderPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBuilderPage
