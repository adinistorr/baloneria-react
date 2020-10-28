import React from 'react';
import {Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

function PublicLayout({children}) {
    return (
        <div>
            <Nav />
            {children}
            <Footer />
        </div>
    );
}

export function PublicRoute({component: Component, ...rest}) {
    return (
        <Route {...rest}>
            <PublicLayout>
                <Component />
            </PublicLayout>
        </Route>
    );
}
