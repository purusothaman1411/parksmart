import { createContext, useContext, useEffect, useState } from 'react'
import { createInitialSlots, demoUsers, seedBookings, seedServices, seedVehicles } from '../data'

const AppContext = createContext(null)
const read = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback } }
const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => read('ps_user', null))
  const [users, setUsers] = useState(() => read('ps_users', []))
  const [vehicles, setVehicles] = useState(() => read('ps_vehicles', seedVehicles))
  const [slots, setSlots] = useState(() => read('ps_slots', createInitialSlots()))
  const [bookings, setBookings] = useState(() => read('ps_bookings', seedBookings))
  const [services, setServices] = useState(() => read('ps_services', seedServices))
  const [passwordOverrides, setPasswordOverrides] = useState(() => read('ps_password_overrides', {}))

  useEffect(() => localStorage.setItem('ps_user', JSON.stringify(user)), [user])
  useEffect(() => localStorage.setItem('ps_users', JSON.stringify(users)), [users])
  useEffect(() => localStorage.setItem('ps_vehicles', JSON.stringify(vehicles)), [vehicles])
  useEffect(() => localStorage.setItem('ps_slots', JSON.stringify(slots)), [slots])
  useEffect(() => localStorage.setItem('ps_bookings', JSON.stringify(bookings)), [bookings])
  useEffect(() => localStorage.setItem('ps_services', JSON.stringify(services)), [services])
  useEffect(() => localStorage.setItem('ps_password_overrides', JSON.stringify(passwordOverrides)), [passwordOverrides])

  const allUsers = demoUsers.map(item => ({ ...item, password: passwordOverrides[item.email] || item.password })).concat(users)
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const found = allUsers.find(item => item.email.toLowerCase() === normalizedEmail && item.password === password)
    if (!found) return false
    setUser(found)
    return { user: found }
  }
  const register = (name, email, password) => {
    const cleanName = name.trim(); const cleanEmail = email.trim().toLowerCase(); const cleanPassword = password.trim()
    if (!cleanName) return { error: 'Name is required.' }
    if (!emailPattern.test(cleanEmail)) return { error: 'Enter a valid email address.' }
    if (cleanPassword.length < 4) return { error: 'Password must be at least 4 characters.' }
    if (allUsers.some(item => item.email.toLowerCase() === cleanEmail)) return { error: 'That email is already registered.' }
    const newUser = { id: uid('u'), name: cleanName, email: cleanEmail, password: cleanPassword, role: 'customer' }
    setUsers(current => [...current, newUser]); setUser(newUser)
    return { user: newUser }
  }
  const logout = () => setUser(null)
  const updateProfile = changes => {
    const normalized = Object.fromEntries(Object.entries(changes).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]))
    setUser(current => ({ ...current, ...normalized }))
    setUsers(current => current.map(item => item.id === user?.id ? { ...item, ...normalized } : item))
  }
  const changePassword = (currentPassword, newPassword) => {
    if (!user || user.password !== currentPassword) return { error: 'Your current password is incorrect.' }
    if (newPassword.length < 4) return { error: 'New password must be at least 4 characters.' }
    setPasswordOverrides(current => ({ ...current, [user.email]: newPassword }))
    setUsers(current => current.map(item => item.id === user.id ? { ...item, password: newPassword } : item))
    setUser(current => ({ ...current, password: newPassword }))
    return { success: true }
  }
  const saveVehicle = vehicle => setVehicles(current => vehicle.id ? current.map(item => item.id === vehicle.id ? vehicle : item) : [...current, { ...vehicle, id: uid('v') }])
  const deleteVehicle = id => setVehicles(current => current.filter(item => item.id !== id))
  const setDefaultVehicle = id => setVehicles(current => current.map(item => ({ ...item, isDefault: item.id === id })))
  const reserveSlot = ({ vehicle, slot, entry, exit }) => {
    const hours = Math.max(1, Math.ceil((new Date(exit) - new Date(entry)) / 3600000)); const baseFee = hours * slot.hourlyRate; const gst = baseFee * 0.18
    const booking = { id: uid('BK').toUpperCase(), userId: user.id, vehicleNumber: vehicle.vehicleNumber, slotId: slot.id, entry, exit, duration: hours, baseFee, gst, total: baseFee + gst, status: 'Reserved', paymentStatus: 'Pending' }
    setBookings(current => [booking, ...current]); setSlots(current => current.map(item => item.id === slot.id ? { ...item, status: 'Reserved' } : item)); return booking
  }
  const updateBooking = (id, changes) => {
    setBookings(current => current.map(item => item.id === id ? { ...item, ...changes } : item))
    if (changes.status) {
      const booking = bookings.find(item => item.id === id)
      if (booking) setSlots(current => current.map(item => item.id === booking.slotId ? { ...item, status: changes.status === 'Reserved' ? 'Reserved' : changes.status === 'Active' ? 'Occupied' : 'Available' } : item))
    }
  }
  const addService = service => setServices(current => [{ ...service, id: uid('SV').toUpperCase(), userId: user.id, status: 'Requested', paymentStatus: 'Pending' }, ...current])
  const payService = id => setServices(current => current.map(item => item.id === id ? { ...item, paymentStatus: 'Paid' } : item))
    const value = { user, users, login, register, logout, updateProfile, changePassword, vehicles, saveVehicle, deleteVehicle, setDefaultVehicle, slots, setSlots, bookings, updateBooking, reserveSlot, services, addService, payService, setServices }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp = () => useContext(AppContext)
export const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0)
export const formatDate = value => value ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value)) : '-'
