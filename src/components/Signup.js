import React,{useState} from 'react'

function Signup() {

  let [credentials,setCredentials]= useState({name:"",email:"",password:"" ,retype:""})

  let handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password===credentials.retype){

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",

        },
        // Passing the arguments with JSON.stringify
        body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
    })
    const res = await response.json()
    console.log(res)
    localStorage.setItem("authtoken", res.authToken)
}
else{
  console.log("Retype password correctly")
}
}
let onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

  return (
    <>
      <div className='main-form'>
        <h2>SignUP</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input onChange={onChange} value={credentials.name} name='name' type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input name='email' onChange={onChange} value={credentials.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input name='password' onChange={onChange} value={credentials.password} type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="retype" className="form-label">Retype-Password</label>
            <input name='retype' onChange={onChange} type="password" className="form-control" id="retype" />
          </div>
          <div className='button-div'>
            <button type="submit" className="btn btn-primary login-button">SignUp</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup
