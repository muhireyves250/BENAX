import React from 'react'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container dark:bg-slate-900 border-t border-outline-variant/30 dark:border-slate-800 transition-colors duration-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-lg w-full max-w-[1280px] mx-auto gap-4">
        <Link to="/" className="font-headline text-headline-md font-bold text-primary dark:text-inverse-primary select-none">
          BENAX
        </Link>
        <div className="flex flex-wrap gap-md justify-center">
          <a
            href="#"
            className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all text-body-md"
          >
            Product Guarantee
          </a>
          <a
            href="#"
            className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all text-body-md"
          >
            Delivery Info
          </a>
          <a
            href="https://wa.me/250788123456"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all text-body-md font-semibold flex items-center gap-1"
          >
            WhatsApp Support
          </a>
        </div>
        <p className="text-on-surface-variant dark:text-slate-500 text-label-sm">
          &copy; {new Date().getFullYear()} Benax Shop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
