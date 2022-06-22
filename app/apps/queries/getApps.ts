import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAppsInput
  extends Pick<Prisma.AppFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAppsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: apps,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.app.count({ where }),
      query: (paginateArgs) => db.app.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      apps,
      nextPage,
      hasMore,
      count,
    }
  }
)
