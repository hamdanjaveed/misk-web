import { createApp, createIndex } from "@misk/core"
import * as Ducks from "./ducks"
import routes from "./routes"
export * from "./components"
export * from "./containers"

createIndex("palette", createApp(routes), Ducks)
