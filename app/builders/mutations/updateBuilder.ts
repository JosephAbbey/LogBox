import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBuilder = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBuilder),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const builder = await db.builder.update({ where: { id }, data })

    return builder
  }
)
