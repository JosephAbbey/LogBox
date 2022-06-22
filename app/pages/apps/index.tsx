import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getApps from "app/apps/queries/getApps"

const ITEMS_PER_PAGE = 100

export const AppsList = () => {
    const router = useRouter()
    const page = Number(router.query.page) || 0
    const [{ apps, hasMore }] = usePaginatedQuery(getApps, {
        orderBy: { id: "asc" },
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
    })

    const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
    const goToNextPage = () => router.push({ query: { page: page + 1 } })

    return (
        <div>
            <ul>
                {apps.map((app) => (
                    <li key={app.id}>
                        <Link href={Routes.ShowAppPage({ appId: app.id })}>
                            <a>{app.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>

            <button disabled={page === 0} onClick={goToPreviousPage}>
                Previous
            </button>
            <button disabled={!hasMore} onClick={goToNextPage}>
                Next
            </button>
        </div>
    )
}

const AppsPage: BlitzPage = () => {
    return (
        <>
            <Head>
                <title>Apps</title>
            </Head>

            <div>
                <p>
                    <Link href={Routes.NewAppPage()}>
                        <a>Create App</a>
                    </Link>
                </p>

                <Suspense fallback={<div>Loading...</div>}>
                    <AppsList />
                </Suspense>
            </div>
        </>
    )
}

AppsPage.authenticate = true
AppsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AppsPage
