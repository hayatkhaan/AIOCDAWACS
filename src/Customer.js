import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAccess from "./useAccess";
import SideBar from "./components/Sidebar/SideBar";
import "./Styles/login.css"

const Customer = () => {

    const [custlist, custupdate] = useState(null);
    const navigate = useNavigate();
    const handleremove = (code) => {
        if (havedelete) {
            if (window.confirm('do you want to remove this customer?')) {
                fetch('http://localhost:8000/customer/' + code, {
                    method: "DELETE"
                }).then(res => {
                    toast.success('removed successfully.');
                    navigate(0);
                }).catch((err) => {
                    console.log(err.message);
                });
            }
        } else {
            toast.warning('You not having access for Remove.')
        }

    }

    const { haveadd, haveedit, havedelete } = useAccess('customer');

    useEffect(() => {
        // getroleaccess();
        fetch('http://localhost:8000/customer').then(res => {
            return res.json();
        }).then(resp => {
            custupdate(resp);
        }).catch((err) => {
            console.log(err.message);
        });

    }, [])

    // const getroleaccess=()=>{
    //     let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
    //     fetch("http://localhost:8000/roleaccess?role="+userrole+"&menu=customer").then(res => {
    //         if(!res.ok){
    //             toast.warning('You are not autorized to access this menu');
    //             navigate('/');
    //         }
    //         return res.json();
    //     }).then(resp => {
    //         if(resp.length>0){
    //             let obj=resp[0];
    //             haveaddupdate(obj.haveadd);
    //             haveeditupdate(obj.haveedit);
    //             havedeleteupdate(obj.havedelete);
    //         }else{
    //             toast.warning('You are not autorized to access this menu');
    //             navigate('/');
    //         }
    //     }).catch((err) => {
    //         console.log(err.message);
    //     });

    // }

    const AddCustomer = () => {
        if (haveadd) {
            navigate('/customer/create');
        } else {
            toast.warning('You not having access for ADD.')
        }
    }
    const customeredit = (id) => {
        if (haveedit) {
            navigate('/customer/edit/' + id);
        } else {
            toast.warning('You not having access for Edit.')
        }
    }


    return (
            <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>User Details</h2>
                </div>
                <div className="card-body">
                    <div>
                        {/* <Link className="btn btn-success" to="/customer/create">Add Customer (+)</Link> */}
                        <button onClick={() => { AddCustomer() }} className="btn btn-success">Add User (+)</button>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Area</td>
                                <td>CreditLimit</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist &&
                                custlist.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.area}</td>
                                        <td>{item.creditlimit}</td>
                                        <td>
                                            <button onClick={() => { customeredit(item.id) }} className="btn btn-primary">Edit</button>
                                            {/* <Link to={"/customer/edit/"+item.id} className="btn btn-primary">Edit</Link> */}
                                            <a onClick={() => { handleremove(item.id) }} className="btn btn-danger">Remove</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        
    );
}

export default Customer;