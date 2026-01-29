import type { RedisClient } from "bun";
import { Elysia } from "elysia";

/**
 * Configuration options for the Redis Rate Limit plugin.
 */
interface RateLimitOptions {
	redis: RedisClient;
	/** Maximum number of requests allowed within the duration. Default: 10 */
	limit?: number;
	/** Duration of the rate limit window in seconds. Default: 60 */
	duration?: number;
	/** Prefix for Redis keys to prevent collisions. Default: 'rate-limit' */
	keyPrefix?: string;
}

// We use a Lua script to ensure the increment and expiration occur atomically.
// This prevents "zombie keys" that increment but never expire if the server crashes.
const ATOMIC_INCR_EXPIRE = `
    local current = redis.call("INCR", KEYS[1])
    if current == 1 then
        redis.call("EXPIRE", KEYS[1], ARGV[1])
    end
    return current
`;

export function rateLimit(options: RateLimitOptions) {
	const {
		redis,
		limit = 10,
		duration = 60,
		keyPrefix = "rate-limit",
	} = options;

	return new Elysia({ name: "rate-limit" })
		.derive({ as: "global" }, ({ server, request }) => {
			const clientIp =
				server?.requestIP(request)?.address ||
				request.headers.get("x-forwarded-for") ||
				"unknown";

			return { clientIp };
		})
		.onBeforeHandle({ as: "global" }, async ({ set, clientIp }) => {
			const key = `${keyPrefix}:${clientIp}`;

			try {
				const result = await redis.send("EVAL", [
					ATOMIC_INCR_EXPIRE,
					"1",
					key,
					duration.toString(),
				]);

				const currentCount = Number(result);

				set.headers["X-RateLimit-Limit"] = limit.toString();
				set.headers["X-RateLimit-Remaining"] = Math.max(
					0,
					limit - currentCount,
				).toString();
				set.headers["X-RateLimit-Reset"] = (
					Math.floor(Date.now() / 1000) + duration
				).toString();

				if (currentCount > limit) {
					set.status = 429;
					set.headers["Retry-After"] = duration.toString();
					return {
						error: "Too Many Requests",
						message: `Limit exceeded: ${limit} requests per ${duration}s.`,
					};
				}
			} catch (error) {
				console.error("Rate Limit Error:", error);
			}
		});
}
