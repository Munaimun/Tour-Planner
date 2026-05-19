import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ScrollToTopButton from '../components/layout/ScrollToTopButton'

export default function AppLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-[#173026]">
      <Header />
      <main key={location.pathname} className="animate-[fadeIn_300ms_ease]">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
