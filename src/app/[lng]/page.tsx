import { useTranslation } from '../i18n'
import { getEvents } from '../lib/db'
import HomeClient from '../components/HomeClient'
type Props = {
    params: {
        lng: any
    }
    searchParams: { searchText: string }
}

export default async function Home({ params: { lng }, searchParams }: Props) {
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
                <HomeClient i18nTrans={i18nTrans} events={events} />
            </div>
        </div>
    )
}
