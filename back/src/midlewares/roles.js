import pool from "../config/db.js";

export const authorizeRole = (rolesPermitidos) => {
  return async (req, res, next) => {
    const { rows } = await pool.query(
      "SELECT ROL FROM USERS WHERE ID_USUARIO=$1",
      [req.usuario.id],
    );

    const rol = rows[0]?.rol;
    if (!rol || !rolesPermitidos.includes(rol)) {
        return res.status(403).json({mensaje:"No tienes permiso para esta acción"})
    }
    req.usuario.rol=rol;
    next();
  };
};
