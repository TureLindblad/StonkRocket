import config from "../config"
import StockRange from "../components/StockRange";
import { useState, useContext } from "react";
import "../styling/StockView.css"
import { AuthContext } from "../authContext";
import RemoveButton from "./RemoveButton";

const StockView = ({ stock }) => {
    const [showGraph, setShowGraph] = useState(false)
    const { user, getUser } = useContext(AuthContext)

    if (!stock) {
        return (
            <div className={"loadingContainer"}>
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        )
    }

    const handleFollow = () => {
        fetch(`${config.stonkRocketApiUrl}/user/stocks/${user.id}?ticker=${stock.results[0].T}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            getUser(user.id)
            if (!response.ok) {
                throw new Error(`Unable to post with error code: ${response.status}`)
            }
        })
        .catch(error => {
            console.log('Error posting data', error)
            alert('Error posting data', error)
        })
    }

    return (
        <div className="stockViewDiv">
            {user && (
                user.stocks.some(userStock => userStock.ticker === stock.results[0].T) ? (
                    <RemoveButton ticker={stock.results[0].T} />
                ) : (
                    <button className="stockViewButton" onClick={handleFollow}>
                        Follow stock
                    </button>
                )
            )}
            
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