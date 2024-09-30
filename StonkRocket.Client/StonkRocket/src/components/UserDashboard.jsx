import { useContext } from "react"
import config from "../config"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../authContext";
import "../styling/DashBoardList.css"


const UserDashboard = () => {
    const { user, isLoggedIn, getUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
        <div>
            {isLoggedIn ?
                <div>Loading</div>
                :
                <div>Not logged in</div>
            }
        </div>
        )
    }

    const handleClick = (ticker) => {
        navigate(`/stockviewpage?search=${ticker}`)
    }

    const removeFavourite = (ticker) => {
        fetch(`${config.stonkRocketApiUrl}/user/stocks/${user.id}?ticker=${ticker}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to delete with error code" + response.status)
                }
            })
            .then( () => getUser(user.id) )
            .catch(error => console.log('Error removing data', error))
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
                <button className="dashBoardButton" onClick={() => removeFavourite(stock.ticker)}><i className="fa fa-trash"></i> Remove</button>
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