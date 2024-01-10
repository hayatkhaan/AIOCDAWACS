
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import prLogo from "./images/pharmarack.png";
import Addcustomer from './AddCustomer';
import './App.css';
import Appheader from './AppHeader';
import Contact from './Contact';
import Customer from './Customer';
import Editcustomer from './EditCustomer';
import Error from './Error';
import Home from './Home';
import {ToastContainer} from 'react-toastify'
import Registeration from './Registeration';
import Login from './Login';
import Userlisting from './Userlisting';
import Associate from './Associate';

import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";


function App() {
  return (
    <div className="App">

      <Router>
        <Appheader></Appheader> 
        {/* <SideBar> */}
            <Routes>
            <Route path='login' element={<Login/>}></Route>
            <Route path='/' element={<SideBar><Home/></SideBar>}></Route>
            <Route path="/" element={<SideBar><Dashboard /></SideBar>} />
            <Route path="/users" element={<SideBar><Users /></SideBar>} />
            <Route path="/messages" element={<SideBar><Messages /></SideBar>} />
            <Route path="/analytics" element={<SideBar><Analytics /></SideBar>} />
            <Route path="/file-manager" element={<SideBar><FileManager /></SideBar>} />
            <Route path="/order" element={<SideBar><Order /></SideBar>} />
            <Route path="/saved" element={<SideBar><Saved /></SideBar>} />
            <Route path="/settings" element={<SideBar><Setting /></SideBar>} />

            <Route path="*" element={<SideBar><> not found</></SideBar>} />
            <Route path='contact' element={<SideBar><Contact/></SideBar>}></Route>
            <Route path='customer' element={<SideBar><Customer/></SideBar>}></Route>
            <Route path='customer/create' element={<SideBar><Addcustomer/></SideBar>}></Route>
            <Route path='customer/edit/:code' element={<SideBar><Editcustomer/></SideBar>}></Route>
            <Route path='register' element={<Registeration/>}></Route>
            
            <Route path='user' element={<Userlisting/>}></Route>
            <Route path='associate' element={<Associate/>}></Route>
            <Route path='*' element={<Error></Error>}></Route>
            
            </Routes>
            {/* </SideBar> */}
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
