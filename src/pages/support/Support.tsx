import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

// Support Contact Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormInputs = z.infer<typeof contactSchema>

interface FaqItem {
  q: string
  a: string
}

export const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormInputs) => {
    console.log('Sending message:', data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  const faqs: FaqItem[] = [
    {
      q: 'Do you deliver microcontrollers outside Kigali?',
      a: 'Yes, we offer next-day shipping to provincial hubs across Rwanda. Orders placed before 4:00 PM are dispatched same-day.',
    },
    {
      q: 'Are your electronic sensors and boards genuine?',
      a: 'Absolutely. We source all Arduino, Raspberry Pi, and other microchips directly from official manufacturing channels to ensure genuine components.',
    },
    {
      q: 'Can I get advice on choosing components for my project?',
      a: 'Yes! Our team of resident electronics engineers is happy to help. Reach out to us via our WhatsApp contact link below.',
    },
    {
      q: 'What is your return policy for broken hardware components?',
      a: 'We offer a 7-day replacement warranty on manufacturing faults. Products with solder modifications or electrostatic damage are not covered.',
    },
  ]

  return (
    <div className="flex flex-col gap-8 py-6 w-full text-left">
      <div>
        <h1 className="font-headline font-bold text-3xl text-primary dark:text-white">
          Support & Assistance
        </h1>
        <p className="text-sm text-on-surface-variant dark:text-slate-400 mt-1">
          Have hardware bugs? Read our FAQs or get in touch with our engineers.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
        {/* FAQs list accordion */}
        <section className="flex-1 flex flex-col gap-4 w-full">
          <h2 className="font-headline font-bold text-xl text-primary dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              
              return (
                <div
                  key={idx}
                  className="border border-outline-variant/30 dark:border-slate-850 rounded-2xl overflow-hidden bg-white dark:bg-slate-900"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-headline font-semibold text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined transition-transform duration-200">
                      {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-secondary dark:text-slate-400 leading-relaxed border-t border-outline-variant/10 dark:border-slate-850">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Call to action boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Card hoverEffect={false} className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl flex flex-col gap-3">
              <span className="material-symbols-outlined text-emerald-500 text-[28px] font-variation-settings-fill">
                forum
              </span>
              <div>
                <h4 className="font-headline font-bold text-slate-800 dark:text-slate-200 text-sm">
                  WhatsApp Support
                </h4>
                <p className="text-xs text-secondary dark:text-slate-400 mt-1 leading-relaxed">
                  Chat directly with an engineer for rapid support.
                </p>
              </div>
              <a
                href="https://wa.me/250788123456"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-xs font-bold text-emerald-600 dark:text-emerald-450 hover:underline flex items-center gap-1"
              >
                Chat on WhatsApp
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </Card>

            <Card hoverEffect={false} className="bg-primary/5 dark:bg-inverse-primary/10 border border-primary/20 dark:border-inverse-primary/20 p-5 rounded-2xl flex flex-col gap-3">
              <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-[28px]">
                call
              </span>
              <div>
                <h4 className="font-headline font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Telephone Support
                </h4>
                <p className="text-xs text-secondary dark:text-slate-400 mt-1 leading-relaxed">
                  Need a custom sales quote? Call our Kigali shop office.
                </p>
              </div>
              <a
                href="tel:+250788123456"
                className="mt-auto text-xs font-bold text-primary dark:text-inverse-primary hover:underline flex items-center gap-1"
              >
                Call +250 788 123 456
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </Card>
          </div>
        </section>

        {/* Contact Form */}
        <section className="w-full lg:w-[380px] shrink-0">
          <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl">
            <h2 className="font-headline font-bold text-lg text-primary dark:text-white mb-2">
              Send Message
            </h2>
            <p className="text-xs text-secondary dark:text-slate-400 mb-6">
              Fill out this form and our engineering desk will respond in under 3 hours.
            </p>

            {submitted && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 text-emerald-800 dark:text-emerald-450 text-xs font-semibold">
                Message sent successfully! We will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Yves Kamurase"
                error={errors.name?.message}
                disabled={isLoading}
                {...register('name')}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="maker@benax.rw"
                error={errors.email?.message}
                disabled={isLoading}
                {...register('email')}
              />

              <div className="flex flex-col gap-1 text-left">
                <label className="text-label-sm font-semibold uppercase tracking-wider text-secondary dark:text-slate-400">
                  Your Query
                </label>
                <textarea
                  placeholder="Tell us what sensors or robotics components you need..."
                  rows={4}
                  disabled={isLoading}
                  {...register('message')}
                  className={`
                    block w-full rounded-xl border text-body-md transition-all duration-200 px-3.5 py-2.5 bg-white dark:bg-slate-900 
                    ${
                      errors.message
                        ? 'border-error text-error placeholder-error/60 focus:ring-1 focus:ring-error focus:border-error'
                        : 'border-outline-variant dark:border-slate-800 text-on-surface dark:text-slate-100 focus:ring-1 focus:ring-primary dark:focus:ring-inverse-primary focus:border-primary'
                    }
                  `}
                />
                {errors.message && (
                  <p className="text-xs text-error dark:text-rose-400 flex items-center gap-1 mt-0.5 font-medium">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-error" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full mt-2">
                Send Query
              </Button>
            </form>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Support
