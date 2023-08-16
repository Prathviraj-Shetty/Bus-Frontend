import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
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
        fallback: false, 
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



export default function Seater(props) {
    const [price, setPrice] = useState(0);
    const [result, setResult] = useState(props.res)
    const [modal, setModal] = useState(false)
    const [mode, setMode] = useState(false)
    const [cancelbtn, setCancelbtn] = useState(false)
    const [curPrice, setcurPrice] = useState(0)
    const [seatno, setSeatno] = useState(0)
    const len = Object.keys(props.res).length
    const [style, setStyle] = useState("seat1 my-1");
    const { user } = useContext(AuthContext)
    const nav = useRouter()

    let handleclick = async (e) => {

        if (e.target.className == "seat1  my-1") {
            console.log(parseInt(e.target.value))
            setPrice(price + parseInt(e.target.value));
            e.target.className = "seat2  my-1"
            setMode(true)
            setSeatno(e.target.id)
            setCancelbtn(true)
        }
        else {
            e.target.className = "seat1  my-1"
            setMode(false)
            setPrice(price - parseInt(e.target.value));
            e.target.disabled = false

        }

    }

    let displayPrice = (e) => {
        setModal(true)
        setSeatno(e.target.key)
        let seat = e.target.id
        setcurPrice(result.find((e) => e.seatno == seat).price)

    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        if(e.target.price.value==0)
            return
        let data = { "bid": result[0].bus, "seatno": seatno, "price": e.target.price.value }
        console.log(data, result[0].bus)
        let response = await fetch(`http://127.0.0.1:8000/bookseat/${user.user_id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let res = await response.json()
        console.log(res)
        nav.push(`/busdb/ticket/`)
    }

    return (
        <>
            <main className={styles.maindark}>
                <div className='position-absolute z-2 start-50 mt-5 translate-middle w-100'>
                    {modal ? <div className={`${stl.popupbox} card card-body mx-auto border border-dark border-2 box-shadow text-center`}>

                        <div className="fs-3 fw-semibold text-danger">Seat Price
                        </div>

                        <div className="my-1"><input type="text" className='border rounded-2 border-dark text-center py-1' name="price" defaultValue={curPrice} readOnly /></div>
                        {cancelbtn&&<button className={`${stl.blackbtn} px-2 mx-auto`} onClick={() =>{ setMode(false); setCancelbtn(false)}}>Cancel</button>}
                    </div>
                        : <></>}

                </div>
                <div className={`${stl.viewbox} card card-body mx-auto mt-5 box-shadow`}>
                    <div className="text-center mb-4 fs-2 ">Seating Arrangement</div>
                    <div className="row justify-content-center">
                        <div className="col-5">
                            <div className="row mx-auto">
                                <div className="col-3 p-0 mx-2">
                                    {result.slice(0, 6).map((e) => {
                                        return (
                                            e.seat == 'A' ? <button onClick={handleclick} key={e.seatno} id={e.seatno} value={e.price} onMouseOver={displayPrice} onMouseLeave={() => { setModal(false) }} className="seat1  my-1" disabled={mode}>{e.seatno}</button> :
                                                <button key={e.seatno} id={e.seatno} value={e.price} className="seat2  my-1" disabled>{e.seatno}</button>
                                        );
                                    })}
                                </div>
                                {len > 6 ? <div className="col-3 mx-2">
                                    {result.slice(6, 12).map((e) => {
                                        return (
                                            e.seat == 'A' ? <button onClick={handleclick} key={e.seatno} id={e.seatno} value={e.price} onMouseOver={displayPrice} onMouseLeave={() => { setModal(false) }} className="seat1  my-1" disabled={mode}>{e.seatno}</button> :
                                                <button key={e.seatno} id={e.seatno} value={e.price} className="seat2  my-1" disabled>{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                            </div>
                        </div>
                        <div className="col-6 p-0">
                            <div className="row ">
                                {len > 12 ? <div className="col-2 col-lg-3 col-xl-2 mx-2">
                                    {result.slice(12, 18).map((e) => {
                                        return (
                                            e.seat == 'A' ? <button onClick={handleclick} key={e.seatno} id={e.seatno} value={e.price} onMouseOver={displayPrice} onMouseLeave={() => { setModal(false) }} className="seat1  my-1" disabled={mode}>{e.seatno}</button> :
                                                <button key={e.seatno} id={e.seatno} value={e.price} className="seat2  my-1" disabled>{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                                {len > 18 ? <div className="col-2 col-lg-3 col-xl-2 mx-2">
                                    {result.slice(18, 24).map((e) => {
                                        return (
                                            e.seat == 'A' ? <button onClick={handleclick} key={e.seatno} id={e.seatno} value={e.price} onMouseOver={displayPrice} onMouseLeave={() => { setModal(false) }} className="seat1  my-1" disabled={mode}>{e.seatno}</button> :
                                                <button key={e.seatno} id={e.seatno} value={e.price} className="seat2  my-1" disabled>{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                                {len > 24 ? <div className="col-2 col-lg-3 col-xl-2 mx-2">
                                    {result.slice(24, 32).map((e) => {
                                        return (
                                            e.seat == 'A' ? <button onClick={handleclick} key={e.seatno} id={e.seatno} value={e.price} onMouseOver={displayPrice} onMouseLeave={() => { setModal(false) }} className="seat1  my-1" disabled={mode}>{e.seatno}</button> :
                                                <button key={e.seatno} id={e.seatno} value={e.price} className="seat2  my-1" disabled>{e.seatno}</button>
                                        );
                                    })}
                                </div> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${stl.viewbox} card card-body mx-auto mt-3 box-shadow`}>
                    <form onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-8 text-center">
                                <label htmlFor="price" className='me-3 fw-bold' >Price(₹):   </label>
                                <input type="text" name="price" id="price" className='my-1' value={price} readOnly="readonly" />
                            </div>
                            <div className={`${stl.btnmargi} col-10 text-center col-sm-3`}>
                                <button type="submit" className={`${stl.greenbtn} btn btn-success border border-2 border-black fw-semibold`} >Proceed</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}