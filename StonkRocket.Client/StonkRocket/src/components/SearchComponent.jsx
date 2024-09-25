import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SearchComponent = () =>{
    const [input, setInput] = useState('');
    const navigate = useNavigate();

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
            placeholder="Skriv in ticker för aktie"
            />
            <button type="submit">sök</button>

        </form>
    )
}

export default SearchComponent;