import { MastraClient } from "@mastra/client-js"

export const mastraClient = new MastraClient({
  baseUrl: "https://mastra.meadery.win",
  retries: 3,
  backoffMs: 300,
  maxBackoffMs: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})
