import { DateChoose } from "../components";
import * as axios from '../utills/axios';
import { useEffect, useState } from 'react';
import moment from "moment/moment";
import {useStoreState} from "@/store/account";
import {money} from "@/utills/filters";
import {useNotify} from "@/utills/useNotify";

export default function Report({ Component, pageProps }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('today');
    const [reports, setReports] = useState({result: [], total: 0});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    
    const info = useStoreState('info');
    const user = useStoreState('detail');
    
    async function getReports() {
        
        await axios.callApi('GET', 'admin/v1/statistic-agent',{
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
                            <div className="d-flex align-items-center mb-3"><span className="me-2">From</span>
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
                                {/*<button className="btn btn-submit" type="submit" onChange={() => setSelectedDate(selectedDate)}>Submit</button>*/}
                            </div>
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
                                    reports?.result.length > 0 ? reports.result.map(report => {
                                        return (
                                            <tr>
                                                <td className="text-tag">{report.agentId}</td>
                                                <td>${money(report?.betAmount)}</td>
                                                <td>${money(report?.validBet)}</td>
                                                <td>${money(report?.winAmount)}</td>
                                                <td>${money(report.rebate)}</td>
                                                <td className="text-tag">(${money(report.profit)})</td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr>
                                            <td>Data not found</td>
                                        </tr>
                                    )
                                }

                                {
                                    reports?.result.length > 0 ? (
                                        <tr className="total">
                                            <td>Total</td>
                                            <td>${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.betAmount;
                                            }, 0))}</td>
                                            <td>${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.validBet;
                                            }, 0))}</td>
                                            <td>${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.winAmount;
                                            }, 0))}</td>
                                            <td>${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.rebate;
                                            }, 0))}</td>
                                            <td className="text-tag"> ${money(reports?.result.reduce((sum, item) => {
                                                return sum + item.profit;
                                            }, 0))}</td>
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
                    {/*<div className="d-flex mb-3">*/}
                    {/*    <div className="text-tag fw-bold fs-5">Daily Report</div>*/}
                    {/*    <div className="border-start border-color mx-3 py-1"></div>*/}
                    {/*    <div className="tag-item">*/}
                    {/*        <div className="icon me-2 text-tag"><i className="fas fa-user-circle"></i></div>*/}
                    {/*        {info.userName}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    )
}
