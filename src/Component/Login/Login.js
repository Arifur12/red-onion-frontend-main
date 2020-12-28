import React, { useState } from 'react';
import logo2 from "../../image/logo2.png";
import UseAnimations from "react-useanimations";
import "./Login.css";
import { Link } from "react-router-dom";
import loginbg from "../../image/loginbg.jpg";
import Auth from "../../use.auth";
const Login = () => {
    const [acc, setAcc] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [repass, setRepass] = useState('');
    const [password, setPassword] = useState('');
    const [inavlid, setInvalid] = useState(false);
    const [error, setError] = useState('');
    const auth = Auth();
    // console.log(auth);
    const signInBtn = (e) => {
        e.preventDefault();
        auth.signIn(email, password)
            .then(res => {
                if (res === 2) {
                    setInvalid(true);
                }
                else {
                    localStorage.setItem("user", true);
                    window.location.pathname = "/";
                }
            })
    }
    const passChg = (pass) => {
        setPassword(pass);
        // console.log(e);
    }
    const emailChk = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmail(email);

        }

        //console.log(e);
    }
    const createAccount = (e) => {

        e.preventDefault();
        //console.log(repass);
        if (password === repass) {
            auth.signUp(name, email, password)
                .then(res => {
                    if (res === 1) {
                        setError('');
                        localStorage.setItem("user", true);
                        window.location.pathname = "/";
                    }
                    else {
                        const err_msg = {
                            msg: res
                        }
                        setError(err_msg);
                    }
                })
        }
        else {
            const err_msg = {
                msg: "password not match"
            }
            setError(err_msg);
        }
    }
    return (
        <div className="container-fluid login-container" style={{ backgroundImage: `url(${loginbg})` }}>
            <div className="login-container2">
                <Link to="/">
                    <img src={logo2} alt="logo2" className="img-fluid" />
                </Link>
                {
                    acc ?
                        <div>
                            <form className="sign_up_form" onSubmit={signInBtn}>
                                <input type="text" name="email" placeholder="E-mail" onBlur={(e) => emailChk(e.target.value)} required />
                                <input type="password" name="password" placeholder="Password" onBlur={(e) => passChg(e.target.value)} required />
                                {
                                    inavlid && <span>Invalid User or Password</span>
                                }
                                <input type="submit" value="Sign In" className="btn-danger" />
                            </form>

                            <h5 className="text-dark account" onClick={() => setAcc(false)}>Create an Account</h5>
                        </div>
                        :
                        <div>
                            <form className="sign_up_form" onSubmit={createAccount}>
                                <input type="text" name="name" placeholder="User Name" required onBlur={(e) => setName(e.target.value)} />
                                <input type="text" name="email" placeholder="E-mail" required onBlur={(e) => emailChk(e.target.value)} />
                                <input type="password" name="password" placeholder="Password" required onBlur={(e) => passChg(e.target.value)} />
                                <input type="password" name="re-password" placeholder="Re-password" required onBlur={(e) => setRepass(e.target.value)} />
                                {
                                    error && <span style={{ color: "red" }}>{error.msg}</span>
                                }
                                <input type="submit" value="Sign Up" className="btn-danger" />
                            </form>
                            <h5 className="text-dark account" onClick={() => setAcc(true)}>Already have account</h5>
                        </div>
                }
            </div>
        </div>
    );
};

export default Login;