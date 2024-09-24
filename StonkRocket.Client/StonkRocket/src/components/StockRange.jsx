import { useState, useEffect } from "react"
import config from "../config.js";

const StockRange = () => {
    const [stonks, setStonks] = useState();
    let stocksTicker = 'AAPL'
    let multiplier = 1
    let timespan = 'day'
    let startDate = '2023-01-09'
    let endDate = '2023-02-10'
    let id = 0

    useEffect(() => {
        fetch(`${config.apiUrl}/aggs/ticker/${stocksTicker}/range/${multiplier}/${timespan}/${startDate}/${endDate}?apiKey=${config.apiKey}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setStonks(data)
            })
            .catch(error => console.log('Error loading data', error))
    },
        [])

    if (!stonks) {
        return (
            <div>Loading</div>)
    }

    return (
        <>
            <div>
                <h1><strong>Ticker: </strong>{stonks.ticker}</h1>
                <ul>
                    {stonks.results.map(a => 
                    {
                        id++
                        return(
                        <li key={id}>
                            <p><strong>Open:</strong> {a.o}</p>
                            <p><strong>High:</strong> {a.h}</p>
                            <p><strong>Low:</strong> {a.l}</p>
                            <p><strong>Close:</strong> {a.c}</p>
                            <p><strong>Volume:</strong> {a.v}</p>
                            <p><strong>VWAP:</strong> {a.vw}</p>
                            <p><strong>Transactions:</strong> {a.n}</p>
                        </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </>
    )
}

export default StockRange;