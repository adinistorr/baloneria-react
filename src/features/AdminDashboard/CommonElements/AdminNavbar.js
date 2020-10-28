import {useHistory, Link} from 'react-router-dom';
import {FirebaseContext} from '../../../utils/firebase/FirebaseContext';

import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './AdminNavbar.module.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPowerOff,
    faBell,
    faEnvelope,
    faUser,
    faChartPie,
    faPercent,
    faImages,
    faStar,
    faHome,
} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../../Auth/AuthContext';
import {Button} from 'react-bootstrap';
// import Sidebar from './Sidebar';

export default function AdminNavbar() {
    const firebase = useContext(FirebaseContext);
    const {isAdmin} = useContext(AuthContext);
    const history = useHistory();

    const badgeColor = color => {
        return {backgroundColor: color};
    };

    const toggleNav = toggle => {
        document.body.style.overflow = toggle ? 'hidden' : 'auto';
    };

    function handleLogout(e) {
        e.preventDefault();
        firebase
            .auth()
            .signOut()
            .then(function (error) {
                console.warn(error);
                history.push('/login');
            });
    }

    return (
        <nav className={`${styles.navbar} navbar-expand-lg ${styles['navbar-fixed']} navbar-light shadow`}>
            <button
                className="navbar-toggler"
                type="button"
                onClick={toggleNav.bind(this, true)}
                data-toggle="collapse"
                data-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo03">
                <button
                    className="navbar-toggler close-nav-btn"
                    onClick={() => toggleNav(false)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="h4">&times;</span>
                </button>

                <span className="navbar-brand ">{}</span>

                <ul
                    className={`navbar-nav mt-2 mt-lg-0 text-left ${styles['toolbar-admin']} ${styles['show-sidebar-nav']}`}
                >
                    <li className="nav-item w-100">
                        <NavLink className="nav-link" exact to="/admin" onClick={() => toggleNav(false)}>
                            <FontAwesomeIcon icon={faChartPie} className="mr-3" />
                            Dashboard
                        </NavLink>
                    </li>
                    {isAdmin && (
                        <li className="nav-item w-100">
                            <NavLink className="nav-link" exact to="/admin/users" onClick={() => toggleNav(false)}>
                                <FontAwesomeIcon icon={faUser} className="mr-3" />
                                Users
                            </NavLink>
                        </li>
                    )}
                    <li className="nav-item w-100">
                        <NavLink className="nav-link" exact to="/admin/offers" onClick={() => toggleNav(false)}>
                            <FontAwesomeIcon icon={faPercent} className="mr-3" />
                            Offers
                        </NavLink>
                    </li>
                    <li className="nav-item w-100">
                        <NavLink className="nav-link" exact to="/admin/portfolio" onClick={() => toggleNav(false)}>
                            <FontAwesomeIcon icon={faImages} className="mr-3" />
                            Portfolio
                        </NavLink>
                    </li>
                    <li className="nav-item w-100">
                        <NavLink className="nav-link" exact to="/admin/reviews" onClick={() => toggleNav(false)}>
                            <FontAwesomeIcon icon={faStar} className="mr-3" />
                            Reviews
                        </NavLink>
                    </li>
                    <li className="nav-item w-100 active">
                        <NavLink className="nav-link" exact to="/" onClick={() => toggleNav(false)}>
                            <FontAwesomeIcon icon={faHome} className="mr-3" /> Home
                        </NavLink>
                    </li>
                </ul>

                <hr className={styles['show-icon-names']} />

                <ul className={`navbar-nav mt-2 mt-lg-0 ${styles['toolbar-admin']}`}>
                    <li className="nav-item w-100">
                        <Link
                            className={`nav-link btn text-left ${styles['nav-link']} ${styles['margin-left']}`}
                            to="/admin/update-profile"
                            onClick={() => toggleNav(false)}
                        >
                            <FontAwesomeIcon icon={faUser} />
                            <span className={styles['show-icon-names']}>User profile</span>
                        </Link>
                    </li>

                    <li className="nav-item w-100">
                        <Link
                            className={`nav-link btn text-left ${styles['nav-link']} ${styles['margin-left']}`}
                            to="/admin"
                            onClick={console.log.bind(this, 'Mail')}
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className={`${styles['badge-notify']}`} style={badgeColor('#dc3545')}>
                                7
                            </span>
                            <span className={styles['show-icon-names']}>Mail</span>
                        </Link>
                    </li>
                    <li className="nav-item w-100">
                        <Link
                            className={`nav-link btn text-left ${styles['nav-link']} ${styles['margin-left']}`}
                            to="/admin"
                            onClick={console.log.bind(this, 'Notificari')}
                        >
                            <FontAwesomeIcon icon={faBell} />
                            <span className={`${styles['badge-notify']}`} style={badgeColor('#17a2b8')}>
                                3
                            </span>
                            <span className={styles['show-icon-names']}>Notifications</span>
                        </Link>
                    </li>
                    <li className="nav-item w-100">
                        <Button
                            variant="link"
                            className={`nav-link btn text-left ${styles['nav-link']} ${styles['margin-left']}`}
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faPowerOff} />
                            <span className={styles['show-icon-names']}>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
