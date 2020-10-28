import React from 'react';
import {FirebaseContext} from '../../utils/firebase/FirebaseContext';
import {AlertMessageContext} from '../../components/common/AlertMessageContext/AlertMessageContext';
import {useContext} from 'react';
import coverImage from '../../assets/images//events/tudor.jpg';
import avatarDefault from '../../assets/images/avatar-default.png';

import './styles/UpdateProfile.css';
import {useEffect} from 'react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import useForm from '../../hooks/useForm';

export default function UpdateUser() {
    const firebase = useContext(FirebaseContext);
    const {setAlertMessage} = useContext(AlertMessageContext);

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const {id} = useParams();

    const [initialValues, setInitialValues] = useState({
        avatar: '',
        email: '',
        fName: '',
        lName: '',
        city: '',
        country: '',
        about: '',
    });

    const validationRules = {
        email: [{type: 'email'}],
        fName: [{type: 'required'}],
        lName: [{type: 'required'}],
        city: [{type: 'required'}],
        country: [{type: 'required'}],
        about: [{type: 'required'}],
    };

    const [userProfile, errors, bindInput, isFormValid] = useForm(initialValues, validationRules);

    useEffect(() => {
        db.collection('users')
            .doc(id || currentUser.uid)
            .get()
            .then(doc => {
                setInitialValues({...doc.data()});
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, currentUser, db]);

    if (!currentUser) {
        return <h1>Loading...</h1>;
    }

    function handleFileUpload(e) {
        if (!e.target.files[0]) {
            return;
        }

        const fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.onload = ({target: {result}}) => setInitialValues({...userProfile, avatar: result});
    }

    async function updateProfile(e) {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        try {
            await db
                .collection('users')
                .doc(id || currentUser.uid)
                .update({
                    avatar: userProfile.avatar,
                    email: userProfile.email,
                    fName: userProfile.fName,
                    lName: userProfile.lName,
                    city: userProfile.city,
                    country: userProfile.country,
                    about: userProfile.about,
                });
            setAlertMessage({
                message: 'Profile successfully updated.',
                type: 'success',
            });
        } catch (error) {
            // The document probably doesn't exist.
            setAlertMessage({
                message: error.message,
                type: 'danger',
            });
        }
    }

    return (
        <div className="row">
            <div className="col-md-4 pb-3">
                <div className="card card-user">
                    <div className="image">
                        <img src={coverImage} alt="coverbackground"></img>
                    </div>
                    <div className="card-body">
                        <div className="author">
                            <div>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <img
                                            className="avatar border-gray"
                                            src={userProfile.avatar || avatarDefault}
                                            alt="..."
                                        />
                                        <div className="overlay-avatar">
                                            <div className="text">Change photo</div>
                                        </div>
                                    </label>
                                    <input id="file-input" type="file" onChange={handleFileUpload} />
                                </div>
                                <h5 className="title">{userProfile.fName + ' ' + userProfile.lName}</h5>
                            </div>
                        </div>
                        <p className="description text-center">"{userProfile.about}"</p>
                    </div>
                </div>
            </div>
            <div className="col-md-8 pb-3">
                <div className="card card-user">
                    <div className="card-header">
                        <h5 className="card-title">Edit Profile</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateProfile}>
                            <div className="row">
                                <div className="col-md-12 px-1">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            className={`form-control  ${errors.email && 'is-invalid'}`}
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={userProfile.email}
                                            {...bindInput('email')}
                                        />
                                        <div className="invalid-feedback">{errors.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 px-1">
                                    <div className="form-group">
                                        <label htmlFor="fName">First Name</label>
                                        <input
                                            type="text"
                                            className={`form-control  ${errors.fName && 'is-invalid'}`}
                                            id="fName"
                                            name="fName"
                                            placeholder="First Name"
                                            value={userProfile.fName}
                                            {...bindInput('fName')}
                                        />
                                        <div className="invalid-feedback">{errors.fName}</div>
                                    </div>
                                </div>
                                <div className="col-md-6 px-1">
                                    <div className="form-group">
                                        <label htmlFor="lName">Last Name</label>
                                        <input
                                            type="text"
                                            className={`form-control  ${errors.lName && 'is-invalid'}`}
                                            id="lName"
                                            name="lName"
                                            placeholder="Last Name"
                                            value={userProfile.lName}
                                            {...bindInput('lName')}
                                        />
                                        <div className="invalid-feedback">{errors.lName}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 px-1">
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            className={`form-control  ${errors.city && 'is-invalid'}`}
                                            id="city"
                                            name="city"
                                            placeholder="City"
                                            value={userProfile.city}
                                            {...bindInput('city')}
                                        />
                                        <div className="invalid-feedback">{errors.city}</div>
                                    </div>
                                </div>
                                <div className="col-md-6 px-1">
                                    <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <input
                                            type="text"
                                            className={`form-control  ${errors.country && 'is-invalid'}`}
                                            id="country"
                                            name="country"
                                            placeholder="Country"
                                            value={userProfile.country}
                                            {...bindInput('country')}
                                        />
                                        <div className="invalid-feedback">{errors.country}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 px-1">
                                    <div className="form-group">
                                        <label htmlFor="about">About Me</label>
                                        <textarea
                                            className={`form-control textarea ${errors.about && 'is-invalid'}`}
                                            id="about"
                                            name="about"
                                            value={userProfile.about}
                                            {...bindInput('about')}
                                        />
                                        <div className="invalid-feedback">{errors.about}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="update ml-auto mr-auto">
                                    <button type="submit" className="btn btn-azure">
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
