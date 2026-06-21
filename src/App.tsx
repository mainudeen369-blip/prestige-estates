import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ListingsPage from './pages/ListingsPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SellPage from './pages/SellPage'
import AdminLoginPage from './admin/AdminLoginPage'
import AdminLayout from './admin/AdminLayout'
import AdminGuard from './admin/AdminGuard'
import AdminDashboard from './admin/AdminDashboard'
import AdminPropertiesPage from './admin/AdminPropertiesPage'
import AdminPropertyFormPage from './admin/AdminPropertyFormPage'
import AdminSettingsPage from './admin/AdminSettingsPage'
import AdminInquiriesPage from './admin/AdminInquiriesPage'
import AdminBuyersPage from './admin/AdminBuyersPage'
import AdminSellersPage from './admin/AdminSellersPage'
import AdminDealsPage from './admin/AdminDealsPage'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="property/:slug" element={<PropertyDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="sell" element={<SellPage />} />
          </Route>

          <Route path="admin" element={<AdminLoginPage />} />
          <Route element={<AdminGuard />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="buyers" element={<AdminBuyersPage />} />
              <Route path="sellers" element={<AdminSellersPage />} />
              <Route path="deals" element={<AdminDealsPage />} />
              <Route path="properties" element={<AdminPropertiesPage />} />
              <Route path="properties/new" element={<AdminPropertyFormPage />} />
              <Route path="properties/:id/edit" element={<AdminPropertyFormPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="inquiries" element={<AdminInquiriesPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
