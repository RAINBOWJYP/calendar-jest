import { useTranslation } from '../i18n'
import Calendar, { EventType } from '../ui/calendar/Calendar'
import pool from '../lib/db'
import { Button } from '../ui/button/Button'
import List from '../ui/list/List'
import { env } from 'process'
type Props = {
    params: {
        lng: any
    }
    searchParams: { searchText: string }
}

export default async function Home({ params: { lng }, searchParams }: Props) {
    console.log('🚀 ~ Home ~ searchParam:', searchParams)
    const { t } = await useTranslation(lng)
    const events = await getEvents()

    return (
        <div style={{ padding: '16px 24px 16px' }}>
            <div className="filter-zone">
                💙예준💜노아💗밤비❤️은호🖤하민
                <Button label={'List view'} primary />
            </div>
            <List event={events} />
            <p>아래화살표 넣을 자리</p>
            {/* <Calendar event={events} /> */}
        </div>
    )
}

async function getEvents(): Promise<EventType[]> {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, type, DATE_FORMAT(start_dt, '%Y-%m-%d %H:%i:%s') as start_dt, DATE_FORMAT(end_dt, '%Y-%m-%d %H:%i:%s') as end_dt, url FROM tb_event"
        )
        // console.log('🚀 ~ getEvents ~ rows:', rows)
        return rows as EventType[]
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        return []
    }
}
