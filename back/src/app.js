import express from "express"
import router from "./modules/index.js"
import { httpLogger } from "./midlewares/logger.midleware.js"
import swaggerUi from "swagger-ui-express"
import { createRequire } from "module"
import cors from "cors"

const require = createRequire(import.meta.url)
const swaggerFile = require("./config/swagger-output.json")
const app = express()
const port = 3001
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(httpLogger)
app.use('/api/v1',router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`)
})