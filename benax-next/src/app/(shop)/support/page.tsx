export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-md py-lg flex flex-col gap-md">
      <h1 className="font-headline text-3xl font-bold text-on-surface dark:text-inverse-on-surface">
        Support
      </h1>
      <p className="text-secondary dark:text-slate-400">
        Need help with an order or have a question about a component? Reach out via
        any of the channels below — we usually reply within a business day.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <div className="glass-card rounded-2xl p-md">
          <h2 className="font-headline font-bold text-lg text-primary dark:text-inverse-primary mb-1">
            Email
          </h2>
          <a href="mailto:hello@benax.local" className="text-sm text-secondary dark:text-slate-400">
            hello@benax.local
          </a>
        </div>
        <div className="glass-card rounded-2xl p-md">
          <h2 className="font-headline font-bold text-lg text-primary dark:text-inverse-primary mb-1">
            Phone
          </h2>
          <p className="text-sm text-secondary dark:text-slate-400">+250 788 123 456</p>
        </div>
      </div>
    </div>
  );
}
