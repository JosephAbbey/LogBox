import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeleteHost = z.object({
    id: z.number(),
});

export default resolver.pipe(resolver.zod(DeleteHost), resolver.authorize(), async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const host = await db.host.deleteMany({ where: { id } });

    return host;
});
