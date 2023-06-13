import Link from "next/link";
import { useRouter } from "next/router"
import {useStoreState} from "@/store/account";
import logo from '../public/assets/images/logo.png'

export default function MenuMobile() {
    const router = useRouter();
    const user = useStoreState('detail');
    const info = useStoreState('info');
    const statistics = useStoreState('statistics');
    
    return(
        <>
            <div className="offcanvas offcanvas-start" id="offcanvasExample"
                 aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">
                        <img src={logo.src} style={{width: '70px'}}/>
                    </h5>
                    <button className="btn border-0 p-0" type="button" data-bs-dismiss="offcanvas"
                            aria-label="Close"><i className="fas fa-times text-highline fa-2x"></i></button>
                </div>
                <div className="offcanvas-body px-0">
                    <div className="tag-block mb-4">
                        <div className="tag-bg py-2">
                            <div className="container">
                                <div className="row mx-0">
                                    <div className="col-6">
                                        <div className="tag-item me-3">
                                            <div className="icon me-2 text-highline"><i
                                                className="fas fa-user-circle"></i></div>
                                            {user?.name}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="tag-item me-3">
                                            <div className="icon me-1 text-danger"><i
                                                className="far fa-list-alt"></i></div>
                                            <span className="text-danger me-3">DEBIT:</span>
                                            {/*<div className="text-light">{money(statistics)}</div>*/}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="tag-item me-3">
                                            <div className="icon me-2 text-highline"><i
                                                className="fas fa-coins"></i></div>
                                            <span className="text-highline me-3">CREDIT:</span>
                                            <div className="text-light">0</div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="tag-item me-3">
                                            <div className="icon me-2 text-tag"><i
                                                className="fas fa-chart-line"></i></div>
                                            <span className="text-tag me-3">PROFIT:</span>
                                            <div className="text-light">0</div>
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
                                    <li className="nav-item col-6 px-0"><Link
                                        className={router.pathname == "/" ? "active nav-link" : "nav-link"}
                                        href="/">Profile</Link></li>
                                    <li className="nav-item col-6 px-0"><Link
                                        className={router.pathname == "/report" ? "active nav-link" : "nav-link"}
                                        href="/report">Daily Report</Link></li>
                                    <li className="nav-item col-6 px-0"><Link
                                        className={router.pathname == "/tree" ? "active nav-link" : "nav-link"}
                                        href="/tree">Member Tree</Link></li>
                                    <li className="nav-item col-6 px-0"><Link
                                        className={router.pathname == "/winloss" ? "active nav-link" : "nav-link"}
                                        href="/winloss">Simple Winloss Report</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
