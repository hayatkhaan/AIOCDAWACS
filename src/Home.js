import { useEffect, useState } from "react";
import SideBar from "./components/Sidebar/SideBar";
import Appheader from './AppHeader';
import prLogo from "./images/pharmarack.png";

const Home = () => {
    const Handleclick = () => {
        //console.log(pagetitle);
        headercahnge('React JS Tutorial');
        // console.log(pagetitle);

    }
    //let pagetitle='React JS 18.2 Tutorial'
    const [pagetitle, titlecahnge] = useState('Home')
    const [pagehaeder, headercahnge] = useState('Home')
    const obj = { name: '' };
    useEffect(() => {
        //  console.log('Use Effect hook');
    }, []);

    return (
        <>
            {/* <Appheader></Appheader>
        <SideBar> */}
            <div>
                <h2>{pagetitle}</h2>
                <h2>{obj.name}</h2>
                {/* <button className="btn btn-primary" onClick={() => Handleclick()}>Click Here</button> */}
            </div>
            {/* </SideBar> */}
        </>
    );
}

export default Home;