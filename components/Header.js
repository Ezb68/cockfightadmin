import Link from 'next/link';
import logo from '../public/assets/images/logo.png'
import balanceIcon from '../public/assets/images/balance-icon.png'
import banner from '../public/assets/images/banner.png'
import { useRouter } from "next/router"

export default function Header () {
    const router = useRouter();
    
    return (
        <>
            <header>
                <div className="offcanvas offcanvas-start" id="offcanvasExample" tabindex="-1" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                    <h5 className="offcanvas-title">
                        <img src={logo.src} style={{width: '70px'}}/>
                    </h5>
                    <button className="btn border-0 p-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"><i className="fas fa-times text-highline fa-2x"></i></button>
                    </div>
                    <div className="offcanvas-body px-0">
                    <div className="tag-block mb-4">
                        <div className="tag-bg py-2">
                        <div className="container">
                            <div className="row mx-0">
                            <div className="col-6">
                                <div className="tag-item me-3">
                                <div className="icon me-2 text-highline"><i className="fas fa-user-circle"></i></div>sonicmap
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="tag-item me-3">
                                <div className="icon me-1 text-danger"><i className="far fa-list-alt"></i></div><span className="text-danger me-3">DEBIT:</span>
                                <div className="text-light">100.000</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="tag-item me-3">
                                <div className="icon me-2 text-highline"><i className="fas fa-coins"></i></div><span className="text-highline me-3">CREDIT:</span>
                                <div className="text-light">100.000</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="tag-item me-3">
                                <div className="icon me-2 text-tag"><i className="fas fa-chart-line"></i></div><span className="text-tag me-3">PROFIT:</span>
                                <div className="text-light">100.000</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="tag-block mb-4">
                        <div className="tag-bg">
                        <div className="container">
                            <ul className="nav nav-pills row">
                            <li className="nav-item col-6 px-0"><Link className={router.pathname == "/" ? "active nav-link" : "nav-link"} href="/index">Profile</Link></li>
                            <li className="nav-item col-6 px-0"><Link className={router.pathname == "/report" ? "active nav-link" : "nav-link"} href="/report">Daily Report</Link></li>
                            <li className="nav-item col-6 px-0"><Link className={router.pathname == "/tree" ? "active nav-link" : "nav-link"} href="/tree">Member Tree</Link></li>
                            <li className="nav-item col-6 px-0"><Link className={router.pathname == "/winloss" ? "active nav-link" : "nav-link"} href="/winloss">Simple Winloss Report</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mx-0">
                    <div className="col-lg-4 d-none d-lg-block">
                        <div className="d-flex align-items-center h-100">
                        <div className="block-brown"><img className="balance me-2" src={balanceIcon.src}/>Balance:  $ 99,999,999</div>
                        </div>
                    </div>
                    <div className="col-10 col-lg-4 offset-lg-0 offset-1">
                        <div className="banner position-relative"><img className="w-100" src={banner.src}/>
                        <div className="position-absolute w-100 h-100 start-0 top-0">
                            <div className="row mx-0">
                            <div className="col-3 mx-auto pt-2 mb-1"><img className="w-100" src={logo.src}/></div>
                            </div>
                            <div className="text-banner text-center">EZB68 COCKFIGHT</div>
                        </div>
                        </div>
                    </div>
                    <div className="col-1 d-lg-none px-0">
                        <div className="d-flex align-items-center h-100">
                        <button className="btn btn-menu p-0 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i className="fas fa-bars fa-2x"></i></button>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                        <div className="d-flex align-items-center h-100 justify-content-center">
                        <div className="dropdown">
                            <button className="block-brown dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-globe-europe me-2"></i>English</button>
                            <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#"><span className="fi fi-gb fs-5 me-3 rounded"></span>English</a></li>
                            <li><a className="dropdown-item" href="#"><span className="fi fi-cn fs-5 me-3 rounded"></span>China</a></li>
                            </ul>
                        </div>
                        <div className="block-brown mx-2"><i className="fas fa-moon"></i></div>
                        </div>
                    </div>
                    </div>
                    <div className="d-lg-none">
                    <div className="row mb-3">
                        <div className="col-8">
                        <div className="d-flex align-items-center h-100">
                            <div className="block-brown"><img className="balance me-2" src={balanceIcon.src}/>Balance:  $ 99,999,999</div>
                        </div>
                        </div>
                        <div className="col-4">
                        <div className="d-flex align-items-center h-100 justify-content-center">
                            <div className="dropdown">
                            <button className="block-brown dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-globe-europe me-2"></i>English</button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#"><span className="fi fi-gb fs-5 me-3 rounded"></span>English</a></li>
                                <li><a className="dropdown-item" href="#"><span className="fi fi-cn fs-5 me-3 rounded"></span>China</a></li>
                            </ul>
                            </div>
                            <div className="block-brown mx-2"><i className="fas fa-moon"></i></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
        </>
    )
}
