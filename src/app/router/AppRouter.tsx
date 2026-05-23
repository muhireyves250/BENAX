import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import MainLayout from '../../layouts/MainLayout'
import AuthLayout from '../../layouts/AuthLayout'

// Lazy load pages for performance code-splitting
const Home = React.lazy(() => import('../../pages/home/Home'))
const ProductsList = React.lazy(() => import('../../pages/products/ProductsList'))
const ProductDetail = React.lazy(() => import('../../pages/products/ProductDetail'))
const Categories = React.lazy(() => import('../../pages/categories/Categories'))
const Login = React.lazy(() => import('../../pages/auth/Login'))
const Register = React.lazy(() => import('../../pages/auth/Register'))
const Dashboard = React.lazy(() => import('../../pages/dashboard/Dashboard'))
const Support = React.lazy(() => import('../../pages/support/Support'))
const NotFound = React.lazy(() => import('../../pages/NotFound'))

// Guard component for protected dashboard pages
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

// Router Spinner loading fallback
const PageSpinner: React.FC = () => (
  <div className="h-[60vh] w-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin dark:border-slate-800 dark:border-t-inverse-primary" />
      <span className="text-xs text-secondary font-semibold animate-pulse dark:text-slate-400">
        Loading Component...
      </span>
    </div>
  </div>
)

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        {/* Main Application Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="support" element={<Support />} />
          
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Authentication Form Layout Routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouter
