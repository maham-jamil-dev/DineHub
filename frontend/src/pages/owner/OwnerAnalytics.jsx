import { useEffect, useState } from 'react'
import ChartComponent from '../../components/ChartComponent/ChartComponent'
import StatCard from '../../components/StatCard/StatCard'
import { DollarSign, ShoppingBag, Users, Star } from 'lucide-react'
import { getOwnerDashboard, getMyRestaurant } from '../../api/api'

function OwnerAnalytics() {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    rating: 0,
    dailyOrders: [],
    revenueByCategory: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOwnerAnalytics()
  }, [])

  const fetchOwnerAnalytics = async () => {
    try {
      const [dashRes, restRes] = await Promise.all([
        getOwnerDashboard().catch(() => ({ data: { dashboard: {} } })),
        getMyRestaurant().catch(() => ({ data: { restaurant: {} } })),
      ])

      const dash = dashRes.data?.dashboard || {}
      const rest = restRes.data?.restaurant || {}

      // Calculate daily orders from recentOrders if available
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const dayCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }

      if (dash.recentOrders) {
        dash.recentOrders.forEach((o) => {
          const d = new Date(o.createdAt)
          const dayName = dayNames[d.getDay()]
          if (dayCounts[dayName] !== undefined) {
            dayCounts[dayName] += 1
          }
        })
      }

      const dailyOrdersArr = Object.keys(dayCounts).map((day) => ({
        day,
        orders: dayCounts[day],
      }))

      setData({
        totalRevenue: dash.totalRevenue || 0,
        totalOrders: dash.totalOrders || 0,
        totalCustomers: dash.totalCustomers || 0,
        rating: rest.rating || 0,
        dailyOrders: dailyOrdersArr,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading restaurant analytics...</div>
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-dark mb-2">Analytics</h1>
      <p className="text-gray-500 mb-8">Detailed insights about your restaurant</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`Rs. ${data.totalRevenue}`} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Total Orders" value={data.totalOrders} icon={ShoppingBag} color="bg-primary" />
        <StatCard title="Unique Customers" value={data.totalCustomers} icon={Users} color="bg-blue-500" />
        <StatCard title="Avg. Rating" value={data.rating ? `⭐ ${data.rating}` : "N/A"} icon={Star} color="bg-gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-display font-bold text-dark mb-4">Daily Order Distribution</h3>
          <ChartComponent type="bar" data={data.dailyOrders} xKey="day" yKey="orders" />
        </div>
      </div>
    </div>
  )
}

export default OwnerAnalytics