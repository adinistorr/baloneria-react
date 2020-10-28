import React from 'react';
import styles from '../NotAllowed/NotAllowed.module.css';
import hoorayImg from '../../../../assets/images/hooray.png';
import {useContext} from 'react';
import {FirebaseContext} from '../../../../utils/firebase/FirebaseContext';
import {useHistory} from 'react-router-dom';

export default function NotActive() {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

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
        <>
            <div className={styles.background}></div>
            <div className={styles.wrapper}>
                <div className={styles['form-background']}>
                    <img className="mb-3" src={hoorayImg} width="300" alt="Hooray" />
                    <h2 className="text-center">
                        Your account has been created successfully. <br /> An administrator will activate it soon.
                    </h2>
                    <button className="btn btn-danger mt-5" onClick={handleLogout}>
                        Login
                    </button>
                </div>
            </div>
        </>
    );
}
