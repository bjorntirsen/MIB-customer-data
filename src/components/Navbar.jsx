import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { StyledButton } from './StyledButton'

export default function Navbar() {
    const { userData, setUserData, fetchUserData } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if (!userData && (localStorage.getItem("WEBB20") !== null)) {
            fetchUserData()
        }
    }, [userData, fetchUserData])

    function logOut() {
        localStorage.removeItem('WEBB20')
        setUserData(null)
        history.push("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">MIB Customer Data</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Customer List</Link>
                    </li>
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    {(userData !== null) ? (
                        <>
                            <span className="text-light">Logged in as: </span>
                            <span className="text-light">
                                {`"${userData.firstName} 
                                ${userData.lastName}" ${userData.email} `}
                            </span>
                            <StyledButton onClick={logOut}>Log Out</StyledButton>
                        </>
                    ) : (
                        <span className="text-light">You are not logged in</span>
                    )}
                </div>
            </div>
        </nav>
    )
}
