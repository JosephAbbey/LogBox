import { BlitzApiHandler } from "blitz"

const handler: BlitzApiHandler = (req, res) => {
    //TODO: implement webhook handler

    if (req.method !== "POST") {
        res.statusCode = 405
        res.end()
    }

    res.end(JSON.stringify(req.query.hooks))
}

export default handler
