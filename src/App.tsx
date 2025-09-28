import './App.css'

import { AuthProvider, useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'

function AppRouter() {
  const { user } = useAuth();

  if (user) {
    return <Home />;
  }

  return <Login />;
};

function App() {

  return (
    <AuthProvider>
      <div className="flex h-full w-full flex-col justify-center">
        <AppRouter />
      </div>
    </AuthProvider>
  )
}

export default App
