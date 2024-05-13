import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const List = () => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/api/users");
      setUserData(result.data.results);
    } catch (err) {

    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/deleteuser/"+id);
      const newUserData = userData.filter((item) => {
        return(
          item.id !== id
        )
      })
      setUserData(newUserData);
    } catch (err) {

    }
  }

  return (
    <div className='container'>
      <h3>User Details</h3>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Ful name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.map((user, i) => {
              return(
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <NavLink to={`/view/${user.id}`} className="btn btn-success">View</NavLink>
                    <NavLink to={`/edit/${user.id}`} className="btn btn-info mx-1">Edit</NavLink>
                    <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Del</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default List;

