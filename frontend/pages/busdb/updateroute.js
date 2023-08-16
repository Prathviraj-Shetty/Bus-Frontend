import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react';
export default function Route() {
  const [msg, setMsg] = useState(0);
  // let msg=1;
  return (
    <>
      <main className={styles.main}>
        <div className='position-absolute w-100'>
        {msg ? <div className="bg-white box-shadow d-flex justify-content-between py-2 px-3 left-2   w-25 mx-auto text-center text-success"><span>Successfully Updated</span>
        <button className='btn btn-success py-0 px-1'  onClick={() => { setMsg(0) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button></div> : <div></div>}</div>

        <div className="container position-absolute top-50 start-50 translate-middle">
          <form className='card card-body mx-auto w-50 box-shadow'>
            <div className="row px-2">
              <div className="col-12 px-1 text-center mb-4 fs-3 mt-2">
                Route Details
              </div>
              <div className="col-6 px-1 mb-2">
                <label for="start" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Starting Point</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="start" id="start" />
              </div>
              <div className="col-6 px-1 mb-2">
                <label for="dest" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Destination Point</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="dest" id="dest" />
              </div>
              <div className="col-12 px-1 mb-2">
                <label for="via" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Via</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="via" id="via" />
              </div>

            </div>
            <div className="submit text-center"><button type="submit" onClick={() => { setMsg(1) }} className={`${stl.blackbtn} btn `}><Link href="/busdb/route">Submit</Link></button></div>
          </form>
        </div>

      </main>
    </>
  )
}