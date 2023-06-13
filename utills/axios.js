import {create} from 'axios'
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {dispatch} from "@/store/account";

let isAlreadyFetchingAccessToken = true
let subscribers = []

const instance = create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // timeout: 1000,
    headers: {
        // Authorization: `Bearer ` + getCookie('accessToken'),
        'Accept': `application/json`,
        'Content-Type': `application/json`,
        // 'X-Requested-With': `XMLHttpRequest`,
    },
})

instance.interceptors.response.use(
    async (response) => {
        const accessToken = getCookie('accessToken')
        // If token is present add it to request's Authorization Header
        if (accessToken) {
            // eslint-disable-next-line no-param-reassign
            await setToken(accessToken)
            response.headers.Authorization = `Bearer ${accessToken}`
        }
        return response
    },
    async (error) => {
        const { config, response } = error
        const originalRequest = config
        if (response && response.status === 401 && !['auth/v1/refresh-token','auth/v1/login'].includes(config.url)) {
            
            let refreshToken = getCookie('refreshToken')
            if(refreshToken){
                await instance.post('auth/v1/refresh-token',{
                    refreshToken
                }).then(async res => {
                    let { data, code, message } = res.data;
                    if(code === 0) {
                        await setToken(data.token);
                        setCookie('accessToken', data.token)
                        setCookie('refreshToken', data.refreshToken)
                        setCookie('is_refreshToken', true)
                        onAccessTokenFetched(data.token)
                    }
                })
                .catch(e => {
                    deleteCookie('accessToken')
                    deleteCookie('refreshToken')
                    window.location.href = '/login'
                })
            }
            let is_refreshToken = getCookie('is_refreshToken')
            if(is_refreshToken){
                const retryOriginalRequest = new Promise((resolve) => {
                    addSubscriber((accessToken) => {
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`
                        resolve(instance(originalRequest))
                    })
                })
                setCookie('is_refreshToken', false)
                return retryOriginalRequest
            }
            return null
        }
        return Promise.reject(error)
    }
)

function onAccessTokenFetched(accessToken) {
    subscribers = subscribers.filter((callback) => callback(accessToken))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}
async function setToken(accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

async function setBaseUrl(url) {
    instance.defaults.baseURL = url
}

const callApi = function (method = 'POST', url, data = {}, headers = {}, responseType = 'json') {
    switch (method.toUpperCase()) {
        default:
            return new Promise((resolve, reject) => {
                instance
                .post(url, data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((reason) => {
                    reject(reason)
                })
            })
        case 'GET':
            return new Promise((resolve, reject) => {
                instance
                .get(url, {
                    responseType,
                    params: data
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((reason) => {
                    reject(reason)
                })
            })
    }
}

module.exports = {
    callApi: callApi,
    setToken: setToken,
    setBaseUrl: setBaseUrl,
}
