import { useTranslation } from '../i18n'
import Calendar, { EventType } from '../ui/calendar/Calendar'
import pool from '../lib/db'
import { Button } from '../ui/button/Button'
import List from '../ui/list/List'
import { FaAngleDown } from 'react-icons/fa6'
import EventList from './EventList'
import Switch from '../ui/switch/Switch'
import Tabs from '../ui/tab/Tabs'
import Tab from '../ui/tab/Tab'
import EventTab from './EventTab'
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

    const i18nTrans = {
        cal: t('calendar'),
        list: t('list'),
    }

    return (
        <div style={{ padding: '16px 24px 16px' }}>
            <div className={'list-wrapper'}>
                <div className="filter-zone">
                    {`💙${t('예준')}💜${t('노아')}💗${t('밤비')}❤️${t('은호')}🖤${t('하민')}`}
                </div>
                <EventTab i18nTrans={i18nTrans} />
                {/* <Calendar event={events} /> */}
                <EventList events={events} />
                <FaAngleDown fill={'var(--divider)'} />
            </div>
        </div>
    )
}

async function getEvents(): Promise<EventType[]> {
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
