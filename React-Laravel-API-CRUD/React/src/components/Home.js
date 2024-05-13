import React, { useState } from 'react';
import axios from 'axios';
import List from './List';

const Home = () => {
    const[userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState();

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/adduser", userField);
            setLoading(true);
        } catch (err) {

        }
    }

    if(loading) {
        return <Home />
    }

  return (
    <div className='container'>
        <h2 className='w-100 d-flex justify-content-center p-3'>User Management</h2>
        <div className='row'>
            <div className='col-md-4'>
                <h3>Add User Detail</h3>
                <form>
                    <div className='mb-3 mt-3'>
                        <input type="text" className="form-control" onChange={e => changeUserFieldHandler(e)} id="name" placeholder="Full Name" name="name"/>
                    </div>
                    <div className='mb-3 mt-3'>
                        <input type="email" className="form-control" onChange={e => changeUserFieldHandler(e)} id="email" placeholder="Email" name="email" required/>
                    </div>
                    <div className='mb-3 mt-3'>
                        <input type="text" className="form-control" onChange={e => changeUserFieldHandler(e)} id="password" placeholder="Password" name="password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add User</button>
                </form>
            </div>
            <div className='col-md-8'>
                <List />
            </div>
        </div>
    </div>
  )
}

export default Home;

