import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const UpdateApp = z.object({
    id: z.number(),
    name: z.string(),
});

export default resolver.pipe(
    resolver.zod(UpdateApp),
    resolver.authorize(),
    async ({ id, ...data }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const app = await db.app.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                builders: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                hosts: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        return app;
    },
);
