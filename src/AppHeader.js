import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prLogo from "./images/pharmarack.png";


const Appheader = () => {
    const [menuvisible, menuvisiblechange] = useState(true);
    const [adminuser, adminuserchange] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {

        if (location.pathname == '/register' || location.pathname == '/login') {
            menuvisiblechange(false);
        } else {
            let username = localStorage.getItem('username') != null ? localStorage.getItem('username').toString() : '';
            if (username === '') {
                navigate('/login');
            }
            menuvisiblechange(true);
            let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
            if (userrole === 'admin') {
                adminuserchange(true);
            }else{
                adminuserchange(false);
            }

        }

    }, [location]);
    return (
        <div>{menuvisible &&
            <div className="App-header">
                 <img src={prLogo} className="logoStyle">
                </img>
                {/* <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/customer">Customer</Link>
                <Link to="/associate">Associate</Link>
                {adminuser &&
                    <Link to="/user">User</Link>
                } */}
                <Link style={{ float: 'right', marginTop: '40px'  }} to="/login">Logout</Link>
            </div>
        }
        </div>
    );
}

export default Appheader;