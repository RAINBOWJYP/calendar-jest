export const fallbackLng = 'ko'
export const languages = [fallbackLng, 'en']
export const defaultNS = 'translation'
export const cookieName = 'i18next'

/**
 * 다국어 지원을 위한 설정 옵션을 반환합니다.
 * @param {string} lng - 선택된 언어 코드입니다. 기본값은 기본 언어(fallbackLng)입니다.
 * @param {string | string[]} ns - 사용할 네임스페이스 또는 네임스페이스 배열입니다. 기본값은 기본 네임스페이스(defaultNS)입니다.
 * @returns {Object} - i18n 설정 옵션 객체입니다.
 */
export function getOptions(
    lng = fallbackLng,
    ns: string | string[] = defaultNS
) {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    }
}
