import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const CreateHost = z.object({
    name: z.string(),
    appId: z.number(),
});

export default resolver.pipe(resolver.zod(CreateHost), resolver.authorize(), async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const host = await db.host.create({ data: input });

    return host;
});
