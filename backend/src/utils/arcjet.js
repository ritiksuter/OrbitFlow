import arcjet, { detectBot, shield, tokenBucket, validateEmail } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    validateEmail({
      mode: "LIVE",
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;






/*

This code configures Arcjet, a security middleware for Node.js, to protect your application:

shield({ mode: "LIVE" }) → Blocks common attacks like SQL injection or XSS.

detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }) → Detects and blocks unwanted bots, allowing only search engine bots.

validateEmail({ mode: "LIVE", deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"] }) → Blocks invalid or disposable email addresses.

tokenBucket({ mode: "LIVE", refillRate: 5, interval: 10, capacity: 10 }) → Limits request rate per IP (prevents abuse/spam).

It tracks requests by IP address (characteristics: ["ip.src"]) and exports the configured aj instance so it can be used as middleware in your app.

In short:

This sets up multiple layers of security (attack protection, bot detection, email validation, and rate limiting) for your Node.js application.

*/