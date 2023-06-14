import Link from "next/link";
import { useRouter } from "next/router"
import {dispatch, useStoreState} from "@/store/account";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUserCircle, faListAlt, faCoins, faChartLine } from '@fortawesome/free-solid-svg-icons'
export default function Menu() {
    const router = useRouter();
    const user = useStoreState('detail');

    return(
        <>
            <div className="tag-block d-none d-lg-block">
                <div className="tag-bg py-2">
                    <div className="container">
                        <div className="d-flex">
                            <div className="tag-item me-3">
                                <div className="icon me-2 text-highline">
                                    <FontAwesomeIcon className="" icon={faUserCircle}/>
                                </div>
                                {user?.name}
                            </div>
                            
                            <div className="tag-item me-3">
                                <div className="icon me-1 text-danger"><FontAwesomeIcon className="" icon={faListAlt}/></div><span className="text-danger me-3">DEBIT:</span>0
                            </div>
                            <div className="tag-item me-3">
                                <div className="icon me-2 text-highline"><FontAwesomeIcon className="" icon={faCoins}/></div><span className="text-highline me-3">CREDIT:</span>0
                            </div>
                            <div className="tag-item me-3">
                                <div className="icon me-2 text-tag"><FontAwesomeIcon className="" icon={faChartLine}/></div><span className="text-tag me-3">PROFIT:</span>0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tag-block d-none d-lg-block mb-4">
                <div className="tag-bg">
                    <div className="container">
                        <ul className="nav nav-pills">
                            <li className="nav-item"><Link className={router.pathname == "/" ? "active nav-link" : "nav-link"} href="/">Profile</Link></li>
                            <li className="nav-item"><Link className={router.pathname == "/report" ? "active nav-link" : "nav-link"} href="/report">Daily Report</Link></li>
                            <li className="nav-item"><Link className={router.pathname == "/tree" ? "active nav-link" : "nav-link"} href="/tree">Member Tree</Link></li>
                            <li className="nav-item"><Link className={router.pathname == "/winloss" ? "active nav-link" : "nav-link"} href="/winloss">Simple Winloss Report</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
