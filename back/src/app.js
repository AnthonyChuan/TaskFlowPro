import express from "express"
import router from "./modules/index.js"
import { httpLogger } from "./midlewares/logger.midleware.js"
import swaggerUi from "swagger-ui-express"
import { createRequire } from "module"


const require = createRequire(import.meta.url)
const swaggerFile = require("./config/swagger-output.json")
const app = express()
const port = 3001

app.use(express.json())
app.use(httpLogger)
app.use('/api/v1',router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`)
})