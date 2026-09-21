import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Load Vercel Web Analytics once in production without affecting local development.
if (import.meta.env.PROD) {
  const analyticsScript = document.createElement('script')
  analyticsScript.defer = true
  analyticsScript.src = '/_vercel/insights/script.js'
  document.head.appendChild(analyticsScript)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
