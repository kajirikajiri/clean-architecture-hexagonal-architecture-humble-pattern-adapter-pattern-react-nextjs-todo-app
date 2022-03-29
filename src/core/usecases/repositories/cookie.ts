import Cookies, { CookiesStatic } from 'js-cookie'
export type Cookie = {
    c: CookiesStatic
}

const newCookie = (): Cookie => {
    return {
        c: Cookies
    }
}
