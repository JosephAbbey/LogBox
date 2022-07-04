import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const CreateLog = z.object({
    name: z.string(),
    hostId: z.number().optional(),
    appId: z.number().optional(),
});

export default resolver.pipe(resolver.zod(CreateLog), resolver.authorize(), async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const logs = await db.logs.create({ data: input });

    return logs;
});
