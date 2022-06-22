import getCurrentUser from "app/users/queries/getCurrentUser"
import { resolver, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const CreateApp = z.object({
    name: z.string(),
})

export default resolver.pipe(
    resolver.zod(CreateApp),
    resolver.authorize(),
    async ({ name }, { session }: Ctx) => {
        const user = await db.user.findUnique({
            where: { id: session.userId ?? undefined },
            select: { id: true, name: true, email: true, role: true },
        })

        if (!user) throw new Error("User not found")

        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const app = await db.app.create({
            data: {
                name,
            },
        })

        ;(await db.app.findUnique({ where: { id: app.id } }).Users()).push()

        return app
    }
)
