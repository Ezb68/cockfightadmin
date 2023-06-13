import { useState, useEffect } from 'react';
import logo from '../public/assets/images/logo.png';
import { useRouter } from 'next/router';
import axios from '../utills/axios';
import {dispatch, useStoreState} from '@/store/account'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import {useNotify} from "@/utills/useNotify";

export default function Login({Component, pageProps}) {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const user = useStoreState('detail');

    async function login() {
        await axios.callApi('POST','auth/v1/login',{
            username,
            password
        }).then(async res => {
            let { data, code, message } = res;
            if(code === 0) {
                await axios.setToken(data.token);
                setCookie('accessToken', data.token)
                setCookie('refreshToken', data.refreshToken)
                dispatch({ type: 'SET_USER_LOGIN'})
                await router.push('/');
            };
        }).catch(e => {
            useNotify('error', e.message)
        })
    }
    
    return (
        <>
            <div className="container">
                <div className="vh-100">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="login">
                            <div className="row mx-0">
                                <div className="col-6 col-lg-4 mx-auto">
                                    <img className="w-100" src={logo.src} />
                                </div>
                            </div>
                            <div className="text-login text-center text-uppercase py-3">EZB68 COCKFIGHT<br />ADMIN LOGIN</div>
                            <div className="login-box p-4 py-5 rounded">
                                <div className="row mb-3">
                                    <div className="col-lg-3 mb-1 mb-lg-0">
                                        <div className="d-flex align-items-center h-100"><i className="fas fa-user me-2"></i>Username</div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="input-group">
                                            <input className="form-control border-0" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 mb-1 mb-lg-0">
                                        <div className="d-flex align-items-center h-100"><i className="fas fa-key me-2"></i>Password</div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="input-group">
                                            <input className="form-control border-0" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center py-4">
                                <button className="btn btn-submit px-4 hvr-float" onClick={login}>LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom">
                <div className="text-center pb-2 text-highline">EZB Copy Alright Server</div>
            </div>
        </>
    )
}
