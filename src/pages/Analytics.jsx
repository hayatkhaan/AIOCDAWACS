import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import Appheader from '../AppHeader';
import MDM from '../components/Sidebar/MDM';

const Analytics = () => {
  return (
    <>
    {/* <Appheader></Appheader>
    <SideBar> */}
      <div className="title"> MDM Potential Match
      <MDM />
      </div>
    {/* </SideBar> */}
    </>
    )
};

export default Analytics;
