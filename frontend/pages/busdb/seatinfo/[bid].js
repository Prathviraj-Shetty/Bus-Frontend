import AuthContext from '@/pages/context/AuthContext';
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import stl from '@/styles/Customstyle.module.css'


export async function getStaticPaths() {
    let data = await fetch(`http://127.0.0.1:8000/get/bus/`);
    let res = await data.json()

    const paths = res.map((cur) => {
        return {
            params: { bid: cur.id.toString() },

        }
    })
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}
export async function getStaticProps(context) {

    const bid = context.params.bid
    let data = await fetch(`http://127.0.0.1:8000/busbookingdetails/${bid}/`);
    let res = await data.json()
    console.log("RES=", res)
    return {
        props: { res },
    }
}

export default function SeatInfo(props) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const { user } = useContext(AuthContext)
    const [result, setResult] = useState(props.res);
    const [info, setInfo] = useState([]);
    const [popup, setPopup] = useState(false);

    return (
        <>
            <main className={styles.main} >
                {result.length ? <div ref={componentRef} className={`${stl.displaycard} card card-body mt-2 box-shadow position-absolute top-50 start-50 translate-middle overflow-y-scroll`}>
                    <Link href="/busdb/busbooking" className='btn py-0 px-1 position-absolute z-3  me-3 text-drak'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </Link>
                    <div className="text-center mb-5 fs-2 border-bottom border-black fw-bold text-danger border-2">Details</div>
                    <table className="fw-bold mb-4 text-center table-bordered table-responsive">
                        <thead>
                            <tr >
                                <th scope="col">SeatNo</th>
                                <th scope="col">TicketNo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Price</th>

                            </tr>
                        </thead>
                        <tbody>
                            {result && result.map((e) => {
                                return (
                                    <tr key={e.ticketno} >
                                        <td>{e.seatno}</td>
                                        <td>{e.ticketno}</td>
                                        <td>{e.person.name}</td>
                                        <td>{e.person.gender}</td>
                                        <td>{e.person.phone}</td>
                                        <td>{e.price}</td>

                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                    <button onClick={handlePrint} className={`${stl.yellowbtn} btn mx-auto`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="grey" className="bi bi-printer-fill mx-2" viewBox="0 0 16 16">
                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                        </svg>
                        Print</button>
                </div>
                    :
                    <div className={`${stl.failure} fadecontainer position-absolute top-50 start-50 translate-middle mt-4`}>
                        <Link href="/busdb/busbooking" className='btn py-0 px-1 position-absolute z-3  me-3 text-drak'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </Link>
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
