import React, {useContext} from 'react';
import {AuthContext} from '../../../features/Auth/AuthContext';

import NotActive from '../../../features/AdminDashboard/CommonElements/NotActive/NotActive';
import {Spinner} from 'react-bootstrap';

export default function CheckAdmin({children}) {
    const {loading, isActive, isAuthenticated} = useContext(AuthContext);

    if (loading) {
        return (
            <Spinner animation="border" role="status" style={{position: 'fixed', top: '50%', left: '50%'}}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }

    if (isAuthenticated && !isActive) {
        return <NotActive />;
    } else {
        return children;
    }
}
