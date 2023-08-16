
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import stl from '@/styles/Customstyle.module.css'
import AuthContext from '../context/AuthContext';



export default function Bus(props) {
  const [data, setData] = useState()
  const [fImg, setFImg] = useState()
  const [iImg, setIImg] = useState()
  const [sImg, setSImg] = useState()
  const [invalid, setInvalid] = useState(false);
  const nav = useRouter();
  const { user } = useContext(AuthContext)


  let handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('regno', e.target.regno.value)
    uploadData.append('name', e.target.name.value)
    uploadData.append('seat', e.target.seat.value)
    uploadData.append('type', e.target.type.value)
    { fImg && uploadData.append('fImg', fImg, fImg.name) }
    { sImg && uploadData.append('sImg', sImg, sImg.name) }
    { iImg && uploadData.append('iImg', iImg, iImg.name) }

    let data = await fetch(`http://127.0.0.1:8000/isopregistered/${user.user_id}/`);
    let result = await data.json()
    if (result.regstatus != "Yes") {
      setInvalid(true)
    }
    else {
      let response = await fetch(`http://127.0.0.1:8000/bus/${user.user_id}/`, {
        method: 'POST',
        body: uploadData,
      })
      let res = await response.json();
      console.log(res)
      let id = res.id
      nav.push(`/busdb/driver/${id}`)
    }
  }

  return (
    <>
      <main className={styles.main}>
        <div className="container position-absolute top-50 start-50 translate-middle">
          <form className={`${stl.viewbox} card card-body mx-auto box-shadow`} onSubmit={handleSubmit}>
            <div className="row px-2">
              <div className="col-12 px-1 text-center  mb-4 fs-3 mt-2">
                Vehicle Details
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="regno" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Registration No</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="regno" id="regno" required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="name" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Bus Name</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="name" id="name" required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="seat" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Seating Capacity</span>
                </label>
                <input type="number" min="10" className="form-control border border-dark mt-2 pt-3" name="seat" id="seat" required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label htmlFor="type" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Compartment Type</span>
                </label>
                <select className="form-control mt-2 border border-dark  pt-3" id="type" name="type" required>
                  <option value="SE">Seater</option>
                  <option value="SM">SemiSleeper</option>
                  <option value="SL">Sleeper</option>
                </select>
              </div>
              <div className="col-12 px-1 mb-2"><div className="mt-2 mb-3">Upload Images</div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 overflow-hidden">
                    <label htmlFor="type" className="mx-2">
                      Front View
                    </label>
                    <input type="file" id="fImg" className='' name="fImg" accept="image/*" onChange={(e) => setFImg(e.target.files[0])} required />

                  </div>
                  <div className="col-lg-6 col-md-6 overflow-hidden">
                    <label htmlFor="type" className="mx-2">
                      Interior View
                    </label>
                    <input type="file" className='' id="iImg" name="iImg" accept="image/*" onChange={(e) => setIImg(e.target.files[0])} required />
                  </div>
                  <div className="col-lg-6 col-md-6 overflow-hidden">
                    <label htmlFor="type" className="mx-2">
                      Side View
                    </label>
                    <input type="file" className='' id="sImg" name="sImg" accept="image/*" onChange={(e) => setSImg(e.target.files[0])} required />

                  </div>

                </div>
              </div>

            </div>
            <div className="submit text-center"><button type="submit" className={`${stl.blackbtn} btn `}>Next</button></div>
            {invalid && <div className="col-12 px-1 mt-2 text-danger fw-semibold text-center ">Not Registered !! <Link href='/busdb/ownerprofile' className='text-primary fst-italic fw-normal mx-2'><u>Click here</u></Link></div>}
          </form >
        </div >

      </main >
    </>
  )
}
