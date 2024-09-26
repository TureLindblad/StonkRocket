import './styling/App.css'
import MainPage from './pages/MainPage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockViewPage from './pages/StockViewPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/stockviewpage" element={<StockViewPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App
