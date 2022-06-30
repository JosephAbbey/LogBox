import { resolver, Ctx } from 'blitz';
import db from 'db';
import { z } from 'zod';

const CreateApp = z.object({
    name: z.string(),
});

export default resolver.pipe(
    resolver.zod(CreateApp),
    resolver.authorize(),
    async ({ name }, { session }: Ctx) => {
        await db.user.update({
            where: { id: session.userId ?? undefined },
            data: {
                apps: {
                    create: {
                        name,
                    },
                },
            },
        });

        return await db.app.findUnique({
            where: { name },
        });
    },
);
