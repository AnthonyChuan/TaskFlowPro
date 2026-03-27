import jwt from "jsonwebtoken"

export const authenticateToken=(req,res,next)=>{
    const authToken=req.headers["authorization"];
    const token=authToken && authToken.split(" ")[1];

    if (!token) {
        return res.status(401).json({mensaje:"acceso denegado. Token requerido"})
    }

    try {
        const datos=jwt.verify(token,process.env.TOKEN);
        req.usuario=datos;
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensaje: "El token ha expirado" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ mensaje: "Token inválido" });
    }
    res.status(500).json({ mensaje: "Error interno del servidor" });
    };
};
