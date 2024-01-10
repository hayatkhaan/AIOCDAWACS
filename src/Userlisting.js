import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Userlisting = () => {
    const navigate=useNavigate();

    const [userlist, userlistupdate] = useState([]);
    const [showlisting, showlistingupdate] = useState(true);
    const [rolelist, rolelistupdate] = useState([]);

    const [id, idchange] = useState('');
    const [name, namechange] = useState('');
    const [role, rolechange] = useState('');
    const [email, emailchange] = useState('');
    const [mobile, mobilechange] = useState('');
    const [password, pwchange] = useState('');
    const [address, addresschange] = useState('');
    const [isactive, activechange] = useState(false);



    useEffect(() => {
        let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
        if(userrole !='admin'){
            navigate('/');
        }


        fetch('http://localhost:8000/user').then(res => {
            return res.json();
        }).then(resp => {
            userlistupdate(resp);
        }).catch((err) => {
            console.log(err.message);
        });
        loadrole();

    }, [showlisting])

    const handlesubmit = (e) => {
        e.preventDefault();
        let userobj={id,name,email,password,mobile,address,role,isactive}

        fetch("http://localhost:8000/user/"+id, {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(userobj)
           }).then(res => {
             toast.success('Updated successfully.');
             showlistingupdate(true);
   
           }).catch((err) => {
               console.log(err.message)
   
           })

    };
    const updateuser = (id) => {
        showlistingupdate(false);
        fetch('http://localhost:8000/user/'+id).then(res => {
            if(!res.ok){
                return false;
            }
            return res.json();
        }).then(res => {
            idchange(res.id);
            namechange(res.name);
            emailchange(res.email);
            pwchange(res.password);
            rolechange(res.role);
            mobilechange(res.mobile);
            addresschange(res.address); 
            activechange(res.isactive);
        }).catch((err) => {
            console.log(err.message);
        });

    }
    const loadrole = () => {
        fetch('http://localhost:8000/role').then(res => {
            return res.json();
        }).then(resp => {
            rolelistupdate(resp);
        }).catch((err) => {
            console.log(err.message);
        });
    };
    return (
        <div className="container">
            {showlisting &&
                <div className="card">
                    <div className="card-header">
                        <h2>User Listing</h2>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>Username</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Role</td>
                                    <td>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {userlist &&
                                    userlist.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.isactive === true ? 'Active' : 'InActive'}</td>
                                            <td>
                                                <button onClick={() => { updateuser(item.id) }} className="btn btn-primary">Update</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            }

            <div>
                {!showlisting &&
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="row">
                            <div className="offset-lg-2 col-lg-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Update User</h2>
                                    </div>
                                    <div className="card-body">
                                    <div className="form-group">
                                            <label>User Name : {name}</label>
                                            </div>

                                        <div className="form-group">
                                            <label>Role</label>
                                            <select value={role} onChange={e=>rolechange(e.target.value)} className="form-control">
                                                <option value="">Select Role</option>
                                                {rolelist &&
                                                    rolelist.map((item) => (
                                                        <option value={item.code} key={item.code}>{item.name}</option>
                                                    ))}

                                            </select>
                                        </div>

                                        <div className="form-check">
                                            <label>Is Active</label>
                                            <input checked={isactive===true?'checked':''} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        </div>

                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-success" type="submit">Update</button> |
                                        <button onClick={() => { showlistingupdate(true) }} className="btn btn-danger" type="button">Cancel</button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </form>
                }
            </div>
        </div>


    );
}

export default Userlisting;