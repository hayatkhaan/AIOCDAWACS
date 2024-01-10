import { useState } from "react";
import ContactList from "./ContactList";

const Contact = () => {
    let email = 'nihiratechiees@gmail.com'
    let addressobj = { address1: 'new street', address2: 'chennai' }

    const[techlist,listupdate]=useState([{ id: 1, name: 'React', version: 18.2 },
    { id: 2, name: 'Angular', version: 15 },
    { id: 3, name: 'dotnet', version: 6 }
    ])
    
    const removetech=(id)=>{
        console.log(id);

        const newlist=techlist.filter(item=>item.id!=id);
        listupdate(newlist);
        

    }
    return (
        <div style={{textAlign:'center'}}>
            <ContactList title="Welcome to React Class" email={email} addobj={addressobj} techlist={techlist} removetech={removetech}></ContactList>
        </div>
    );
}

export default Contact;