import React from 'react'
import Link from 'next/link';
import styles from "../app/page.module.css";


const Navbar = () => {
    return(
        <Link href="/">
            <div className={styles.navbar}>
            <span>HOV Entrance Locator</span>
            </div>
        </Link>
    );
};

export default Navbar