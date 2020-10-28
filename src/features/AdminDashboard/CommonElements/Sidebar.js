import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartPie, faUser, faPercent, faStar, faImages, faHome} from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';
import backgroundImage from '../../../assets/images/sidebar.jpg';
import {AuthContext} from '../../Auth/AuthContext';

export default function Sidebar() {
    const {isAdmin} = useContext(AuthContext);

    return (
        <>
            <div className="sidebar" data-color="greengi">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <NavLink className="nav-link simple-text" exact to="/admin">
                            Baloneria Admin<span className="sr-only">(current)</span>
                        </NavLink>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/admin">
                                <FontAwesomeIcon icon={faChartPie} className="mr-3" />
                                Dashboard
                            </NavLink>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/admin/users">
                                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                                    Users
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/admin/offers">
                                <FontAwesomeIcon icon={faPercent} className="mr-3" />
                                Offers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/admin/portfolio">
                                <FontAwesomeIcon icon={faImages} className="mr-3" />
                                Portfolio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/admin/reviews">
                                <FontAwesomeIcon icon={faStar} className="mr-3" />
                                Reviews
                            </NavLink>
                        </li>
                        <li className="nav-item active-pro active">
                            <NavLink className="nav-link" exact to="/">
                                <FontAwesomeIcon icon={faHome} className="mr-3" /> Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-background" style={{backgroundImage: `url(${backgroundImage})`}}></div>
            </div>
        </>
    );
}
