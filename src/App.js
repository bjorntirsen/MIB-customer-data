import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


function App() {
  const [customerList, setCustomerList] = useState([])
  const [formData, setFormData] = useState({
    email: "webb19@willandskill.se",
    password: "javascriptoramverk"
  })

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>

        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
      
    </>
  );
}

export default App;
