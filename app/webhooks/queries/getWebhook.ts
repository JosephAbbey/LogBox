import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetWebhook = z.object({
    // This accepts type of undefined, but is required at runtime
    id: z.number().optional().refine(Boolean, 'Required'),
});

export default resolver.pipe(resolver.zod(GetWebhook), resolver.authorize(), async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const webhook = await db.webhook.findFirst({ where: { id } });

    if (!webhook) throw new NotFoundError();

    return webhook;
});
