'use client'

import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate textarea length
    const message = formData.get('message') as string;
    if (message && message.length > 500) {
      alert(i18n.language === 'ko' ? '메시지는 500자를 초과할 수 없습니다.' : 'Message cannot exceed 500 characters.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://submit-form.com/Ks1Uh0Zzl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
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
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Banner */}
      <section className="relative h-96 flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://readdy.ai/api/search-image?query=wide%20panoramic%20view%20of%20modern%20industrial%20facility%20at%20sunset%20with%20dramatic%20sky%2C%20professional%20corporate%20photography%20of%20large%20scale%20power%20plant%20complex%2C%20inspiring%20industrial%20landscape%20with%20warm%20lighting&width=1920&height=600&seq=contact1&orientation=landscape"
            alt="Contact Us"
            fill
            className="object-cover object-top"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-bold text-white lowercase mb-8">
                {t('contact.hero.title')}
              </h1>
              <button className="flex items-center gap-4 px-8 py-4 bg-white rounded-full hover:shadow-lg transition-shadow cursor-pointer">
                <span className="text-base font-medium text-gray-900">{t('contact.hero.cta')}</span>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full">
                  <i className="ri-arrow-right-line text-white"></i>
                </div>
              </button>
            </div>
            <div className="text-xl text-white max-w-md text-right">
              {t('contact.hero.subtitle')}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <form id="contact-form" onSubmit={handleSubmit} data-readdy-form className="space-y-8">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder={t('contact.form.namePlaceholder')}
                className="w-full text-lg text-gray-900 bg-transparent border-b border-gray-300 pb-2 outline-none focus:border-teal-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('contact.form.company')}
              </label>
              <input
                type="text"
                name="company"
                required
                placeholder={t('contact.form.companyPlaceholder')}
                className="w-full text-lg text-gray-900 bg-transparent border-b border-gray-300 pb-2 outline-none focus:border-teal-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder={t('contact.form.emailPlaceholder')}
                className="w-full text-lg text-gray-900 bg-transparent border-b border-gray-300 pb-2 outline-none focus:border-teal-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('contact.form.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder={t('contact.form.phonePlaceholder')}
                className="w-full text-lg text-gray-900 bg-transparent border-b border-gray-300 pb-2 outline-none focus:border-teal-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('contact.form.industry')}
              </label>
              <input
                type="text"
                name="industry"
                placeholder={t('contact.form.industryPlaceholder')}
                className="w-full text-lg text-gray-900 bg-transparent border-b border-gray-300 pb-2 outline-none focus:border-teal-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                name="message"
                required
                maxLength={500}
                rows={4}
                placeholder={t('contact.form.messagePlaceholder')}
                className="w-full text-lg text-gray-900 bg-transparent border-b border-gray-300 pb-2 outline-none focus:border-teal-600 transition-colors resize-none"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                {i18n.language === 'ko' ? '최대 500자' : 'Maximum 500 characters'}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-teal-600 text-white text-lg font-bold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {isSubmitting ? (i18n.language === 'ko' ? '제출 중...' : 'Submitting...') : t('contact.form.submit')}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                {t('contact.form.success')}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                {t('contact.form.error')}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-3xl text-teal-600"></i>
              </div>
              <p className="text-sm text-gray-600 mb-2">{t('contact.info.phone.label')}</p>
              <p className="text-lg font-bold text-gray-900">{t('contact.info.phone.value')}</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-line text-3xl text-teal-600"></i>
              </div>
              <p className="text-sm text-gray-600 mb-2">{t('contact.info.email.label')}</p>
              <p className="text-lg font-bold text-gray-900">{t('contact.info.email.value')}</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-3xl text-teal-600"></i>
              </div>
              <p className="text-sm text-gray-600 mb-2">{t('contact.info.address.label')}</p>
              <p className="text-lg font-bold text-gray-900">{t('contact.info.address.value')}</p>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.5!2d127.0!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMwJzAwLjAiTiAxMjfCsDAwJzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1234567890"
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


