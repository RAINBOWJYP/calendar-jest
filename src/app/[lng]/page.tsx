import { useTranslation } from '../i18n'
type Props = {
    params: {
        lng: any
    }
}

export default async function Home({ params: { lng } }: Props) {
    const { t } = await useTranslation(lng)
    return <div>{t('title')}</div>
}
