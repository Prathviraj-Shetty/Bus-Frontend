import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'

export default function RegisterUser() {
    const [msg, setMsg] = useState();
    const nav = useRouter();

    function timeout(delay) {
		return new Promise( res => setTimeout(res, delay) );
	}

    let handleSubmit = async (e) => {
        e.preventDefault();
        let data = await fetch(`http://127.0.0.1:8000/verifyusername/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": e.target.username.value })

        });
        let res = await data.json()
        if (res.status == "Yes")
            setMsg("Username Already Exists !!!")
        else if (e.target.password1.value != e.target.password2.value)
            setMsg("Password didn't match !!!")
        else {
            setMsg("Account created  for "+e.target.username.value)
            let response = await fetch(`http://127.0.0.1:8000/register/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "type": e.target.type.value, "username": e.target.username.value, "email": e.target.email.value, "password": e.target.password1.value })

            });
            await timeout(3000)
            nav.push(`/login`)
        }
    }

    return (
        <>


            <main className={styles.main}>

                <div className={`${stl.loginbox} text-white alphabg text-center fw-bold position-absolute top-50 start-50 translate-middle`}>
                    <div className="title mt-2 mb-3 fs-3" style={{color:"yellow"}}>Register</div>
                    <div>
                        <p className=' text-center text-warning pt-2'>{msg}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">

                                <select className="w-75 text-white  mx-auto py-2 border border-black text-center bg-black color-white rounded-3" id="type" name="type" required>
                                    <option value="User">User</option>
                                    <option value="Admin">Operator</option>
                                </select>
                            </div>
                            <label htmlFor="username" className='d-block my-2'>Username<br />
                                <input type="text" name="username" className='w-75 px-2 border border-dark rounded-2 border-2' required/>
                            </label>
                            <label htmlFor="email" className='d-block my-2'>Email<br />
                                <input type="email" name="email" className='w-75 px-2 border border-dark rounded-2 border-2' required/>
                            </label>
                            <label htmlFor="password1" className='d-block my-2'>Password<br />
                                <input type="password" name="password1" className='w-75 px-2 border border-dark rounded-2 border-2' required/>
                            </label>
                            <label htmlFor="password2" className='d-block my-2'>Re-Enter Password<br />
                                <input type="password" name="password2" className='w-75 px-2 border border-dark rounded-2 border-2' required/>
                            </label>
                            <button type="submit" className={`${stl.loginbtn} btn btn-dark mt-2 mb-2 border border-2 border-light rounded-3`} >Register Account</button>
                        </form>

                        <div className="d-flex justify-content-center fb-1 fw-normal fst-italic links text-white">
                            Already have an account?   <Link href="/login" className="btn p-0 btn-link mx-2 ml-2 fw-bold text-warning">Log In</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
