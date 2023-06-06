import buildServer from "./server"

async function main() {
    try {
        const server = buildServer()
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