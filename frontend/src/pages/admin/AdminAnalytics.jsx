import { useEffect, useState } from 'react'
import ChartComponent from '../../components/ChartComponent/ChartComponent'
import StatCard from '../../components/StatCard/StatCard'
import { Users, ChefHat, ShoppingBag, DollarSign } from 'lucide-react'
import { getAdminAnalytics } from '../../api/api'

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    totalRevenue: 0,
    growthData: [],
    dailyData: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const res = await getAdminAnalytics()
      if (res.data?.success) {
        setAnalytics(res.data.analytics)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading platform analytics...</div>
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-dark mb-2">Platform Analytics</h1>
      <p className="text-gray-500 mb-8">Overall Dine Hub performance metrics</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={analytics.totalUsers} icon={Users} color="bg-primary" />
        <StatCard title="Restaurants" value={analytics.totalRestaurants} icon={ChefHat} color="bg-gold" />
        <StatCard title="Total Orders" value={analytics.totalOrders} icon={ShoppingBag} color="bg-green-500" />
        <StatCard title="Total Revenue" value={`Rs. ${analytics.totalRevenue || 0}`} icon={DollarSign} color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-display font-bold text-dark mb-4">User & Restaurant Growth</h3>
          {analytics.growthData?.length > 0 ? (
            <ChartComponent type="line" data={analytics.growthData} xKey="month" yKey="users" />
          ) : (
            <p className="text-gray-400 text-sm">No growth data available</p>
          )}
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-display font-bold text-dark mb-4">Daily Order Volume</h3>
          {analytics.dailyData?.length > 0 ? (
            <ChartComponent type="bar" data={analytics.dailyData} xKey="day" yKey="orders" />
          ) : (
            <p className="text-gray-400 text-sm">No daily order data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics