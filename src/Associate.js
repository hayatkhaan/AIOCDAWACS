import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Associate = () => {
    const[cuslist,listupdate]=useState([]);
    const navigate=useNavigate();
    
    //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWludXNlciIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTY3Nzk5MDQwMCwiZXhwIjoxNjc3OTkxNjAwLCJpYXQiOjE2Nzc5OTA0MDB9.LABQu_X5cZ1WXXvdmBdxpuQxYKAvcw-s1XvLPYc6wnA'
    useEffect(()=>{
        const token=localStorage.getItem('token')!=null?localStorage.getItem('token').toString():'';
        
        if(token!=''){
        fetch('https://localhost:44308/Customer',{
            headers:{'Authorization':'bearer '+token}
        }).then(res => {
            if(!res.ok){
                if(res.status===401){
                    toast.warning('Unauthorized access');
                    navigate('/');
                }
                return false;
            }
            return res.json();
        }).then(resp => {
            listupdate(resp);
        }).catch((err) => {
            console.log(err.message);
        });
    }else{
        toast.warning('Unauthorized access');
        navigate('/');
    }

    },[]);
    return ( 
        <div>
            <table className="table table-bordered">
               <thead className="bg-dark text-white">
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>C.Limit</td>
                </tr>
               </thead>
               <tbody>
                {cuslist &&
                cuslist.map(item=>(
                    <tr key={item.id}>
<td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.creditLimit}</td>
                    </tr>
                ))
              
}
               </tbody>
            </table>
        </div>
     );
}
 
export default Associate;