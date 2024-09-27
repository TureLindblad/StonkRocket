import { useState, useEffect } from "react"
import config from "../config.js";
import { useNavigate } from 'react-router-dom';
import "../styling/StockList.css"

const StockList = () => {
    const [stocks, setStocks] = useState()
    const navigate = useNavigate()

    useEffect(() => {
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
        return (
            <div>Loading</div>)
    }

    const handleClick = (ticker) => {
        navigate(`/stockviewpage?search=${ticker}`)
    }

    const listItems = stocks.map((stock) =>
        <li
            key={stock.id}
            className="stockList-item"
            onClick={() => handleClick(stock.ticker)}
        >
            <span>
                {stock.ticker}
            </span>
        </li>
    );

    return (
        <div>
            <h1> List of popular stocks</h1>
            <ul className="stockList">
                {listItems}
            </ul>
        </div>
    )
}

export default StockList