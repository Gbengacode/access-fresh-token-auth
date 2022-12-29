import  rateLimit  from "express-rate-limit";
import { logEvents } from "./logger.middleware.js";

const limiter = rateLimit({
    windowMs:  60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: {
        message: 'too many request try again after five minutes'
    },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).json(options.message)
    },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export default limiter