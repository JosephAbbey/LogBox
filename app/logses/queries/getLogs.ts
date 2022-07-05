import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetLog = z.object({
    // This accepts type of undefined, but is required at runtime
    id: z.number().optional().refine(Boolean, 'Required'),
    take: z.number().default(10),
});

export default resolver.pipe(resolver.zod(GetLog), resolver.authorize(), async ({ id, take }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const logs = await db.logs.findFirst({
        where: { id },
        select: {
            name: true,
            messages: {
                select: {
                    id: true,
                    level: true,
                    message: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take,
            },
            builder: {
                select: {
                    id: true,
                    name: true,
                    app: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            host: {
                select: {
                    id: true,
                    name: true,
                    app: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            webhook: {
                select: { id: true },
            },
        },
    });

    if (!logs) throw new NotFoundError();

    return logs;
});
