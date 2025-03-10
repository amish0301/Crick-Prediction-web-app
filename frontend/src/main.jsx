import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./Dashboard.css"; 
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js';
import { BrowserRouter } from 'react-router-dom'
<<<<<<< Updated upstream
import { PersistGate } from 'redux-persist/integration/react'
=======
import { GoogleOAuthProvider } from '@react-oauth/google'
import "./Footer.css";

>>>>>>> Stashed changes

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
