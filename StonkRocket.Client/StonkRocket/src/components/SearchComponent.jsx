import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import config from "../config"
import "../styling/Searchbar.css"

const SearchComponent = () => {
    const [input, setInput] = useState('');
    const [tickers, setTickers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [viewSuggestions, setViewSuggestions] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.stonkRocketApiUrl}/stocks`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error getting stocks: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                const mapedTickers = data.stocks.map(stock => stock.ticker)
                setTickers(mapedTickers)
                setSuggestions(mapedTickers)
            })
            .catch(error => console.log('Error loading data', error))
    }, [])

    useEffect(() => {
        if (input) {
            setViewSuggestions(true)
        } else {
            setViewSuggestions(false)
        }

        const filter = tickers.filter(ticker => ticker.toLowerCase().includes(input.toLowerCase()))
        setSuggestions(filter)
    }, [input])

    const handleInput = (e) =>{
        setInput(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        navigate(`/stockviewpage?search=${input}`)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={input}
                onChange={handleInput}
                placeholder="search ticker..."
            />

            {viewSuggestions && suggestions.length > 0 && 
                <div className="suggestions">
                    {suggestions.map((suggestion) => (
                        <Link key={suggestion} to={`/stockviewpage?search=${suggestion}`}>
                            {suggestion}
                        </Link>
                    ))}
                </div>
            }

            <button type="submit">Search</button>
        </form>
    )
}

export default SearchComponent;