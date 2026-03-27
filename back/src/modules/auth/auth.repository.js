export async function crearUsuario(client,data) {
    const query='INSERT INTO USERS(NOMBRE,EMAIL,PASSWORD) VALUES ($1,$2,$3)'
    const values=[
        data.nombre,
        data.email,
        data.hashpassword
    ]
    await client.query(query,values)
}

export async function getAllUsers(client) {
    const query='SELECT NOMBRE FROM USERS'
    const {rows}=await client.query(query)
    return rows
}

export async function selectUserPorEmail(client,email) {
    const query='SELECT ID_USUARIO,NOMBRE,PASSWORD,EMAIL,ROL,ACTIVO FROM USERS WHERE EMAIL=$1'
    const {rows}=await client.query(query,[email])
    return rows[0]
}


