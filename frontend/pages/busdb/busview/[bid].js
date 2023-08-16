import AuthContext from '@/pages/context/AuthContext';
import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';



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
    let data = await fetch(`http://127.0.0.1:8000/getbusdetails/${bid}/`);
    let res = await data.json()

    return {
        props: { res },
    }
}



export default function Busview(props) {
    const [result, setResult] = useState(props.res)
    const [status, setStatus] = useState("True")
    const [admin, setAdmin] = useState(false)
    const type = result.type


    const { user } = useContext(AuthContext)

    useEffect(() => {
        statusCheck();
    }, [result])

    const statusCheck = async () => {
        let data1 = await fetch(`http://127.0.0.1:8000/isregistered/${user ? user.username : "None"}/`);
        let res1 = await data1.json()
        setStatus(res1.regstatus)
        let data2 = await fetch(`http://127.0.0.1:8000/usertype/${user ?user.username:"None"}`)
        let res2 = await data2.json()
        if(res2.type=="Admin")
            setAdmin(true)

    }
    return (
        <>
            <main className={styles.main}>

                <div className={`${stl.viewbox} card card-body box-shadow position-absolute top-50 mt-4  start-50 translate-middle`}>
                <Link href={admin?`/busdb/buslist`:`/busdb/searchbus/`} className='btn py-0 px-1 position-absolute z-3  me-3 text-drak'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </Link>
                    <div className="text-center mb-4 fs-2 fw-semibold border-bottom border-danger border-2">Bus Details</div>
                    <table className=" fw-bold ">
                        <tbody>
                            <tr>
                                <td className='text-center w-50'>Registration No</td>
                                <td>{result.regno}</td>

                            </tr>
                            <tr>
                                <td className='text-center w-50'>Operator Name</td>
                                <td>{result.opname}</td>

                            </tr>
                            <tr>
                                <td className='text-center w-50'>Type</td>
                                <td>{result.type == "SM" && "SemiSleeper"}{result.type == "SL" && "Sleeper"}{result.type == "SE" && "Seater"}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Images</td>
                                <td><Link href={`/busdb/gallery/${result.id}`} className='btn btn-link'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="blue" className="bi bi-images" viewBox="0 0 16 16">
                                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                                </svg></Link></td>

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
                                <td className='text-center w-50'>Driver Experience</td>
                                <td>{result.driver[0].experience}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Mobile No</td>
                                <td>{result.driver[0].phone}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Departure</td>
                                <td>{result.route[0].starttime.slice(0,10)}  {result.route[0].starttime.slice(11,19)}</td>
                            </tr>
                            <tr>
                                <td className='text-center w-50'>Expected Reach</td>
                                <td>{result.route[0].reachtime.slice(0,10)}  {result.route[0].reachtime.slice(11,19)}</td>
                            </tr>


                        </tbody>
                    </table>
                    {!admin && <Link href={status == "Yes" ? `/busdb/seater/${result.id}` : `/busdb/failure`}><button className={`${stl.redbtn} btn fw-semibold w-100 mt-5 `}>Book</button></Link>}

                    {admin && <div className='d-flex justify-content-center '><Link href={`/busdb/driver/${result.id}`} className={`${stl.blackredbtn} btn mt-3 text-white fw-semibold`}>Update Details</Link>{result.reached &&<Link href={`/busdb/swaproute/${result.id}`} className={`${stl.blackredbtn} btn mt-3 ms-1 text-white fw-semibold`}>Swap Route</Link>}</div>}
                </div>

            </main>

        </>
    )
}
