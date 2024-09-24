import { useState, useEffect } from "react"
import config from "../config.js";

const StockView = () => {
    const [stonks, setStonks] = useState();

    useEffect( () => {
    fetch(`${config.apiUrl}/aggs/ticker/AADI/prev?apiKey=${config.apiKey}`)
    .then(response => {
        return response.json()})
    .then(data => {
        setStonks(data)})
    .catch(error => console.log('Error loading data', error))
    }, 
    [])

    if (!stonks) {
        return(
            <div>Loading</div>)
    }

    return (
        <>
        <div>
            <h1><strong>Ticker: </strong>{stonks.results[0].T}</h1>
          <p><strong>Open:</strong> {stonks.results[0].o}</p>
          <p><strong>High:</strong> {stonks.results[0].h}</p>
          <p><strong>Low:</strong> {stonks.results[0].l}</p>
          <p><strong>Close:</strong> {stonks.results[0].c}</p>
          <p><strong>Volume:</strong> {stonks.results[0].v}</p>
          <p><strong>VWAP:</strong> {stonks.results[0].vw}</p>
          <p><strong>Transactions:</strong> {stonks.results[0].n}</p>
        </div>
        </>
    )
}

export default StockView;