import { useTranslation } from '../i18n'
import Calendar, { EventType } from '../ui/calendar/Calendar'
import pool from '../lib/db'
import { fetchVideoList } from './test'
type Props = {
    params: {
        lng: any
    }
}

export default async function Home({ params: { lng } }: Props) {
    const { t } = await useTranslation(lng)
    const events = await getEvents()

    return (
        <>
            <Calendar event={events} />
        </>
    )
}

async function getEvents(): Promise<EventType[]> {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, type, DATE_FORMAT(start_dt, '%Y-%m-%d') as start_dt, DATE_FORMAT(end_dt, '%Y-%m-%d') as end_dt, url FROM tb_event"
        )
        console.log('🚀 ~ getEvents ~ rows:', rows)
        return rows as EventType[]
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        return []
    }
}
