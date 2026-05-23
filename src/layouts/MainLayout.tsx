import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import MobileNav from '../components/layout/MobileNav'
import Footer from '../components/layout/Footer'
import CartDrawer from '../components/cart/CartDrawer'

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-slate-950 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Pane */}
      <main className="flex-grow pt-16 pb-20 md:pb-0 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col">
        <Outlet />
      </main>

      {/* Cart Sidebar Drawer */}
      <CartDrawer />

      {/* Responsive Bottom Navigation Bar */}
      <MobileNav />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
