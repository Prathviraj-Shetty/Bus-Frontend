import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import stl from '@/styles/Customstyle.module.css'
import noimg from '../../public/adminlogo.png'
import Image from 'next/image';


export default function UserProfile() {
  const nav = useRouter()
  const [msg, setMsg] = useState(false);
  const [dis, setDis] = useState(false);
  const [result, setResult] = useState(null);
  const [update, setUpdate] = useState(false);
  const [img, setImg] = useState(noimg)
  const [profileImg, setProfileImg] = useState()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getData()
  }, [user])

  let getData = async () => {
    let data = await fetch(`http://127.0.0.1:8000/getuserprofile/${user ? user.user_id : 0}/`);
    let res = await data.json()
    setResult(res[0]);
    setImg(res.length ? 'http://127.0.0.1:8000' + res[0].img : noimg)
    console.log("RESULT", result);
  }


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImg(event.target.files[0])
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  }




  let handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('user', user.user_id)
    uploadData.append('name', e.target.name.value)
    uploadData.append('dob', e.target.dob.value)
    uploadData.append('gender', e.target.gender.value)
    uploadData.append('phone', e.target.phone.value)
    { profileImg && uploadData.append('profileImg', profileImg, profileImg.name) }

    // let data = { 'user': user.user_id, 'name': e.target.name.value, 'dob': e.target.dob.value, 'gender': e.target.gender.value, 'phone': e.target.phone.value }
    if (update == true) {
      let response = await fetch(`http://127.0.0.1:8000/userprofile/update/`, {
        method: 'POST',
        body: uploadData,
      })
      e.target.submit.disabled = true
    }
    else {
      let response = await fetch(`http://127.0.0.1:8000/userprofile/new/`, {
        method: 'POST',
        body: uploadData,
      })
      setDis(true)
    }
    setMsg(true)
  }

  return (
    <>
      <main className={styles.main}>

        <div className='position-absolute z-3 w-100'>
          {msg ? <div className={`${stl.popupbox} bg-success box-shadow d-flex justify-content-between py-2 px-3 fw-semibold left-2 mt-5 mx-auto text-center text-white`}>{update ? <span>Successfully Updated</span> : <span>Added Successfully</span>}
            <button className='btn btn-danger py-0 px-1' onClick={() => { setMsg(0) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
            </button></div> : <div></div>}</div>
        <div className="container position-absolute top-50 start-50 mt-3 translate-middle mx-auto fadecontainer">
          <form className={`${stl.viewbox} card card-body mx-auto box-shadow`} onSubmit={handleSubmit}>
            <Link href="/busdb/userhome" className='btn py-0 px-1 position-absolute z-3  me-3 text-drak'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>
            </Link>
            <div className="px-1 text-center mb-4 fs-3 mt-2 fw-bold ">User Details</div>
            <div className="row px-2">
              <div className="col-12 px-1  mx-auto ">
                <div className="profileimg  mx-auto">
                  <img src={img} width={220} height={220} style={{ width: "7rem", height: "7rem" }} />
                </div>
                {!result&&<div className='text-center'>
                  <label for="pImg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="purple" class="bi bi-camera-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                    </svg>
                  </label>
                  <input type="file" onChange={onImageChange} id="pImg" name="pImg" accept="image/*" className="filetype d-none"  hidden={result ? true : false} />
                </div>}
              </div>
              <div className="col-12 px-1 mb-2">
                <label for="name" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Full Name</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="name" id="name" defaultValue={result ? result.name : ""} required />
              </div>
              <div className="col-6 px-1 mb-2">
                <label for="dob" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">DOB</span>
                </label>
                <input type="date" className="form-control border border-dark mt-2 pt-3" name="dob" id="dob" defaultValue={result ? result.dob : ""} required />
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
                <input type="phone" className="form-control border border-dark mt-2 pt-3" name="phone" id="phone" defaultValue={result ? result.phone : ""} required />
              </div>
            </div>
            {result ? <div className="submit text-center mb-2"><button type="submit" name="submit" onClick={(e) => { setUpdate(true)}} className={`${stl.blackbtn} btn`}>Update</button></div> : <div className="submit text-center mb-2"><button type="submit" name="submit" className={`${stl.blackbtn} btn`} disabled={dis}>Save</button></div>}
          </form>
        </div>
      </main>
    </>
  )
}