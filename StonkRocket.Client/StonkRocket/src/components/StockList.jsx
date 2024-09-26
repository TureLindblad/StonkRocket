import { useState, useEffect } from "react"
import config from "../config.js";
import { useNavigate } from 'react-router-dom';

const StockList = () => {
    const [stocks, setStocks] = useState()
    const navigate = useNavigate()

    useEffect( () => {
        fetch(`${config.stonkRocketApiUrl}/stocks`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error getting stocks: ", response.status)
            }
            return response.json()
        })
        .then(data => {
            setStocks(data.stocks)
        })
        .catch(error => console.log('Error loading data', error))
        }, [])

    if (!stocks) {
        return(
            <div>Loading</div>)
    }

    const handleClick = (ticker) => {
        navigate(`/stockviewpage?search=${ticker}`)
    }

    const listItems = stocks.map((stock) =>
        <li
        key={stock.id}
        >
            <span onClick={() => handleClick(stock.ticker)}
            style={{
                cursor: 'pointer',
                padding: '10px',
                transition: 'background-color 0.3s ease, color 0.3s ease'
            }}>
                {stock.ticker}
            </span>
        </li>
    );

    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default StockList