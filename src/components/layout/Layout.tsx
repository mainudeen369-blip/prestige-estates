import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '../WhatsAppButton'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-page-soft overflow-x-clip w-full">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20 overflow-x-clip w-full min-w-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
