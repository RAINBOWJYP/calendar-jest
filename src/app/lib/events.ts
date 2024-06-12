import pool from './db'

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

/**
 *
 * @param limit 한번에 가져올 레코드수
 * @param offset 어느 위치부터 데이터를 가져올지
 * @returns
 */
export async function getEventList(
    limit: number,
    offset: number
): Promise<EventType[]> {
    try {
        const [list] = await pool.query(
            `SELECT id
            , title
            , type
            , DATE_FORMAT(start_dt, '%Y-%m-%d %H:%i:%s') as start_dt
            , DATE_FORMAT(end_dt, '%Y-%m-%d %H:%i:%s') as end_dt
            , url
            FROM tb_event
            ORDER BY start_dt DESC
            LIMIT ? OFFSET ?
            `,
            [limit, offset]
        )
        return list as EventType[]
    } catch (error) {
        return []
    }
}
