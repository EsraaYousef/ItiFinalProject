import React, { useState } from 'react'
import Logo from "../../images/logo_company.svg";
import { Link, Redirect, useHistory } from "react-router-dom";
import $ from "jquery";



import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    function loginUser(e) {
        e.preventDefault()

        fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (!data.success) {
                    console.log(data.message);
                    if (data.message == "This email doesn't exist!") {
                        $(".email-err").text(data.message);
                    } else if (data.message == "Authentication failed, password is incorrect!") {
                        $(".email-err").hide();
                        $(".psw-err").text(data.message);
                    }

                }
                else {
                    $(".email-err").hide();
                    $(".psw-err").hide();
                    localStorage.setItem("User Token", data.token);
                    localStorage.setItem("Email", data.userEmail);
                    localStorage.setItem("ID", data.userId);
                    history.push("/");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div class="form-container">
                <div class="d-flex justify-content-center">
                    <img src={Logo} alt="Logo" />
                </div>
                <form method="POST" onSubmit={(event) => { loginUser(event) }}>
                    <div class="email-div input-group">
                        {/* <span class="input-group-text p-4"><AiOutlineUser /></span> */}
                        <input type="email" name="email" class="form-control" onChange={(event) => { setEmail(event.target.value) }} placeholder="E-mail" required />
                    </div>

                    <span className="email-err"></span>


                    <div class="psw-div input-group mt-3 mb-2">
                        {/* <span class="input-group-text p-4"><AiOutlineLock /></span> */}
                        <input type="password" name="password" class="form-control" onChange={(event) => { setPassword(event.target.value) }} placeholder="Password" required />
                    </div>

                    <span className="psw-err"></span>

                    <div class="form-group">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input p-2" id="rememberCheckBox" />
                            <label class="custom-control-label m-2 form-text" for="rememberCheckBox">Remember me</label>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center ">
                        <input type="submit" value="Login" className="btn btn-main" />
                    </div>
                </form>
                <div class="mt-4">
                    <div class="d-flex justify-content-center links form-text ">
                        Don't have an account? <Link class="ml-2 signup-link" to="/signup"><u>Sign Up</u></Link>
                    </div>
                    <div class="d-flex justify-content-center links form-text">
                        <Link to="#">Forgot your password?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
