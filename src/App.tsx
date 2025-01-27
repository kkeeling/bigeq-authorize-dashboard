import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/page"
import DashboardPage from "./pages/dashboard/page"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
