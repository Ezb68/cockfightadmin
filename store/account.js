import React from 'react';
import { createStore } from 'react-hooks-global-state';
import moment from "moment";
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_INFO_USER': return { ...state };
        case 'SET_USER_LOGIN': {
            const token = getCookie('accessToken')
            if (!token) {
                return null
            }
            const data = JSON.parse(atob(token.split('.')[1]))
            if (moment().utc().unix() >= data.exp) {
                localStorage.clear()
                sessionStorage.clear()
                deleteCookie('accessToken')
                return null
            }
            state.detail = data
            break
        };
        case 'REMOVE_USER_LOGIN': {
            deleteCookie('accessToken')
            state.detail = {}
            break;
        };
        case 'SET_USER_INFO': {
            state.info = action.data
            break
        };
        default: return state;
    }
};
const initialState = {
    detail: {
        given_name: '',
        name: '',
        preferred_username: ''
    },
    info: {
        "userName": "",
        "phone": "",
        "createdDate": "",
        "lastLogin": "",
        "status": "",
        "totalAgentActive": 0,
        "totalAgentLock": 0
    },
    "statistics": {
        "total": 0,
        "size": 0,
        "totalPage": 0,
        "page": 0,
        "result": [
            {
                "userId": "",
                "currency": "",
                "betCount": 0,
                "totalBet": 0,
                "validBet": 0,
                "profit": 0
            }
        ]
    }
};
export const { dispatch, useStoreState } = createStore(reducer, initialState);

//https://www.npmjs.com/package/react-hooks-global-state
