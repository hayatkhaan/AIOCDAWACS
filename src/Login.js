import { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Img from "./Assets/result.svg"
import "./Styles/login.css"
import { color } from "framer-motion";

const Login = () => {
    const [id, idchange] = useState('');
    const [password, pwchange] = useState('');

    const navigate = useNavigate();

    const validate = true;

    useEffect(() => {
        localStorage.clear();

    }, [])

    const handlesubmit = (e) => {
        e.preventDefault();
        functionvalidate();
        if (validate) {

            fetch("http://localhost:8000/user?id=" + id + "&password=" + password).then(res => {
                if (!res.ok) {
                    toast.error('Login Failed')
                }
                return res.json();
            }).then(res => {
                if (res.length > 0) {
                    let userobj = res[0];
                    if (userobj.isactive === true) {
                        localStorage.setItem('username', id);
                        localStorage.setItem('userrole', userobj.role);
                        loginapi();
                        navigate('/');
                    } else {

                        toast.error('User in InActive state, please contact admin for activation');
                    }

                } else {
                    toast.error('Login Failed')
                }

            });

        } else {
            toast.warning('Please enter valid credenetials & proceed');
        }
        const loginapi = () => {
            fetch('https://localhost:44308/User/Authenticate', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    "username": id,
                    "password": password
                })
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(res => {
                localStorage.setItem('token', res.jwtToken);
            });

        }
        // if (validate) {
        //     fetch("http://localhost:8000/user", {
        //         method: "POST",
        //         headers: { "content-type": "application/json" },
        //         body: JSON.stringify(regobj)
        //     }).then(res => {
        //         toast.success('Registered successfully', 'Please contact admin for activation');
        //     }).catch((err) => {
        //         console.log(err.message);
        //     })
        // } else {
        //     toast.warning('Please enter valid data & proceed');
        // }
    };

    const functionvalidate = () => {
        if (id.length === 0) {
            validate = false;

        }
        if (password.length === 0) {
            validate = false;
        }
    }

    return (
        <div className="body">
            <div className="left-login">
                <img src={Img} alt="chart" className="chart" />
            </div>
            <div className="right-login">
                <div className="card-login">
                    <div className="user-links">
                    </div>
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="login-form">
                            <div className="offset-lg-2 col-lg-8">
                                <div className="card-body">
                                    <div className="card-header">
                                        <h2 style={{color: "white"}}>Pharm-Analytics</h2>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>User Name <span className="text-danger">*</span></label>
                                            <input value={id} onChange={e => idchange(e.target.value)} placeholder="Username" className="form-control"></input>
                                        </div>

                                        <div className="form-group">
                                            <label>Password<span className="text-danger">*</span></label>
                                            <input value={password} type="password" onChange={e => pwchange(e.target.value)} placeholder="Password" className="form-control"></input>
                                        </div>

                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger" type="submit">Login</button>
                                        {/* <Link className="btn btn-primary" to="/register">New User?</Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div> 
           </div>
            
        </div>
    );
}

export default Login;