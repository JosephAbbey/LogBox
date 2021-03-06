import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeleteLog = z.object({
    id: z.number(),
});

export default resolver.pipe(resolver.zod(DeleteLog), resolver.authorize(), async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const logs = await db.logs.deleteMany({ where: { id } });

    return logs;
});
