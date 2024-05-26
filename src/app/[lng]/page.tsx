import { useTranslation } from '../i18n'
import Calendar from '../ui/calendar/Calendar'
type Props = {
    params: {
        lng: any
    }
}

export default async function Home({ params: { lng } }: Props) {
    const { t } = await useTranslation(lng)
    return <Calendar />
}
