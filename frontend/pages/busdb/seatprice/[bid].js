import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import stl from '@/styles/Customstyle.module.css'
import { useRouter } from 'next/router';


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
    let data = await fetch(`http://127.0.0.1:8000/seatdetails/${bid}/`);
    let res = await data.json()
    console.log(res)
    return {
        props: { res },
    }
}

export default function SeatPrice(props) {
    const [result, setResult] = useState(props.res)
    const [seatno, setSeatno] = useState(false)
    const [modal, setModal] = useState(false)
    const [curPrice, setcurPrice] = useState(false)
    const [defPrice, setdefPrice] = useState(100)
    const [msg, setMsg] = useState(false);
    const len = Object.keys(props.res).length
    const [style, setStyle] = useState("seat1 my-1")
    const nav=useRouter()


    useEffect(() => {
        dynamic()
    }, [modal, msg])

    let dynamic = async () => {
        let data = await fetch(`http://127.0.0.1:8000/seatdetails/${result[0].bus}/`);
        let res = await data.json()
        setResult(res);

    }
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    let handleclick = async (e) => {
        setModal(true)
        setSeatno(e.target.value)
        let seat = e.target.value
        setcurPrice(result.find((e) => e.seatno == seat).price)

    }

    let handleDefaultPrice = async (e) => {
        console.log(defPrice)
        let response = await fetch(`http://127.0.0.1:8000/setSeatPrice/${result[0].bus}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'seatno': "all", 'price': defPrice })
        })
        setMsg(true)
    }

    let handleFinish= async (e) => {
        setMsg(true)
        await timeout(3000)
        nav.push(`/busdb/adminhome`)
    }
    
    let handlePrice = async (e) => {
        e.preventDefault()
        setModal(false)
        let price = e.target.price.value
        console.log("Price", price)
        let response = await fetch(`http://127.0.0.1:8000/setSeatPrice/${result[0].bus}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'seatno': seatno, 'price': price })

        })
    }

    return (
        <>
            <main className={styles.maindark}>
                <div className='position-absolute z-1 w-100'>
                    {msg ? <div className={`${stl.popupbox} bg-success box-shadow d-flex justify-content-between py-2 px-3 fw-semibold left-2 mt-5 mx-auto text-center text-white`}><span>Price Set Successfully</span>
                        <button className='btn btn-danger py-0 px-1' onClick={() => { setMsg(false) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                        </button></div> : <div></div>}
                </div>
                <div className='position-absolute z-2 top-50 start-50 translate-middle w-100'>
                    {modal ? <div className={`${stl.popupbox} card card-body mx-auto border border-dark border-2 box-shadow text-center`}>
                        <div className="text-end">
                            <button className='btn ms-2 py-0 px-1' onClick={() => { setModal(false) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                            </button></div>
                        <div className="fs-3 fw-semibold  mb-3">Seat Pricing
                        </div>
                        <form onSubmit={handlePrice}>
                            <div className="my-3"><input type="number" className='border rounded-2 border-dark text-center py-1' name="price" defaultValue={curPrice} /></div>
                            <button type='submit' className='btn p-1  my-3 btn-danger border border-dark border-2 mx-5 fw-semibold'>Go</button>
                        </form>
                    </div> : <></>}

                </div>
                <div className={`${stl.viewbox} card card-body mx-auto mt-5  box-shadow`}>
                    <div className="text-center mb-4 fs-2 ">Set Seat Price</div>
                    <div className="row justify-content-center">
                        <div className="col-5">
                            <div className="row mx-auto">
                                <div className="col-3 p-0 mx-2">
                                    {result.slice(0, 6).map((e) => {
                                        return (
                                            <button onClick={handleclick} key={e.id} value={e.seatno} className="seat1  my-1">{e.seatno}</button>
                                        );
                                    })}
                                </div>
                                {len > 6 ? <div className="col-3 mx-2">
                                    {result.slice(6, 12).map((e) => {
                                        return (
                                            <button onClick={handleclick} key={e.id} value={e.seatno} className="seat1  my-1">{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                            </div>
                        </div>
                        <div className="col-6 p-0">
                            <div className="row">
                                {len > 12 ? <div className="col-2 col-lg-3 col-xl-2 mx-2">
                                    {result.slice(12, 18).map((e) => {
                                        return (
                                            <button onClick={handleclick} key={e.id} value={e.seatno} className="seat1  my-1">{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                                {len > 18 ? <div className="col-2 col-lg-3 col-xl-2 mx-2">
                                    {result.slice(18, 24).map((e) => {
                                        return (
                                            <button onClick={handleclick} key={e.id} value={e.seatno} className="seat1  my-1">{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                                {len > 24 ? <div className="col-2 col-lg-3 col-xl-2 mx-2">
                                    {result.slice(24, 32).map((e) => {
                                        return (
                                            <button onClick={handleclick} key={e.id} value={e.seatno} className="seat1  my-1">{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${stl.viewbox} card card-body mx-auto mt-3  box-shadow`}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-10 text-center ">
                            <form>
                                <label htmlFor="price" className='me-3 fw-bold' >Default  (₹):   </label>
                                <input type="text" name="price" id="price" onChange={(e) => { setdefPrice(e.target.value) }} defaultValue={defPrice} /></form>
                        </div>
                        <div className={`${stl.btnmargin} col-lg-4 col-8 d-flex justify-content-center`}>
                            <button className={`${stl.yellowbtn} btn me-2`} onClick={handleDefaultPrice}>Apply</button>
                            <button className={`${stl.redbtn} btn `} onClick={handleFinish}>Finish</button>
                        </div>

                    </div>
                </div>


            </main >
        </>
    )
}