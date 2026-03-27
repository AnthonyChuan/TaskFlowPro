import express from "express"
import router from "./modules/index.js"

const app = express()
const port = 3001

app.use(express.json())
app.use('/api/v1',router);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`)
})