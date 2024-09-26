import { useEffect, useState } from "react"
import config from "../config"
import { useNavigate } from 'react-router-dom';

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
        <li
            key={stock.ticker}
        >
            <span onClick={() => handleClick(stock.ticker)}
                style={{
                    cursor: 'pointer',
                    padding: '10px',
                    transition: 'background-color 0.3s ease, color 0.3s ease'
                }}>
                {stock.ticker}
            </span>
            <button onClick={() => removeFavourite(stock.ticker)}>Remove Favourite</button>
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