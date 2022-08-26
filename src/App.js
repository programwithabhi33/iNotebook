import { React, useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  // Defining the default alert state to show alert to the user first value be null and it will be handle on the alert.js
  const [alert, setAlert] = useState(null)

  // Defining the showalert function to change the message and the type of the alert state
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    // After showing the alert to the user the function setTimeout call the setalert (update state of alert) can set the alert state to be null after 2 seconds
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  }
  return (
    < >
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>} />
              <Route exact path='/about' element={<About  />} />
              <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
