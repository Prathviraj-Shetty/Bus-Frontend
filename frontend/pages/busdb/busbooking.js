import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'
import { BsSearch } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';


export default function BusBooking() {

    const { user } = useContext(AuthContext)
    const [result, setResult] = useState([]);
    const [info, setInfo] = useState([]);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        dynamic()
    }, [user])

    let dynamic = async () => {

        let data = await fetch(`http://127.0.0.1:8000/busbookinglist/${user ? user.user_id : "null"}/`);
        let res = await data.json()
        setResult(res);


    }
    const handleView = async (e) => {
        setPopup(true)
        let id = e.target.value
        let data = await fetch(`http://127.0.0.1:8000/busbookingdetails/${id}/`);
        let res = await data.json()
        console.log("Res", res)
        setInfo(res);
    }

    return (
        <>
            <main className={styles.main} >
            <div className={`${stl.title} fadecontainer text-center text-white mt-5 mb-3 w-100 fs-1 fw-bold`}><span style={{ color: 'yellow' }}>Present</span> Bookings</div>
                {result.length ? 
                 <div className={`${stl.cardtable} container card card-body table-scroll box-shadow mt-3 overflow-y-scroll`}>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">Reg NO</th>
                                <th scope="col">Bus Name</th>
                                <th scope="col">Route</th>
                                <th scope="col">Bookings</th>
                                <th scope="col">Available</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {result && result.map((e) => {
                                return (
                                    <tr key={e.regno}>
                                        <th scope="row" >{e.regno}</th>
                                        <td>{e.busname}</td>
                                        <td>{e.route[0].start} - {e.route[0].dest}</td>
                                        <td>{e.count}</td>
                                        <td>{e.seat-e.count}</td>
                                        <td><button className={`${stl.blackbtn} btn btn-dark`}><Link href={`/busdb/seatinfo/${e.id}`}>View</Link></button></td>
                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>
                </div>
                :
                <div className={`${stl.failure} fadecontainer position-absolute top-50 start-50 translate-middle mt-4`}>
                <div className={`${stl.cards} card card-body mx-auto box-shadow text-center`} style={{ background: "#000000cc" }}>
                    <div className="topHalf my-5 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" fill="red" clasName="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                            <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                        </svg>
                    </div>

                    <div className=" fs-5 fw-semibold text-light mb-5">
                        No Bookings
                    </div>
                </div>
            </div>
                }
               
            </main>
        </>
    )
}
