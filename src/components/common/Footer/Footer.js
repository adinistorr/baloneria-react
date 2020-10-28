import React from 'react';
import styles from './Footer.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';
import {INSTAGRAM_URL, FACEBOOK_URL} from '../../../utils/constants';
import logo from '../../../assets/images/baloneria-white.png';
import {Link} from 'react-router-dom';
import {faMapMarkerAlt, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <div className={styles.wrapper}>
            <footer className={styles.footer}>
                <div className={styles['footer-top']}>
                    <div className="container">
                        <div className="row">
                            <div className={`col-md-3 col-lg-3 ${styles['footer-about']}`}>
                                <img
                                    className={styles['logo-footer']}
                                    src={logo}
                                    alt="logo-footer"
                                    data-at2x={logo}
                                    width="74"
                                    height="84"
                                />
                                <p>We create, you celebrate!</p>
                            </div>

                            <div className={` col-md-6 col-lg-6 ${styles['footer-contact']} `}>
                                <h3>Contact</h3>
                                <p>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Brasov, Romania
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faPhone} /> Phone:{' '}
                                    <a href="tel:0040744513112">+40.747.917.499</a>
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faEnvelope} /> Email:{' '}
                                    <a href="mailto:baloneria.brasov@gmail.com">baloneria.brasov@gmail.com</a>
                                </p>
                            </div>

                            <div className={`col-md-3 col-lg-3 ${styles['footer-links']}`}>
                                <div className="row">
                                    <div className="col">
                                        <h3>Links</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>
                                            <a className="scroll-link" href="/">
                                                Top
                                            </a>
                                        </p>
                                        <p>
                                            <a className="scroll-link" href="/">
                                                Section 1
                                            </a>
                                        </p>
                                        <p>
                                            <a className="scroll-link" href="/">
                                                Section 2
                                            </a>
                                        </p>
                                        <p>
                                            <a className="scroll-link" href="/">
                                                Section 3
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['footer-bottom']}>
                    <div className="container">
                        <div className="row">
                            <div className={`col-md-6 ${styles['footer-copyright']}`}>
                                &copy;&nbsp;
                                <Link to={'/'} target="_blank">
                                    Baloneria
                                </Link>
                                &nbsp; {new Date().getFullYear()}
                            </div>

                            <div className={`col-md-6 ${styles['footer-social']}`}>
                                <a target="_blank" rel="noopener noreferrer" href={INSTAGRAM_URL}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href={FACEBOOK_URL}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
