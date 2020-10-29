import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {INSTAGRAM_URL, FACEBOOK_URL, DARK_NAVBAR_THEME, LIGHT_NAVBAR_THEME} from '../../../utils/constants';
import './Nav.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';

export default function Nav() {
    const [navbarColor, setNavbarColor] = useState(DARK_NAVBAR_THEME);

    useEffect(() => {
        const handleScrollEvent = () => {
            if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
                setNavbarColor(LIGHT_NAVBAR_THEME);
            } else {
                setNavbarColor(DARK_NAVBAR_THEME);
            }
        };

        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    const toggleNav = toggle => {
        document.body.style.overflow = toggle ? 'hidden' : 'auto';
        if (toggle || (!toggle && document.documentElement.scrollTop >= 200)) {
            setNavbarColor(LIGHT_NAVBAR_THEME);
            return;
        }

        if (!toggle && document.documentElement.scrollTop < 200) {
            setNavbarColor(DARK_NAVBAR_THEME);
            return;
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-fixed ${navbarColor}`}>
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
                    onClick={toggleNav.bind(this, false)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="h4">&times;</span>
                </button>

                <NavLink className="navbar-brand " exact to="/">
                    BALONERIA
                </NavLink>

                <ul className="navbar-nav mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink
                            onClick={() => {
                                toggleNav();
                            }}
                            className="nav-link"
                            exact
                            to="/"
                        >
                            HOME <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            onClick={() => {
                                toggleNav();
                            }}
                            className="nav-link"
                            exact
                            to="/portofoliu"
                        >
                            PORTOFOLIU
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            onClick={() => {
                                toggleNav();
                            }}
                            className="nav-link"
                            exact
                            to="/oferte"
                        >
                            OFERTE
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            onClick={() => {
                                toggleNav();
                            }}
                            className="nav-link"
                            exact
                            to="/contact"
                        >
                            CONTACT
                        </NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav mt-2 mt-lg-0 flex-row">
                    <li className="nav-item px-3">
                        <a className="nav-link" target="_blank" rel="noopener noreferrer" href={INSTAGRAM_URL}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </li>

                    <li className="nav-item px-3">
                        <a className="nav-link" target="_blank" rel="noopener noreferrer" href={FACEBOOK_URL}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
