import React from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { IoChatbox } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import { IoArchiveSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="navwrapper">
      <div className="imageWrapper">LOGO</div>
      <nav className="linkswrapper">
        <NavLink
          to="/"
          style={{ textDecoration: "none", color: "white" }}
          className={({ isActive }) => (isActive ? " link active" : "link")}
        >
          <IoChatbox className="icons" />

          <p className="firstPTag">
            <span></span>All chats
          </p>
        </NavLink>
        <NavLink
          to="/groups"
          style={{ textDecoration: "none", color: "white" }}
          className="link"
        >
          <MdGroups className="icons" />

          <p>
            <span></span>Groups
          </p>
        </NavLink>
        <NavLink
          to="/search"
          style={{ textDecoration: "none", color: "white" }}
          className="link"
        >
          <BiSolidSearchAlt2 className="icons" />

          <p>
            <span></span>search
          </p>
        </NavLink>
        <NavLink
          to="/archive"
          style={{ textDecoration: "none", color: "white" }}
          className="link"
        >
          <IoArchiveSharp className="icons" />
          <p>
            <span></span>Archive
          </p>
        </NavLink>
        <div className="dash" />
        <NavLink
          to="/profile"
          style={{ textDecoration: "none", color: "white" }}
          className="link"
        >
          <img src="../images/profile_white_icon.png" className="icons" />
          <p>
            <span></span>Profile
          </p>
        </NavLink>
      </nav>
      <div className="bottmwrapper">
        <NavLink
          to="/login"
          style={{ textDecoration: "none", color: "white" }}
          className="link"
        >
          <TbLogout2 className="icons" />
          <p>
            <span></span>logout
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
