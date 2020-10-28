import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import {AuthContext} from '../../../features/Auth/AuthContext';
import AdminFooter from '../../../features/AdminDashboard/CommonElements/AdminFooter';
import AdminNavbar from '../../../features/AdminDashboard/CommonElements/AdminNavbar';

import Sidebar from '../../../features/AdminDashboard/CommonElements/Sidebar';
import styles from './AdminRoute.module.css';

function AdminLayout({children}) {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <Container fluid className="h-100">
            <Row className="h-100">
                <Sidebar />
                <Col className="d-flex flex-column h-100">
                    <AdminNavbar />
                    <div className={` ${styles['margin-content']} `}>{children}</div>
                    <AdminFooter />
                </Col>
            </Row>
        </Container>
    );
}

export function AdminRoute({component: Component, ...rest}) {
    return (
        <Route {...rest}>
            <AdminLayout>
                <Component />
            </AdminLayout>
        </Route>
    );
}
