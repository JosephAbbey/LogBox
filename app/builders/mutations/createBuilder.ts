import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const CreateBuilder = z.object({
    name: z.string(),
    appId: z.number(),
});

export default resolver.pipe(resolver.zod(CreateBuilder), resolver.authorize(), async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const builder = await db.builder.create({ data: input });

    return builder;
});
