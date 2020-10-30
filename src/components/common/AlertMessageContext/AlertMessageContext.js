import React from 'react';
import {Alert} from 'react-bootstrap';
import {useState} from 'react';
import styles from './AlertMessageContext.module.css';

export const AlertMessageContext = React.createContext({
    alert: {
        errorMessage: '',
        type: '',
    },
    setAlertMessage: () => {},
});

export default function AlertMessageContextProvider({children}) {
    const [alert, setAlert] = useState();

    function displayAlertMessage(alert) {
        setAlert(alert);
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }

    return (
        <AlertMessageContext.Provider value={{alert: alert, setAlertMessage: displayAlertMessage}}>
            {alert && (
                <div className={styles.alertMessageWrapper}>
                    <Alert className={styles.alertMessage} variant={alert.type}>
                        {alert.message}
                    </Alert>
                </div>
            )}
            {children}
        </AlertMessageContext.Provider>
    );
}
