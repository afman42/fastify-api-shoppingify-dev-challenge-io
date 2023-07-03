import { env } from "./src/config/env";
import { db } from "./src/db";
import buildServer from "./src/server";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function main() {
  try {
    const server = buildServer();

    await migrate(db, {
      migrationsFolder: "./migrations",
    });
    server.ready((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      server.listen({ port: env.PORT, host: env.HOST });
      console.log(`Listening server ${env.HOST}:${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
