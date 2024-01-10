import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import useAccess from "./useAccess";
import "./Styles/login.css"

const Editcustomer = () => {
    const [id, idchange] = useState(0);
    const [name, namechange] = useState('');
    const [area, areachange] = useState('Chennai');
    const [creditlimit, limitchange] = useState('');
    const{code}=useParams();

    const navigate=useNavigate();
    const{haveadd,haveedit,havedelete}=useAccess('customer');

    useEffect(()=>{
        if(haveedit===true){

        fetch("http://localhost:8000/customer/"+code).then(res=>{
            return res.json();
        }).then(res=>{
            idchange(res.id);
            namechange(res.name);
            limitchange(res.creditlimit);
            area(res.area);
        }).catch((err)=>{
            console.log(err.message);
        })
    }else{
        toast.warning('You not having access for Edit.');
        navigate('/customer')
    }

    },[haveedit]);

    const handlesubmit = (e) => {
        e.preventDefault();
        const custobj = { id,name, area, creditlimit };
       // console.log(custobj)

        fetch("http://localhost:8000/customer/"+id, {
         method:"PUT",
         headers:{"content-type":"application/json"},
         body:JSON.stringify(custobj)
        }).then(res => {
          toast.success('Updated successfully.');
           navigate('/customer');

        }).catch((err) => {
            console.log(err.message)

        })

    }

    return (
        <div style={{ display: 'block', 
        width: 800, 
        padding: 30,
        paddindTop: 0 }}>

            <form className="container" onSubmit={handlesubmit}>
                <div className="card">
                    <div className="offset-lg-2 col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h2>Edit User</h2>
                            </div>
                            <div className="card-body">
                            <div className="form-group">
                                    <label>Code</label>
                                    <input  disabled={true} value={id} onChange={e => idchange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Area</label>
                                    {/* <input className="form-control"></input> */}
                                    <select onChange={e => areachange(e.target.value)} value={area} className="form-control">
                                        <option value="Chennai">Chennai</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Hydrabad">Hydrabad</option>
                                        <option value="Banglore">Banglore</option>
                                        <option value="Delhi">Delhi</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Creditlimit</label>
                                    <input onChange={e => limitchange(e.target.value)} value={creditlimit} className="form-control"></input>
                                </div>

                            </div>
                            <div className="card-footer">
                                <button className="btn btn-success" type="submit">Save</button>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}
 
export default Editcustomer;