import { useContext, useState } from "react"
import { AuthContext } from "../authContext";

const Login = () => {
    const { login, logout, isLoggedIn, user } = useContext(AuthContext);
    const [userName, setUserName] = useState('');

    const handleLogin = () => {
        login(userName)
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
        {isLoggedIn ?
            <div>
                <div className="login">
                    <b>Logged in as {user.name}</b>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            :
            <div>
                <input 
                    type="text"
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username" 
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        }
        </div>
    )
}

export default Login