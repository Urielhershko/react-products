import React, { useState } from 'react';
import axiosHttp from '../utils/axios';
// import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    try {
        const response = await axiosHttp.post('/token', {
           username: username,
           password: password
        })
        debugger
        setError(null)
        localStorage.setItem('token', response.data.access)
        navigate('/')
    }
    catch (ex) {
      if(ex.response.data && ex.response.data.detail){
        setError(ex.response.data.detail)
      }
      else{
        setError('Error')
      }
    }

  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>Login</button>
      </form>
      {error}
    </div>
  );
};

export default Login;
