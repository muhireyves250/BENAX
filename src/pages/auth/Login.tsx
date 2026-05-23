import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuthStore } from '../../app/store/useAuthStore'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

// Schema validation using Zod
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormInputs = z.infer<typeof loginSchema>

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Redirect path after success
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const onSubmit = async (data: LoginFormInputs) => {
    clearError()
    const success = await login(data.email, data.password)
    if (success) {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Access your BENAX member portal to trace orders and manage wishlists.
        </p>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-450 text-xs">
          <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          placeholder="maker@benax.rw"
          leftIcon={<span className="material-symbols-outlined text-[18px]">mail</span>}
          error={errors.email?.message}
          disabled={isLoading}
          {...register('email')}
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<span className="material-symbols-outlined text-[18px]">lock</span>}
          error={errors.password?.message}
          disabled={isLoading}
          helperText="Hint: use password123 to log in"
          {...register('password')}
        />

        <Button type="submit" isLoading={isLoading} className="w-full mt-2">
          Sign In
        </Button>
      </form>

      <div className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary dark:text-inverse-primary font-bold hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Login
