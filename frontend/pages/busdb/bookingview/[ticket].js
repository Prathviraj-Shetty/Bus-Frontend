import AuthContext from '@/pages/context/AuthContext';
import stl from '@/styles/Customstyle.module.css'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useContext, useState } from 'react';



export async function getStaticPaths() {
    let data = await fetch(`http://127.0.0.1:8000/get/ticket/`)
    let res = await data.json()

    const paths = res.map((cur) => {
        return {
            params: { ticket: cur.ticketno.toString() },

        }
    })
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}
export async function getStaticProps(context) {

    const ticket = context.params.ticket
    let data = await fetch(`http://127.0.0.1:8000/getbookingdetails/${ticket}/`)
    let res = await data.json()
    console.log(res)
    return {
        props: { res },
    }
}



export default function Busview(props) {
    const [result, setResult] = useState(props.res)
    const type = result.type
    return (
        <>
            <main className={styles.main}>

                <div className={`${stl.viewbox} fadecontainer  card card-body text-dark position-absolute top-50 start-50 translate-middle mx-auto box-shadow`}>

                    <Link href={`/busdb/bookinghistory/`} className='w-100 position-absolute '><svg xmlns="http://www.w3.org/2000/svg" width="30" height="45" fill="currentColor" className="bi bi-arrow-left fw-bold" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                    </Link>
                    <div className="text-center mb-4 fs-2 fw-semibold border-bottom border-black border-2 pb-3 " style={{ color: "brown" }}>Booking Details</div>
                    <table className="mb-5 mt-2 fw-bold ">
                        <tbody>
                            <tr>
                                <td className='text-center w-50'>Ticket No</td>
                                <td>{result.ticketno}</td>
                            </tr>

                            <tr>
                                <td className='text-center w-50'>Bus Registration No</td>
                                <td>{result.regno}</td>

                            </tr>
                            <tr>
                                <td className='text-center w-50'>Bus Name</td>
                                <td>{result.busname}</td>

                            </tr>
                            <tr>
                                <td className='text-center w-50'>Starting Point</td>
                                <td>{result.route[0].start}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Destination</td>
                                <td>{result.route[0].dest}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Via</td>
                                <td>{result.route[0].via}</td>
                            </tr>

                            <tr>
                                <td className='text-center w-50'>Driver Name</td>
                                <td>{result.driver[0].name}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Booking Date</td>
                                <td>{result.bookingdate.substr(0, 10)}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Booking Time</td>
                                <td>{result.bookingdate.substr(11, 11)}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Seat No</td>
                                <td>{result.seatno}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Ticket Price (₹)</td>
                                <td>{result.amt}</td>
                            </tr>


                        </tbody>
                    </table>


                </div>

            </main>

        </>
    )
}
