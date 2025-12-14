import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/index.css'
import App from './App.jsx'

import '@fontsource/inter/400.css' // Regular
import '@fontsource/inter/700.css' // Bold
import '@fontsource/inter/600.css' // Semi-Bold


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
