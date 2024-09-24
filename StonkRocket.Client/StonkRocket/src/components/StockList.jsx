import { useState, useEffect } from "react"
import config from "../config.js";

const StockList = () => {
    const [stonks, setStonks] = useState();

    useEffect( () => {
    fetch(`${config.apiUrl}/aggs/ticker/AADI/range/1/day/2023-01-09/2023-01-09${config.apiKey}`)
    .then(response => {
        return response.json()})
    .then(data => { 
        setStonks(data)})
    }, 
    [])

    if (!stonks) {
        return(
            <div>Loading</div>)
    }

    return (
        <>
        <div>
            <h1> DATA PLIS</h1>
                    <span>{stonks.resultsCount}</span>
        </div>
        </>
    )
}

export default StockList;