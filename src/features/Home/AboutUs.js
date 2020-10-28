import React from 'react';
import styles from './styles/AboutUs.module.css';
import sideImage from '../../assets/images/side-photo2.png';

export default function AboutUs() {
    return (
        <>
            <div className={`${styles['fullscreen-background']} ${styles.row} row`}>
                <img className={styles.sideImage} src={sideImage} alt="" />
                <div className={` ${styles['wrapper-about']} container col-12 col-md-8 col-lg-8 col-xl-8 mr-2 mt-3`}>
                    <h1 className="text-center">Despre noi</h1>
                    <p className="pt-3 text-justify w-75">
                        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                        voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
                    </p>
                </div>
            </div>
            <div className={`${styles['image-wave']}  mt-n5`}>
                <svg width="100%" height="50px" viewBox="0 0 1920 80" preserveAspectRatio="none">
                    <path
                        d="M0 20C0 20 169.5 0 510 0C850.5 0 1069.5 60 1410 60C1750.5 60 1920 20 1920 20V80H0V20Z"
                        fill="white"
                    ></path>
                </svg>
            </div>
        </>
    );
}
