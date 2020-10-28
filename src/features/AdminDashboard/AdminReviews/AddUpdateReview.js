import React, {useState, useContext, useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {AuthContext} from '../../Auth/AuthContext';
import {CurrentDate} from '../../../utils/CurrentDate';
import {useHistory, useParams} from 'react-router-dom';
import {AlertMessageContext} from '../../../components/common/AlertMessageContext/AlertMessageContext';
import useForm from '../../../hooks/useForm';

export default function AddUpdateReview() {
    const db = firebase.firestore();
    const history = useHistory();
    const {id} = useParams();

    const {user} = useContext(AuthContext);
    const {setAlertMessage} = useContext(AlertMessageContext);

    const [file, setFile] = useState('');

    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        reviewDate: CurrentDate(),
        imageUrl: '',
    });

    const validationRules = {
        title: [{type: 'required'}],
        description: [{type: 'required'}],
    };

    const [review, errors, bindInput, isFormValid] = useForm(initialValues, validationRules);

    useEffect(() => {
        if (!id) {
            return;
        }
        // Access collection with name 'reviews' then get document with autogenerated id
        const unsub = db
            .collection('reviews')
            .doc(id)
            .onSnapshot(res => {
                setInitialValues(res.data());
            });
        return unsub;
    }, [db, id]);

    function handleFileUpload(e) {
        setFile(e.target.files[0]);
        const fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.onload = ({target: {result}}) => setInitialValues({...review, imageUrl: result});
    }

    async function handleAddreview() {
        if (!isFormValid()) {
            return;
        }

        if (user && review.title) {
            let imageUrl = '';
            try {
                if (file) {
                    const imageRef = firebase
                        .storage()
                        .ref()
                        .child(`images/${Math.floor(Math.random() * 10000) + file.name}`);
                    const snapshot = await imageRef.put(file);
                    imageUrl = await snapshot.ref.getDownloadURL();
                }

                await db.collection('reviews').add({
                    title: review.title,
                    description: review.description,
                    reviewDate: CurrentDate(),
                    imageUrl: imageUrl,
                });

                setAlertMessage({
                    message: 'Review successfully added!',
                    type: 'success',
                });
                history.push('/admin/reviews');
            } catch (error) {
                setAlertMessage({
                    message: error.message,
                    type: 'danger',
                });
            }
        }
    }

    async function handleUpdatereview(item) {
        if (!isFormValid()) {
            return;
        }

        try {
            await db.collection('reviews').doc(id).update({
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
            });

            setAlertMessage({
                message: 'Review successfully updated!',
                type: 'success',
            });
            history.push('/admin/reviews');
        } catch (error) {
            // The document probably doesn't exist.
            setAlertMessage({
                message: error.message,
                type: 'danger',
            });
        }
    }

    return (
        <>
            <form onSubmit={id ? handleUpdatereview : handleAddreview}>
                {alert && alert.message ? (
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                ) : null}
                <div className="jumbotron jumbotron-fluid h-100">
                    <div className="container">
                        <h1 className="display-4">{id ? 'Update Review' : 'Add Review'}</h1>
                        <div className="d-flex flex-column form-group pb-3">
                            {review && review.imageUrl ? (
                                <img src={review.imageUrl} width="200" className="rounded shadow" alt="review" />
                            ) : (
                                ''
                            )}
                            <br />
                            <label>Upload an image:</label>
                            <input className="form-control-file" type="file" onChange={handleFileUpload} />
                        </div>

                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`form-control  ${errors.title && 'is-invalid'}`}
                                placeholder="Insert review title"
                                name="title"
                                value={review.title}
                                {...bindInput('title')}
                            />
                            <div className="invalid-feedback">{errors.title}</div>
                        </div>

                        <div className="input-group">
                            <textarea
                                type="text"
                                className={`form-control  ${errors.description && 'is-invalid'}`}
                                id="description"
                                name="description"
                                placeholder="Insert review description"
                                rows="6"
                                value={review.description}
                                {...bindInput('description')}
                            />
                            <div className="invalid-feedback">{errors.description}</div>
                        </div>
                        <div className="input-group justify-content-center mt-3">
                            <button
                                className="btn btn-primary"
                                disabled={!review.title}
                                type="button"
                                onClick={id ? () => handleUpdatereview(review) : handleAddreview}
                            >
                                {id ? 'Save' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}