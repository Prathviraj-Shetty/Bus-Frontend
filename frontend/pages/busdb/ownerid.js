import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import stl from '@/styles/Customstyle.module.css'


export default function OwnerId() {
  const [data,setData]=useState()
  const [invalid, setInvalid] = useState(0);
    const nav=useRouter();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        let id=e.target.oid.value
        let data = await fetch(`http://127.0.0.1:8000/getownerid/${id}/`);
        let res = await data.json()
        console.log(res.id)
        if(res.id=="invalid")
        {
            setInvalid(1)
        }
        else{
            nav.push(`/busdb/bus/${id}`)
        }
    }


  return (
    <>
      <main className={styles.main}>
        <div className="container position-absolute top-50 start-50 translate-middle">
          <form className={`${stl.viewbox} card card-body mx-auto  px-5 box-shadow`} onSubmit={handleSubmit} >
            <div className="row px-2">
            <div className="col-12 px-1 text-center mb-4 fs-3 mt-2">
              Owner/Company Details
            </div>
              <div className="col-12 px-1 mb-2">
                <label htmlFor="oid" className="ms-2 position-absolute">
                  <span className="h6 small bg-white text-muted px-1">Enter your ID:</span>
                </label>
                <input type="text" className="form-control border border-dark mt-2 pt-3" name="oid" id="oid" />
              </div>
              {invalid?<div className="col-12 px-1 mb-2 text-danger fw-semibold text-center fst-italic">Invalid ID !!  Please enter valid one</div>:<div className="col-12 text-center px-1 mb-2">Not Registered?<Link href='/busdb/ownerprofile' className='text-primary mx-2'>Click here</Link></div>}
             
            </div>
            <div className="submit text-center"><button type="submit" className={`${stl.blackbtn} btn `}>Next</button></div>
          </form>
        </div>

      </main>
    </>
  )
}