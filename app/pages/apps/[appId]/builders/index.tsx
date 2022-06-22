import { Suspense } from 'react';
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getBuilders from 'app/builders/queries/getBuilders';

const ITEMS_PER_PAGE = 100;

export const BuildersList = () => {
    const router = useRouter();
    const page = Number(router.query.page) || 0;
    const appId = useParam('appId', 'number');
    const [{ builders, hasMore }] = usePaginatedQuery(getBuilders, {
        where: { app: { id: appId! } },
        orderBy: { id: 'asc' },
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
    });

    const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
    const goToNextPage = () => router.push({ query: { page: page + 1 } });

    return (
        <div>
            <ul>
                {builders.map((builder) => (
                    <li key={builder.id}>
                        <Link href={Routes.ShowBuilderPage({ builderId: builder.id })}>
                            <a>{builder.name}</a>
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
    );
};

const BuildersPage: BlitzPage = () => {
    const appId = useParam('appId', 'number');

    return (
        <>
            <Head>
                <title>Builders</title>
            </Head>

            <div>
                <p>
                    <Link href={Routes.NewBuilderPage({ appId: appId! })}>
                        <a>Create Builder</a>
                    </Link>
                </p>

                <Suspense fallback={<div>Loading...</div>}>
                    <BuildersList />
                </Suspense>
            </div>
        </>
    );
};

BuildersPage.authenticate = true;
BuildersPage.getLayout = (page) => <Layout>{page}</Layout>;

export default BuildersPage;
