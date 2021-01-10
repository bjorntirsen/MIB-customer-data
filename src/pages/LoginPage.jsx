import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "webb19@willandskill.se",
        password: "javascriptoramverk"
    })

    const history = useHistory()

    function handleOnChange(e) {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleOnSubmit(e) {
        const body = document.querySelector("body")
        e.preventDefault()
        const url = "https://frebi.willandskill.eu/api-token-auth/"
        const payload = {
            email: formData.email,
            password: formData.password
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.token)
            localStorage.setItem("WEBB20", data.token)
            body.classList.remove("modal-open")
            history.push("/home")
        })
    }

    return (
        <div className="text-center container">
            <h1>
            Welcome to MIB Customer Data! <br/> My assistant In Black
            </h1>
            <div className="d-flex justify-content-center">
                <div className="m-2">
                    <p>New to MIB?</p>
                    <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#sign-up">
                    Sign Up
                    </button>
                </div>
                <div className="m-2">
                    <p>Have an account?</p>
                    <button type="button" className="btn btn-secondary btn-lg" data-toggle="modal" data-target="#sign-in">
                    Sign In
                    </button>
                </div>
            </div>
            {/* Modals. Refactor into components later */}
            <div className="modal fade" id="sign-up" tabIndex="-1" aria-labelledby="sign-up-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="sign-up-label">Create New Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Sorry. We are too popular.</p>
                            <p>MIB has had an enourmous surge in new customers in the last year. Unfortunately we are not accepting new customers until our server capabilities has caught up with demand.</p>
                            <button type="button" className="btn btn-secondary m-2" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="sign-in" tabIndex="-1" aria-labelledby="sign-in-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="sign-in-label">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleOnSubmit} >
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Email address</label>
                                    <input type="email" autoComplete="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleOnChange} />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input type="password" autoComplete="current-password" className="form-control" id="inputPassword" name="password" value={formData.password}onChange={handleOnChange} />
                                </div>
                                <button type="submit" className="btn btn-primary m-2">Log In</button>
                                <button type="button" className="btn btn-secondary m-2" data-dismiss="modal">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
