export async function cambiarRolPM(client,id_usuario) {
    const query='update users set rol=2,update_at=NOW() where id_usuario=$1'
    await client.query(query,[id_usuario])
}

export async function cambiarRolAdmin(client,id_usuario) {
     const query='update users set rol=3,update_at=NOW() where id_usuario=$1'
    await client.query(query,[time,id_usuario])
}

export async function cambiarEstado(client,id_usuario) {
    const query=' UPDATE USERS SET activo = NOT activo, UPDATE_AT=NOW()  WHERE id_usuario = $1'
    await client.query(query,[id_usuario])
}

export async function actualizarUsuario(client,data) {
    const query='UPDATE USERS SET NOMBRE=$1,EMAIL=$2 WHERE ID_USUARIO=$3'
    const values=[
        data.nombre,
        data.email,
        data.id_usuario
    ]
    await client.query(query,values)
}

export async function selectMyPerfil(client,id_usuario) {
    const query='SELECT ID_USUARIO,NOMBRE,EMAIL,ROL FROM USERS WHERE ID_USUARIO=$1'
    const {rows}=await client.query(query,[id_usuario])
    return rows[0]
}

export async function obtenerUsuarios(client, { limit, offset }) {
    const query = 'SELECT ID_USUARIO, NOMBRE, EMAIL, ROL, activo FROM USERS ORDER BY CREATED_AT DESC LIMIT $1 OFFSET $2'
    const { rows } = await client.query(query, [limit, offset])
    return rows
}

export async function contarUsuarios(client) {
    const { rows } = await client.query("SELECT COUNT(*) FROM USERS")
    return parseInt(rows[0].count)
}

export async function actualizarUsuarioAdmin(client, data) {
    const query = `UPDATE USERS SET NOMBRE=$1, EMAIL=$2 WHERE ID_USUARIO=$3`
    const values = [data.nombre, data.email, data.id_usuario]
    await client.query(query, values)
}

export async function buscarUsuarios(client, query) {
    const { rows } = await client.query(' SELECT ID_USUARIO, NOMBRE, EMAIL, ROL FROM USERS WHERE ACTIVO = TRUE AND (NOMBRE ILIKE $1 OR EMAIL ILIKE $1) LIMIT 10', [`%${query}%`])
    return rows
}