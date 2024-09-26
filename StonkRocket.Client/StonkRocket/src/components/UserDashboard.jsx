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
        return(
            <div>Loading</div>)
    }

    const handleClick = (ticker) => {
        navigate(`/stockviewpage?search=${ticker}`)
    }

    const listItems = user.stocks.map((stock) =>
        <li 
        key={stock.ticker} 
        onClick={() => handleClick(stock.ticker)}
        style={{
            cursor: 'pointer',
            padding: '10px',
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            {stock.ticker}
        </li>
    );

    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default UserDashboard