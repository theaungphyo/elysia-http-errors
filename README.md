## Elysia.js Project Integration Guide

Integrating these plugins ensures your API is production-ready with rate limiting, observability, and robust error handling. Follow these steps to set up your project.

### 1. Project Structure

To keep things organized, place your plugins in a dedicated directory.

```text
src/
├── plugins/
│   ├── rate-limit.ts
│   ├── http-logger.ts
│   └── http-error.ts
└── index.ts

```

---

### 2. Implementation in `index.ts`

When registering plugins in Elysia, **order matters**. You generally want your logger and error handler at the top of the stack so they can catch issues from plugins defined later.

```typescript
import { Elysia } from "elysia";
import { httpLogger } from "./plugins/http-logger";
import { httpError, HttpError } from "./plugins/http-error";
import { rateLimit } from "./plugins/rate-limit";
import { redis } from "bun";

// 1. Initialize Redis Client

const client = await redis.connect({
    hostname: "localhost",
    port: 6379,
});

// 2. Setup Elysia
const app = new Elysia()
    // Global Logging & Error Handling (Load these first)
    .use(httpLogger())
    .use(httpError())
    
    // Global Rate Limiting
    .use(rateLimit({ 
        redis: redis, // Cast to match your RedisClient type
        limit: 20, 
        duration: 60 
    }))

    // 3. Define Routes
    .get("/", () => ({ status: "OK", message: "System operational" }))
    
    .get("/secure", () => {
        // Example of manual error throwing
        throw HttpError.Unauthorized("You shall not pass!");
    })

    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

```

---

### 3. Key Integration Tips

* **Redis Typing**: Ensure the `RedisClient` type in your `rate-limit.ts` matches the client library you are using (e.g., `ioredis` or the native `bun` redis client).
* **Proxy Headers**: If you are running behind Nginx or Cloudflare, ensure your server is configured to trust proxy headers, otherwise `request.headers.get("x-forwarded-for")` might be empty or incorrect.
* **Validation Errors**: Because you've added the `httpError` plugin, any TypeBox validation failures in your routes will automatically return a structured JSON response instead of a plain text error.

### 4. Testing the Stack

| Feature | How to Test |
| --- | --- |
| **Logger** | Check your terminal/stdout after hitting any route. |
| **Error Handler** | Hit a route that doesn't exist (404) or trigger a validation error. |
| **Rate Limit** | Use a tool like `ouch` or `ab` to hit `/` 21 times in under a minute. |

---