import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Link, useHistory} from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import {AuthContext} from '../../Auth/AuthContext';

import DeleteModal from '../../../components/common/DeleteModal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash, faToggleOn, faToggleOff} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/AdminDashboard.module.css';
import avatarDefault from '../../../assets/images/avatar-default.png';

export default function Users() {
    const db = firebase.firestore();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState();

    const {user, isAdmin} = useContext(AuthContext);

    useEffect(() => {
        let unsub;
        if (user) {
            unsub = db
                .collection('users')
                .where('email', '!=', user.email)
                .onSnapshot(
                    res => {
                        const userList = [];
                        res.forEach(doc => {
                            userList.push({id: doc.id, ...doc.data()});
                        });
                        setUsers(userList);
                    },
                    error => {
                        history.push('/not-allowed');
                    }
                );
        }
        return () => {
            typeof unsub === 'function' && unsub();
        };
    }, [db, user, history]);

    async function handleActivateUser(user) {
        try {
            await db.collection('users').doc(user.id).update({
                isActive: !user.isActive,
            });
            console.log('Document successfully updated!');
        } catch (error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error);
        }
    }

    async function handleDeleteuser(toDelete) {
        try {
            await db.collection('users').doc(toDelete.id).delete();
            setUserToDelete(null);
            setUsers(users.filter(user => user !== toDelete));
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    }

    return (
        <>
            {isAdmin && (
                <div>
                    <DeleteModal
                        show={!!userToDelete}
                        onHide={() => setUserToDelete(undefined)}
                        delEv={() => handleDeleteuser(userToDelete)}
                        obj={userToDelete}
                    />
                    <div className="d-flex justify-content-between">
                        <span className={`h1 mb-3`}>Users</span>
                    </div>

                    {users.map(user => (
                        <div key={user.id}>
                            <div className={`card mb-3 ${styles['card-row']}`} htmlFor={user.id}>
                                <img
                                    className={`${styles['user-img']} shadow-sm border border-light m-3`}
                                    src={user.avatar || avatarDefault}
                                    alt="user"
                                    width="200"
                                />

                                <div className="card-body">
                                    <h5 className="card-title">{user.email}</h5>
                                    <h6 className="card-text">
                                        {user.fName} {user.lName}
                                    </h6>
                                    <p className="card-text">
                                        {`${user.city}${user.city && user.country ? ', ' : ''}${user.country} `}
                                    </p>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            variant="warning"
                                            onClick={() => {
                                                handleActivateUser(user);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={user.isActive ? faToggleOn : faToggleOff} />
                                        </Button>

                                        <Link
                                            to={`/admin/users/update/${user.id}`}
                                            className={`btn ${styles['btn-update']}`}
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setUserToDelete(user);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
