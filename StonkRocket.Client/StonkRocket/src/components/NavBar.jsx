import SearchComponent from "./SearchComponent";
const Navbar = () => {
    const navbarStyle = {
        backgroundColor: "grey"
    }
    return(
        <nav style={navbarStyle}><SearchComponent /><p>navbar</p></nav>
    )
}

export default Navbar;