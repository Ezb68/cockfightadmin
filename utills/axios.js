import {create} from 'axios'
import {deleteCookie, getCookie, setCookie} from 'cookies-next';


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

instance.setToken = (accessToken) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

instance.interceptors.response.use(
    (response) => {
        const accessToken = getCookie('accessToken')
        // If token is present add it to request's Authorization Header
        if (accessToken) {
            setToken(accessToken);
        }
        return response
    },
    async (error) => {
        const { config, response } = error
        const originalRequest = config
        if (response && response.status === 401 && !['auth/v1/refresh-token','auth/v1/login'].includes(config.url)) {
    
            // console.log('get new token using refresh token', getRefreshToken())
            return refreshToken().then(res => {
                let { data, code, message } = res.data;
                setToken(data.token);
                setCookie('accessToken', data.token)
                setCookie('refreshToken', data.refreshToken)
                setCookie('is_refreshToken', true)
                
                return instance(config)
        
            }).catch(e => {
                // console.error('error refreshing',e.message)
                window.location.href = '/login'
            })
        }
        return Promise.reject(error)
    }
)

function setToken(accessToken) {
    instance.setToken(accessToken)
}

function getToken() {
    return getCookie('accessToken')
}

function getRefreshToken() {
    return getCookie('refreshToken')
}
function refreshToken () {
    return instance.post('auth/v1/refresh-token',{
        refreshToken: getRefreshToken()
    })
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
