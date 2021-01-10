import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CustomerListContext } from './contexts/CustomerListContext'
import { UserContext } from './contexts/UserContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import CustomerDetailPage from './pages/CustomerDetailPage'

function App() {
  const [userData, setUserData] = useState(null)
  const [customerList, setCustomerList] = useState([])

  return (
    <>
      <UserContext.Provider value={{userData, setUserData}} >
        <CustomerListContext.Provider value={{customerList, setCustomerList}} >
          <Navbar />
          <Switch>
            <Route path="/home">
              <HomePage />
            </Route>

            <Route path="/customers/:id" component={CustomerDetailPage} />

            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </CustomerListContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
