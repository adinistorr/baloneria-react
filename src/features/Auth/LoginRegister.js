import React, {useContext} from 'react';
import {useLocation, useHistory, Redirect} from 'react-router-dom';
import {FirebaseContext} from '../../utils/firebase/FirebaseContext';
import {AuthContext} from '../Auth/AuthContext';
import {AlertMessageContext} from '../../components/common/AlertMessageContext/AlertMessageContext';

import 'firebase/firestore';

import styles from './LoginRegister.module.css';
import useForm from '../../hooks/useForm';
import {useState} from 'react';

export default function LoginRegister() {
    const firebase = useContext(FirebaseContext);
    const db = firebase.firestore();
    const history = useHistory();
    const {isAuthenticated} = useContext(AuthContext);
    const {setAlertMessage} = useContext(AlertMessageContext);

    let {pathname} = useLocation();
    const isRegister = pathname === '/signup';

    const baseValidationRules = {
        email: [{type: 'email'}],
        password: [{type: 'required'}],
    };

    const extendedValidationRules = {
        ...baseValidationRules,
        fName: [
            {
                type: 'minLength',
                constraint: 2,
                message: 'Please enter at least 2 characters.',
            },
        ],
        lName: [
            {
                type: 'minLength',
                constraint: 2,
                message: 'Please enter at least 2 characters.',
            },
        ],
        retype_password: [{type: 'retype_password', constraint: 'password'}],
    };

    const [initialValues] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        retype_password: '',
    });

    // Form Handling
    const [user, errors, bindInput, isFormValid] = useForm(
        initialValues,
        isRegister ? extendedValidationRules : baseValidationRules
    );

    function handleSubmit(e) {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        if (!isRegister) {
            //Login
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    history.push('/admin');
                })
                .catch(error => {
                    setAlertMessage({
                        message: error.message,
                        type: 'danger',
                    });
                });
        } else {
            // Register
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    let currentUser = firebase.auth().currentUser;

                    db.collection('users')
                        .doc(currentUser.uid)
                        .set({
                            isAdmin: false,
                            isActive: false,
                            email: currentUser.email,
                            fName: user.fName,
                            lName: user.lName,
                            city: '',
                            country: '',
                            about: '',
                            avatar: '',
                        })
                        .then(function (docRef) {
                            setAlertMessage({
                                message: 'User successfully created.',
                                type: 'success',
                            });
                        })
                        .catch(function (error) {
                            setAlertMessage({
                                message: error.message,
                                type: 'danger',
                            });
                        });
                })
                .catch(function (error) {
                    setAlertMessage({
                        message: error.message,
                        type: 'danger',
                    });
                });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/admin" />;
    }

    return (
        <>
            <div className={styles.background}></div>
            <div className="overlay"></div>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit} className={styles['form-background']}>
                    <h1 className="mb-3">{!isRegister ? 'Login' : 'Sign Up'}</h1>

                    {isRegister && (
                        <div className="row w-100">
                            <div className="form-group col-md-6 px-1">
                                <label htmlFor="fName">First Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.fName && 'is-invalid'}`}
                                    id="fName"
                                    name="fName"
                                    value={user.fName}
                                    {...bindInput('fName')}
                                />

                                <div className="invalid-feedback">{errors.fName}</div>
                            </div>

                            <div className="form-group col-md-6 px-1">
                                <label htmlFor="lName">Last Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lName && 'is-invalid'}`}
                                    id="lName"
                                    name="lName"
                                    value={user.lName}
                                    {...bindInput('lName')}
                                />

                                <div className="invalid-feedback">{errors.lName}</div>
                            </div>
                        </div>
                    )}

                    <div className={`${isRegister ? 'row w-100' : ''}`}>
                        <div className={`form-group ${isRegister ? 'col-md-12 px-1' : ''}`}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className={`form-control ${errors.email && 'is-invalid'}`}
                                id="email"
                                name="email"
                                value={user.email}
                                {...bindInput('email')}
                            />

                            <div className="invalid-feedback">{errors.email}</div>
                        </div>

                        <div className={`form-group ${isRegister ? 'col-md-6 px-1' : ''}`}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && 'is-invalid'}`}
                                id="password"
                                name="password"
                                value={user.password}
                                {...bindInput('password')}
                            />

                            <div className="invalid-feedback">{errors.password}</div>
                        </div>

                        {isRegister && (
                            <div className="form-group col-md-6 px-1">
                                <label htmlFor="retype_password">Retype Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.retype_password && 'is-invalid'}`}
                                    id="retype_password"
                                    name="retype_password"
                                    value={user.retype_password}
                                    {...bindInput('retype_password')}
                                />

                                <div className="invalid-feedback">{errors.retype_password}</div>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            {!isRegister ? 'Login' : 'Sign up'}
                        </button>
                    </div>

                    <div className="form-group">
                        {!isRegister ? (
                            <a href="/signup" className="text-secondary">
                                Not a member? Sign Up
                            </a>
                        ) : (
                            <a href="/login" className="text-secondary">
                                Already have an account? Sign In
                            </a>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
