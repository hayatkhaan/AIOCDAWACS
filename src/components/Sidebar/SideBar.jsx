import { NavLink } from "react-router-dom";
import { FaBars, FaClone, FaFileCsv, FaFileDownload, FaHome, FaLock, FaMoneyBill, FaRulerCombined, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillCloud, AiFillContacts, AiFillFile, AiFillFilePdf, AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import prLogo from "../../images/pharmarack.png";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  /*{
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },*/
  {
    path: "/file-manager",
    name: "MDM",
    icon: <BiAnalyse />,
    exact: true,
    subRoutes: [
      {
        path: "/analytics",
        name: "Mapping suggestion",
        icon: <FaClone />,
        exact: true,
          /*{subRoutes: [
          {
            path: "/user",
            name: "Reports-2 ",
            icon: <FaFileDownload />,
          }
        ],*/
      },
      {
        path: "/Manufacture-Mapping",
        name: "Manufacture-Mapping",
        icon: <FaClone />,
        exact: true,
          /*{subRoutes: [
          {
            path: "/user",
            name: "Reports-2 ",
            icon: <FaFileDownload />,
          }
        ],*/
      },
        /*{{
        path: "/settings/2fa",
        name: "Reports-3",
        icon: <FaFileDownload />,
      },
      {
        path: "/settings/billing",
        name: "Reports-3",
        icon: <FaFileDownload />,
      },*/
    ],
  },
    /*{{
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    exact: true,
    subRoutes: [
      {
        path: "/Analytics",
        name: "ESS File ",
        icon: <FaFileCsv />,
        exact: true,
        subRoutes: [
          {
            path: "/user",
            name: "User ",
            icon: <FaFileCsv />,
          }
        ],
      },
      {
        path: "/settings/2fa",
        name: "MTD File",
        icon: <FaFileCsv />,
      },
      {
        path: "/settings/billing",
        name: "EDE Invoices",
        icon: <AiFillFilePdf />,
      },
    ],
  },*/
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <BsCartCheck />,
  // },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "../customer",
        name: "Users ",
        icon: <FaUser />,
      },
        /*{{
        path: "/settings/2fa",
        name: "Password Change",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },*/
    ],
  },
  /*{
    path: "/saved",
    name: "Contact",
    icon: <AiFillContacts />,
  },*/
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Data Analytics
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
