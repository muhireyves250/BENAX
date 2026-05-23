import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export const AuthLayout: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-200 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square rounded-full bg-primary-container/10 dark:bg-primary-container/30 blur-3xl opacity-60" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] aspect-square rounded-full bg-secondary-container/20 dark:bg-secondary-container/10 blur-3xl opacity-60" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary dark:bg-inverse-primary flex items-center justify-center shadow-lg">
            <span className="text-white dark:text-primary font-bold text-xl select-none">B</span>
          </div>
          <span className="font-headline text-2xl font-extrabold tracking-tight text-primary dark:text-white">
            BENAX
          </span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="glass-card py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-outline-variant/30 dark:border-slate-800">
          <Outlet />
        </div>
        
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-secondary hover:text-primary dark:hover:text-primary-fixed-dim inline-flex items-center gap-1 font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
