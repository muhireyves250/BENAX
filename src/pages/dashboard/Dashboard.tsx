import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuthStore } from '../../app/store/useAuthStore'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ProductCard from '../../components/product/ProductCard'

// Profile Validation Schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  address: z.string().optional(),
})

type ProfileFormInputs = z.infer<typeof profileSchema>

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, orders, wishlist, logout, updateProfile } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders')
  const [showSuccess, setShowSuccess] = useState(
    (location.state as { orderSuccess?: boolean })?.orderSuccess || false
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  })

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  const handleProfileSubmit = (data: ProfileFormInputs) => {
    updateProfile(data)
    reset(data) // Reset form dirty state
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tabs = [
    { id: 'orders', name: 'Order History', icon: 'local_shipping' },
    { id: 'wishlist', name: 'My Wishlist', icon: 'favorite' },
    { id: 'profile', name: 'Account Settings', icon: 'manage_accounts' },
  ]

  return (
    <div className="flex flex-col gap-8 py-6 w-full text-left">
      {/* Header Panel */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-outline-variant/20 dark:border-slate-850 pb-6">
        <div>
          <h1 className="font-headline font-bold text-3xl text-primary dark:text-white flex items-center gap-2">
            Maker Dashboard
          </h1>
          <p className="text-sm text-on-surface-variant dark:text-slate-400 mt-1">
            Welcome back, <span className="font-bold text-primary dark:text-white">{user.name}</span>. Trace your Kigali deliveries and active boards.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          leftIcon={<span className="material-symbols-outlined text-[18px]">logout</span>}
          className="self-start md:self-auto border-rose-500/25 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:border-rose-500"
        >
          Logout Session
        </Button>
      </section>

      {/* Success checkout banner */}
      {showSuccess && (
        <div className="flex items-start justify-between gap-2.5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-450 text-sm">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-emerald-500 font-variation-settings-fill">
              check_circle
            </span>
            <div>
              <p className="font-headline font-bold">Order Received!</p>
              <p className="text-xs text-emerald-700 dark:text-slate-400 mt-0.5">
                Your components are being packaged. Delivery agents will contact you shortly.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="material-symbols-outlined text-xs p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-full"
          >
            close
          </button>
        </div>
      )}

      {/* Stats Summary Bento Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 flex items-center gap-4 rounded-2xl">
          <div className="h-12 w-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Orders Placed</span>
            <span className="font-headline font-extrabold text-2xl text-primary dark:text-white mt-0.5">
              {orders.length}
            </span>
          </div>
        </Card>

        <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 flex items-center gap-4 rounded-2xl">
          <div className="h-12 w-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">favorite</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Saved Parts</span>
            <span className="font-headline font-extrabold text-2xl text-primary dark:text-white mt-0.5">
              {wishlist.length}
            </span>
          </div>
        </Card>

        <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 flex items-center gap-4 rounded-2xl">
          <div className="h-12 w-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">engineering</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Engineer Rank</span>
            <span className="font-headline font-extrabold text-sm text-primary dark:text-inverse-primary bg-primary/5 dark:bg-inverse-primary/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
              Maker Pro
            </span>
          </div>
        </Card>
      </section>

      {/* Tabs Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Tab sidebars */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-headline font-semibold transition-all duration-150 shrink-0 lg:w-full text-left
                ${
                  activeTab === tab.id
                    ? 'bg-primary dark:bg-inverse-primary text-white dark:text-primary shadow-sm'
                    : 'text-secondary dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                }
              `}
            >
              <span className="material-symbols-outlined text-[18px]">
                {tab.icon}
              </span>
              <span>{tab.name}</span>
            </button>
          ))}
        </aside>

        {/* Tab content display */}
        <div className="flex-1 w-full">
          {activeTab === 'orders' && (
            <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6">
              <h2 className="font-headline font-bold text-lg text-primary dark:text-white mb-4">
                Order Tracking Log
              </h2>
              {orders.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-[48px]">local_shipping</span>
                  <p className="text-sm font-semibold">No orders logged yet</p>
                  <p className="text-xs max-w-xs mt-0.5">
                    Items placed via checkout will show up here with active tracking parameters.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-outline-variant/30 dark:border-slate-850 rounded-2xl p-4 flex flex-col gap-3 bg-slate-50/30 dark:bg-slate-900/20"
                    >
                      <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800 dark:text-white">
                            {order.id}
                          </span>
                          <span className="text-slate-400">{order.date}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-widest text-[9px]">
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2 border-t border-outline-variant/10 dark:border-slate-850 pt-2 text-xs">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex justify-between items-center">
                            <span className="text-slate-600 dark:text-slate-350">
                              {item.product.name} (x{item.quantity})
                            </span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              RWF {(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-outline-variant/10 dark:border-slate-850 pt-2 flex justify-between items-center">
                        <span className="text-xs text-slate-400">Delivery Address: {order.deliveryAddress}</span>
                        <span className="text-sm font-extrabold text-primary dark:text-inverse-primary">
                          Total: RWF {order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'wishlist' && (
            <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6">
              <h2 className="font-headline font-bold text-lg text-primary dark:text-white mb-4">
                My Bookmarked Electronics
              </h2>
              {wishlist.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-[48px]">favorite</span>
                  <p className="text-sm font-semibold">Wishlist is empty</p>
                  <p className="text-xs max-w-xs mt-0.5">
                    Click the favorite button on product listings to store devices you want to buy later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'profile' && (
            <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6">
              <h2 className="font-headline font-bold text-lg text-primary dark:text-white mb-4">
                Profile Information
              </h2>
              <form onSubmit={handleSubmit(handleProfileSubmit)} className="flex flex-col gap-4">
                <Input
                  label="Display Name"
                  type="text"
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Phone Number"
                  type="text"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Input
                  label="Kigali Delivery Address"
                  type="text"
                  error={errors.address?.message}
                  {...register('address')}
                />

                <Button
                  type="submit"
                  disabled={!isDirty}
                  className="w-full sm:w-auto self-start mt-2 px-6"
                >
                  Save Profile Changes
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
