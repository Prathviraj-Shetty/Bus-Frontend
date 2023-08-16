import stl from '@/styles/Customstyle.module.css'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import busgroup from '../../public/busgroup.jpg'
import road from '../../public/road.jpg'
import booking from '../../public/booking.jpg'

export default function UserHome() {
    let handleClick = async () => {
        let data = await fetch(`http://127.0.0.1:8000/getuser`)
        console.log(await data.json())
    }
    return (
        <>
            <main className={styles.main}>
                <div className={`container d-flex align-items-center justify-content-center flex-wrap`}>
                    <div className={`${stl.title} text-center text-white mt-5 rubberband w-100 fs-1 fw-bold`}><span style={{ color: 'yellow' }}> Enjoy </span>Your Journey
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="yellow" className="bi bi-bus-front ms-2" viewBox="0 0 16 16" >
                            <path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9c1.876 0 3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44.303 44.303 0 0 0 8 4Zm0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44.304 44.304 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43.306 43.306 0 0 0 8 3Z" />
                            <path d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A43.61 43.61 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2V8ZM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A42.611 42.611 0 0 1 8 1Z" />
                        </svg>
                    </div>
                    <div className="box text-center">
                        <div className="body">
                            <div className="imgContainer">
                                <Image src={busgroup} alt="" priority={true} />
                            </div>
                            <div className="content d-flex flex-column align-items-center justify-content-center">
                                <div>
                                    <h3 className="text-black fs-5">Special Buses</h3>
                                    <p className="fs-6 text-white">Check out your favourite buses to enjoy every moment of travelling</p>
                                    <Link href="/busdb/searchbus" className="btn btn-dark text-warning fw-semibold mt-3 px-5">Lets Go</Link>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="box text-center">
                        <div className="body">
                            <div className="imgContainer">
                                <Image src={road} alt="" priority={true} />
                            </div>
                            <div className="content d-flex flex-column align-items-center justify-content-center">
                                <div>
                                    <h3 className="text-black fs-5">Adventureuos Routes</h3>
                                    <p className="fs-6 text-white">Try exploring the most Adventureuos and Beautiful paths and enjoy the vibe of travelling</p>
                                    <Link href="/busdb/searchroute" className="btn btn-dark text-warning fw-semibold mt-3 px-5">Explore</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box text-center">
                        <div className="body">
                            <div className="imgContainer">
                                <Image src={booking} alt="" priority={true} />
                            </div>
                            <div className="content d-flex flex-column align-items-center justify-content-center">
                                <div>
                                    <h3 className="text-black fs-5">Bookings</h3>
                                    <p className="fs-6 text-white">Checkout your latest travel history</p>
                                    <Link href="/busdb/bookinghistory" className="btn btn-dark text-warning fw-semibold mt-3 px-5">Check</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}