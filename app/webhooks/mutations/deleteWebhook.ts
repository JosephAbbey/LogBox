import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeleteWebhook = z.object({
    id: z.string(),
});

export default resolver.pipe(resolver.zod(DeleteWebhook), resolver.authorize(), async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const webhook = await db.webhook.deleteMany({ where: { id } });

    return webhook;
});
