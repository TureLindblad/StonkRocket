import config from "../config"
import StockRange from "../components/StockRange";
import { useState } from "react";
import "../styling/StockView.css"


const StockView = ({ stock }) => {
    const [showGraph, setShowGraph] = useState(false)

    if (!stock) {
        return (
            <div>Loading</div>)
    }

    const handleFollow = () => {
        fetch(`${config.stonkRocketApiUrl}/user/stocks/${1}`, { // change to the id of the logged in user
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Ticker: stock.results[0].T })
        })
    }

    return (
        <div className="stockViewDiv">
            <button className="stockViewButton" onClick={handleFollow}>Follow stock</button>
            <button className="stockViewButton" onClick={() => setShowGraph(prev => !prev)}>Toggle Graph</button>
            {/* <div className="stockViewDiv">
            <h1><strong>Yesterdays Value: </strong>{stock.results[0].T}</h1>
            <p><strong>Open:</strong> {stock.results[0].o}</p>
            <p><strong>High:</strong> {stock.results[0].h}</p>
            <p><strong>Low:</strong> {stock.results[0].l}</p>
            <p><strong>Close:</strong> {stock.results[0].c}</p>
            <p><strong>Volume:</strong> {stock.results[0].v}</p>
            <p><strong>VWAP:</strong> {stock.results[0].vw}</p>
            <p><strong>Transactions:</strong> {stock.results[0].n}</p>

            <button className="stockViewButton" onClick={handleFollow}>Follow stock</button>
            <button className="stockViewButton" onClick={() => setShowGraph(prev => !prev)}>Toggle Graph</button>
        </div> */}
            {/* Döljer stockViewDiv om grafen visas */}
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