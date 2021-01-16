import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CustomerListContext } from './contexts/CustomerListContext'
import { UserContext } from './contexts/UserContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import Navbar from './components/Navbar'
import CustomerCreatePage from './pages/CustomerCreatePage'


function App() {
  const [userData, setUserData] = useState(null)
  const [customerList, setCustomerList] = useState(null)

  function fetchCustomerList() {
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setCustomerList(data.results)
    })
    .catch(err => console.error(err))
  }

  function fetchUserData() {
    const url = "https://frebi.willandskill.eu/api/v1/me/"
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.id) setUserData(data)
    })
    .catch(err => console.error(err))
  }

  return (
    <>
      <UserContext.Provider value={{userData, setUserData, fetchUserData}} >
        <CustomerListContext.Provider value={{customerList, setCustomerList, fetchCustomerList}} >
          <Navbar />
          <div className="container-md text-center">
            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>

              <Route path="/customers/create">
                <CustomerCreatePage />
              </Route>

              <Route path="/customers/:id/edit" component={CustomerUpdatePage} />

              <Route path="/customers/:id" component={CustomerDetailPage} />

              <Route path="/">
                <LoginPage />
              </Route>
            </Switch>
          </div>
        </CustomerListContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
