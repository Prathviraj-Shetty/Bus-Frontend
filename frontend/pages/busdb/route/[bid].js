import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import stl from '@/styles/Customstyle.module.css'

export default function Route() {
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState(0);
  const nav = useRouter();
  const { bid } = nav.query;
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getData()
  }, [user])

  let getData = async () => {
    let data = await fetch(`http://127.0.0.1:8000/getcurroute/${bid}/`);
    let res = await data.json()
    setResult(res[0]);
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = { 'start': e.target.start.value, 'dest': e.target.dest.value, 'via': e.target.via.value, 'stime': e.target.stime.value, 'rtime': e.target.rtime.value }
    let response
    console.log("UPDATE=", update)
    if (update == true) {
      response = await fetch(`http://127.0.0.1:8000/route/update/${bid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      nav.push(`/busdb/seatprice/${bid}`)
    }
    else {
      response = await fetch(`http://127.0.0.1:8000/route/new/${bid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      nav.push(`/busdb/seatprice/${bid}`)
    }

  }
  return (
    <>
      <main className={styles.main}>
        <div className="container position-absolute top-50 start-50 translate-middle">
          <form className={`${stl.viewbox} card card-body mx-auto box-shadow`} onSubmit={handleSubmit} autoComplete='true'>
            <div className="row px-2">
              <div className="col-12 px-1 text-center mb-4 fs-3 mt-2">
                {result && <Link href={`/busdb/buslist`} className='btn py-0 px-1 position-absolute z-3 end-0 me-3 text-drak' >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </Link>}
                Route Details
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="start" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Starting Point</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="start" id="start" defaultValue={result ? result.start : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="dest" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Destination Point</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="dest" id="dest" defaultValue={result ? result.dest : ""} required />
              </div>
              <div className="col-12 px-1 mb-2">
                <label htmlFor="via" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Via</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="via" id="via" defaultValue={result ? result.via : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="stime" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Starting Time</span>
                </label>
                <input type="datetime-local" className="form-control border border-dark mt-2 pt-3" name="stime" id="stime" defaultValue={result ? result.starttime : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="rtime" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Reaching Time</span>
                </label>
                <input type="datetime-local" className="form-control border border-dark mt-2 pt-3" name="rtime" id="rtime" defaultValue={result ? result.reachtime : ""} required />
              </div>
            </div>
            {result ? <div className="submit text-center mb-2"><button type="submit" name="submit" onClick={() => { setUpdate(true) }} className={`${stl.blackbtn} btn`}>Update</button><Link href={`/busdb/seatprice/${bid}`} className={`${stl.blackbtn} btn`}>Next</Link></div> : <div className="submit text-center mb-2"><button type="submit" name="submit" className={`${stl.blackbtn} btn`}>Save</button></div>}
          </form>
        </div>
      </main>
    </>
  )
}