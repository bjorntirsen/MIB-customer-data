import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CustomerListContext } from './contexts/CustomerListContext'
import { UserContext } from './contexts/UserContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import Navbar from './components/Navbar'


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

            <Route path="/customers/:id/edit" component={CustomerUpdatePage} />

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
