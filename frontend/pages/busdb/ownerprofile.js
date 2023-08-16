
import stl from '@/styles/Customstyle.module.css'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './../context/AuthContext'
import Image from 'next/image';
import logo from '../../public/BusLogo.png'
import Link from 'next/link';


export default function OwnerProfile() {
  const [msg, setMsg] = useState(false)
  const [dis, setDis] = useState(false);
  const [result, setResult] = useState(null);
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getData()
  }, [user])

  let getData = async () => {
    let data = await fetch(`http://127.0.0.1:8000/getoperatorprofile/${user ? user.user_id : 0}/`);
    let res = await data.json()
    setResult(res[0]);
    console.log(result);
  }
  let handleSubmit = async (e) => {
    e.preventDefault()
    let data = { 'user': user.user_id, 'name': e.target.name.value, 'address': e.target.address.value, 'dob': e.target.dob.value, 'phone': e.target.phone.value }
    if (update == true) {
      let response = await fetch(`http://127.0.0.1:8000/operatorprofile/update/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      e.target.submit.disabled = true
    }
    else {
      let response = await fetch(`http://127.0.0.1:8000/operatorprofile/new/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      setDis(true)
    }
    setMsg(true)
  }
  return (
    <>
      <main className={styles.main}>
        <div className='fadecontainer position-absolute z-3 w-100'>
          {msg ? <div className={`${stl.popupbox} bg-success box-shadow d-flex justify-content-between py-2 px-3 fw-semibold left-2 mt-5 mx-auto text-center text-white`}>{update ? <span>Successfully Updated</span> : <span>Added Successfully</span>}
            <button className='btn btn-danger py-0 px-1' onClick={() => { setMsg(0) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
            </button></div> : <div></div>}</div>
        <div className="container fadecontainer position-absolute top-50 start-50 translate-middle">
          <form className={`${stl.viewbox} card card-body mx-auto box-shadow`} onSubmit={handleSubmit}>
            <div className="row px-2">
              <Link href={`/busdb/adminhome/`} className='fw-semibold '>
                <svg className='mx-2' xmlns="http://www.w3.org/2000/svg" width="26" height="25" fill="#0059c8" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
              </Link>
              <div className="col-12 px-1 text-center mb-1 fs-3 mt-2">
                Owner/Company Details
              </div>
              <div className="col-12 px-1 text-center mb-4 fs-3 mt-2" style={{ height: "6rem" }}>
                <Image src={logo} className='w-50 h-100' alt="..." />
              </div>
              <div className="col-6 px-1 mb-2">
                <label for="name" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Name</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="name" id="name" defaultValue={result ? result.name : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label for="dob" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">DOB</span>
                </label>
                <input type="date" className="form-control border border-dark mt-2 pt-3" name="dob" id="dob" defaultValue={result ? result.dob : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label for="address" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Address</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="address" id="address" defaultValue={result ? result.address : ""} required />
              </div>
              <div className=" mx-auto col-6 px-1 mb-2">
                <label for="phone" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Phone No</span>
                </label>
                <input type="phone" className="form-control border border-dark mt-2 pt-3" name="phone" id="phone" defaultValue={result ? result.phone : ""} required />
              </div>
            </div>
            {result ? <div className="submit text-center mt-4 mb-2"><button type="submit" name="submit" onClick={(e)=>{ setUpdate(true) }} className={`${stl.blackbtn} btn`}>Update</button></div> : <div className="submit text-center mt-4 mb-2"><button type="submit" name="submit"  className={`${stl.blackbtn} btn`} disabled={dis}>Save</button></div>}
          </form>
        </div>

      </main>
    </>
  )
}
