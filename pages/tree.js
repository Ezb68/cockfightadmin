import * as axios from '../utills/axios';
import {useEffect, useState} from 'react';
import {useStoreState} from "@/store/account";
import moment from "moment";
import {useNotify} from "@/utills/useNotify";
import {useSweetAlert} from "@/utills/useSweetAlert2";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { parseString } from 'xml2js';
import {getCookie} from "cookies-next";


export default function Tree({Component, pageProps}) {
    const [users, setUsers] = useState({result: [], totalPage: 1});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('today');
    
    const info = useStoreState('info');
    const user = useStoreState('detail');
    
    
    async function getUsers() {
        await axios.callApi('GET', 'admin/v1/users', {
            "agentId": user.preferred_username,
            "page": page,
            "size": pageSize
        })
        .then(res => {
            let {code, data, message} = res
            if (code === 0) {
                setUsers(data.users)
            }
        })
        .catch(e => {
            useNotify('error', e.message)
            
        })
    };
    
    async function exportUsers() {
        await axios.callApi('GET', 'admin/v1/export-user', {
            "agentId": user.preferred_username,
            "page": page,
            "size": pageSize
        },{},'blob')
        .then(async res => {
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            // const url = window.URL.createObjectURL(new Blob([res],
            //     { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            //
            // window.open(url)
            saveAs(blob, `list-user-${moment().unix()}.xlsx`);
           
        })
        .catch(e => {
            useNotify('error', e.message)

        })
    };
    
    function showModal(data){
        return useSweetAlert().fire({
            title: data.title,
            text: data.message,
        })
    }
    
    useEffect(() => {
        getUsers();
    }, [page]);
    
    return (
        <>
            <div className="tag-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center mb-3"><span className="me-2">Search:</span>
                                <input className="form-control me-2" type="text" placeholder="Input user ID "/>
                            </div>
                        </div>
                        {/*<div className="col-lg-4">*/}
                        {/*    <div className="d-flex align-items-center mb-3">*/}
                        {/*        <select className="form-select me-3" aria-label="Default select example">*/}
                        {/*            <option selected="">Internal / Member</option>*/}
                        {/*            <option value="1">01:00</option>*/}
                        {/*        </select>*/}
                        {/*        <select className="form-select" aria-label="Default select example">*/}
                        {/*            <option selected="">Status</option>*/}
                        {/*            <option value="1">01:00</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center mb-3 justify-content-center">
                                <button className="btn btn-submit me-4" type="submit">Submit</button>
                                <button className="btn btn-submit" type="button" onClick={exportUsers}>Export</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive mb-4">
                        <table className="table table-bordered text-center">
                            <thead>
                            <tr>
                                <th scope="col">User ID</th>
                                <th scope="col">Prefix</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">View</th>
                                <th scope="col">Currency</th>
                                <th scope="col">Wallet Type</th>
                                <th scope="col">Cert</th>
                                <th scope="col">Login Failure</th>
                                <th scope="col">Password Lock</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users?.result.length > 0 ? users.result.map(user => {
                                    return (
                                        <tr className="align-middle">
                                            <td>
                                                <div className="btn btn-submit py-0 px-1 lh-1 me-2">{user.prefix}</div>
                                                {user.userId}
                                            </td>
                                            <td>{user.prefix}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                {
                                                    user.status === 'ACTIVE' ? (
                                                        <div className="btn btn-success">{user.status}</div>) : (
                                                        <div className="btn btn-danger">{user.status}</div>)
                                                }
                                            </td>
                                            <td>
                                                <div className="btn btn-success">View</div>
                                            </td>
                                            <td>{user.currency}</td>
                                            <td>{user.walletType}</td>
                                            <td>{user.cert}</td>
                                            <td>{user.loginFailure}</td>
                                            <td>
                                                {
                                                    user.status === 'LOCK' ? (
                                                        <i className="fa-solid fa-lock text-warning" ></i>
                                                    ) : (
                                                        <button className="btn" onClick={() => showModal({message: user.password})}>
                                                            <i className="fa-solid fa-unlock text-success" ></i>
                                                        </button>
                                                    )
                                                }
                                                
                                                
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td>Data not found</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="btn-toolbar pb-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mx-auto" role="group" aria-label="First group">
                            {
                                page > 1 && page <= users?.totalPage ? (
                                    <button className="btn btn-light" type="button" onClick={() => setPage(page-1)}><i
                                        className="fas fa-caret-left"></i></button>
                                ) : ''
                            }
                            
                            <button className="btn btn-danger" type="button">{page}</button>
                            {
                                page >= 1 && page < users?.totalPage ? (
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
