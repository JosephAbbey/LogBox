import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const UpdateRepository = z.object({
    id: z.number(),
    url: z.string(),
});

export default resolver.pipe(
    resolver.zod(UpdateRepository),
    resolver.authorize(),
    async ({ id, ...input }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const repository = await db.repository.update({
            where: { id },
            data: {
                name:
                    (await db.repository.findUnique({ where: { id } }))?.type === 'GitHub'
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
