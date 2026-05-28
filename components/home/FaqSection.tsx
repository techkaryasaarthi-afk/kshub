'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: "What is KSHub and how does it work?",
    answer: "KSHub is the world's most affordable digital library. You can upload documents, search across different academic and professional categories, and download resources instantly. We offer single-document downloads as well as monthly and annual passes for unlimited access."
  },
  {
    question: "How much does a document download cost?",
    answer: "Single document purchases start from just ₹99, providing lifetime access and instant downloads. If you need multiple resources, our Monthly Pass is only ₹499 and offers unlimited downloads across all 12 categories."
  },
  {
    question: "What payment methods do you support?",
    answer: "We support all major payment methods including UPI, Credit/Debit cards, Net Banking, and digital wallets through our secure payment gateway partner, Razorpay. All transactions are fully encrypted and secure."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your Monthly Pass or Annual Membership at any time from your dashboard under the billing tab. You will continue to have premium access until the end of your billing cycle."
  },
  {
    question: "Can I upload my own research papers or project reports?",
    answer: "Absolutely! We encourage students, academics, and professionals to share their work. Simply sign up, go to the Upload page, fill in the category details, and upload your PDF file."
  },
  {
    question: "Is there a limit on downloads for pass holders?",
    answer: "No. The Monthly Pass and Annual Membership grant truly unlimited downloads across all 12 content categories, with no daily or monthly download caps."
  }
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white border-t border-[rgba(190,200,202,0.2)]">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1D4ED8]/10 rounded-full text-xs font-semibold text-[#1D4ED8] mb-3 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </div>
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-[#1A1C1B] mb-4"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.03em' }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-sm text-gray-500 max-w-[500px] mx-auto"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Have questions about KSHub? Find answers to the most common inquiries below.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-200 ${
                  isOpen
                    ? 'border-[#1D4ED8] bg-[#1D4ED8]/[0.02] shadow-[0_4px_20px_rgba(29,78,216,0.05)]'
                    : 'border-gray-200 hover:border-gray-300 bg-[#FAF9F7]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none"
                >
                  <span
                    className={`font-semibold text-sm transition-colors duration-150 ${
                      isOpen ? 'text-[#0F2C59]' : 'text-[#1A1C1B]'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1D4ED8]' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p
                    className="px-6 pb-5 text-xs text-gray-500 leading-relaxed border-t border-transparent pt-1"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
