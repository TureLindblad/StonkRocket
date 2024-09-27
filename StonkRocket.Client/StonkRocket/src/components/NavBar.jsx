import SearchComponent from "./SearchComponent";
import { Link } from "react-router-dom";
import "../styling/Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <img src="/StonkRocket.png" alt="StonkRocketLogo" className="logo"></img>
            </Link>
            <SearchComponent />
            <div className="menu-container">
                <input type="checkbox" id="menu-toggle" className="menu-toggle-checkbox" />
                <label htmlFor="menu-toggle" className="menu-toggle-label">
                    ☰
                </label>
                <nav className="pageLinks">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/">Main Page</Link>
                </nav>
            </div>
        </nav>
    )
}

export default Navbar;