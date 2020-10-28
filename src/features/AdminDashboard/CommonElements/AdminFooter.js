import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './AdminFooter.module.css'

export default function AdminFooter() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p className="text-center"> ©2020 <NavLink exact to="/">Baloneria</NavLink></p>
            </div>
        </footer>
    )
}
