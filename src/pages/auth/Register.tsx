import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuthStore } from '../../app/store/useAuthStore'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

// Schema validation using Zod
const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword'],
  })

type RegisterFormInputs = z.infer<typeof registerSchema>

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormInputs) => {
    clearError()
    const success = await registerUser(data.name, data.email, data.password)
    if (success) {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Create Account
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Sign up to access prototyping discounts, order logs, and engineering support.
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
        {/* Name Field */}
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g. Yves Kamurase"
          leftIcon={<span className="material-symbols-outlined text-[18px]">person</span>}
          error={errors.name?.message}
          disabled={isLoading}
          {...register('name')}
        />

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
          {...register('password')}
        />

        {/* Confirm Password Field */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<span className="material-symbols-outlined text-[18px]">shield</span>}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
          {...register('confirmPassword')}
        />

        <Button type="submit" isLoading={isLoading} className="w-full mt-2">
          Sign Up
        </Button>
      </form>

      <div className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary dark:text-inverse-primary font-bold hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default Register
