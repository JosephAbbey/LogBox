import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const UpdateBuilder = z.object({
    id: z.number(),
    name: z.string(),
});

export default resolver.pipe(
    resolver.zod(UpdateBuilder),
    resolver.authorize(),
    async ({ id, ...data }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const builder = await db.builder.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                logs: {
                    select: {
                        id: true,
                        name: true,
                        messages: {
                            select: {
                                id: true,
                                message: true,
                                level: true,
                                createdAt: true,
                            },
                            orderBy: {
                                createdAt: 'desc',
                            },
                            take: 10,
                        },
                    },
                },
            },
        });

        return builder;
    },
);
