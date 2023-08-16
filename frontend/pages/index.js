import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import admin from '../public/adminlogo.png'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  let handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <>
      <main className={styles.main}>
      </main>
    </>
  )
}
