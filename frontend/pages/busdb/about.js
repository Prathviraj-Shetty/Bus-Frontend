import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'
import { BsSearch } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';


export default function About() {

    return (
        <>

            <main className={styles.maindark} >
                <div className={`${stl.title} fadecontainer ms-5 text-white mt-5 mb-3 w-100 fs-1 fw-bold`}><span style={{ color: 'yellow' }}>About </span>Us</div>
                <div className=' d-flex w-100 justify-content-center'>
                    <div className={`${stl.about} fadecontainer p-5 fs-5 `}>
                        <p>Welcome to our bus ticket booking website! We are a reliable and convenient platform designed to simplify your bus travel experience.
                            Whether you are planning a quick trip or a long-distance journey, we are here to assist you in finding the best bus routes, comparing prices,
                            and booking your tickets with ease.
                        </p><br/>
                        <p>
                            At our website, we understand the importance of a hassle-free travel experience, and our goal is to provide you with a seamless and efficient booking process.
                            With our user-friendly interface, you can quickly search for bus routes, check seat availability, compare prices from different bus operators,
                            and secure your tickets in just a few clicks.
                        </p><br/>
                        <p>
                            Our dedicated customer support team is available to assist you throughout your journey. Whether you have questions about the booking process,
                            need to make changes to your reservation, or require any assistance, we are here to provide prompt and friendly support.
                        </p>
                        <div className='w-100 text-center'><Link href='/busdb/contact' className={`${stl.yellowbtn} btn`}>Contact Us</Link></div>
                    </div>
                </div>
            </main>
        </>
    )
}
