import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import GamePage from './pages/GamePage'
import ResultsPage from './pages/ResultsPage'
import LeaderboardPage from './pages/LeaderboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing — enter name and start */}
        <Route path="/" element={<LandingPage />} />

        {/* Game simulation */}
        <Route path="/game" element={<GamePage />} />

        {/* Results + MIL tips */}
        <Route path="/results" element={<ResultsPage />} />

        {/* Global leaderboard */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
