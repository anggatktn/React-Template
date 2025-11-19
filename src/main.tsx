import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import PageRoutes from './routes'
import "./utils/styles/base.less"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <PageRoutes/>
    </Router>
  </StrictMode>,
)
