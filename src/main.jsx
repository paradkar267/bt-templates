import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { CartProvider } from './CartContext'
import './index.css'
import App from './App.jsx'
import ProductPage from './ProductPage.jsx'
import CartPage from './CartPage.jsx'
import TemplatesPage from './TemplatesPage.jsx'
import FeaturedPage from './FeaturedPage.jsx'

import { ThemeProvider } from './ThemeContext'
import { GradientBackground } from '@/components/ui/gradient-background-4'
import SmoothScroll from './SmoothScroll'
import { CommandPalette } from './components/ui/CommandPalette'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeProvider>
          <GradientBackground />
          <CartProvider>
            <SmoothScroll>
              <Toaster position="top-center" richColors />
              <CommandPalette />
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/featured" element={<FeaturedPage />} />
              </Routes>
            </SmoothScroll>
          </CartProvider>
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
