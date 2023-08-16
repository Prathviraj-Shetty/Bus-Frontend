import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import stl from '@/styles/Customstyle.module.css'


 export async function getStaticPaths() {
    let data = await fetch(`http://127.0.0.1:8000/get/route/`);
    let res = await data.json()
    
    const paths=res.map((cur)=>{
        return{
            params:{rid:cur.id.toString()},
           
        }
    })
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
  }
export async function getStaticProps(context) {
    
    const rid=context.params.rid
    let data = await fetch(`http://127.0.0.1:8000/searchroutebus/${rid}/`);
    let res = await data.json()
  
    return {
        props: { res },
    }
}



export default function SearchRoutebus(props) {
    const [result, setResult] = useState(props.res);

    return (
        <>

            <main className={styles.main} >
                <div className="input-group rounded w-50 mx-auto  mt-5">
                   
                </div>
                <div className={`${stl.cardtable} container card card-body mt-5 table-scroll box-shadow mt-5 overflow-y-scroll`}>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th scope="col">Reg No</th>
                                <th scope="col">Bus Operator</th>
                                <th scope="col">Start Point</th>
                                <th scope="col">Destination</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {result.map((e) => {
                                return (
                                    <tr key={e.id}>
                                        <th scope="row" >{e.regno}</th>
                                        <td>{e.busname}</td>
                                        <td>{e.route[0].start}</td>
                                        <td>{e.route[0].dest}</td>
                                        <td><button className={`${stl.blackbtn} btn `}><Link href={`/busdb/busview/${e.id}`}>View</Link></button></td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}
