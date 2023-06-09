import { db } from "./db"
import buildServer from "./server"
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function main() {
    try {
        const server = buildServer()

        await migrate(db,{
            migrationsFolder: "./migrations",
        })
        await server.ready((err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
            server.listen({ port: 3000, host:"0.0.0.0" })
            console.log("Listening server localhost:3000")
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()