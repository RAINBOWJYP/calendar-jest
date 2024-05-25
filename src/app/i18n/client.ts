'use client'
//client에서 사용할 useTranslation hook 생성
import { useEffect, useState } from 'react'
import i18next, { FlatNamespace, KeyPrefix } from 'i18next'
import {
    initReactI18next,
    useTranslation as useTranslationOrg,
    UseTranslationOptions,
    UseTranslationResponse,
    FallbackNs,
} from 'react-i18next'
import { useCookies } from 'react-cookie'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { cookieName, getOptions, languages } from './settings'

// 서버 사이드 렌더링 여부
const runsOnServerSide = typeof window === 'undefined'
console.log('🚀 ~ runsOnServerSide:', runsOnServerSide)

/**
 * i18n 초기화 및 번역 훅을 관리하는 클라이언트 사이드 스크립트입니다.
 */
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`./locales/${language}/${namespace}.json`)
        )
    )
    .init({
        ...getOptions(), // i18n 설정 가져오기
        lng: 'ko', // 기본 언어 설정
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'], // 언어 감지 우선순위 설정
        },
        preload: runsOnServerSide ? languages : [], // 서버 사이드 렌더링 시 언어 리소스 미리 로드
    })

/**
 * 다국어 번역 훅을 제공하는 함수입니다.
 * @param {string} lng - 선택된 언어 코드입니다.
 * @param {string | string[]} ns - 사용할 네임스페이스 또는 네임스페이스 배열입니다.
 * @param {UseTranslationOptions} options - 다국어 번역 훅 옵션입니다.
 * @returns {UseTranslationResponse} - 다국어 번역 훅 응답입니다.
 */
export function useTranslation<
    Ns extends FlatNamespace,
    KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
    lng: string,
    ns?: Ns,
    options?: UseTranslationOptions<KPrefix>
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
    const [cookies, setCookie] = useCookies([cookieName]) // 쿠키 상태와 쿠키 설정 함수를 가져옵니다.
    const ret = useTranslationOrg(ns, options) // 원본 다국어 번역 훅을 사용합니다.
    const { i18n } = ret // i18n 인스턴스를 가져옵니다.

    // 서버 사이드 렌더링인 경우 현재 언어를 확인하고 변경합니다.
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng)
    } else {
        // 클라이언트 사이드 렌더링인 경우 현재 언어를 관리하고 쿠키에 저장합니다.
        const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
        useEffect(() => {
            if (activeLng === i18n.resolvedLanguage) return
            setActiveLng(i18n.resolvedLanguage)
        }, [activeLng, i18n.resolvedLanguage])
        useEffect(() => {
            if (!lng || i18n.resolvedLanguage === lng) return
            i18n.changeLanguage(lng)
        }, [lng, i18n])
        useEffect(() => {
            if (cookies.i18next === lng) return
            setCookie(cookieName, lng, { path: '/home' })
        }, [lng, cookies.i18next])
    }
    return ret // 다국어 번역 훅 응답을 반환합니다.
}
