import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import stl from '@/styles/Customstyle.module.css'


export async function getStaticProps(context) {
    let data = await fetch(`http://127.0.0.1:8000/searchroute/`);
    let res = await data.json()
    console.log(res[0]);


    return {
        props: { res },
    }
}



export default function SearchRoute(props) {
    const [result, setResult] = useState(props.res);
    const [str, setStr] = useState("");

    useEffect(() => {
        dynamic()
    }, [str])

    let dynamic = async () => {
        if (str != "") {
            let data = await fetch(`http://127.0.0.1:8000/searchroutedynamic/${str}/`);
            let res = await data.json()
            setResult(res);
        }
        else {
            console.log("TRUE")
            let data = await fetch(`http://127.0.0.1:8000/searchroute/`);
            let res = await data.json()
            setResult(res);
        }
    }
    const handleChange = async (e) => {
        console.log(str)
        setStr(e.target.value)
    }

    const handleSubmit = async () => {
        dynamic()

    }

    return (
        <>
            <main className={styles.main}>
            <div className={`${stl.title} text-center text-white mt-5 w-100 fs-1 fw-bold`}><span style={{ color: 'yellow' }}> Search </span>for Routes</div>
                <div className={`${stl.searchbar} input-group rounded w-50 mx-auto mt-4`}>
                    <input type="search" className="form-control rounded mx-3 border border-2 border-dark" onChange={handleChange} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text btn btn-dark  border border-dark" id="search-addon" onClick={handleSubmit} style={{zIndex:"1"}} >
                        <BsSearch />
                    </span>
                </div>
                <div className={`${stl.viewbox} container card card-body table-scroll box-shadow mt-3 overflow-y-scroll`}>
                    <table className="table ">
                        <thead>
                            <tr>

                                <th scope="col">Start Point</th>
                                <th scope="col">Destination</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        {result.length ? <tbody className="table-group-divider">

                            {result.map((e) => {
                                return (
                                    <tr key={e.id}>
                                        <td>{e.start}</td>
                                        <td>{e.dest}</td>
                                        <td><button className={`${stl.blackbtn} btn `}><Link href={`/busdb/searchroutebus/${e.id}`}>Available Buses</Link></button></td>
                                    </tr>
                                );
                            })}
                        </tbody> :
                            <tbody>
                                <th colspan="4" className='text-center fs-3 fw-medium pt-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor" className="bi bi-x-octagon-fill mx-2  text-danger " viewBox="0 0 16 16">
                                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                    </svg>
                                    No Record Found</th>
                            </tbody>}
                    </table>
                </div>
            </main>
        </>
    )
}
