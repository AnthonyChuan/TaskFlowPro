export async function cambiarRolPM(client,id_usuario) {
    const query='update users set rol=2,update_at=NOW() where id_usuario=$1'
    await client.query(query,[id_usuario])
}

export async function cambiarRolAdmin(client,id_usuario) {
     const query='update users set rol=3,update_at=NOW() where id_usuario=$1'
    await client.query(query,[time,id_usuario])
}

export async function cambiarEstado(client,id_usuario) {
    const query=' UPDATE USERS SET activo = NOT,UPDATE_AT=NOW() activo WHERE id_usuario = $1'
    await client.query(query,[id_usuario])
}