import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetHost = z.object({
    // This accepts type of undefined, but is required at runtime
    id: z.number().optional().refine(Boolean, 'Required'),
    take: z.number().default(10),
});

export default resolver.pipe(resolver.zod(GetHost), resolver.authorize(), async ({ id, take }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const host = await db.host.findFirst({
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

    if (!host) throw new NotFoundError();

    return host;
});
