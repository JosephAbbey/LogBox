import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const CreateRepository = z.object({
    url: z.string(),
    type: z.enum(['GitHub']),
    appId: z.number(),
});

export default resolver.pipe(
    resolver.zod(CreateRepository),
    resolver.authorize(),
    async (input) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const repository = await db.repository.create({
            data: {
                name:
                    input.type === 'GitHub'
                        ? input.url.match(/https:\/\/github.com\/([\/\w]+).*/)?.[1] ||
                          (() => {
                              throw new Error('Invalid url');
                          })()
                        : (() => {
                              throw new Error('Unknown repository type');
                          })(),
                ...input,
            },
        });

        return repository;
    },
);
