import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetApp = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetApp), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const app = await db.app.findFirst({ where: { id } })

  if (!app) throw new NotFoundError()

  return app
})
