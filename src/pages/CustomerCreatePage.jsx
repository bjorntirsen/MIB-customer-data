import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InputField from '../components/InputField';
import { CustomerListContext } from '../contexts/CustomerListContext';
import { UserContext } from '../contexts/UserContext';
import { StyledButton } from '../components/StyledButton';
import { StyledLink } from '../components/StyledLink';

export default function CustomerCreatePage() {
  const { fetchCustomerList } = useContext(CustomerListContext);
  const { userData } = useContext(UserContext);
  const [customerData, setCustomerData] = useState({});
  const history = useHistory();

  function createCustomer(e) {
    e.preventDefault();
    const url = 'http://localhost:3000/api/lists';
    const token = localStorage.getItem('MIB');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ ...customerData, user: userData._id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => fetchCustomerList())
      .then(() => history.push('/customers'))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <h1>Create Customer:</h1>
      <form onSubmit={createCustomer}>
        <table className="table table-dark table-max-width">
          <tbody>
            <InputField
              name="title"
              label="List Title"
              setCustomer={setCustomerData}
              customer={customerData}
              value={customerData.title}
            />
            <InputField
              name="body"
              label="List Body"
              setCustomer={setCustomerData}
              customer={customerData}
              value={customerData.body}
            />
          </tbody>
        </table>
        <StyledButton type="submit" primary="true">
          Create Customer
        </StyledButton>
        <StyledLink to={'/customers'}>Cancel</StyledLink>
      </form>
    </>
  );
}
