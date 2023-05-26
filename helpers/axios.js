import { create } from 'axios'
const instance = create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL_CRM,
    // timeout: 1000,
    headers: {
        // Authorization: `Bearer ${getLocalToken()}`,
        'Content-Type': `application/json`,
        'X-Requested-With': `XMLHttpRequest`,
    },
})

async function setToken(accessToken) {
    instance.defaults.headers.Authorization = `Bearer ${accessToken}`
}

async function setBaseUrl(url) {
    instance.defaults.baseURL = url
}

const callApi = function (method = 'POST', url, data = {}, headers = {}) {
    // console.log('--callApi--')
    switch (method.toUpperCase()) {
        default:
            return new Promise((resolve, reject) => {
                instance
                .post(url, data, {headers})
                .then((response) => {
                    resolve(response.data)
                })
                .catch((reason) => {
                    reject(reason.response.data)
                })
            })
        case 'GET':
            return new Promise((resolve, reject) => {
                instance
                .get(url, {
                    params: data,
                    headers,
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((reason) => {
                    
                    reject(reason.response.data)
                })
            })
        // case 'DELETE':
        //     return new Promise((resolve, reject) => {
        //         instance
        //         .delete(url, {
        //             params: data,
        //             headers,
        //         })
        //         .then((response) => {
        //             resolve(response.data)
        //         })
        //         .catch((reason) => {
        //             // console.log(reason.response.data)
        //
        //             reject(reason.response.data)
        //         })
        //     })
        // case 'PATCH':
        //     return new Promise((resolve, reject) => {
        //         instance
        //         .patch(url, data, {
        //             headers,
        //         })
        //         .then((response) => {
        //             resolve(response.data)
        //         })
        //         .catch((reason) => {
        //             // console.log(reason.response.data)
        //             reject(reason.response.data)
        //         })
        //     })
    }
}

module.exports = {
    callApi: callApi,
    setToken: setToken,
    setBaseUrl: setBaseUrl,
}