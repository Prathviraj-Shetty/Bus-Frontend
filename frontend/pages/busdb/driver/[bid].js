import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Link from 'next/link';
import stl from '@/styles/Customstyle.module.css'

export default function Driver() {
  const nav = useRouter();
  const { bid } = nav.query;
  const [update, setUpdate] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getData()
  }, [user])

  let getData = async () => {
    let data = await fetch(`http://127.0.0.1:8000/getdriver/${bid}/`);
    let res = await data.json()
    setResult(res[0]);
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = { 'name': e.target.name.value, 'dob': e.target.dob.value, 'address': e.target.address.value, 'experience': e.target.experience.value, 'phone': e.target.phone.value }
    let response
    console.log("UPDATE=", update)
    if (update == true) {
      response = await fetch(`http://127.0.0.1:8000/driver/update/${bid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }
    else {
      response = await fetch(`http://127.0.0.1:8000/driver/new/${bid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }
    let res = await response.json();
    nav.push(`/busdb/route/${bid}`)
  }

  return (
    <>
      <main className={styles.main}>
        <div className="container position-absolute top-50 start-50 translate-middle">
          <form className={`${stl.viewbox} card card-body mx-auto box-shadow`} onSubmit={handleSubmit}>
            <div className="row px-2">
              <div className="col-12 px-1 text-center mb-4 fs-3 mt-2">
                {result&&<Link href={`/busdb/buslist`} className='btn py-0 px-1 position-absolute z-3 end-0 me-3 text-drak' >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </Link>}
                Driver Details
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="name" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Name</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="name" id="name" defaultValue={result ? result.name : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="dob" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">DOB</span>
                </label>
                <input type="date" className="form-control border border-dark mt-2 pt-3" name="dob" id="dob" defaultValue={result ? result.dob : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="address" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Address</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="address" id="address" defaultValue={result ? result.address : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="experience" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Experience</span>
                </label>
                <input type="number" className="form-control border border-dark mt-2 pt-3" placeholder='in years' name="experience" id="experience" defaultValue={result ? result.experience : ""} required />
              </div>
              <div className=" mx-auto col-6 px-1 mb-2">
                <label htmlFor="phone" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Phone No</span>
                </label>
                <input type="phone" className="form-control border border-dark mt-2 pt-3" name="phone" id="phone" defaultValue={result ? result.phone : ""} required />
              </div>
            </div>
            {result ? <div className="submit text-center mb-2"><button type="submit" name="submit" onClick={() => { setUpdate(true) }} className={`${stl.blackbtn} btn`}>Update</button><button onClick={() => { setUpdate(true);nav.push(`/busdb/route/${bid}`) }} className={`${stl.blackbtn} btn`}>Next</button></div> : <div className="submit text-center mb-2"><button type="submit" name="submit" className={`${stl.blackbtn} btn`}>Next</button></div>}
          </form>
        </div>

      </main>
    </>
  )
}