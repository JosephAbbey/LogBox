import { paginate, resolver } from 'blitz';
import db, { Prisma } from 'db';

interface GetBuildersInput
    extends Pick<Prisma.BuilderFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
    resolver.authorize(),
    async ({ where, orderBy, skip = 0, take = 100 }: GetBuildersInput) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const {
            items: builders,
            hasMore,
            nextPage,
            count,
        } = await paginate({
            skip,
            take,
            count: () => db.builder.count({ where }),
            query: (paginateArgs) => db.builder.findMany({ ...paginateArgs, where, orderBy }),
        });

        return {
            builders,
            nextPage,
            hasMore,
            count,
        };
    },
);
