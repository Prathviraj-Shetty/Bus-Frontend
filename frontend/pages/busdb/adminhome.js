import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'
import Image from 'next/image'
import bus from '../../public/volvo.avif'
import Link from 'next/link'
import Loader from "react-loaders";
import logo from './../../public/BusLogo.png'

export default function OwnerHome() {
    return (
        <>
            <main className={styles.mainblack}>
                <div className={`${stl.ownercard} container fadecontainer position-absolute top-50 start-50 translate-middle  mt-5 text-center`}>
                    <div className={`${stl.ownertitle} rubberband text-center`}> <span style={{ color: "black" }} className='whitetextoutline'>Dream</span>  Bus</div>
                    <div className="row h-50 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center">
                            <p className={`card-text m-0 fs-4 fw-bold  fst-italic`}>Your tireless efforts help bridge gaps, connect people, and build stronger communities</p>
                            <div className="mt-5">
                            <Link href="/busdb/bus" className={`${stl.yellowbdbtn} btn btn-dark mx-2 px-5 fw-bold rounded-5`}>Add Bus</Link>
                            <Link href="/busdb/ownerprofile" className={`${stl.loginbtn} btn btn-dark text-light mx-2 px-5 border fw-bold rounded-5 border-2 border-white d-md-none d-lg-inline`}>Register</Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <Image src={logo} alt="..." className='w-100 h-100'></Image>
                        </div>
                    </div>

                </div>
            </main>
            <Loader type="ball-pulse-sync" />
        </>
    )
}