import { BlitzApiHandler } from 'blitz';

import db from 'db';

/*
    This is an example of a webhook request
    ```js
    {
        body: {
            message: "Hello World",               // String
            level: "info",                        // "info" | "error" | "warn"
            createdAt: "2020-01-01T00:00:00.000Z" // Date?
        }
    }
    ```
*/

const handler: BlitzApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end();
        return;
    }

    const id = req.query['hook']!;

    if (typeof id !== 'string') throw new Error('Invalid hook id');

    console.log(req.body);

    const logs = (await db.webhook
        .findUnique({
            where: {
                id,
            },
        })
        .logs())!;

    if (req.body instanceof Array)
        for (const log of req.body) {
            await db.log.create({
                data: {
                    logsId: logs.id,
                    ...log,
                },
            });
        }
    else
        await db.log.create({
            data: {
                logsId: logs.id,
                ...req.body,
            },
        });

    res.end();
};

export default handler;
