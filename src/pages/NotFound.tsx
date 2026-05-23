import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-grow flex flex-col items-center justify-center py-20 text-center px-4 w-full">
      <div className="relative mb-6">
        <span className="font-headline font-extrabold text-9xl text-slate-200 dark:text-slate-800 select-none">
          404
        </span>
        <span className="material-symbols-outlined absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary dark:text-inverse-primary text-[72px] font-variation-settings-fill animate-bounce">
          sensors_off
        </span>
      </div>

      <h1 className="font-headline font-bold text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
        Hardware Address Not Found
      </h1>
      <p className="text-sm text-secondary dark:text-slate-400 mb-8 max-w-sm">
        The microchip or routing address you are trying to ping does not exist. Check the URL pins and try again.
      </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button variant="primary" size="sm" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
