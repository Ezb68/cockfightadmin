import * as axios from '../helpers/axios';
import { useEffect, useState } from 'react';

export default function Tree({ Component, pageProps }) {
    const [users, setUsers] = useState([]);

    async function getUsers() {
        await axios.callApi('GET', '/api/auth/v1/users', {
            agentId: '',
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

            }
        })
            .then(res => {
                setUsers(res.data.users.result)
            })
    };

    useEffect(() => {
        // getUsers();
        setUsers(
            [
                {
                    userId: 'user_id',
                    prefix: 'string',
                    username: 'string',
                    status: 'LOCK',
                    currency: 'VND',
                    walletType: 'string',
                    cert: 'string',
                    loginFailure: 0,
                    password: 'string'
                }
            ]
        )

    }, []);

    return (
        <>
            <div className="tag-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center mb-3"><span className="me-2">Search:</span><input className="form-control me-2" type="text" placeholder="Input user ID " /></div>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3">
                                <select className="form-select me-3" aria-label="Default select example">
                                    <option selected="">Internal / Member</option>
                                    <option value="1">01:00</option>
                                </select>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Status</option>
                                    <option value="1">01:00</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center mb-3 justify-content-center"><button className="btn btn-submit me-4" type="submit">Submit</button><button className="btn btn-submit" type="button">Export</button></div>
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
                                    users.map(user => {
                                        return (
                                            <tr className="align-middle">
                                                <td>
                                                    <div className="btn btn-submit py-0 px-1 lh-1 me-2">AG</div>{user.userId}
                                                </td>
                                                <td>{user.prefix}</td>
                                                <td>{user.username}</td>
                                                <td>
                                                    <div className="btn btn-success">{user.status}</div>
                                                </td>
                                                <td>
                                                    <div className="btn btn-danger">View</div>
                                                </td>
                                                <td>{user.currency}</td>
                                                <td>{user.walletType}</td>
                                                <td>{user.cert}</td>
                                                <td>{user.loginFailure}</td>
                                                <td><i className="fa-solid fa-unlock text-success"></i></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
