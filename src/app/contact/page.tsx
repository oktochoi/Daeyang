'use client'

import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';

type SubmittedInquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
};

export default function ContactPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedInquiry, setSubmittedInquiry] = useState<SubmittedInquiry | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmittedInquiry(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = formData.get('message') as string;
    if (message && message.length > 500) {
      alert(t('common.messageLengthError'));
      setIsSubmitting(false);
      return;
    }

    const name = (formData.get('name') as string) || '';
    const company = (formData.get('company') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const industry = (formData.get('industry') as string) || '';
    const inquiryData: SubmittedInquiry = { name, company, email, phone, industry, message: message || '' };

    try {
      const body = (() => {
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
          if (typeof value === 'string') params.append(key, value);
        });
        return params.toString();
      })();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      if (response.ok) {
        setSubmittedInquiry(inquiryData);
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] min-w-0 overflow-x-hidden box-border">
      <Navbar />
      <Breadcrumb />

      {/* Hero - 모바일 상단 여백 강화, 네비·브레드크럼 겹침 방지 */}
      <section className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[380px] flex flex-col justify-end w-full min-w-0 pt-[104px] sm:pt-24 md:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <Image
            src="https://readdy.ai/api/search-image?query=wide%20panoramic%20view%20of%20modern%20industrial%20facility%20at%20sunset%20with%20dramatic%20sky%2C%20professional%20corporate%20photography%20of%20large%20scale%20power%20plant%20complex%2C%20inspiring%20industrial%20landscape%20with%20warm%20lighting&width=1920&height=600&seq=contact1&orientation=landscape"
            alt="Contact Us"
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-14 box-border safe-area-padding-x min-w-0">
          <h1 className="text-2xl min-[430px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white lowercase mb-3 sm:mb-4 leading-tight break-words max-w-full">
            {t('contact.hero.title')}
          </h1>
          <p
            className="
              text-sm sm:text-base md:text-lg
              text-white/90
              mb-6 sm:mb-8
              max-w-prose
              leading-relaxed
              break-words
              pr-2 sm:pr-0
            "
          >
            {t('contact.hero.subtitle')}
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 sm:gap-3 min-h-[44px] sm:min-h-[48px] px-5 sm:px-8 py-3 sm:py-3.5 bg-white text-gray-900 font-medium text-sm sm:text-base rounded-full hover:shadow-lg active:bg-gray-100 transition-all cursor-pointer touch-manipulation w-fit"
          >
            <span>{t('contact.hero.cta')}</span>
            <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-900 rounded-full flex-shrink-0">
              <i className="ri-arrow-right-line text-white text-sm sm:text-base" aria-hidden />
            </span>
          </a>
        </div>
      </section>

      {/* Form - 카드형·터치 친화·16px 폰트(iOS 줌 방지) */}
      <section id="contact-form" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white scroll-mt-24 w-full min-w-0">
        <div className="w-full max-w-[min(100%-2rem,42rem)] sm:max-w-2xl mx-auto px-4 sm:px-6 box-border safe-area-padding-x min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
            {t('contact.form.title')}
          </h2>
          <form onSubmit={handleSubmit} data-readdy-form className="bg-gray-50/80 sm:bg-gray-50 rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 border border-gray-100 w-full min-w-0 box-border">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2">
                {t('contact.form.name')}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder={t('contact.form.namePlaceholder')}
                className="w-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 text-base text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-company" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2">
                {t('contact.form.company')}
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                required
                placeholder={t('contact.form.companyPlaceholder')}
                className="w-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 text-base text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                  className="w-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 text-base text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2">
                  {t('contact.form.phone')}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder={t('contact.form.phonePlaceholder')}
                  className="w-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 text-base text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-industry" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2">
                {t('contact.form.industry')}
              </label>
              <input
                id="contact-industry"
                type="text"
                name="industry"
                placeholder={t('contact.form.industryPlaceholder')}
                className="w-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 text-base text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={500}
                rows={4}
                placeholder={t('contact.form.messagePlaceholder')}
                className="w-full min-h-[100px] px-3 sm:px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors resize-y"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('common.messageMaxLength')}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3.5 sm:py-4 bg-teal-600 text-white text-base sm:text-lg font-bold rounded-xl hover:bg-teal-700 active:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer touch-manipulation"
            >
              {isSubmitting ? t('common.submitting') : t('contact.form.submit')}
            </button>

            {submitStatus === 'success' && (
              <>
                <div className="p-4 sm:p-5 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center text-sm sm:text-base">
                  {t('contact.form.success')}
                </div>
                {submittedInquiry && (
                  <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl space-y-4" id="submitted-inquiry">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      {t('contact.form.submittedTitle')}
                    </h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                      <div className="min-w-0">
                        <dt className="text-gray-500 font-medium">{t('contact.form.name')}</dt>
                        <dd className="text-gray-900 mt-0.5 break-words">{submittedInquiry.name}</dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="text-gray-500 font-medium">{t('contact.form.company')}</dt>
                        <dd className="text-gray-900 mt-0.5 break-words">{submittedInquiry.company}</dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="text-gray-500 font-medium">{t('contact.form.email')}</dt>
                        <dd className="text-gray-900 mt-0.5 break-all">{submittedInquiry.email}</dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="text-gray-500 font-medium">{t('contact.form.phone')}</dt>
                        <dd className="text-gray-900 mt-0.5">{submittedInquiry.phone}</dd>
                      </div>
                      {submittedInquiry.industry && (
                        <div className="min-w-0">
                          <dt className="text-gray-500 font-medium">{t('contact.form.industry')}</dt>
                          <dd className="text-gray-900 mt-0.5 break-words">{submittedInquiry.industry}</dd>
                        </div>
                      )}
                      <div className="sm:col-span-2 min-w-0">
                        <dt className="text-gray-500 font-medium">{t('contact.form.message')}</dt>
                        <dd className="text-gray-900 mt-1 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-3 border border-gray-100 text-sm sm:text-base">
                          {submittedInquiry.message}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
              </>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 sm:p-5 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center text-sm sm:text-base">
                {t('contact.form.error')}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Info - 카드 반응형·텍스트 줄바꿈 */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 w-full min-w-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 box-border safe-area-padding-x min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-10">
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 text-center min-w-0 shadow-sm border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 rounded-lg bg-teal-50">
                <i className="ri-phone-line text-xl sm:text-2xl text-teal-600" aria-hidden />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">{t('contact.info.phone.label')}</p>
              <a href="tel:0226192451" className="text-base sm:text-lg font-bold text-gray-900 hover:text-teal-600 transition-colors break-all">
                {t('contact.info.phone.value')}
              </a>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 text-center min-w-0 shadow-sm border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 rounded-lg bg-teal-50">
                <i className="ri-mail-line text-xl sm:text-2xl text-teal-600" aria-hidden />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">{t('contact.info.email.label')}</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 break-all">{t('contact.info.email.value')}</p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 text-center min-w-0 shadow-sm border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 rounded-lg bg-teal-50">
                <i className="ri-map-pin-line text-xl sm:text-2xl text-teal-600" aria-hidden />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">{t('contact.info.address.label')}</p>
              <p className="text-sm sm:text-base font-bold text-gray-900 break-words leading-snug">
                {t('contact.info.address.value')}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono">{t('contact.info.address.plusCode')}</p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white min-w-0 w-full max-w-full">
            <div className="h-[240px] sm:h-[300px] md:h-[380px] lg:h-[460px] w-full">
              <iframe
                src="https://www.google.com/maps?q=서울특별시+구로구+디지털로33길+11+에이스테크노타워8차&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


