// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://d110e3e2bc93fc5db86e578d0e5a77e2@o4509939596132352.ingest.us.sentry.io/4509939609370624",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
   integrations: [
    Sentry.mongoIntegration()
],
});
