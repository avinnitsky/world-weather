import { resolve } from "path"
import { config } from "dotenv"

console.log({ path: resolve(__dirname, "../../.env") })

config({ path: resolve(__dirname, "../../.env") })