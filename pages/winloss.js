import * as axios from '../helpers/axios';
import { useEffect, useState } from 'react';
import { DateChoose } from "../components";

export default function Winloss({ Component, pageProps }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [reports, setReports] = useState([]);

    async function getReports() {
        await axios.callApi('GET', '/api/auth/v1/statistic-user', {
            fromDate: "2023-05-18T09:51:44.711Z",
            toDate: "2023-05-18T09:51:44.711Z",
            pageable: {
                offset: 0,
                sort: {
                    empty: true,
                    sorted: true,
                    unsorted: true
                },
                pageNumber: 0,
                pageSize: 0,
                paged: true,
                unpaged: true
            },
            agentId: '1'
        })
            .then(res => {
                setReports(res.data.statistics.result)
            })
    };

    useEffect(() => {
        // getReports();
        setReports(
            [
                {
                    userId: 'user_id',
                    currency: 'VND',
                    betCount: 0,
                    totalBet: 0,
                    validBet: 0,
                    profit: 0
                }
            ]
        )

    }, []);

    return (
        <>
            <div className="tag-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3"><span className="me-2">Form</span>
                                <DateChoose className="form-control" selected={startDate} onChange={(date) => { setStartDate(date) }} />
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">00:00</option>
                                    <option value="1">01:00</option>
                                    <option value="2">02:00</option>
                                    <option value="3">03:00</option>
                                </select></div>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3"><span className="me-2">To</span>
                                <DateChoose className="form-control" selected={endDate} onChange={(date) => { setEndDate(date) }} />
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">00:00</option>
                                    <option value="1">01:00</option>
                                    <option value="2">02:00</option>
                                    <option value="3">03:00</option>
                                </select></div>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3"><select className="form-select me-2" aria-label="Default select example">
                                <option selected="">(GMT + 7:00)</option>
                                <option value="1">01:00</option>
                                <option value="2">02:00</option>
                                <option value="3">03:00</option>
                            </select><select className="form-select me-2" aria-label="Default select example">
                                    <option selected="">Today</option>
                                    <option value="1">Last week</option>
                                    <option value="2">This week</option>
                                    <option value="3">Yesterday</option>
                                </select><button className="btn btn-submit" type="submit">Submit</button></div>
                        </div>
                    </div>
                    <div className="highline-block py-1 px-3 mb-3">
                        <div className="d-flex align-items-center">
                            <h6>APIWALLET</h6>
                            <div className="border-start border-color mx-3 py-3"></div>
                            <div className="tag-item">
                                <div className="icon me-2 text-tag"><i className="fas fa-user-circle"></i></div>sonicmap
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive mb-4">
                        <table className="table table-bordered text-center">
                            <thead className="align-middle">
                                <tr>
                                    <th rowspan="2">User ID</th>
                                    <th rowspan="2">Currency</th>
                                    <th rowspan="2">Bet Count</th>
                                    <th rowspan="2">Total Bet</th>
                                    <th rowspan="2">Valid bet</th>
                                    <th>Agent</th>
                                    <th colspan="3">Master Agent</th>
                                    <th rowspan="2">Company</th>
                                </tr>
                                <tr>
                                    <td>P/L</td>
                                    <td>Win/Loss</td>
                                    <td>Free</td>
                                    <td>P/L</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports.map(report => {
                                        return (
                                            <tr>
                                                <td className="text-tag">{report.userId}</td>
                                                <td>{report.currency}</td>
                                                <td>{report.betCount}</td>
                                                <td>${report.totalBet}</td>
                                                <td>${report.validBet}</td>
                                                <td className="text-tag">(${report.profit})</td>
                                                <td>$0.00</td>
                                                <td>$0.00</td>
                                                <td>$0.00</td>
                                                <td>($26,916.45)</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr className="total">
                                    <td></td>
                                    <td>VND</td>
                                    <td>917</td>
                                    <td>$217,818.00</td>
                                    <td>$196,243.55</td>
                                    <td className="text-tag">($26,916.45)</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                    <td>($26,916.45)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
