import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const UpdateLog = z.object({
    id: z.number(),
    name: z.string(),
});

export default resolver.pipe(
    resolver.zod(UpdateLog),
    resolver.authorize(),
    async ({ id, ...data }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const logs = await db.logs.update({ where: { id }, data });

        return logs;
    },
);