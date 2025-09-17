import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./assets/styles.css"; 

const reactRoot = document.getElementById('root');

const root = createRoot(reactRoot);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
