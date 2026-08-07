import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Fetch all publications for the game feed.
 * No auth required. Backend omits `is_real` and `mil_tip` (anti-cheat).
 */
export const getPosts = async () => {
  const { data } = await api.get('/api/posts/')
  return data
}

/**
 * Submit the player's decisions and receive the MIL report.
 * @param {string} playerName - The player's chosen name/alias
 * @param {Array<{post_id: number, decision: 'Trust'|'Fake'|'Report'}>} decisions
 * @param {string} sessionStartIso - ISO 8601 timestamp when the game started
 */
export const submitGame = async (playerName, decisions, sessionStartIso) => {
  const { data } = await api.post('/api/game/submit', {
    player_name: playerName,
    decisions,
    session_start_iso: sessionStartIso,
  })
  return data
}

/**
 * Fetch the global leaderboard (top scores).
 * @param {number} limit - How many entries to fetch (default 20)
 */
export const getLeaderboard = async (limit = 20) => {
  const { data } = await api.get(`/api/leaderboard?limit=${limit}`)
  return data
}

export default api
