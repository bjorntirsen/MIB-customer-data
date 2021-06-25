import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CustomerListContext } from './contexts/CustomerListContext'
import { UserContext } from './contexts/UserContext'
import LoginPage from './pages/LoginPage'
import CustomerListPage from './pages/CustomerListPage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import Navbar from './components/Navbar'
import CustomerCreatePage from './pages/CustomerCreatePage'
import Background from './components/Background'


function App() {
  const [userData, setUserData] = useState(null)
  const [customerList, setCustomerList] = useState(null)

  function fetchCustomerList() {
    const url = "https://mib-api.herokuapp.com/api/v1/customers"
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
    const url = "https://mib-api.herokuapp.com/api/v1/users/getMe"
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.data.user._id) setUserData(data.data.user)
    })
    .catch(err => console.error(err))
  }

  return (
    <>
      <UserContext.Provider value={{userData, setUserData, fetchUserData}} >
        <CustomerListContext.Provider value={{customerList, setCustomerList, fetchCustomerList}} >
          <Navbar />
          <Background />
          <div className="container-md px-0 text-center text-light pt-5 mt-4">
            <Switch>
              <Route path="/customers/create">
                <CustomerCreatePage />
              </Route>

              <Route path="/customers/:id/edit" component={CustomerUpdatePage} />

              <Route path="/customers/:id" component={CustomerDetailPage} />

              <Route path="/customers">
                <CustomerListPage />
              </Route>

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
