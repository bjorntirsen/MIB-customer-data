import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';


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
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      
    </>
  );
}

export default App;
