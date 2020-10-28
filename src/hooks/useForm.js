import {useRef, useState, useEffect} from 'react';
import {validateInputFields} from '../utils/validation';

export default function useForm(initialValues, validationRules) {
    const [obj, setObj] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const alreadyValidated = useRef(false);

    useEffect(() => {
        setObj(initialValues);
    }, [initialValues]);

    function handleInputChange(e) {
        const {name, value, type} = e.target;
        const newVal = type === 'checkbox' || type === 'radio' ? !obj[name] : value;
        const newValues = {...obj, [name]: newVal};

        if (alreadyValidated.current) {
            const {errors} = validateInputFields(newValues, validationRules);

            setErrors(errors);
        }
        setObj(newValues);
    }

    function validateValues() {
        const {hasErrors, errors} = validateInputFields(obj, validationRules);

        if (hasErrors) {
            alreadyValidated.current = true;
            setErrors(errors);
        }
        return !hasErrors;
    }

    function bindInput(inputName, changedProp = 'value') {
        return {
            name: inputName,
            onChange: handleInputChange,
            [changedProp]: obj[inputName],
        };
    }
    return [obj, errors, bindInput, validateValues];
}
