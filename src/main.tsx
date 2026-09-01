import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './app/styles/index.css'
import { store } from './app/store'
import AppRouter from './app/routes/AppRouter'
import { ThemeProvider } from './shared/lib/theme/ThemeContext'
import { LanguageProvider } from './shared/lib/i18n/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <Provider store={store}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '14px',
                padding: '12px 16px',
                fontFamily: 'var(--font-body)',
              },
            }}
          />
          <AppRouter />
        </Provider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
