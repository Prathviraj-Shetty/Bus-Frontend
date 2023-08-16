import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
export default function UpdateUser() {
  const nav=useRouter()
  const [msg, setMsg] = useState(0);

  let  handleSubmit=async(e)=>{
    e.preventDefault();
    let data={'name':e.target.name.value,'dob':e.target.dob.value,'gender':e.target.gender.value,'phone':e.target.phone.value}
    let response=await fetch(`http://127.0.0.1:8000/userprofile/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res=await response.json();
    let id=res.id
    console.log(id)
    // nav.push(`/busdb/userhome`)
  }

  return (
    <>
      <main className={styles.main}>
      <div className='position-absolute z-3 w-100'>
        {msg ? <div className="bg-white box-shadow d-flex justify-content-between py-2 px-3 fw-semibold left-2   w-25 mx-auto text-center text-success"><span>Added Successfully</span>
        <button className='btn btn-success py-0 px-1'  onClick={() => { setMsg(0) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button></div> : <div></div>}</div>
        <div className="container position-absolute top-50 start-50 mt-3 translate-middle mx-auto">
          <form className='card card-body mx-auto w-50 box-shadow' onSubmit={handleSubmit}>
          <div className=' ms-4 fs-3'>
              <Link href={`/busdb/userhome/`} className='fw-semibold'>
                <svg className='mx-2' xmlns="http://www.w3.org/2000/svg" width="26" height="25" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
              </Link>
            </div>
            <div className="row px-2">
              
              <div className="col-12 px-1 text-center mb-4 fs-3 mt-2">
                User Details
              </div>
              <div className="col-12 px-1  mx-auto mb-5">
                {/* <label for="uname" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Name</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="uname" id="uname" /> */}
                <div className="profileimg  mx-auto"></div>
              </div>
              <div className="col-12 px-1 mb-2">
                <label for="name" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Full Name</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="name" id="name" />
              </div>
              <div className="col-6 px-1 mb-2">
                <label for="dob" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">DOB</span>
                </label>
                <input type="date" className="form-control border border-dark mt-2 pt-3" name="dob" id="dob" />
              </div>
              <div className=" mx-auto col-6 px-1 mb-2">
                <label for="gender" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Gender</span>
                </label>
                <select className="form-control mt-2 border border-dark  pt-3" id="gender" name="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className=" mx-auto col-12 px-1 mb-4">
                <label for="phone" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Phone No</span>
                </label>
                <input type="phone" className="form-control border border-dark mt-2 pt-3" name="phone" id="phone" />
              </div>
            </div>
            <div className="submit text-center"><button type="submit" onClick={() => { setMsg(1) }} className={`${stl.blackbtn} btn `}>Save</button></div>
          </form>
        </div>

      </main>
    </>
  )
}