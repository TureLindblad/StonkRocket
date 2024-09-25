import './App.css'
import MainPage from './pages/MainPage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockViewPage from './pages/StockViewPage.jsx'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/stockviewpage" element={<StockViewPage />} />
      </Routes>      
    </Router>
  )
}

export default App
