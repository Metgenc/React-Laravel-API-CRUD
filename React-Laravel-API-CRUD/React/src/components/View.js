import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const View = () => {

    const {id} = useParams();
    const[user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get("http://127.0.0.1:8000/api/user/"+id);
                setUser(result.data.results);
            } catch (err) {
    
            }
        }
        fetchUser();
    }, [id]);

    const clickBackHandler = () => {
        navigate('/');
    }    
        
  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>User Details</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Ful name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className='container d-flex justify-content-center'>
            <div>
                <button className='btn btn-primary' onClick={clickBackHandler}>Back to Home</button>
            </div>
        </div>
    </>
  )
}

export default View;
