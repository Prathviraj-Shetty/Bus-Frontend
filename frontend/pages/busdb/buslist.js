import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'
import { BsSearch } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';


export default function BusList() {

    const { user } = useContext(AuthContext)
    const [result, setResult] = useState([]);
    const [msg, setMsg] = useState(0);

    useEffect(() => {
        dynamic()
    }, [user])

    let dynamic = async () => {

        let data = await fetch(`http://127.0.0.1:8000/getbuslist/${user ? user.user_id : "null"}/`);
        let res = await data.json()
        setResult(res);

    }

    let handleRemove = async (e) => {

        let data = await fetch(`http://127.0.0.1:8000/deletebus/${e.target.value}/`);
    }
    return (
        <>

            <main className={styles.main} >
                <div className={`${stl.title}  text-center text-white mt-5 mb-3 w-100 fs-1 fw-bold`}><span style={{ color: 'yellow' }}> Registered </span>Buses</div>
                {result.length ? <><div className={`${stl.cardtable} container fadecontainer card card-body table-scroll box-shadow overflow-y-scroll`}>
                    <table className="table mb-0 table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Reg No</th>
                                <th scope="col">Bus Name</th>
                                <th scope="col">Route</th>
                                <th scope="col" className='text-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#26f126" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8" />
                                    </svg>
                                    <pre className='d-inline'>  </pre>Reached
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {result && result.map((e) => {
                                return (
                                    <tr key={e.regno} >
                                        <td scope="row" >{e.regno}</td>
                                        <th>{e.busname}</th>
                                        <td>{e.route[0].start}-{e.route[0].dest}</td>
                                        <td className={e.reached ? "bg-green text-center":"text-center"}>
                                            {/* {e.reached&&<Link href={`/busdb/busview/${e.id}`} className={`${stl.greenbtn} btn `}>Reach</Link>} */}
                                            <Link href={`/busdb/busview/${e.id}`} className={`${stl.blackbtn} btn `}>View</Link>
                                            <button className={`${stl.redbtn} btn  ms-2`} value={e.id} onClick={handleRemove}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                </svg>
                                            </button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                    <div className="submit mt-3 text-center"><Link href='/busdb/bus' className={`${stl.yellowbtn} btn mx-auto`}>Add +</Link></div>
                </>
                    :
                    <div className={`${stl.failure} fadecontainer position-absolute top-50 start-50 translate-middle mt-4`}>
                        <div className={`${stl.cards} card card-body mx-auto box-shadow text-center`} style={{ background: "#000000cc" }}>
                            <div className="topHalf my-5 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" fill="red" clasName="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                </svg>
                            </div>

                            <div className=" fs-5 fw-semibold text-light mb-5">
                                Sorry you haven&apos;t registered your Buses
                            </div>
                            <Link href='/busdb/bus' className={`${stl.yellowbtn} btn `} >Click here to Register</Link>
                        </div>
                    </div>
                }
            </main>
        </>
    )
}
