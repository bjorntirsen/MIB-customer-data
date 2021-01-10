import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">MIB Customer Data</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true">Customer List Disabled</a>
                    </li>
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    {/* Add how long the user in logged in for maybe */}
                    <span className="mr-sm-2 text-light" >You are not logged in</span>
                    <button className="btn btn-outline-success my-2 my-sm-1">Log In</button>
                </div>
            </div>
        </nav>
    )
}
