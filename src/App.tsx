import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StatefulLoginForm } from "@/components/StatefulLoginForm"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
              <div className="w-full max-w-sm">
                <StatefulLoginForm />
              </div>
            </div>
          }
        />

        
      </Routes>
    </Router>
  )
}

export default App
