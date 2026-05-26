import { LoginFlow } from './components/P1';
import './App.css'
import { AuthProvider } from './context/AuthContext';
function App() {

  return (
    <AuthProvider>
      <LoginFlow />
    </AuthProvider>
  )
}

export default App