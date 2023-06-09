import Link from 'next/link';
import logo from '../public/assets/images/logo.png'
import balanceIcon from '../public/assets/images/balance-icon.png'
import banner from '../public/assets/images/banner.png'
import {useRouter} from "next/router"
import {dispatch, useStoreState} from "@/store/account";
import {money} from '@/utills/filters'
import {deleteCookie} from "cookies-next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const router = useRouter();
    
    async function logout() {
        // console.log('logged')
        deleteCookie('accessToken')
        deleteCookie('accessToken')
        dispatch({type: 'REMOVE_USER_LOGIN'})
        await router.push('/login')
    }
    
    return (
        <>
            <header>
                
                <div className="container">
                    <div className="row mx-0">
                        <div className="col-lg-4 d-none d-lg-block">
                            <div className="d-flex align-items-center h-100">
                                <div className="block-brown"><img className="balance me-2" src={balanceIcon.src} alt=""/>Balance:
                                    $ 0
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-4 offset-lg-0 offset-1">
                            <div className="banner position-relative"><img  className="w-100" src={banner.src} alt=""/>
                                <div className="position-absolute w-100 h-100 start-0 top-0">
                                    <div className="row mx-0">
                                        <div className="col-3 mx-auto pt-2 mb-1"><img  className="w-100" src={logo.src} alt=""/>
                                        </div>
                                    </div>
                                    <div className="text-banner text-center">EZB68 COCKFIGHT</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 d-lg-none px-0">
                            <div className="d-flex align-items-center h-100">
                                <button className="btn btn-menu p-0 border-0" type="button" data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                    {/*<i*/}
                                    {/*className="fas fa-bars fa-2x"></i>*/}
                                    <FontAwesomeIcon className="" icon={faBars}/>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 d-none d-lg-block">
                            <div className="d-flex align-items-center h-100 justify-content-center">
                                <div className="dropdown">
                                    <button className="block-brown dropdown-toggle border-0" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false"><i
                                        className="fas fa-globe-europe me-2"></i>English
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><a className="dropdown-item" href="#"><span
                                            className="fi fi-gb fs-5 me-3 rounded"></span>English</a></li>
                                        <li><a className="dropdown-item" href="#"><span
                                            className="fi fi-cn fs-5 me-3 rounded"></span>China</a></li>
                                    </ul>
                                </div>
                                <div className="block-brown mx-2"><i className="fas fa-moon"></i></div>
                                <button className="block-brown mx-2 btn btn-danger" onClick={logout}><i className="fas fa-sign-out"></i> Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-lg-none">
                        <div className="row mb-3">
                            <div className="col-6">
                                <div className="d-flex align-items-center h-100">
                                    <div className="block-brown"><img  className="balance me-2" src={balanceIcon.src} alt=""/>Balance:
                                        $ 0
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center h-100 justify-content-center">
                                    <div className="dropdown">
                                        <button className="block-brown dropdown-toggle border-0" type="button"
                                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                            className="fas fa-globe-europe me-2"></i>English
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><a className="dropdown-item" href="#"><span
                                                className="fi fi-gb fs-5 me-3 rounded"></span>English</a></li>
                                            <li><a className="dropdown-item" href="#"><span
                                                className="fi fi-cn fs-5 me-3 rounded"></span>China</a></li>
                                        </ul>
                                    </div>
                                    <div className="block-brown mx-2"><i className="fas fa-moon"></i></div>
                                    <button className="block-brown mx-2" onClick={logout}><i className="fas fa-sign-out"></i> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
