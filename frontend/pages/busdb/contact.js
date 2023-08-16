import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'
// import logo from '../../assets/images/about.png'
import emailjs from '@emailjs/browser'
import { BsSearch } from 'react-icons/bs';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';


export default function Contact() {

    const [letterClass, setLetterClass] = useState('text-animate')
    const form = useRef()

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }, [])

    const sendEmail = (e) => {
        e.preventDefault()
        console.log("HELLO")
        emailjs
            .sendForm("service_1z4yf1m", "template_bmayprf", form.current, '_43WQMwV1XM_bbmr7')
            .then(
                () => {
                    alert('Message successfully sent!')
                    window.location.reload(false)
                },
                () => {
                    alert('Failed to send the message, please try again')
                }
            )
    }

    return (
        <main className={styles.main} >
            <div className={`${stl.title} text-center text-white mt-5 mb-3 w-100 fs-1 fw-bold`}><span style={{ color: 'yellow' }}>Contact </span>Us</div>
            <div className="container position-absolute top-50 start-50 translate-middle  mt-5">
                <form ref={form} onSubmit={sendEmail} className={`${stl.viewbox} contactbg  card card-body mx-auto mt-box-shadow`}>
                    <div className="row p-2 ">
                       
                        <div className="col-6 px-1 my-2">
                            <label for="name" className="contactbg ms-2 position-absolute">
                                <span className="h6 small text-white px-1">Name</span>
                            </label>
                            <input type="text" className="form-control contactbg border mt-2 pt-3 text-white" style={{ borderColor: "yellow" }} name="name" id="name" required />
                        </div>
                        <div className="col-6 px-1 my-2">
                            <label for="dob" className="contactbg ms-2 position-absolute">
                                <span className="h6 small text-white px-1">Email</span>
                            </label>
                            <input type="email" className="form-control contactbg border mt-2 pt-3 text-white" style={{ borderColor: "yellow" }} name="email" id="email" required />
                        </div>
                        <div className="col-12 px-1 my-2">
                            <label for="address" className="contactbg ms-2 position-absolute">
                                <span className="h6 small text-white px-1">Subject</span>
                            </label>
                            <input type="text" className="form-control contactbg border mt-2 pt-3 text-white" style={{ borderColor: "yellow" }} name="subject" id="subject" required />
                        </div>
                        <div className=" mx-auto col-12 px-1 my-2">
                            <label for="phone" className="contactbg ms-2 position-absolute">
                                <span className="h6 small text-white px-1">Message</span>
                            </label>
                            <textarea className="form-control contactbg border mt-2 pt-3 text-white" style={{ resize: "none", borderColor: "yellow" }} name="message" id="message" required></textarea>
                        </div>
                    </div>
                <div className="submit text-center mt-4 mb-2"><button type="submit" name="submit" className={`${stl.yellowbtn} btn`}>Send</button></div>
                </form>
            </div>
        </main>
    )
}

