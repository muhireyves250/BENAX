import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../app/store/useAuthStore'

export const MobileNav: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  const links = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Shop', path: '/products', icon: 'storefront' },
    { name: 'Categories', path: '/categories', icon: 'category' },
    { name: 'Support', path: '/support', icon: 'contact_support' },
    { name: 'Profile', path: isAuthenticated ? '/dashboard' : '/login', icon: 'person' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-40 bg-white dark:bg-slate-900 border-t border-outline-variant/50 dark:border-slate-800 shadow-[0px_-4px_20px_rgba(26,43,74,0.03)] transition-colors duration-200">
      <div className="flex justify-around items-center w-full h-16 px-base pb-safe">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center px-3 py-1 transition-all duration-150 active:scale-90
              ${
                isActive
                  ? 'bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container rounded-xl font-bold'
                  : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'
              }
            `}
          >
            <span className="material-symbols-outlined text-[24px]">
              {link.icon}
            </span>
            <span className="font-headline text-[10px] tracking-tight mt-0.5">
              {link.name}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileNav
