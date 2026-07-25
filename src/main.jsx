import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './Context/AppContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </GoogleOAuthProvider>
)