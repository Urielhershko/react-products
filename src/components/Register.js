import React, { useEffect, useState } from "react";
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import axiosHttp from '../utils/axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      navigate('/')
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    checkValidations()

    try {
       const response = await axiosHttp.post('/register', {
         username: username,
         first_name: firstName,
         last_name: lastName,
         email: email,
         password: password
       })
       setError(null)
       navigate('/login')
    }
    catch (error) {
       if(error.response.data){
        setError(error.response.data)
       }
       else{
        setError('Error')
       }
    }
  }

  const checkValidations = () => {
    if (username === '')
      setUsernameError(true)
    if (firstName === '')
      setFirstNameError(true)
    if (lastNameError === '')
      setLastNameError(true)
    if (email === '')
      setEmailError(true)
    if (password === '')
      setPasswordError(true)
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={onSubmit}>
        <TextField
          label='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          sx={{ mb: 3 }}
          fullWidth
          type="text"
          value={username}
          error={usernameError} />

        <TextField
          label='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          sx={{ mb: 3 }}
          fullWidth
          type="text"
          value={firstName}
          error={firstNameError} />

        <TextField
          label='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          sx={{ mb: 3 }}
          fullWidth
          type="text"
          value={lastName}
          error={lastNameError} />

        <TextField
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          sx={{ mb: 3 }}
          fullWidth
          type="email"
          value={email}
          error={emailError} />

        <TextField
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          sx={{ mb: 3 }}
          fullWidth
          type="password"
          value={password}
          error={passwordError} />
        <Button variant="outlined" color="secondary" type="submit">Register</Button>
      </form>
      <div>{error}</div>
      <small>Have an account? <Link to='/login'>To Login</Link></small>
    </div>
  )
}

export default Register;
