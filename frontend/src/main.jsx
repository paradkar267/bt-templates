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
import MyTemplatesPage from './MyTemplatesPage.jsx'
import SettingsPage from './SettingsPage.jsx'
import DashboardPage from './DashboardPage.jsx'
import WishlistPage from './WishlistPage.jsx'
import ProfilePage from './ProfilePage.jsx'
import ContactPage from './ContactPage.jsx'
import UiKitsPage from './UiKitsPage.jsx'
import ResetPasswordPage from './ResetPasswordPage.jsx'
import TermsPage from './TermsPage.jsx'

import { ThemeProvider } from './ThemeContext'
import { AuthProvider } from './AuthContext'
import { WishlistProvider } from './WishlistContext'
import { GradientBackground } from '@/components/ui/gradient-background-4'
import SmoothScroll from './SmoothScroll'
import { CommandPalette } from './components/ui/CommandPalette'
import { SocialProofToast } from './components/ui/SocialProofToast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeProvider>
          <GradientBackground />
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <SmoothScroll>
                  <SocialProofToast />
                  <Toaster position="top-center" richColors />
                  <CommandPalette />
                  <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/featured" element={<FeaturedPage />} />
                    <Route path="/my-templates" element={<MyTemplatesPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/ui-kits" element={<UiKitsPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                  </Routes>
                </SmoothScroll>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
