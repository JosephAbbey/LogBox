import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetBuilder = z.object({
    // This accepts type of undefined, but is required at runtime
    id: z.number().optional().refine(Boolean, 'Required'),
});

export default resolver.pipe(resolver.zod(GetBuilder), resolver.authorize(), async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const builder = await db.builder.findFirst({ where: { id } });

    if (!builder) throw new NotFoundError();

    return builder;
});
