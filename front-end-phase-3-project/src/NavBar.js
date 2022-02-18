import React from "react"
import {NavLink} from "react-router-dom"

function NavBar() {

    return (
        <div className="navbar">
        <NavLink 
            to="/quotes"
            exact
            >
        Quotes
        </NavLink>
        <NavLink 
            to="/authors"
            exact
        >
        Authors
        </NavLink>
        <NavLink 
            to="/"
            exact
        >
        About
        </NavLink>
    </div>
    )
}

export default NavBar