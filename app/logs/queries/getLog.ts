import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetLog = z.object({
    // This accepts type of undefined, but is required at runtime
    id: z.number().optional().refine(Boolean, 'Required'),
});

export default resolver.pipe(resolver.zod(GetLog), resolver.authorize(), async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const log = await db.log.findFirst({ where: { id } });

    if (!log) throw new NotFoundError();

    return log;
});
