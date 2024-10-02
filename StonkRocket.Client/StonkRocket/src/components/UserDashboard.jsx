import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../authContext";
import "../styling/DashBoardList.css"
import RemoveButton from "./RemoveButton";


const UserDashboard = () => {
    const { user, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
        <div>
            {isLoggedIn ?
                <div>Loading</div>
                :
                <div><h1>Not logged in</h1></div>
            }
        </div>
        )
    }

    const handleClick = (ticker) => {
        navigate(`/stockviewpage?search=${ticker}`)
    }

    const listItems = user.stocks.map((stock) =>
        <li className="dashBoardList" key={stock.ticker}>
            <div>
                <span onClick={() => handleClick(stock.ticker)}
                    style={{
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                        verticalAlign: 'middle',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '25px',
                    }}>
                    {stock.ticker}
                </span>
                <RemoveButton ticker={stock.ticker} />
            </div>
        </li>
    );

    return (
        <div>
            <h1> List of favourite stocks</h1>
            <ul>
                {listItems}
            </ul>
        </div>
    )
}

export default UserDashboard