import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost', // AWS RDS의 경우 RDS 엔드포인트로 변경
    user: 'root',
    password: 'root',
    database: 'idol',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default pool

export type EventType = {
    id: number
    title: string
    type: string
    start_dt: string
    end_dt: string
    url: string
}

export async function getEvents(): Promise<EventType[]> {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, type, DATE_FORMAT(start_dt, '%Y-%m-%d %H:%i:%s') as start_dt, DATE_FORMAT(end_dt, '%Y-%m-%d %H:%i:%s') as end_dt, url FROM tb_event ORDER BY start_dt DESC"
        )
        return rows as EventType[]
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        return []
    }
}
