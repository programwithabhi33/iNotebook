import React, { useState } from 'react'
import { Link } from "react-router-dom";

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",

            },
            // Passing the arguments with JSON.stringify
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const res = await response.json()
        console.log(res)
        localStorage.setItem("authtoken", res.authToken)
    }
    let onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='main-form'>
                <h2>Login</h2>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={onChange} value={credentials.email} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={onChange} value={credentials.password} name='password' type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className='button-div'>
                        <button type="submit" className="btn btn-primary login-button">Login</button>
                    </div>
                    <div className='new-div'>
                        <Link to="/signup">New User Click Here</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
