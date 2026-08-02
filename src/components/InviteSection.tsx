'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Where invitation emails are addressed. Change this in one place.
 */
const INVITE_EMAIL = 'iam@tundeadegbola.com'

const MESSAGE_MAX = 1200

interface FormState {
  name: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMPTY_FORM: FormState = { name: '', email: '', phone: '', message: '' }

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Please tell us who the invitation is from.'
  }

  if (!values.email.trim()) {
    errors.email = 'We need an email address to reply to.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That email address does not look right.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'A phone number helps us reach you quickly.'
  } else if (values.phone.replace(/[^\d]/g, '').length < 7) {
    errors.phone = 'Please enter a complete phone number.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please share some details about the event.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'A little more detail helps us respond properly.'
  }

  return errors
}

function buildPlainText(values: FormState): string {
  return [
    'SPEAKING / APPEARANCE INVITATION',
    '',
    `Name / Organization: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim()}`,
    '',
    'Event details:',
    values.message.trim(),
  ].join('\n')
}

function buildMailto(values: FormState): string {
  const subject = `Invitation for Tunde Adegbola — ${values.name.trim()}`
  return `mailto:${INVITE_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(buildPlainText(values))}`
}

export default function InviteSection() {
  const [values, setValues] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0]
      document.getElementById(`invite-${firstField}`)?.focus()
      return
    }

    // Hand the invitation to the visitor's email client.
    window.location.href = buildMailto(values)
    setSubmitted(true)
    setCopied(false)
  }

  const handleCopy = async () => {
    const text = `To: ${INVITE_EMAIL}\n\n${buildPlainText(values)}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const handleReset = () => {
    setValues(EMPTY_FORM)
    setErrors({})
    setSubmitted(false)
    setCopied(false)
  }

  const inputBase =
    'w-full rounded-2xl border bg-white px-4 py-3 text-stone-900 placeholder-stone-400 text-sm md:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500'

  const fieldClass = (field: keyof FormState) =>
    `${inputBase} ${errors[field] ? 'border-red-400' : 'border-stone-200'}`

  return (
    <section
      id="invite"
      className="relative py-16 md:py-32 bg-white/60 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-4 md:mb-6">
            Invite T.A
          </h2>
          <div className="w-12 md:w-16 h-1 bg-amber-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto px-4">
            Tunde Adegbola speaks on language technology, artificial
            intelligence, digital transformation and African cultural
            preservation — at conferences, universities and policy forums
            worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left — image and credibility */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden bg-stone-200 shadow-xl">
              <Image
                src="/1 344.JPG"
                alt="Tunde Adegbola speaking at a conference on language technology and African cultural preservation"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-4 md:space-y-5">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-2">
                  TEDx Talks &amp; Conferences
                </h3>
                <p className="text-stone-600 text-sm md:text-base">
                  A regular speaker at technology and cultural preservation
                  events across Africa and beyond.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-2">
                  Academic Lectures
                </h3>
                <p className="text-stone-600 text-sm md:text-base">
                  Teaching artificial intelligence at the University of Lagos,
                  the University of Ibadan, and Afe Babalola University.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-2">
                  UNESCO &amp; Pan-African Forums
                </h3>
                <p className="text-stone-600 text-sm md:text-base">
                  Advocating for indigenous languages and digital inclusion at
                  international policy forums.
                </p>
              </div>
            </div>
          </div>

          {/* Right — the form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-stone-100">
              {submitted ? (
                <div className="space-y-5">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-stone-900 mb-2">
                      Your email app should have opened
                    </h3>
                    <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                      Your invitation has been drafted with all the details
                      filled in. Press send in your email app and it will reach{' '}
                      <strong className="text-stone-800">{INVITE_EMAIL}</strong>.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 md:p-5">
                    <p className="text-sm text-stone-600 mb-3">
                      Nothing opened? Copy your invitation and send it to{' '}
                      <a
                        href={`mailto:${INVITE_EMAIL}`}
                        className="text-amber-700 hover:text-amber-800 font-medium underline underline-offset-2"
                      >
                        {INVITE_EMAIL}
                      </a>{' '}
                      from any email account.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 active:scale-95 transition-all"
                      >
                        {copied ? (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Copied
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy invitation
                          </>
                        )}
                      </button>
                      <a
                        href={buildMailto(values)}
                        className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-100 transition-all"
                      >
                        Try opening again
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-stone-500 hover:text-stone-800 transition-colors underline underline-offset-2"
                  >
                    Send another invitation
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-stone-900 mb-2">
                      Send an invitation
                    </h3>
                    <p className="text-stone-600 text-sm md:text-base">
                      Tell us about your event and we will get back to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name / Organization */}
                    <div>
                      <label
                        htmlFor="invite-name"
                        className="block text-sm font-medium text-stone-800 mb-2"
                      >
                        Name / Organization
                        <span className="text-amber-600 ml-1">*</span>
                      </label>
                      <input
                        id="invite-name"
                        name="name"
                        type="text"
                        autoComplete="organization"
                        value={values.name}
                        onChange={update('name')}
                        placeholder="Ada Okafor, Lagos Business School"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'invite-name-error' : undefined}
                        className={fieldClass('name')}
                      />
                      {errors.name && (
                        <p
                          id="invite-name-error"
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="invite-email"
                        className="block text-sm font-medium text-stone-800 mb-2"
                      >
                        Email
                        <span className="text-amber-600 ml-1">*</span>
                      </label>
                      <input
                        id="invite-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={update('email')}
                        placeholder="you@organisation.org"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'invite-email-error' : undefined
                        }
                        className={fieldClass('email')}
                      />
                      {errors.email && (
                        <p
                          id="invite-email-error"
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="invite-phone"
                        className="block text-sm font-medium text-stone-800 mb-2"
                        >
                        Phone number
                        <span className="text-amber-600 ml-1">*</span>
                      </label>
                      <input
                        id="invite-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={update('phone')}
                        placeholder="+234 800 000 0000"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? 'invite-phone-error' : undefined
                        }
                        className={fieldClass('phone')}
                      />
                      {errors.phone && (
                        <p
                          id="invite-phone-error"
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="invite-message"
                        className="block text-sm font-medium text-stone-800 mb-2"
                      >
                        Message
                        <span className="text-amber-600 ml-1">*</span>
                      </label>
                      <p
                        id="invite-message-hint"
                        className="text-xs md:text-sm text-stone-500 mb-2 leading-relaxed"
                      >
                        Tell us more about the event — the theme, the date, the
                        location, and whether it is virtual or physical. Audience
                        size and format (keynote, panel, workshop, lecture) are
                        helpful too.
                      </p>
                      <textarea
                        id="invite-message"
                        name="message"
                        rows={6}
                        maxLength={MESSAGE_MAX}
                        value={values.message}
                        onChange={update('message')}
                        placeholder="We are hosting a two-day summit on AI and indigenous languages in Abuja on 14–15 March, physical, with about 300 attendees. We would love a 40-minute keynote…"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                          errors.message
                            ? 'invite-message-hint invite-message-error'
                            : 'invite-message-hint'
                        }
                        className={`${fieldClass('message')} resize-y min-h-[9rem]`}
                      />
                      <div className="mt-2 flex items-start justify-between gap-4">
                        {errors.message ? (
                          <p
                            id="invite-message-error"
                            className="text-sm text-red-600"
                          >
                            {errors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="text-xs text-stone-400 tabular-nums shrink-0">
                          {values.message.length}/{MESSAGE_MAX}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-stone-900 text-white px-6 py-4 rounded-full font-medium hover:bg-stone-800 active:bg-stone-800 transition-all transform active:scale-95 text-sm md:text-base"
                    >
                      Send invitation
                    </button>

                    <p className="text-xs text-stone-500 text-center leading-relaxed">
                      Submitting opens your email app with the invitation ready
                      to send. Prefer to write directly?{' '}
                      <a
                        href={`mailto:${INVITE_EMAIL}`}
                        className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
                      >
                        {INVITE_EMAIL}
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
