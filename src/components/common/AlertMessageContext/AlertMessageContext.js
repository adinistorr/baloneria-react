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
    return (
        <AlertMessageContext.Provider value={{alert: alert, setAlertMessage: setAlert}}>
            {alert && (
                <div className={styles.alertMessageWrapper}>
                    {setTimeout(() => {
                        setAlert(null);
                    }, 5000)}
                    <Alert className={styles.alertMessage} variant={alert.type}>
                        {alert.message}
                    </Alert>
                </div>
            )}
            {children}
        </AlertMessageContext.Provider>
    );
}
