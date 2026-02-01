import { z } from "zod";

// Define the schema as an object with all of the env
// variables and their types

const envSchema = z.object({
  PORT: z.coerce.number().min(1000).default(3000),
  MONGODB_USER: z.string(),
  MONGODB_PWD: z.string(),
  MONGODB_CLUSTER: z.string(),
  MONGODB_DATABASE: z.string(),
});

// Validate `process.env` against our schema
// and return the result
// eslint-disable-next-line node/no-process-env
const env = envSchema.parse(process.env);

// Export the result so we can use it in the project
export default env;
