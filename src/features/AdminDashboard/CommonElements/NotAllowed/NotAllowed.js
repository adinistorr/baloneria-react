import React from 'react';
import styles from './NotAllowed.module.css';
import sorryImg from '../../../../assets/images/sorry.png';

export default function NotAllowed() {
    return (
        <>
            <div className={styles.background}></div>
            <div className={styles.wrapper}>
                <div className={styles['form-background']}>
                    <img className="mb-3" src={sorryImg} width="300" alt="Sorry" />
                    <h1 className="text-center">
                        Sorry, you are not allowed to <br /> access this page
                    </h1>
                </div>
            </div>
        </>
    );
}
