import Elysia, { type ValidationError } from "elysia";

/**
 * Custom HTTP Error class to standardize API error responses.
 * Provides static factory methods for common HTTP status codes.
 */
export class HttpError extends Error {
	public readonly code: string;
	public readonly status: number;
	public readonly details: unknown;

	/**
	 * @param message - Human-readable error message.
	 * @param status - HTTP status code (default: 500).
	 * @param code - Machine-readable error code (default: INTERNAL_SERVER_ERROR).
	 * @param details - Optional additional context or validation details.
	 */
	constructor(
		message: string = "Internal Server Error",
		status: number = 500,
		code: string = "INTERNAL_SERVER_ERROR",
		details: unknown = null,
	) {
		super(message);
		this.status = status;
		this.code = code;
		this.details = details;
		this.name = this.constructor.name;
	}

	// --- Client Errors (4xx) ---

	public static BadRequest(message?: string, details?: unknown) {
		return new HttpError(message || "Bad Request", 400, "BAD_REQUEST", details);
	}

	public static Unauthorized(message?: string, details?: unknown) {
		return new HttpError(
			message || "Unauthorized",
			401,
			"UNAUTHORIZED",
			details,
		);
	}

	public static PaymentRequired(message?: string, details?: unknown) {
		return new HttpError(
			message || "Payment Required",
			402,
			"PAYMENT_REQUIRED",
			details,
		);
	}

	public static Forbidden(message?: string, details?: unknown) {
		return new HttpError(message || "Forbidden", 403, "FORBIDDEN", details);
	}

	public static NotFound(message?: string, details?: unknown) {
		return new HttpError(message || "Not Found", 404, "NOT_FOUND", details);
	}

	public static MethodNotAllowed(message?: string, details?: unknown) {
		return new HttpError(
			message || "Method Not Allowed",
			405,
			"METHOD_NOT_ALLOWED",
			details,
		);
	}

	public static NotAcceptable(message?: string, details?: unknown) {
		return new HttpError(
			message || "Not Acceptable",
			406,
			"NOT_ACCEPTABLE",
			details,
		);
	}

	public static RequestTimeout(message?: string, details?: unknown) {
		return new HttpError(
			message || "Request Timeout",
			408,
			"REQUEST_TIMEOUT",
			details,
		);
	}

	public static Conflict(message?: string, details?: unknown) {
		return new HttpError(message || "Conflict", 409, "CONFLICT", details);
	}

	public static Gone(message?: string, details?: unknown) {
		return new HttpError(message || "Gone", 410, "GONE", details);
	}

	public static LengthRequired(message?: string, details?: unknown) {
		return new HttpError(
			message || "Length Required",
			411,
			"LENGTH_REQUIRED",
			details,
		);
	}

	public static PreconditionFailed(message?: string, details?: unknown) {
		return new HttpError(
			message || "Precondition Failed",
			412,
			"PRECONDITION_FAILED",
			details,
		);
	}

	public static PayloadTooLarge(message?: string, details?: unknown) {
		return new HttpError(
			message || "Payload Too Large",
			413,
			"PAYLOAD_TOO_LARGE",
			details,
		);
	}

	public static UriTooLong(message?: string, details?: unknown) {
		return new HttpError(
			message || "URI Too Long",
			414,
			"URI_TOO_LONG",
			details,
		);
	}

	public static UnsupportedMediaType(message?: string, details?: unknown) {
		return new HttpError(
			message || "Unsupported Media Type",
			415,
			"UNSUPPORTED_MEDIA_TYPE",
			details,
		);
	}

	public static RangeNotSatisfiable(message?: string, details?: unknown) {
		return new HttpError(
			message || "Range Not Satisfiable",
			416,
			"RANGE_NOT_SATISFIABLE",
			details,
		);
	}

	public static ExpectationFailed(message?: string, details?: unknown) {
		return new HttpError(
			message || "Expectation Failed",
			417,
			"EXPECTATION_FAILED",
			details,
		);
	}

	public static ImATeapot(message?: string, details?: unknown) {
		return new HttpError(
			message || "I'm a teapot",
			418,
			"IM_A_TEAPOT",
			details,
		);
	}

	public static UnprocessableEntity(message?: string, details?: unknown) {
		return new HttpError(
			message || "Unprocessable Entity",
			422,
			"UNPROCESSABLE_ENTITY",
			details,
		);
	}

	public static Locked(message?: string, details?: unknown) {
		return new HttpError(message || "Locked", 423, "LOCKED", details);
	}

	public static FailedDependency(message?: string, details?: unknown) {
		return new HttpError(
			message || "Failed Dependency",
			424,
			"FAILED_DEPENDENCY",
			details,
		);
	}

	public static TooEarly(message?: string, details?: unknown) {
		return new HttpError(message || "Too Early", 425, "TOO_EARLY", details);
	}

	public static UpgradeRequired(message?: string, details?: unknown) {
		return new HttpError(
			message || "Upgrade Required",
			426,
			"UPGRADE_REQUIRED",
			details,
		);
	}

	public static PreconditionRequired(message?: string, details?: unknown) {
		return new HttpError(
			message || "Precondition Required",
			428,
			"PRECONDITION_REQUIRED",
			details,
		);
	}

	public static TooManyRequests(message?: string, details?: unknown) {
		return new HttpError(
			message || "Too Many Requests",
			429,
			"TOO_MANY_REQUESTS",
			details,
		);
	}

	public static RequestHeaderFieldsTooLarge(
		message?: string,
		details?: unknown,
	) {
		return new HttpError(
			message || "Request Header Fields Too Large",
			431,
			"REQUEST_HEADER_FIELDS_TOO_LARGE",
			details,
		);
	}

	public static UnavailableForLegalReasons(
		message?: string,
		details?: unknown,
	) {
		return new HttpError(
			message || "Unavailable For Legal Reasons",
			451,
			"UNAVAILABLE_FOR_LEGAL_REASONS",
			details,
		);
	}

	// --- Server Errors (5xx) ---

	public static InternalServer(message?: string, details?: unknown) {
		return new HttpError(
			message || "Internal Server Error",
			500,
			"INTERNAL_SERVER_ERROR",
			details,
		);
	}

	public static NotImplemented(message?: string, details?: unknown) {
		return new HttpError(
			message || "Not Implemented",
			501,
			"NOT_IMPLEMENTED",
			details,
		);
	}

	public static BadGateway(message?: string, details?: unknown) {
		return new HttpError(message || "Bad Gateway", 502, "BAD_GATEWAY", details);
	}

	public static ServiceUnavailable(message?: string, details?: unknown) {
		return new HttpError(
			message || "Service Unavailable",
			503,
			"SERVICE_UNAVAILABLE",
			details,
		);
	}

	public static GatewayTimeout(message?: string, details?: unknown) {
		return new HttpError(
			message || "Gateway Timeout",
			504,
			"GATEWAY_TIMEOUT",
			details,
		);
	}

	public static HttpVersionNotSupported(message?: string, details?: unknown) {
		return new HttpError(
			message || "HTTP Version Not Supported",
			505,
			"HTTP_VERSION_NOT_SUPPORTED",
			details,
		);
	}

	public static VariantAlsoNegotiates(message?: string, details?: unknown) {
		return new HttpError(
			message || "Variant Also Negotiates",
			506,
			"VARIANT_ALSO_NEGOTIATES",
			details,
		);
	}

	public static InsufficientStorage(message?: string, details?: unknown) {
		return new HttpError(
			message || "Insufficient Storage",
			507,
			"INSUFFICIENT_STORAGE",
			details,
		);
	}

	public static LoopDetected(message?: string, details?: unknown) {
		return new HttpError(
			message || "Loop Detected",
			508,
			"LOOP_DETECTED",
			details,
		);
	}

	public static NotExtended(message?: string, details?: unknown) {
		return new HttpError(
			message || "Not Extended",
			510,
			"NOT_EXTENDED",
			details,
		);
	}

	public static NetworkAuthenticationRequired(
		message?: string,
		details?: unknown,
	) {
		return new HttpError(
			message || "Network Authentication Required",
			511,
			"NETWORK_AUTHENTICATION_REQUIRED",
			details,
		);
	}

	// --- Generic Helpers ---

	public static Parse(message?: string, details?: unknown) {
		return new HttpError(message || "Parse Error", 400, "PARSE_ERROR", details);
	}

	public static Validation(message?: string, details?: unknown) {
		return new HttpError(
			message || "Validation Error",
			400,
			"VALIDATION_ERROR",
			details,
		);
	}
}

/**
 * Transforms an array of Elysia/TypeBox validation errors into a key-value map.
 * This abstracts the specific structure of the error object from the main logic.
 */
function formatValidationErrors(
	allErrors: ValidationError["all"],
): Record<string, string> {
	return allErrors.reduce(
		(acc, err) => {
			// Maps the field path (e.g., "/email") to its error message
			acc[err.path] = err.message;
			return acc;
		},
		{} as Record<string, string>,
	);
}

/**
 * Global Error Handling Plugin for Elysia.
 * Intercepts errors, logs them appropriately, and formats standard JSON responses.
 */
export function httpError() {
	return new Elysia({ name: "http-errors" })
		.error({ HTTP_ERROR: HttpError })
		.onError({ as: "global" }, ({ code, error, set }) => {
			console.error(`Error: ${code}`, error);

			// Handle Schema/Input Validation Errors
			if (code === "VALIDATION") {
				set.status = error.status;
				return {
					code: "VALIDATION_ERROR",
					message: error.message,
					errors: formatValidationErrors(error.all),
					status: error.status,
				};
			}

			// Handle explicit HttpErrors thrown by application logic
			if (code === "HTTP_ERROR") {
				set.status = error.status;
				return {
					code: error.code,
					message: error.message,
					status: error.status,
					details: error.details,
				};
			}

			// Handle unexpected/unhandled errors (Fallback)
			set.status = 500;
			return {
				code: "INTERNAL_SERVER_ERROR",
				message: "Internal Server Error",
			};
		});
}
