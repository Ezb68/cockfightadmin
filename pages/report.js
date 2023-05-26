import { DateChoose } from "../components";
import * as axios from '../helpers/axios';
import { useEffect, useState } from 'react';

export default function Report({ Component, pageProps }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reports, setReports] = useState([]);

    async function getReports() {
        await axios.callApi('GET', '/api/auth/v1/statistic-agent', {
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
                getReports(res.data.statistics.result)
            })
    };

    useEffect(() => {
        // getReports();
        setReports(
            [
                {
                    agentId: 'string',
                    betAmount: 0,
                    validBet: 0,
                    winAmount: 0,
                    rebate: 0,
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
                            <div className="d-flex align-items-center mb-3"><span className="me-2">From</span>
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
                    <div className="highline-block py-2 px-3 mb-3">
                        <h5>VND</h5>
                    </div>
                    <div className="table-responsive mb-4">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Platform/Product</th>
                                    <th scope="col">Bet Amount</th>
                                    <th scope="col">Valid bet</th>
                                    <th scope="col">Win Amount</th>
                                    <th scope="col">Rebate</th>
                                    <th scope="col">P/L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports.map(report => {
                                        return (
                                            <tr>
                                                <td className="text-tag">{report.agentId}</td>
                                                <td>${report.betAmount}</td>
                                                <td>${report.validBet}</td>
                                                <td>${report.winAmount}</td>
                                                <td>${report.rebate}</td>
                                                <td className="text-tag">(${report.profit})</td>
                                            </tr>
                                        )
                                    })
                                }

                                <tr className="total">
                                    <td>Total</td>
                                    <td>$3,318,726.00</td>
                                    <td>$3,072,724.15</td>
                                    <td>$3,072,724.15</td>
                                    <td>$0.00</td>
                                    <td>($146,069.85)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex mb-3">
                        <div className="text-tag fw-bold fs-5">Daily Report</div>
                        <div className="border-start border-color mx-3 py-1"></div>
                        <div className="tag-item">
                            <div className="icon me-2 text-tag"><i className="fas fa-user-circle"></i></div>sonicmap
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
