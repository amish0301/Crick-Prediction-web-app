import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./Dashboard.css"; 
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store';
import { BrowserRouter } from 'react-router-dom'
import "./Footer.css";
import { PersistGate } from "redux-persist/integration/react";



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
