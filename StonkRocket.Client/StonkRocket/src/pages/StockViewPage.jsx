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

    useEffect( () => {
        fetch(`${config.apiUrl}/aggs/ticker/${search}/prev?apiKey=${config.apiKey}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setStock(data)
        })
        .catch(error => console.log('Error loading data', error))
        }, [])

    return(
        <div>
            <Navbar />
            <StockView stock={stock} />
        </div>
    )
}

export default StockViewPage;