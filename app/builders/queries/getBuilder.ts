import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetBuilder = z.object({
    // This accepts type of undefined, but is required at runtime
    id: z.number().optional().refine(Boolean, 'Required'),
    take: z.number().default(10),
});

export default resolver.pipe(
    resolver.zod(GetBuilder),
    resolver.authorize(),
    async ({ id, take }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const builder = await db.builder.findFirst({
            where: { id },
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
                            take,
                        },
                    },
                },
            },
        });

        if (!builder) throw new NotFoundError();

        return builder;
    },
);
