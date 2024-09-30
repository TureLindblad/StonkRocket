import config from "../config"
import StockRange from "../components/StockRange";
import { useState, useContext } from "react";
import "../styling/StockView.css"
import { AuthContext } from "../authContext";

const StockView = ({ stock }) => {
    const [showGraph, setShowGraph] = useState(false)
    const {user, getUser} = useContext(AuthContext)

    if (!stock) {
        return (
            <div>Loading</div>)
    }

    const handleFollow = () => {
        fetch(`${config.stonkRocketApiUrl}/user/stocks/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Ticker: stock.results[0].T })
        })
        .then( () => getUser(user.id) )
    }

    return (
        <div className="stockViewDiv">
            <button className="stockViewButton" onClick={handleFollow}>Follow stock</button>
            <button className="stockViewButton" onClick={() => setShowGraph(prev => !prev)}>Toggle Graph</button>
            {!showGraph ? (
                <div>
                    <h1><strong>Yesterdays Value: </strong>{stock.results[0].T}</h1>
                    <p><strong>Open:</strong> {stock.results[0].o}</p>
                    <p><strong>High:</strong> {stock.results[0].h}</p>
                    <p><strong>Low:</strong> {stock.results[0].l}</p>
                    <p><strong>Close:</strong> {stock.results[0].c}</p>
                    <p><strong>Volume:</strong> {stock.results[0].v}</p>
                    <p><strong>VWAP:</strong> {stock.results[0].vw}</p>
                    <p><strong>Transactions:</strong> {stock.results[0].n}</p>
                </div>
            ) : null}
            <div className="showGraphDiv">{showGraph && <StockRange ticker={stock.results[0].T} />}</div>
        </div>
    )
}

export default StockView;