import { useState, useEffect } from 'react';
import { storeSubject } from '../../services/subjectService';
import { useNavigate } from 'react-router-dom';

const useSubjectForm = () => {
    const navigate = useNavigate();

    const initialSubjectField = {
        descricao: "",
    };

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [subjectField, setSubjectField] = useState(initialSubjectField);

    const handleChange = (e) => {        
        setSubjectField({
            ...subjectField,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await storeSubject(subjectField); 
            setSubjectField(initialSubjectField);
            setErrorMessage(null);
            setSuccessMessage("Assunto salvo com sucesso!");

            setTimeout(() => {
                navigate("/assuntos");
            }, 1000); 
        } catch (e) {     
            setErrorMessage(e.error);
        }
    }

    const clickToBackHome = () => {
        navigate('/');
    } 

    return {
        successMessage,
        errorMessage,
        subjectField,
        handleChange,
        handleSubmit,        
        clickToBackHome,
    };
};

export default useSubjectForm;
