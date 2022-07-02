import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeleteRepository = z.object({
    id: z.number(),
});

export default resolver.pipe(
    resolver.zod(DeleteRepository),
    resolver.authorize(),
    async ({ id }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const repository = await db.repository.deleteMany({ where: { id } });

        return repository;
    },
);
