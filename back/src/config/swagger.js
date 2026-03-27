import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title:       "TaskFlow API",
        description: "API para gestión de tareas"
    },
    host: "localhost:3001",
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            in:   "header",
            name: "Authorization"
        }
    }
}

const outputFile   = "./swagger-output.json"
const routesFiles  = ["./src/app.js"]  

export default swaggerAutogen()(outputFile, routesFiles, doc)