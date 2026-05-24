import { Mail, Phone, MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-12 md:py-14">
      <h1 className="font-headline text-3xl font-extrabold text-[var(--color-text)] md:text-4xl">
        Support
      </h1>
      <p className="mt-2 text-[var(--color-text-dim)]">
        Need help with an order or a component? Reach out below — we usually reply within a business day.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { Icon: Mail, label: "Email", value: "hello@benax.local", href: "mailto:hello@benax.local" },
          { Icon: Phone, label: "Phone", value: "+250 788 123 456", href: "tel:+250788123456" },
          { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "#" },
        ].map(({ Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            className="group flex flex-col gap-3 rounded-[1.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-1)] p-5 transition-colors hover:border-[var(--color-border)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] text-[var(--color-accent)]">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-headline font-bold text-[var(--color-text)]">{label}</h2>
              <p className="mt-1 text-sm text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)]">
                {value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
