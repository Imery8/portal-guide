'use client';
import Image from "next/image";
import styles from "./page.module.css";

import {Navbar} from '../components';
import Link from 'next/link';

const Home = () => {

  /* Finds Closest Hov Lanes */
  const handleFindHovLanes = () => {
    console.log("3 HOV LANES")
  }

  return (
    <div className={styles.page}>
      <div>
        <Navbar />
      </div>

      <div className={styles.mascot}>
        <Image
          src="/mascot.png"
          width={400}
          height={300}
          alt="Picture of our mascot"
        />
      </div>

      <div>
        <Link href="/Results">
          <button 
          type="button"
          className={styles.findHovBtn}
          onClick={handleFindHovLanes}>
            FIND CLOSEST HOV LANES
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home
