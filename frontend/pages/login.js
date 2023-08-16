import React, { useContext, useState } from 'react'
import stl from '@/styles/Customstyle.module.css'
import AuthContext from './context/AuthContext'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {
  const [msg, setMsg] = useState();
  const { loginUser } = useContext(AuthContext)
  const nav = useRouter()

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handleLogin = async (e) => {
    let status = await loginUser(e)
    console.log("DATA=", status)
    if (status == false)
      setMsg("Incorrect Username or Password")
    else {
      await timeout(500)
      if (e.target.logintype.value == "Admin")

        nav.push(`/busdb/adminhome`)
      else

        nav.push(`/busdb/userhome`)
    }
  }

  return (
    <>

      <main className={styles.main}>

        <div className={`${stl.loginbox} alphabg text-white text-center align-middle fw-bold position-absolute top-50 start-50 translate-middle`}>
          <div className="mb-4">
            <div className="title mt-2 mb-2 fs-3">Login</div>
            <p className=' text-center fst-italic fw-semibold pt-2' style={{ color: "yellow" }} ><b style={{ color: "red" }} > {msg && "!!!"} </b>{msg}</p>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">

                <select className="w-75 text-white  mx-auto py-2 border border-black text-center bg-black color-white rounded-3" id="logintype" name="logintype" required>
                  <option value="User">User Login</option>
                  <option value="Admin">Operator Login</option>
                </select>
              </div>
              <label htmlFor="username" className='d-block my-4'>Username<br />
                <input type="text" name="username" className='w-75 px-2 border border-dark rounded-2 border-2' required />
              </label>
              <label htmlFor="password" className='d-block my-4'>Password<br />
                <input type="password" name="password" className='w-75 px-2 border border-dark rounded-2 border-2' required />
              </label>
              <button type="submit" className={`${stl.loginbtn} btn px-3 text-light mt-2 mb-3 border border-2 fw-semibold border-light rounded-3`}>Login</button>
            </form>

            <div className="d-flex justify-content-center fb-1 fw-normal fst-italic links text-light">
              Don&apos;t have an account?  <Link href="/register" className={` btn p-0 btn-link mx-2 ml-2 text-warning fw-bold`}>Sign Up</Link>
            </div>
          </div>

        </div>

      </main>
    </>
  )
}
export default Login

