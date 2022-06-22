import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeleteBuilder = z.object({
    id: z.number(),
});

export default resolver.pipe(resolver.zod(DeleteBuilder), resolver.authorize(), async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const builder = await db.builder.deleteMany({ where: { id } });

    return builder;
});
