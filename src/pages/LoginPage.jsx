import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { StyledButtonLarge } from '../components/StyledButtonLarge'
import { StyledButton } from '../components/StyledButton'


export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const history = useHistory()

    function handleOnChange(e) {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleOnSubmit(e) {
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
            if (data.token) {
                localStorage.setItem("WEBB20", data.token)
                history.push("/customers")
            } 
            else window.alert("Invalid email or password. Please try again.")
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            <h1 className="">
                <span>Welcome to <br/></span>
                <span className="logo-1 display-3"> MIB </span>
                <span className="logo-2 display-4"> Customer Data </span>
            </h1>
            <blockquote className="font-italic">"We are the best kept secret in the galaxy. We monitor, licence and police all alien activity on the Earth. We're your first, last, and only line of defense. We live in secret, we exist in shadow. And we dress in black."</blockquote>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleOnSubmit} >
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" autoComplete="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleOnChange} />
                        <small id="emailHelp" className="form-textd">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" autoComplete="current-password" className="form-control" id="inputPassword" name="password" value={formData.password}onChange={handleOnChange} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="align-self-end">
                            <StyledButtonLarge type="submit" primary>Sign In</StyledButtonLarge>
                        </div>
                        <div className="align-self-end">
                            <small id="emailHelp" className="form-text">Don't have an account?</small>
                            <StyledButtonLarge type="button" data-toggle="modal" data-target="#sign-up">
                            Sign Up
                            </StyledButtonLarge>
                        </div>
                    </div>
                </form>
            </div>
            {/* Modal */}
            <div className="modal fade" id="sign-up" tabIndex="-1" aria-labelledby="sign-up-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id="sign-up-label">Create New Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Sorry. We are too popular.</p>
                            <p>MIB has had an enourmous surge in new customers in the last year. Unfortunately we are not accepting new customers until our server capabilities has caught up with demand.</p>
                            <StyledButton type="button" className="btn btn-secondary m-2" data-dismiss="modal">Close</StyledButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
