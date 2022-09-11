import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  const {showAlert} = props;
  let [credentials, setCredentials] = useState({ name: "", email: "", password: "", retype: "" })

  // This is useNavigate hook provide you to redirect
  let history = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.retype) {
      // Destructing 
      const { name, email, password, } = credentials;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",

        },
        // Passing the arguments with JSON.stringify
        body: JSON.stringify({ name, email, password })
      })
      const res = await response.json()
      console.log(res)
      if(res.error){
        showAlert('User with this email already exist try another email','warning')
      }
      if (res.success) {
        localStorage.setItem("authtoken", res.authToken)
        history("/")
        showAlert('SignUp Successfully','success')

      }
      else {
        showAlert('Some error occured during signup','danger')
      }
    }
    else {
      showAlert("Password do not match",'danger');
    }
  }
  let onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='main-form'>
        <h2 className='my-2'>SignUP to use the iNotebook</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input required onChange={onChange} value={credentials.name} name='name' type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input required name='email' onChange={onChange} value={credentials.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input required minLength={6} name='password' onChange={onChange} value={credentials.password} type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="retype" className="form-label">Retype-Password</label>
            <input required minLength={6} name='retype' onChange={onChange} type="password" className="form-control" id="retype" />
          </div>
          <div className='button-div'>
            <button type="submit" className="btn btn-primary login-button">SignUp</button>
          </div>
          <div className='new-div'>
            <Link to="/login">Already User Click Here</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup
