import styles from '@/styles/Home.module.css'
import stl from '@/styles/Customstyle.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


export async function getStaticPaths() {
    let data = await fetch(`http://127.0.0.1:8000/get/bus/`);
    let res = await data.json()

    const paths = res.map((cur) => {
        return {
            params: { bid: cur.id.toString() },

        }
    })
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}
export async function getStaticProps(context) {

    const bid = context.params.bid
    let data = await fetch(`http://127.0.0.1:8000/getimages/${bid}/`);
    let res = await data.json()
    console.log(res)
    return {
        props: { res },
    }
}



export default function Gallery(props) {
    const [res, setRes] = useState(props.res[0])
    const [img1, setImg1] = useState('http://127.0.0.1:8000' + res.frontimg)
    const [img2, setImg2] = useState('http://127.0.0.1:8000' + res.interiorimg)
    const [img3, setImg3] = useState('http://127.0.0.1:8000' + res.sideimg)
    console.log(img1)

    return (
        <>
            <main className={styles.maindark}>
                <div className='text-light ms-4 mt-4 fs-5'>
                    <Link href={`/busdb/busview/${res.id}`} className='fw-semibold'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>Back
                    </Link>
                </div>

                <div id="carouselExampleIndicators" className={`${stl.gallerybox} carousel slide h-75 mx-auto vertical-allign-center position-absolute top-50 start-50 translate-middle`} style={{ cursor: "zoom-in" }}>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner w-100 h-100">
                        <div className="carousel-item w-100 h-100 active">
                            <img src={img1} className="d-block image img-fluid w-100 h-100" alt="..." />
                        </div>
                        <div className="carousel-item w-100 h-100">
                            <img src={img2} className="d-block image img-fluid w-100 h-100" alt="..." />
                        </div>
                        <div className="carousel-item w-100 h-100">
                            <img src={img3} className="d-block image img-fluid w-100 h-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </main>
        </>
    )
}