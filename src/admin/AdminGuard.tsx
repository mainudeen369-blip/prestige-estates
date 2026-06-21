import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function AdminGuard() {
  const { isAdmin } = useApp()
  if (!isAdmin) return <Navigate to="/admin" replace />
  return <Outlet />
}
