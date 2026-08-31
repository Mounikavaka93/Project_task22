import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from '../ui/ScrollProgress'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-white text-muted">
      <ScrollProgress />
      <Header />
      <main key={pathname} className="w-full flex-1 animate-page-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
