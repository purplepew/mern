import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
    windowMs: 60*1000,
    max: 5,
    message: {message: 'too many login attempts yadayadayada'},
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export default loginLimiter