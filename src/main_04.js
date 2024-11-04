// This version uses a static file server for unknown routes.

// Try this with
// http://localhost:8000/
// http://localhost:8000/api/test?myParam=abc

// Import the Application and Router classes from the Oak module
import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v12.6.1/mod.ts";

// Import the createExitSignal function from the JS+OAI shared library
import { createExitSignal, staticServer } from "./shared/server.ts";

// Create an instance of the Application and Router classes
const app = new Application();
const router = new Router();

router.get("/", async (ctx) => {
  await send(ctx, "dice.html", { root: "./public" });
});

// Configure a custom route
// This function will run when "/api/test" is requested
router.get("/api/test", (ctx) => {
  console.log("Someone made a request to /api/test");

  // Output some info about the request
  console.log("ctx.request.url.pathname:", ctx.request.url.pathname);
  console.log("myParam:", ctx.request.url.searchParams.get("myParam"));
  console.log("ctx.request.method:", ctx.request.method);

  // Send a response back to the browser
  ctx.response.body = "This is a test from index.html.";
});

// Configure the /api/d6 route to generate and return a random number
router.get("/api/d6", (ctx) => {
  console.log("Someone made a request to /api/d6");

  // Generate a random number between 1 and 6
  const randomNum = Math.floor(Math.random() * 6) + 1;
  console.log("Generated random number:", randomNum);

  // Send the random number back in the response
  ctx.response.body = `${randomNum}`;
});

// Tell the app to use the router
app.use(router.routes());
app.use(router.allowedMethods());

// Try serving undefined routes with static files
app.use(staticServer);

// Everything is set up, let's start the server
console.log("\nListening on http://localhost:8000");
await app.listen({ port: 8000, signal: createExitSignal() });
