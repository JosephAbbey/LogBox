import { paginate, resolver } from 'blitz';
import db, { Prisma } from 'db';

interface GetLogsInput
    extends Pick<Prisma.LogFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
    resolver.authorize(),
    async ({ where, orderBy, skip = 0, take = 100 }: GetLogsInput) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const {
            items: logs,
            hasMore,
            nextPage,
            count,
        } = await paginate({
            skip,
            take,
            count: () => db.log.count({ where }),
            query: (paginateArgs) => db.log.findMany({ ...paginateArgs, where, orderBy }),
        });

        return {
            logs,
            nextPage,
            hasMore,
            count,
        };
    },
);
