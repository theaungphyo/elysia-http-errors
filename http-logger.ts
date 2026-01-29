import Elysia from "elysia";

/**
 * Formats HTTP request details into a standardized log string.
 * Pattern: `METHOD /path STATUS - completed in Xms`
 *
 * @param req - The standard Request object.
 * @param startTime - The high-resolution timestamp when the request began.
 * @param status - The HTTP status code returned to the client.
 */
function formatLogMessage(
	req: Request,
	startTime: number,
	status?: number | string,
): string {
	const duration = (performance.now() - startTime).toFixed(2);
	const path = new URL(req.url).pathname;

	return `${req.method} ${path} ${status ?? "?"} - completed in ${duration}ms`;
}

/**
 * Global HTTP Request Logging Plugin for Elysia.
 *
 * Automatically tracks request duration and logs the method, path, and status code
 * for both successful responses (INFO level) and errors (ERROR level).
 */
export function httpLogger() {
	return new Elysia({ name: "http-logger" })
		.derive({ as: "global" }, () => ({
			requestStartTime: performance.now(),
		}))
		.onAfterHandle({ as: "global" }, ({ request, set, requestStartTime }) => {
			console.info(formatLogMessage(request, requestStartTime, set.status));
		})
		.onError({ as: "global" }, ({ request, set, requestStartTime }) => {
			const safeStartTime = requestStartTime ?? performance.now();

			console.error(formatLogMessage(request, safeStartTime, set.status));
		});
}
