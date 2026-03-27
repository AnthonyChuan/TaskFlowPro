export async function crearTarea(client,data) {
    const query='INSERT INTO TASKS (ASSIGNED_TO,TITULO,DESCRIPCION,PRIORIDAD,PROJECT_ID,DUE_DATE,CREATED_BY) VALUES($1,$2,$3,$4,$5,$6,$7)'
    const values=[
        data.id_usuario,
        data.titulo,
        data.descripcion,
        data.prioridad,
        data.project_id,
        data.due_date,
        data.created_by]

    await client.query(query,values)
}

export async function validarUserId(client,id_usuario) {
    const query='select nombre from users where id_usuario=$1'
    const {rows}= await client.query(query,[id_usuario])
    return rows[0]
}
export async function validarProjectId(client,id_proyecto) {
    const query='SELECT NOMBRE FROM PROJECTS WHERE ID_PROYECTO=$1'
    const {rows}=await client.query(query,[id_proyecto])
    return rows[0]
}   

export async function selectTareasPorId(client,id_usuario) {
    const query="SELECT T.ID_TAREA,T.TITULO,T.DESCRIPCION,T.DUE_DATE,T.ESTADO,T.PRIORIDAD FROM TASKS T INNER JOIN PROJECTS P ON T.PROJECT_ID=P.ID_PROYECTO WHERE T.ASSIGNED_TO=$1 AND P.ESTADO='ACTIVO' ORDER BY T.CREATED_AT DESC"
    const {rows}=await client.query(query,[id_usuario])
    return rows
}

export async function contarTareasPorId(client,id_usuario) {
    const query='SELECT COUNT(*) FROM TASKS WHERE ASSIGNED_TO=$1'
    const {rows} =await client.query(query,[id_usuario])
    return parseInt(rows[0].count)
}

export async function actualizarTareaInProgress(client,id_tarea) {
    const query="UPDATE TASKS SET ESTADO='IN_PROGRESS' WHERE ID_TAREA=$1"
    await client.query(query,[id_tarea])
}

export async function validarDuenoTarea(client,id_tarea) {
    const query='SELECT ID_TAREA,ASSIGNED_TO FROM TASKS where id_tarea=$1'
    const {rows}=await client.query(query,[id_tarea])
    return rows[0]
}

export async function actualizarTareaInReview(client,id_tarea) {
    const query="UPDATE TASKS SET ESTADO='IN_REVIEW' WHERE ID_TAREA=$1"
    await client.query(query,[id_tarea])
}

export async function validarTarea(client,id_tarea) {
    const query='SELECT ID_TAREA FROM TASKS where id_tarea=$1'
    const {rows}=await client.query(query,[id_tarea])
    return rows[0]
}

export async function actualizarTareaDone(client,id_tarea) {
    const query="UPDATE TASKS SET ESTADO='DONE' WHERE ID_TAREA=$1"
    await client.query(query,[id_tarea])
}

export async function deleteTarea(client,id_tarea) {
    const query="DELETE FROM TASKS WHERE ID_TAREA=$1"
    await client.query(query,[id_tarea])
}

export async function selectTareasPorProyecto(client,id_proyecto) {
    const query='SELECT ID_TAREA,TITULO,DESCRIPCION,DUE_DATE,ESTADO FROM TASKS WHERE PROJECT_ID=$1'
    const {rows}=await client.query(query,[id_proyecto])
    return rows
}

export async function editarTarea(client,data) {
    const query='UPDATE TASKS SET TITULO=$1,DESCRIPCION=$2,DUE_DATE=$3,PRIORIDAD=$4 WHERE ID_TAREA=$5'
    const values=[data.titulo,data.descripcion,data.due_date,data.prioridad,data.id_tarea]
    await client.query(query,values)
}   

export async function selectAllTareas(client,{limit,offset}) {
    const query='SELECT ID_TAREA,TITULO,DESCRIPCION,DUE_DATE,ESTADO,PRIORIDAD FROM TASKS ORDER BY CREATED_AT DESC LIMIT $1 OFFSET $2'
    const { rows } = await client.query(query, [limit, offset])
    return rows
}

export async function contarTareas(client) {
    const query='SELECT COUNT(*) FROM TASKS'
    const {rows}=await client.query(query)
    return parseInt(rows[0].count)
}