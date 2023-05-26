import Link from "next/link";
import { useRouter } from "next/router"

export default function TagLink() {
    const router = useRouter();

    return(
        <>
            <div className="tag-block d-none d-lg-block">
                <div className="tag-bg py-2">
                    <div className="container">
                        <div className="d-flex">
                            <div className="tag-item me-3">
                                <div className="icon me-2 text-highline"><i className="fas fa-user-circle"></i></div>sonicmap
                            </div>
                            <div className="tag-item me-3">
                                <div className="icon me-1 text-danger"><i className="far fa-list-alt"></i></div><span className="text-danger me-3">DEBIT:</span>100.000
                            </div>
                            <div className="tag-item me-3">
                                <div className="icon me-2 text-highline"><i className="fas fa-coins"></i></div><span className="text-highline me-3">CREDIT:</span>100.000
                            </div>
                            <div className="tag-item me-3">
                                <div className="icon me-2 text-tag"><i className="fas fa-chart-line"></i></div><span className="text-tag me-3">PROFIT:</span>100.000
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
