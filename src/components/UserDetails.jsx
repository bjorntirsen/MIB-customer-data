import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

export default function UserDetails() {
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
        <div className="navbar navbar-dark bg-dark">
            {(userData !== null)
            ? (
                <>
                    <span className="text-light">Logged in as: </span>
                    <span className="text-light">
                        {`"${userData.firstName} 
                        ${userData.lastName}" ${userData.email} `}
                    </span>
                    <button onClick={logOut}>Log Out</button>
                </>
            )
            :
            (
                <span className="text-light">Not logged in</span>
            )}
        </div>
    )
}