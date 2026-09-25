export const demoUsers = [
  { id: 'u-customer', name: 'Aarav Mehta', email: 'customer@parksmart.com', password: '1234', role: 'customer' },
  { id: 'u-admin', name: 'Maya Shah', email: 'admin@parksmart.com', password: '1234', role: 'admin' },
]

const zones = ['A', 'B', 'C']
const floors = ['Ground', 'Floor 1', 'Floor 2']

export const createInitialSlots = () => Array.from({ length: 24 }, (_, index) => {
  const isCar = index < 12
  const statuses = ['Available', 'Available', 'Occupied', 'Reserved']
  return {
    id: `${isCar ? 'C' : 'B'}-${String((index % 12) + 1).padStart(2, '0')}`,
    zone: zones[index % 3], floor: floors[index % 3], vehicleType: isCar ? 'Car' : 'Bike',
    status: statuses[index % statuses.length], hourlyRate: isCar ? 30 : 10,
  }
})

export const serviceTypes = [
  ['General Service', 850], ['Oil Change', 650], ['Water Wash', 300], ['Brake Check', 500],
  ['Tyre Replacement', 1200], ['Battery Check', 250], ['AC Service', 1100], ['Full Inspection', 950],
].map(([name, price]) => ({ name, price }))

export const seedVehicles = [{ id: 'v-1', vehicleNumber: 'MH12AB1234', vehicleType: 'Car', brand: 'Hyundai', model: 'i20', color: 'White', fuelType: 'Petrol', ownerName: 'Aarav Mehta', isDefault: true }]
export const seedBookings = [{ id: 'BK-2401', userId: 'u-customer', vehicleNumber: 'MH12AB1234', slotId: 'C-01', entry: '2026-09-26T09:00', exit: '2026-09-26T13:00', duration: 4, baseFee: 120, gst: 21.6, total: 141.6, status: 'Reserved', paymentStatus: 'Pending' }]
export const seedServices = [{ id: 'SV-1001', userId: 'u-customer', vehicleNumber: 'MH12AB1234', serviceType: 'Oil Change', date: '2026-09-28', time: '10:00 AM', notes: 'Please check fluid levels', cost: 650, status: 'Confirmed' }]
