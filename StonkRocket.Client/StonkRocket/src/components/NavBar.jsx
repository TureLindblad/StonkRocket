import SearchComponent from "./SearchComponent";
import { Link } from "react-router-dom";

const Navbar = () => {
    const navbarStyle = {
        backgroundColor: "grey"
    }
    return(
        <nav style={navbarStyle}><SearchComponent />
        <p>navbar</p>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/">Main Page</Link>
        </nav>
    )
}

export default Navbar;