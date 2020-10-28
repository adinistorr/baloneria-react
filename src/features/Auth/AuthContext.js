import React, {useEffect, useState, useContext, createContext} from 'react';
import {FirebaseContext} from '../../utils/firebase/FirebaseContext';
import 'firebase/auth';

const initialValue = {
    isAuthenticated: false,
    isAdmin: false,
    isActive: false,
    loading: true,
    user: null,
};

const AuthContext = createContext(initialValue);

function AuthContextProvider({children}) {
    const [value, setValue] = useState(initialValue);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const unsub = firebase.auth().onAuthStateChanged(user => {
            // let newValues = initialValue;

            if (user) {
                // User is signed in.
                // newValues = {
                //     isAuthenticated: true,
                //     isAdmin: false,
                //     isActive: false,
                //     loading: true,
                //     user,
                // };

                firebase
                    .firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get()
                    .then(function (doc) {
                        // console.log('Document: ', doc.data());
                        setValue({
                            isAuthenticated: true,
                            isAdmin: doc.data().isAdmin,
                            isActive: doc.data().isActive,
                            loading: false,
                            user,
                        });
                    })
                    .catch(function (error) {
                        setValue({
                            isAuthenticated: true,
                            isAdmin: false,
                            isActive: false,
                            loading: false,
                            user,
                        });
                    });
            } else {
                setValue({
                    isAuthenticated: false,
                    isAdmin: false,
                    isActive: false,
                    loading: false,
                });
            }
            // console.log(` New values:`, newValues);
            // setValue(newValues);
        });
        return unsub;
    }, [firebase]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {AuthContext, AuthContextProvider};
