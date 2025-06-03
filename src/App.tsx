import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StatefulLoginForm } from "@/components/StatefulLoginForm"
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

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

<Route
          path="/app"
          element={
            <SidebarProvider>
              <div className="flex min-h-svh w-full">
                <AppSidebar />
                <div className="flex-1 p-6 md:p-10">
                  {}
                </div>
              </div>
            </SidebarProvider>
          }
        />

        
      </Routes>
    </Router>
  )
}

export default App
