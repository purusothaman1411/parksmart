import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, AppShell } from './components'
import { useApp } from './context/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import Parking from './pages/Parking'
import Bookings from './pages/Bookings'
import Services from './pages/Services'
import Payments from './pages/Payments'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

const customer = page => <ProtectedRoute role="customer"><AppShell>{page}</AppShell></ProtectedRoute>
const admin = page => <ProtectedRoute role="admin"><AppShell>{page}</AppShell></ProtectedRoute>
function RootRedirect() { const { user } = useApp(); if (!user) return <Navigate to="/login" replace />; return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace /> }
export default function ParkApp() { return <Routes><Route path="/" element={<RootRedirect />} /><Route path="/about" element={<Home />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/dashboard" element={customer(<Dashboard />)} /><Route path="/vehicles" element={customer(<Vehicles />)} /><Route path="/parking" element={customer(<Parking />)} /><Route path="/bookings" element={customer(<Bookings />)} /><Route path="/service-booking" element={customer(<Services history={false} />)} /><Route path="/service-history" element={customer(<Services history />)} /><Route path="/payments" element={customer(<Payments />)} /><Route path="/profile" element={customer(<Profile />)} /><Route path="/admin/dashboard" element={admin(<Admin view="dashboard" />)} /><Route path="/admin/slots" element={admin(<Admin view="slots" />)} /><Route path="/admin/bookings" element={admin(<Admin view="bookings" />)} /><Route path="/admin/services" element={admin(<Admin view="services" />)} /></Routes> }
