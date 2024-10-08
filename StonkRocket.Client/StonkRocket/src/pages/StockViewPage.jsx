import Navbar from "../components/NavBar";
import StockView from "../components/StockView"
import { useState, useEffect } from "react"
import config from "../config.js";
import { useLocation } from 'react-router-dom'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const StockViewPage = () => {
    const search = useQuery().get('search');
    const [stock, setStock] = useState();
    const [notFound, setNotFound] = useState()

    useEffect( () => {
        fetch(`${config.apiUrl}/aggs/ticker/${search}/prev?apiKey=${config.apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Stock not found")
            }
            return response.json()
        })
        .then(data => {
            if (data.results) {
                setNotFound(false)
                setTimeout(() => {
                    setStock(data);
                    updateDb(data.results[0].T);
                }, 500);
            } else {
                setNotFound(true)
                setStock(null)
            }
        })
        .catch(error => {
            console.log('Error loading data', error)
            setNotFound(true)
        })
        }, [search])

    const updateDb = (ticker) => {
        fetch(`${config.stonkRocketApiUrl}/stock/${ticker}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticker })
        })
        .catch(error => {
            console.error('Error updating database:', error);
        });
    };

    return(
        <div>
            <Navbar />
            {notFound ?
                <h1>Stock not found</h1>
                :
                <StockView stock={stock} />
            }
        </div>
    )
}

export default StockViewPage;