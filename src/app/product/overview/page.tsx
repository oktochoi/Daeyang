'use client'

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { getPerformanceProjects } from '@/lib/supabase';
import { performanceProjects as mockProjects } from '../../../mocks/performance';
import factory1 from '../../../assets/factory_1.png';
import factory2 from '../../../assets/factory_2.png';
import factory3 from '../../../assets/factory_3.png';
import factory5 from '../../../assets/factory_5.jpg';
import sprayScene from '../../../assets/조연제분사장면.png';
import fallbackProof1 from '../../../assets/중국발전소테스트.jpg';
import fallbackProof2 from '../../../assets/몽골.jpg';
import fallbackProof3 from '../../../assets/팔라위현장짤.jpg';

const FALLBACK_PROOF_IMAGES = [fallbackProof1, fallbackProof2, fallbackProof3];

interface ProofProject {
  id: number;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  icon?: string;
}

export default function ProductOverviewPage() {
  const { t, i18n } = useTranslation();
  const [proofProjects, setProofProjects] = useState<ProofProject[]>([]);
  const [proofLoading, setProofLoading] = useState(true);
  const problemsRef = useScrollAnimation();
  const solutionRef = useScrollAnimation();
  const effectsRef = useScrollAnimation();
  const proofRef = useScrollAnimation();
  const tableRef = useScrollAnimation();

  useEffect(() => {
    async function loadProofProjects() {
      setProofLoading(true);
      try {
        const projects = await getPerformanceProjects();
        const source = projects?.length ? projects : mockProjects;
        const recent3 = source.slice(0, 3);
        setProofProjects(recent3.map((p) => {
          const raw = p as ProofProject & { title_en?: string; description_en?: string; result?: string; resultEn?: string; image?: string };
          return {
            id: raw.id,
            title: raw.title || '',
            titleEn: raw.titleEn ?? raw.title_en ?? '',
            description: raw.description ?? raw.result ?? '',
            descriptionEn: raw.descriptionEn ?? raw.description_en ?? raw.resultEn ?? '',
            icon: raw.image ?? raw.icon ?? '',
          };
        }));
      } catch {
        const recent3 = mockProjects.slice(0, 3);
        setProofProjects(recent3.map((p) => ({
          id: p.id,
          title: p.title || '프로젝트',
          titleEn: p.titleEn || p.title || 'Project',
          description: p.description ?? p.result ?? '',
          descriptionEn: p.descriptionEn ?? p.resultEn ?? '',
          icon: p.image ?? p.icon,
        })));
      } finally {
        setProofLoading(false);
      }
    }
    loadProofProjects();
  }, []);

  const lang = i18n.language === 'ko' ? 'ko' : 'en';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />

      {/* 1️⃣ Hero: "한 방 설명" - 무대 카드 */}
      <section className="mt-[80px] sm:mt-[140px] pt-8 pb-16 lg:pb-24 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative rounded-[24px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] bg-gradient-to-br from-gray-50 via-white to-teal-50/30 border border-gray-100">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_50%,rgba(20,184,166,0.06),transparent)]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px] lg:min-h-[480px]">
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16 hero-fade-up">
                <p className="text-teal-600 text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase mb-3 sm:mb-4">
                  COAL GREEN
                </p>

                <h1 className="text-[26px] sm:text-[32px] md:text-[38px] font-bold text-[#111827] leading-[1.2] tracking-[-0.02em] mb-5 sm:mb-6 break-words">
                  {t('product.overview.heroTitle1')}
                  <br />
                  <span className="text-teal-600 whitespace-pre-line">
                    {t('product.overview.heroTitle2')}
                  </span>
                </h1>

                <ul className="space-y-4 sm:space-y-5">
                  <li className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-teal-600">
                    <i className="ri-check-line text-teal-600 text-base sm:text-lg"></i>
                    {t('product.overview.keyword1')}
                  </li>

                  <li className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-teal-600">
                    <i className="ri-check-line text-teal-600 text-base sm:text-lg"></i>
                    {t('product.overview.keyword2')}
                  </li>

                  <li className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-teal-600">
                    <i className="ri-check-line text-teal-600 text-base sm:text-lg"></i>
                    {t('product.overview.keyword3')}
                  </li>
                </ul>
              </div>

              <div className="relative h-[320px] lg:h-auto lg:min-h-[480px] order-first lg:order-last overflow-hidden">
                <div className="absolute inset-0 brightness-[0.93]">
                  <Image
                    src={factory2}
                    alt={t('product.overview.heroImageAlt')}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent lg:from-white/60 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Section 2: "왜 이게 필요하냐" (문제 제시) */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] 
               font-bold text-[#1f2933] 
               mb-6 sm:mb-8 md:mb-10 
               leading-[1.25] tracking-[-0.02em] 
               underline decoration-teal-600 decoration-2 underline-offset-4 break-words">
            {t('product.overview.problemsTitle')}
          </h2>

          <div
            ref={problemsRef.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className={problemsRef.isVisible ? 'product-animate-in product-stagger-1' : 'product-scroll-initial'}>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl sm:text-5xl font-bold text-teal-600/30">01</span>
                <h3 className="text-xl font-bold text-[#1f2933]">{t('product.overview.problem1Short')}</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[220px]">
                <Image src="/11.PNG" alt={t('product.overview.problem1Short')} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm text-white/95 z-10 whitespace-pre-line leading-relaxed">{t('product.problems.problem1.description')}</p>
              </div>
            </div>
            <div className={problemsRef.isVisible ? 'product-animate-in product-stagger-2' : 'product-scroll-initial'}>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl sm:text-5xl font-bold text-teal-600/30">02</span>
                <h3 className="text-xl font-bold text-[#1f2933]">{t('product.overview.problem2Short')}</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[220px]">
                <Image src="/22.PNG" alt={t('product.overview.problem2Short')} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm text-white/95 z-10 whitespace-pre-line leading-relaxed">{t('product.problems.problem2.description')}</p>
              </div>
            </div>
            <div className={problemsRef.isVisible ? 'product-animate-in product-stagger-3' : 'product-scroll-initial'}>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl sm:text-5xl font-bold text-teal-600/30">03</span>
                <h3 className="text-xl font-bold text-[#1f2933]">{t('product.overview.problem3Short')}</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[220px]">
                <Image src="/33.PNG" alt={t('product.overview.problem3Short')} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm text-white/95 z-10 whitespace-pre-line leading-relaxed">{t('product.problems.problem3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Section 3: "이해되는 구조" - COAL GREEN 해결 방식 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#1f2933] mb-1 underline decoration-teal-600 decoration-2 underline-offset-4">
              {t('product.overview.solutionTitle')}
            </h2>
            <p className="text-[12px] text-[#9ca3af]">{t('product.overview.solutionSubline')}</p>
          </div>
          <div
            ref={solutionRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 lg:items-stretch ${
              solutionRef.isVisible ? 'product-scroll-visible' : 'product-scroll-initial'
            }`}
          >
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[280px] rounded-xl overflow-hidden border border-gray-200">
              <Image
                src={sprayScene}
                alt={t('product.howItWorks.changes.change1')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="lg:border-l lg:border-dashed lg:border-gray-200 pl-0 lg:pl-8">
              <p className="text-[11px] font-medium text-[#9ca3af] tracking-widest uppercase mb-6">Process</p>
              <ul className="space-y-7">
                <li>
                  <span className="text-[11px] font-bold text-teal-600/60 mr-2">01</span>
                  <span className="text-[19px] font-semibold text-[#1f2933]">{t('product.overview.process1Title')}</span>
                  <p className="text-[14px] text-[#6b7280] mt-1.5 ml-7">{t('product.overview.process1Desc')}</p>
                </li>
                <li>
                  <span className="text-[11px] font-bold text-teal-600/60 mr-2">02</span>
                  <span className="text-[19px] font-semibold text-[#1f2933]">{t('product.overview.process2Title')}</span>
                  <p className="text-[14px] text-[#6b7280] mt-1.5 ml-7">{t('product.overview.process2Desc')}</p>
                </li>
                <li>
                  <span className="text-[11px] font-bold text-teal-600/60 mr-2">03</span>
                  <span className="text-[19px] font-semibold text-[#1f2933]">{t('product.overview.process3Title')}</span>
                  <p className="text-[14px] text-[#6b7280] mt-1.5 ml-7">{t('product.overview.process3Desc')}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Section 4: "결과 요약 카드" - 도입 효과 */}
      <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #F1FDFB 0%, #FFFFFF 70%)' }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-[#1f2933] mb-14 mt-10 text-center">
            {t('product.overview.effectsTitle')}
          </h2>
          <div
            ref={effectsRef.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-3 gap-9"
          >
            <div className={`bg-white rounded-[18px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-2 border-teal-500 text-left ${effectsRef.isVisible ? 'product-animate-in product-stagger-1' : 'product-scroll-initial'}`}>
              <h3 className="text-[18px] font-semibold text-[#1f2933] mb-2">{t('product.benefits.cost.title')}</h3>
              <p className="text-[27px] font-bold text-teal-600 mb-4">{t('product.overview.effectCostValue')}</p>
              <p className="text-[14px] text-[#6b7280] leading-[1.6] whitespace-pre-line">{t('product.benefits.cost.description')}</p>
            </div>
            <div className={`bg-white rounded-[18px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 text-left ${effectsRef.isVisible ? 'product-animate-in product-stagger-2' : 'product-scroll-initial'}`}>
              <h3 className="text-[18px] font-semibold text-[#1f2933] mb-2">{t('product.benefits.emission.title')}</h3>
              <p className="text-[27px] font-bold text-teal-600 mb-4">{t('product.overview.effectEmissionValue')}</p>
              <p className="text-[14px] text-[#6b7280] leading-[1.6] whitespace-pre-line">{t('product.benefits.emission.description')}</p>
            </div>
            <div className={`bg-white rounded-[18px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 text-left ${effectsRef.isVisible ? 'product-animate-in product-stagger-3' : 'product-scroll-initial'}`}>
              <h3 className="text-[18px] font-semibold text-[#1f2933] mb-2">{t('product.benefits.maintenance.title')}</h3>
              <p className="text-[27px] font-bold text-teal-600 mb-4">{t('product.overview.effectMaintenanceValue')}</p>
              <p className="text-[14px] text-[#6b7280] leading-[1.6] whitespace-pre-line">{t('product.benefits.maintenance.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Section 5: "현장에서 증명했냐?" - 신뢰 (현장 적용 결과) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2 underline-offset-4">
              {t('product.overview.proofTitle')}
            </h2>
            <p className="text-[15px] text-[#4b5563] mt-2">
              {t('product.overview.proofSubline')}
            </p>
          </div>
          {proofLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-9 w-9 border-2 border-gray-200 border-t-teal-500" />
            </div>
          ) : (
          <div
            ref={proofRef.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {proofProjects.map((project, index) => {
              const title = lang === 'ko' ? project.title : (project.titleEn || project.title);
              const desc = lang === 'ko' ? (project.description ?? '') : (project.descriptionEn ?? project.description ?? '');
              const hasImageUrl = project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://'));
              const imgSrc = hasImageUrl ? project.icon! : (FALLBACK_PROOF_IMAGES[index] ?? FALLBACK_PROOF_IMAGES[0]);
              const staggerClass = `product-animate-in product-stagger-${index + 1}`;
              return (
                <Link
                  key={project.id}
                  href={`/performance/${project.id}`}
                  className={`block rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${staggerClass}`}
                >
                  <div className="aspect-[4/3] relative bg-gray-100">
                    <Image
                      src={imgSrc}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={hasImageUrl}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (hasImageUrl) {
                          const fb = FALLBACK_PROOF_IMAGES[index] ?? FALLBACK_PROOF_IMAGES[0];
                          target.src = typeof fb === 'string' ? fb : (fb as { src: string }).src;
                        }
                      }}
                    />
                  </div>
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm font-medium text-[#1f2933]">{title}</p>
                    {desc && <p className="text-xs text-[#4b5563] mt-0.5 line-clamp-2">{desc}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
          )}
          <div className="mt-8 text-center">
            <Link
              href="/performance"
              className="inline-flex items-center gap-2 px-6 py-3 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
            >
              {t('product.overview.morePerformance')}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 6️⃣ Section 6: "참고자료" - 제품 사양 */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="mb-8">
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#6b7280] mb-1">
              {t('product.overview.specTitle')}
            </h2>
            <p className="text-[13px] text-[#9ca3af]">{t('product.overview.specRef')}</p>
          </div>
          <div
            ref={tableRef.ref as React.RefObject<HTMLDivElement>}
            className={`bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 ${
              tableRef.isVisible ? 'product-scroll-visible' : 'product-scroll-initial'
            }`}
          >
            <table className="w-full">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-[15px] border-r border-teal-700">{t('product.overview.specProductName')}</th>
                  <th className="px-6 py-4 text-center font-semibold text-[15px] border-r border-teal-700">{t('product.overview.specCoalAdditive')}</th>
                  <th className="px-6 py-4 text-center font-semibold text-[15px]">{t('product.overview.specIncinerationAdditive')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">{t('product.overview.specUsage')}</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563] border-r border-gray-200">{t('product.overview.specCoalPlant')}</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563]">{t('product.overview.specIncinerationPlant')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">{t('product.overview.specForm')}</td>
                  <td colSpan={2} className="px-6 py-4 text-center text-[15px] text-[#4b5563]">
                    {t('product.overview.specFormValue')}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">{t('product.overview.specMethod')}</td>
                  <td colSpan={2} className="px-6 py-4 text-center text-[15px] text-[#4b5563]">
                    {t('product.overview.specMethodValue')}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">{t('product.overview.specRatio')}</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563] font-semibold border-r border-gray-200">{t('product.overview.specRatioCoal')}</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563] font-semibold">{t('product.overview.specRatioIncineration')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7️⃣ Section 7: CTA - 자료 / 인증 / 문의 */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/product/technical"
              className="flex items-center gap-4 p-6 rounded-xl bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 transition-all group"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <i className="ri-file-text-line text-2xl text-teal-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-[#1f2933] group-hover:text-teal-700">{t('product.overview.ctaTechnical')}</h3>
                <p className="text-sm text-[#4b5563] mt-0.5">{t('product.overview.ctaTechnicalDesc')}</p>
              </div>
            </Link>
            <Link
              href="/media/certification"
              className="flex items-center gap-4 p-6 rounded-xl bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 transition-all group"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <i className="ri-verified-badge-line text-2xl text-teal-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-[#1f2933] group-hover:text-teal-700">{t('product.overview.ctaCertification')}</h3>
                <p className="text-sm text-[#4b5563] mt-0.5">{t('product.overview.ctaCertificationDesc')}</p>
              </div>
            </Link>
            <Link
              href="/media/awards"
              className="flex items-center gap-4 p-6 rounded-xl bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 transition-all group"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <i className="ri-award-line text-2xl text-teal-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-[#1f2933] group-hover:text-teal-700">{t('product.overview.ctaAwards')}</h3>
                <p className="text-sm text-[#4b5563] mt-0.5">{t('product.overview.ctaAwardsDesc')}</p>
              </div>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-4 p-6 rounded-xl bg-teal-600 hover:bg-teal-700 border border-teal-600 transition-all group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="ri-customer-service-2-line text-2xl text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">{t('product.overview.ctaContact')}</h3>
                <p className="text-sm text-white/80 mt-0.5">{t('product.overview.ctaContactDesc')}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
