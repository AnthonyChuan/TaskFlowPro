import jwt from "jsonwebtoken"

export const createJWT=(id_usuario,rol)=>{
    return jwt.sign({id:id_usuario,rol},
    process.env.TOKEN,
    {expiresIn:"30m"}
    )
}