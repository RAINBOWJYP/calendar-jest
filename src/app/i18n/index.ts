import { createInstance, Namespace, FlatNamespace, KeyPrefix } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { FallbackNs } from 'react-i18next'

import { getOptions } from '@/app/i18n/settings'

/**
 * i18next 초기화 함수입니다.
 * @param {string} lng - 선택된 언어 코드입니다.
 * @param {string | string[]} ns - 사용할 네임스페이스 또는 네임스페이스 배열입니다.
 * @returns {Promise<import('i18next').i18n>} - 초기화된 i18n 인스턴스를 반환하는 프로미스입니다.
 */
const initI18next = async (lng: string, ns: string | string[]) => {
    const i18nInstance = createInstance()
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`./locales/${language}/${namespace}.json`)
            )
        )
        .init(getOptions(lng, ns))
    return i18nInstance
}

/**
 * 다국어 번역 훅입니다.
 * @param {string} lng - 선택된 언어 코드입니다.
 * @param {string | string[]} ns - 사용할 네임스페이스 또는 네임스페이스 배열입니다.
 * @param {Object} options - 옵션 객체입니다.
 * @param {KeyPrefix} options.keyPrefix - 키 접두사입니다.
 * @returns {Promise<{ t: import('i18next').TFunction, i18n: import('i18next').i18n }>} - 번역 함수(t)와 i18n 인스턴스를 반환하는 프로미스입니다.
 */
export async function useTranslation<
    Ns extends FlatNamespace,
    KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
    const i18nextInstance = await initI18next(
        lng,
        Array.isArray(ns) ? (ns as string[]) : (ns as string)
    )
    return {
        t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
        i18n: i18nextInstance,
    }
}
