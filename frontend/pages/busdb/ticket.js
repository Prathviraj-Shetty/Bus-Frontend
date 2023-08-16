import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

export async function getStaticProps(context) {
    let data = await fetch(`http://127.0.0.1:8000/ticket/`);

    let res = await data.json();
    console.log(res)
    return {
        props: { res }, // will be passed to the page component as props
    }

}


export default function Ticket(props) {


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [result, setResult] = useState(props.res)
    console.log(result)
    return (

        <>
            <main className={styles.maindark}>
                <div className='text-light ms-4 mt-5 z-3 fs-5'>
                    <Link href={`/busdb/userhome/`} className='fw-semibold'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                        </svg>
                    </Link>
                </div>
                <div className="mt-5 w-100">
                    <div ref={componentRef} className="card card body position-relative top-5 mx-auto w-75 border rounded-3 overflow-hidden ticket-bg text-center">
                        <div className="ticket-header mb-4 fs-4 gradient-bg text-start ps-3" ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bus-front" viewBox="0 0 16 16">
                            <path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9c1.876 0 3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44.303 44.303 0 0 0 8 4Zm0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44.304 44.304 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43.306 43.306 0 0 0 8 3Z" />
                            <path d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A43.61 43.61 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2V8ZM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A42.611 42.611 0 0 1 8 1Z" />
                        </svg>Bus Ticket</div>
                        <div className="ticket-id bg-dark text-start text-light w-50 mb-5 mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" className="bi bi-upc me-4" viewBox="0 0 16 16">
                            <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                        </svg>{result.ticketno}</div>
                        <div className="row ps-2">
                            <div className="col-12 col-md-6 col-sm-8 my-2 d-flex justify-content-between">
                                <label className="text-start" htmlFor="bus_name">Bus Name</label>
                                <input type="text" className='mx-3 border rounded-2 border-dark text-center' name="bus_name" id="bus_name" value={result.busname} readOnly />
                            </div>
                            <div className="col-12 col-md-6 col-sm-8 my-2 d-flex justify-content-between">
                                <label className="text-start" htmlFor="seatno">Seat No</label>
                                <input type="text" className='mx-3 border rounded-2 border-dark text-center' name="seatno" id="seatno" value={result.seatno} readOnly />
                            </div>
                            <div className="col-12 col-md-6 col-sm-8 my-2 d-flex justify-content-between">
                                <label className="text-start" htmlFor="regno">Reg No</label>
                                <input type="text" className='mx-3 border rounded-2 border-dark text-center' name="regno" id="regno" value={result.regno} readOnly />
                            </div>
                            <div className="col-12 col-md-6 col-sm-8 my-2 d-flex justify-content-between">
                                <label className="text-start" htmlFor="price">Price(₹)</label>
                                <input type="text" className='mx-3 border rounded-2 border-dark text-center' name="price" id="price" value={result.amt} readOnly />
                            </div>
                            <div className="col-12 col-md-6 col-sm-8 my-2 d-flex justify-content-between">
                                <label className="text-start" htmlFor="start">Boarding Point</label>
                                <input type="text" className='mx-3 border rounded-2 border-dark text-center' name="start" id="start" value={result.route[0].start} readOnly />
                            </div>
                            <div className="col-12 col-md-6 col-sm-8 my-2 d-flex justify-content-between">
                                <label className="text-start" htmlFor="dest">Destination</label>
                                <input type="text" className='mx-3 border rounded-2 border-dark text-center' name="dest" id="dest" value={result.route[0].dest} readOnly />
                            </div>
                            <div className="ticket-footer gradient-bg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-globe-central-south-asia" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM4.882 1.731a.482.482 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.721.721 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a.996.996 0 0 0-.462-.04 7.03 7.03 0 0 1 2.45-2.027Zm-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.78.78 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.454.454 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282a.61.61 0 0 0 .04-.001 7.003 7.003 0 0 1-12.658.905Z" />
                            </svg></div>
                        </div>


                    </div>
                    <div className="col-12 px-1 mb-2 text-center mt-5">
                        <input type="button" value="Print" onClick={handlePrint} className='btn btn-warning  mx-auto' />
                    </div>
                </div>
            </main>


        </>
    )
}