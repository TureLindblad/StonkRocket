import { useEffect, useState } from "react"
import config from "../config"
import { useNavigate } from 'react-router-dom';
import "../styling/DashBoardList.css"


const UserDashboard = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.stonkRocketApiUrl}/user/${1}`)  // change to the id of the logged in user
            .then(response => {

                if (!response.ok) {
                    throw new Error("user not found")
                }
                return response.json()
            })
            .then(data => {
                setUser(data)
            })
            .catch(error => console.log('Error loading data', error))
    }, [])

    if (!user) {
        return (
            <div>Loading</div>)
    }

    const handleClick = (ticker) => {
        navigate(`/stockviewpage?search=${ticker}`)
    }

    const removeFavourite = (ticker) => {
        fetch(`${config.stonkRocketApiUrl}/user/stocks/${1}?ticker=${ticker}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to delete with error code" + response.status)
                }
                setUser(prevUser => ({
                    ...prevUser,
                    stocks: prevUser.stocks.filter(stock => stock.ticker !== ticker)
                }));
            })
            .catch(error => console.log('Error removing data', error))
    }

    const listItems = user.stocks.map((stock) =>
        <ul className="dashBoardList">
        <li
            key={stock.ticker}
        >
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
            <button class="dashBoardButton" onClick={() => removeFavourite(stock.ticker)}><i class="fa fa-trash"></i> Remove</button>
        </li>
        </ul>


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