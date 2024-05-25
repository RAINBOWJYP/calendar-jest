export const fallbackLng = 'ko' //기본으로 사용할 언어
export const languages = [fallbackLng, 'en'] //지원하는 언어 목록
export const defaultNS = 'home' // 기본 네임 스페이스(default namespace) => 여러 영역에 따라 번역을 구분하는 데 사용됨.
export const cookieName = 'i18next' //다국어 지원에 사용되는 쿠키의 이름 이 쿠키는 사용자의 언어 설정을 추적하고 저장하는데 사용함.

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
