import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import PageRoutes from './routes'
import "./utils/styles/base.less"
import { ConfigProvider } from 'antd'
import { theme } from './utils/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ConfigProvider theme={theme}>
        <PageRoutes />
      </ConfigProvider>
    </Router>
  </StrictMode>,
)
