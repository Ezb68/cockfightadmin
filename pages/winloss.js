import * as axios from '../utills/axios';
import { useEffect, useState } from 'react';
import { DateChoose } from "../components";
import {useStoreState} from "@/store/account";
import moment from "moment";
import {money} from "@/utills/filters";
import {useNotify} from "@/utills/useNotify";

export default function Winloss({ Component, pageProps }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [selectedDate, setSelectedDate] = useState('today');
    const [reports, setReports] = useState({result: [], totalPage: 1});
    
    const info = useStoreState('info');
    const user = useStoreState('detail');
    
    async function getReports() {
        
        await axios.callApi('GET', 'admin/v1/statistic-user',{
            "fromDate": moment(startDate, 'YYYY-MM-DD').startOf('day').toDate(),
            "toDate": moment(endDate, 'YYYY-MM-DD').startOf('day').toDate(),
            "agentId": user.preferred_username,
            "page": page,
            "size": pageSize
        })
        .then(res => {
            let { code, data, message } = res
            if(code === 0) {
                setReports(data.statistics)
            }
        })
        .catch(e => {
            useNotify('error', e.message)
    
        })
    };
    
    function handleSelectedDate(data){
        setSelectedDate(data)
        switch (data) {
            case 'Today': {
                setStartDate(moment().toDate())
                setEndDate(moment().toDate())
                break
            }
            case 'Last week': {
                setStartDate(moment().startOf('week').toDate())
                setEndDate(moment().endOf('week').toDate())
                break
            }
            case 'Last month': {
                setStartDate(moment().startOf('month').toDate())
                setEndDate(moment().endOf('month').toDate())
                break
            }
        }
    }
    useEffect(() => {
        getReports();
    }, [startDate, endDate, page]);

    return (
        <>
            <div className="tag-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3"><span className="me-2">Form</span>
                                <DateChoose className="form-control" selected={startDate} onChange={(date) => { setStartDate(date) }} />
                                {/*<select className="form-select" aria-label="Default select example">*/}
                                {/*    <option selected="">00:00</option>*/}
                                {/*    <option value="1">01:00</option>*/}
                                {/*    <option value="2">02:00</option>*/}
                                {/*    <option value="3">03:00</option>*/}
                                {/*</select>*/}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3"><span className="me-2">To</span>
                                <DateChoose className="form-control" selected={endDate} onChange={(date) => { setEndDate(date) }} />
                                {/*<select className="form-select" aria-label="Default select example">*/}
                                {/*    <option selected="">00:00</option>*/}
                                {/*    <option value="1">01:00</option>*/}
                                {/*    <option value="2">02:00</option>*/}
                                {/*    <option value="3">03:00</option>*/}
                                {/*</select>*/}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3">
                            {/*    <select className="form-select me-2" aria-label="Default select example">*/}
                            {/*    <option selected="">(GMT + 7:00)</option>*/}
                            {/*    <option value="1">01:00</option>*/}
                            {/*    <option value="2">02:00</option>*/}
                            {/*    <option value="3">03:00</option>*/}
                            {/*</select>*/}
                                <select value={selectedDate}
                                        onChange={(e) => { handleSelectedDate(e.target.value); }} className="form-select me-2" aria-label="Default select example">
                                    <option value="Today">Today</option>
                                    {/*<option value="Yesterday">Yesterday</option>*/}
                                    <option value="Last week">Last week</option>
                                    <option value="Last month">Last month</option>
                                </select>
                                {/*<button className="btn btn-submit" type="submit">Submit</button>*/}
                            </div>
                        </div>
                    </div>
                    {/*<div className="highline-block py-1 px-3 mb-3">*/}
                    {/*    <div className="d-flex align-items-center">*/}
                    {/*        <h6>APIWALLET</h6>*/}
                    {/*        <div className="border-start border-color mx-3 py-3"></div>*/}
                    {/*        <div className="tag-item">*/}
                    {/*            <div className="icon me-2 text-tag"><i className="fas fa-user-circle"></i></div>sonicmap*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
                                    reports?.result.length > 0 ? reports.result.map(report => {
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
                                                <td>$0.00</td>
                                            </tr>
                                        )
                                    }): (
                                        <tr>
                                            <td>Data not found</td>
                                        </tr>
                                    )
                                }
                                {
                                    reports?.result.length > 0 ? (
                                        <tr className="total">
                                            <td>Total</td>
                                            <td>VND</td>
                                            <td>${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.betCount;
                                            }, 0))}</td>
                                            <td>${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.totalBet;
                                            }, 0))}</td>
                                            <td>${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.validBet;
                                            }, 0))}</td>
                                            <td className="text-tag"> ${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.profit;
                                            }, 0))}</td>
                                            <td>$0.00</td>
                                            <td>$0.00</td>
                                            <td>$0.00</td>
                                            <td>$0.00</td>
                                        </tr>
                                    ) : (
                                        <tr>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="btn-toolbar pb-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mx-auto" role="group" aria-label="First group">
                            {
                                page > 1 && page <= reports?.totalPage ? (
                                    <button className="btn btn-light" type="button" onClick={() => setPage(page-1)}><i
                                        className="fas fa-caret-left"></i></button>
                                ) : ''
                            }
            
                            <button className="btn btn-danger" type="button">{page}</button>
                            {
                                page >= 1 && page < reports?.totalPage ? (
                                    <button className="btn btn-light" type="button" onClick={() => setPage(page+1)}><i
                                        className="fas fa-caret-right"></i></button>
                                ) : ''
                            }
        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
