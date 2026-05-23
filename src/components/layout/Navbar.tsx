import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../app/store/useCartStore'
import { useAuthStore } from '../../app/store/useAuthStore'
import { useTheme } from '../../app/providers/ThemeProvider'

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { toggleDrawer, getItemCount } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Support', path: '/support' },
  ]

  return (
    <header className="fixed top-0 w-full z-40 bg-white dark:bg-slate-900 shadow-[0px_4px_20px_rgba(26,43,74,0.02)] transition-colors duration-200 border-b border-outline-variant/30 dark:border-slate-800">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1280px] mx-auto">
        {/* Brand logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary dark:bg-inverse-primary flex items-center justify-center shadow-md">
              <span className="text-white dark:text-primary font-bold text-lg select-none">B</span>
            </div>
            <span className="font-headline text-headline-md font-extrabold tracking-tight text-primary dark:text-white">
              BENAX
            </span>
          </Link>
        </div>

        {/* Navigation Items (Desktop only) */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                font-headline text-label-md transition-all duration-200 hover:text-primary dark:hover:text-primary-fixed-dim
                ${
                  isActive
                    ? 'text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-0.5'
                    : 'text-secondary dark:text-secondary-fixed-dim'
                }
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Utilities: Search, Cart, Dark Mode, Profile */}
        <div className="flex items-center gap-2">
          {/* Theme toggler */}
          <button
            onClick={toggleTheme}
            className="material-symbols-outlined text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-2 rounded-full"
            aria-label="Toggle light/dark theme"
          >
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </button>

          {/* Cart Icon with badge */}
          <button
            onClick={() => toggleDrawer(true)}
            className="material-symbols-outlined text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-2 rounded-full relative"
            aria-label="Open Shopping Cart"
          >
            shopping_cart
            {getItemCount() > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-error text-on-error text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                {getItemCount()}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            className="material-symbols-outlined text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-2 rounded-full"
            aria-label="Access Account Dashboard"
          >
            person
          </button>

          {isAuthenticated && user && (
            <span className="hidden lg:inline text-xs font-semibold text-secondary dark:text-slate-400 capitalize max-w-[80px] truncate">
              {user.name}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
