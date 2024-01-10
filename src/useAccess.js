import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const useAccess=(menuname)=>{
    const [haveadd, haveaddupdate] = useState(true);
    const [haveedit, haveeditupdate] = useState(true);
    const [havedelete, havedeleteupdate] = useState(true);

    const navigate=useNavigate();

    const updatestate=()=>{
        haveaddupdate(false);
        haveeditupdate(false);
        havedeleteupdate(false);
    }

     useEffect(()=>{
       
        let userrole = localStorage.getItem('userrole') != null ? localStorage.getItem('userrole').toString() : '';
        fetch("http://localhost:8000/roleaccess?role="+userrole+"&menu="+menuname+"").then(res => {
            if(!res.ok){
                toast.warning('You are not autorized to access this menu:'+menuname);
                updatestate();
                navigate('/');
            }
            return res.json();
        }).then(resp => {
            if(resp.length>0){
                let obj=resp[0];
                haveaddupdate(obj.haveadd);
                haveeditupdate(obj.haveedit);
                havedeleteupdate(obj.havedelete);
            }else{
                toast.warning('You are not autorized to access this menu:'+menuname);
                updatestate();
                navigate('/');
            }
        }).catch((err) => {
            updatestate();
            console.log(err.message);
        });

     },[menuname])
    return {haveadd,haveedit,havedelete};

}
export default useAccess;