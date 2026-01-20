# elysia-http-errors

HTTP errors similar to NestJS exceptions, without vendor lock-in.

```ts
import Elysia from "elysia";

/**
 * Base HTTP Error class
 */
export class HttpError extends Error {
  code: string;
  status: number;

  constructor(message?: string, status: number = 500, code?: string) {
    super(message || "Internal Server Error");
    this.status = status;
    this.code = code || "INTERNAL_SERVER_ERROR";
    this.name = this.constructor.name;
  }
}

/**
 * 400 Bad Request
 */
export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(message || "Bad Request", 400, "BAD_REQUEST");
  }
}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(message || "Unauthorized", 401, "UNAUTHORIZED");
  }
}

/**
 * 402 Payment Required
 */
export class PaymentRequiredError extends HttpError {
  constructor(message?: string) {
    super(message || "Payment Required", 402, "PAYMENT_REQUIRED");
  }
}

/**
 * 403 Forbidden
 */
export class ForbiddenError extends HttpError {
  constructor(message?: string) {
    super(message || "Forbidden", 403, "FORBIDDEN");
  }
}

/**
 * 404 Not Found
 */
export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(message || "Not Found", 404, "NOT_FOUND");
  }
}

/**
 * 405 Method Not Allowed
 */
export class MethodNotAllowedError extends HttpError {
  constructor(message?: string) {
    super(message || "Method Not Allowed", 405, "METHOD_NOT_ALLOWED");
  }
}

/**
 * 406 Not Acceptable
 */
export class NotAcceptableError extends HttpError {
  constructor(message?: string) {
    super(message || "Not Acceptable", 406, "NOT_ACCEPTABLE");
  }
}

/**
 * 408 Request Timeout
 */
export class RequestTimeoutError extends HttpError {
  constructor(message?: string) {
    super(message || "Request Timeout", 408, "REQUEST_TIMEOUT");
  }
}

/**
 * 409 Conflict
 */
export class ConflictError extends HttpError {
  constructor(message?: string) {
    super(message || "Conflict", 409, "CONFLICT");
  }
}

/**
 * 410 Gone
 */
export class GoneError extends HttpError {
  constructor(message?: string) {
    super(message || "Gone", 410, "GONE");
  }
}

/**
 * 411 Length Required
 */
export class LengthRequiredError extends HttpError {
  constructor(message?: string) {
    super(message || "Length Required", 411, "LENGTH_REQUIRED");
  }
}

/**
 * 412 Precondition Failed
 */
export class PreconditionFailedError extends HttpError {
  constructor(message?: string) {
    super(message || "Precondition Failed", 412, "PRECONDITION_FAILED");
  }
}

/**
 * 413 Payload Too Large
 */
export class PayloadTooLargeError extends HttpError {
  constructor(message?: string) {
    super(message || "Payload Too Large", 413, "PAYLOAD_TOO_LARGE");
  }
}

/**
 * 414 URI Too Long
 */
export class UriTooLongError extends HttpError {
  constructor(message?: string) {
    super(message || "URI Too Long", 414, "URI_TOO_LONG");
  }
}

/**
 * 415 Unsupported Media Type
 */
export class UnsupportedMediaTypeError extends HttpError {
  constructor(message?: string) {
    super(message || "Unsupported Media Type", 415, "UNSUPPORTED_MEDIA_TYPE");
  }
}

/**
 * 416 Range Not Satisfiable
 */
export class RangeNotSatisfiableError extends HttpError {
  constructor(message?: string) {
    super(message || "Range Not Satisfiable", 416, "RANGE_NOT_SATISFIABLE");
  }
}

/**
 * 417 Expectation Failed
 */
export class ExpectationFailedError extends HttpError {
  constructor(message?: string) {
    super(message || "Expectation Failed", 417, "EXPECTATION_FAILED");
  }
}

/**
 * 418 I'm a teapot
 */
export class ImATeapotError extends HttpError {
  constructor(message?: string) {
    super(message || "I'm a teapot", 418, "IM_A_TEAPOT");
  }
}

/**
 * 422 Unprocessable Entity
 */
export class UnprocessableEntityError extends HttpError {
  constructor(message?: string) {
    super(message || "Unprocessable Entity", 422, "UNPROCESSABLE_ENTITY");
  }
}

/**
 * 423 Locked
 */
export class LockedError extends HttpError {
  constructor(message?: string) {
    super(message || "Locked", 423, "LOCKED");
  }
}

/**
 * 424 Failed Dependency
 */
export class FailedDependencyError extends HttpError {
  constructor(message?: string) {
    super(message || "Failed Dependency", 424, "FAILED_DEPENDENCY");
  }
}

/**
 * 425 Too Early
 */
export class TooEarlyError extends HttpError {
  constructor(message?: string) {
    super(message || "Too Early", 425, "TOO_EARLY");
  }
}

/**
 * 426 Upgrade Required
 */
export class UpgradeRequiredError extends HttpError {
  constructor(message?: string) {
    super(message || "Upgrade Required", 426, "UPGRADE_REQUIRED");
  }
}

/**
 * 428 Precondition Required
 */
export class PreconditionRequiredError extends HttpError {
  constructor(message?: string) {
    super(message || "Precondition Required", 428, "PRECONDITION_REQUIRED");
  }
}

/**
 * 429 Too Many Requests
 */
export class TooManyRequestsError extends HttpError {
  constructor(message?: string) {
    super(message || "Too Many Requests", 429, "TOO_MANY_REQUESTS");
  }
}

/**
 * 431 Request Header Fields Too Large
 */
export class RequestHeaderFieldsTooLargeError extends HttpError {
  constructor(message?: string) {
    super(
      message || "Request Header Fields Too Large",
      431,
      "REQUEST_HEADER_FIELDS_TOO_LARGE",
    );
  }
}

/**
 * 451 Unavailable For Legal Reasons
 */
export class UnavailableForLegalReasonsError extends HttpError {
  constructor(message?: string) {
    super(
      message || "Unavailable For Legal Reasons",
      451,
      "UNAVAILABLE_FOR_LEGAL_REASONS",
    );
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(message || "Internal Server Error", 500, "INTERNAL_SERVER_ERROR");
  }
}

/**
 * 501 Not Implemented
 */
export class NotImplementedError extends HttpError {
  constructor(message?: string) {
    super(message || "Not Implemented", 501, "NOT_IMPLEMENTED");
  }
}

/**
 * 502 Bad Gateway
 */
export class BadGatewayError extends HttpError {
  constructor(message?: string) {
    super(message || "Bad Gateway", 502, "BAD_GATEWAY");
  }
}

/**
 * 503 Service Unavailable
 */
export class ServiceUnavailableError extends HttpError {
  constructor(message?: string) {
    super(message || "Service Unavailable", 503, "SERVICE_UNAVAILABLE");
  }
}

/**
 * 504 Gateway Timeout
 */
export class GatewayTimeoutError extends HttpError {
  constructor(message?: string) {
    super(message || "Gateway Timeout", 504, "GATEWAY_TIMEOUT");
  }
}

/**
 * 505 HTTP Version Not Supported
 */
export class HttpVersionNotSupportedError extends HttpError {
  constructor(message?: string) {
    super(
      message || "HTTP Version Not Supported",
      505,
      "HTTP_VERSION_NOT_SUPPORTED",
    );
  }
}

/**
 * 506 Variant Also Negotiates
 */
export class VariantAlsoNegotiatesError extends HttpError {
  constructor(message?: string) {
    super(message || "Variant Also Negotiates", 506, "VARIANT_ALSO_NEGOTIATES");
  }
}

/**
 * 507 Insufficient Storage
 */
export class InsufficientStorageError extends HttpError {
  constructor(message?: string) {
    super(message || "Insufficient Storage", 507, "INSUFFICIENT_STORAGE");
  }
}

/**
 * 508 Loop Detected
 */
export class LoopDetectedError extends HttpError {
  constructor(message?: string) {
    super(message || "Loop Detected", 508, "LOOP_DETECTED");
  }
}

/**
 * 510 Not Extended
 */
export class NotExtendedError extends HttpError {
  constructor(message?: string) {
    super(message || "Not Extended", 510, "NOT_EXTENDED");
  }
}

/**
 * 511 Network Authentication Required
 */
export class NetworkAuthenticationRequiredError extends HttpError {
  constructor(message?: string) {
    super(
      message || "Network Authentication Required",
      511,
      "NETWORK_AUTHENTICATION_REQUIRED",
    );
  }
}

/**
 * Custom Parse Error
 */
export class ParseError extends HttpError {
  constructor(message?: string) {
    super(message || "Parse Error", 400, "PARSE_ERROR");
  }
}

/**
 * Custom Validation Error
 */
export class ValidationError extends HttpError {
  constructor(message?: string) {
    super(message || "Validation Error", 400, "VALIDATION_ERROR");
  }
}

/**
 *
 * Http Error Handler
 */
export function httpErrors() {
  return new Elysia().onError({ as: "global" }, ({ code, error, set }) => {
    // Handle validation errors
    if (code === "VALIDATION") {
      set.status = error.status;
      return {
        code: error.code,
        message: error.messageValue?.message,
        errors: error.all.reduce(
          (acc, err) => {
            acc[err.path.replace("/", "")] = err.message;
            return acc;
          },
          {} as Record<string, string>,
        ),
        status: error.status,
      };
    }

    // Handle custom HTTP errors
    if (error instanceof HttpError) {
      set.status = error.status;
      return {
        code: error.code,
        message: error.message,
        status: error.status,
      };
    }
  })
}

```
