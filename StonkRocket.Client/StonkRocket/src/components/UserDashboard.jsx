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
                <span className="tickerSpan" onClick={() => handleClick(stock.ticker)}>
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