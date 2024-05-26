import { useTranslation } from '../i18n'
import Calendar from '../ui/calendar/Calendar'
import pool from '../lib/db'
type Props = {
    params: {
        lng: any
    }
}

export default async function Home({ params: { lng } }: Props) {
    const { t } = await useTranslation(lng)

    const testConnection = async () => {
        try {
            const [rows, fields] = await pool.query('SELECT * from tb_event')
            console.log('The solution is: ', rows)
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }

    testConnection()
    return <Calendar />
}
