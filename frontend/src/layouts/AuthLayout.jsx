import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-cream to-gold/5">
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            {/* <img src="/logo.png" alt="Dine Hub" className="h-24 w-24 mx-auto mb-4 object-contain drop-shadow-lg" /> */}
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout