export async function crearProyecto(client,data) {
    const query='INSERT INTO PROJECTS(NOMBRE,DESCRIPCION,OWNER_ID) VALUES($1,$2,$3)'
    const values=[
        data.nombre,
        data.descripcion,
        data.owner_id
    ]
    await client.query(query,values);
}

export async function borrarProyecto(client,id_proyecto) {
    const query='DELETE FROM PROJECTS WHERE ID_PROYECTO=$1'
    await client.query(query,[id_proyecto])
}

export async function archivarProyecto(client,id_proyecto) {
    const query="UPDATE PROJECTS SET ESTADO='ARCHIVADO',update_at=NOW() where id_proyecto=$1"
    await client.query(query,[id_proyecto])
}

export async function selectAllProjects(client) {
    const query="SELECT ID_PROYECTO,OWNER_ID,NOMBRE,DESCRIPCION,ESTADO FROM PROJECTS where estado='ACTIVO'"
    const {rows}=await client.query(query)
    return rows
}

export async function selectMyProjects(client,id_usuario) {
    const query="SELECT ID_PROYECTOS,NOMBRE,DESCRIPCION,ESTADO FROM PROJECT WHERE OWNER_ID=$1"
    const {rows}= await client.query(query,[id_usuario])
    return rows
}