import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardPage from "./pages/dashboard/page"
import LoginPage from "./pages/login/page"

const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true"
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
