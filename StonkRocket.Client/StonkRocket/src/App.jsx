import './App.css'
import StockView from './components/StockView.jsx'
import StockRange from './components/StockRange.jsx'
import Navbar from './components/NavBar.jsx'
import MainPage from './pages/MainPage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/stockviewpage" element={<StockView />} />
      </Routes>      
    </Router>
  )
}

export default App
