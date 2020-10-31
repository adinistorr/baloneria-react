import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import {AuthContextProvider} from '../../features/Auth/AuthContext';

import Homepage from '../../features/Home/Homepage';
import Portfolio from '../../features/Portfolio/Portfolio';
import Offers from '../../features/Offers/Offers';
import Contact from '../../features/Contact/Contact';

import LoginRegister from '../../features/Auth/LoginRegister';
import AdminDashboard from '../../features/AdminDashboard/AdminDashboard';
import AdminOffers from '../../features/AdminDashboard/AdminOffers/AdminOffers';
import AdminPortfolio from '../../features/AdminDashboard/AdminPortfolio/AdminPortfolio';
import AdminReviews from '../../features/AdminDashboard/AdminReviews/AdminReviews';
import Users from '../../features/AdminDashboard/Users/Users';
import UpdateUser from '../../features/AdminDashboard/UpdateProfile';

import {PublicRoute} from '../common/PublicRoute/PublicRoute';
import {AdminRoute} from '../common/AdminRoute/AdminRoute';
import CheckAdmin from '../common/CheckAdmin/CheckAdmin';

import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import AddUpdateEvent from '../../features/AdminDashboard/AdminPortfolio/AddUpdateEvent';
import AddUpdateOffer from '../../features/AdminDashboard/AdminOffers/AddUpdateOffer';
import AddUpdateReview from '../../features/AdminDashboard/AdminReviews/AddUpdateReview';
import NotAllowed from '../../features/AdminDashboard/CommonElements/NotAllowed/NotAllowed';
import NotActive from '../../features/AdminDashboard/CommonElements/NotActive/NotActive';
import AlertMessageContextProvider from '../common/AlertMessageContext/AlertMessageContext';

function App() {
    return (
        <AuthContextProvider>
            <AlertMessageContextProvider>
                <Router>
                    <PublicRoute exact path="/" component={Homepage} />
                    <PublicRoute exact path="/portofoliu" component={Portfolio} />
                    <PublicRoute exact path="/oferte" component={Offers} />
                    <PublicRoute exact path="/contact" component={Contact} />
                    <PublicRoute exact path="/login" component={LoginRegister} />
                    <PublicRoute exact path="/signup" component={LoginRegister} />
                    <PublicRoute exact path="/not-allowed" component={NotAllowed} />
                    <CheckAdmin>
                        <AdminRoute exact path="/admin" component={AdminDashboard} />

                        <AdminRoute exact path="/admin/not-active" component={NotActive} />

                        <AdminRoute exact path="/admin/users" component={Users} />
                        <AdminRoute exact path="/admin/update-profile" component={UpdateUser} />
                        <AdminRoute exact path="/admin/users/update/:id" component={UpdateUser} />

                        <AdminRoute exact path="/admin/offers" component={AdminOffers} />
                        <AdminRoute exact path="/admin/offers/add" component={AddUpdateOffer} />
                        <AdminRoute exact path="/admin/offers/update/:id" component={AddUpdateOffer} />

                        <AdminRoute exact path="/admin/portfolio" component={AdminPortfolio} />
                        <AdminRoute exact path="/admin/portfolio/add" component={AddUpdateEvent} />
                        <AdminRoute exact path="/admin/portfolio/update/:id" component={AddUpdateEvent} />

                        <AdminRoute exact path="/admin/reviews" component={AdminReviews} />
                        <AdminRoute exact path="/admin/reviews/add" component={AddUpdateReview} />
                        <AdminRoute exact path="/admin/reviews/update/:id" component={AddUpdateReview} />
                    </CheckAdmin>
                </Router>
            </AlertMessageContextProvider>
        </AuthContextProvider>
    );
}

export default App;
