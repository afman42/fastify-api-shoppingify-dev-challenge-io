// import { Pool } from "pg";
import ws from 'ws';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../config/env";
import * as schema from "./schema"

neonConfig.webSocketConstructor = ws; 

const pool = new Pool({
  connectionString: env.DATABASE_CONNECTION,
});

export const db = drizzle(pool, { schema });
