import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

    const {id} = useParams();
    const[userField, setUserField] = useState([{
        name: "",
        email: ""
    }]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get("http://127.0.0.1:8000/api/user/"+id);
                setUserField(result.data.results);
            } catch (err) {
    
            }
        }
        fetchUser();
    }, [id]);

    const clickBackHandler = () => {
        navigate('/');
    }   

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://127.0.0.1:8000/api/updateuser/"+id, userField);
            navigate('/');
        } catch (err) {

        }
    }

  return (
    <div className='container'>
        <h1>Edit Form</h1>
        <form>
            <div className='mb-3 mt-3'>
                <input type="text" className='form-control' id='id' name="id" value={id} disabled />
            </div>
            <div className='mb-3 mt-3'>
                <input type="text" className='form-control' id='name' name="name" onChange={e => changeUserFieldHandler(e)} value={userField.name} placeholder='Full name' />
            </div>
            <div className='mb-3 mt-3'>
                <input type="email" className='form-control' id='email' name="email" onChange={e => changeUserFieldHandler(e)} value={userField.email} placeholder='Email' />
            </div>
            <div className='mb-3 mt-3'>
                <input type="password" className='form-control' id='password' name="password" onChange={e => changeUserFieldHandler(e)} value={userField.password} placeholder='Password' />
            </div>
            <button type="submit" className='btn btn-primary' onClick={e => onSubmitChange(e)} >Update</button>
        </form>
        <div className='container d-flex justify-content-center'>
            <div>
                <button className='btn btn-primary' onClick={clickBackHandler}>Back to Home</button>
            </div>
        </div>
    </div>
  )
}

export default Edit;
