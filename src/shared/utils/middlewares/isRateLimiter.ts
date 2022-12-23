import rateLimit, { MemoryStore } from 'express-rate-limit'

export const isRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 30,
	standardHeaders: true,
	store: new MemoryStore(),
	message: 'Too many requests, please try again later.'
})
