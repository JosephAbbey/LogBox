import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const CreateWebhook = z.object({
    logsId: z.number(),
});

export default resolver.pipe(resolver.zod(CreateWebhook), resolver.authorize(), async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const webhook = await db.webhook.create({
        data: {
            ...input,
        },
    });

    return webhook;
});
