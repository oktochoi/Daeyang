
import { useTranslation } from 'react-i18next';
import mainBg from '../../../assets/main_bg.jpg';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={mainBg}
          alt="연기가 나오는 공장 사진 by Etienne Girardet on Unsplash"
          className="w-full h-full object-cover object-center hero-bg-zoom"
          loading="eager"
          decoding="async"
        />
        {/* 좌측(텍스트 영역) 80% 어두움 → 우측 30~40% 어두움 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-left max-w-[720px] pl-0">
            {/* Eyebrow Label - 12~14px, 600 weight, letter-spacing 0.10~0.14em, opacity 60~70% */}
            <div className="text-xs sm:text-sm font-semibold text-white/65 uppercase tracking-[0.12em] mb-4 hero-fade-up">
              {t('home.hero.eyebrow')}
            </div>
            
            {/* Main Title - 700 weight 중심, 일부 키워드만 800, line-height 1.15~1.2, letter-spacing -0.03em ~ -0.05em, 줄바꿈 고정 */}
            <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold text-white mb-6 leading-[1.18] tracking-[-0.04em] hero-fade-up">
              <span className="font-extrabold tracking-[0.02em]">연소 효율</span>을 높이고,<br className="hidden sm:block sm:mb-2" />
              <span className="font-extrabold tracking-[0.02em]">대기오염</span>을 줄입니다.
            </h1>
            
            {/* Subtitle - 16px(모바일), 18px(PC), 500 weight, rgba(255,255,255,0.78), letter-spacing -0.01em, line-height 1.45, text-shadow */}
            <p
              className="text-base sm:text-lg font-medium text-white/80 mb-7 leading-[1.45] tracking-[-0.01em] hero-fade-in-delay-1"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
            >
              {t('home.hero.subtitle')}
            </p>

            
            {/* CTA Buttons - 미니멀한 고급스러운 스타일 */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16 sm:mb-20">
              <button
                onClick={() => window.REACT_APP_NAVIGATE('/product')}
                className="h-12 px-6 sm:px-8 bg-teal-700 hover:bg-teal-800 text-white text-base font-medium rounded-[14px] transition-colors duration-200 whitespace-nowrap cursor-pointer hero-fade-in-delay-2"
              >
                {t('home.hero.cta.product')}
              </button>
              <button
                onClick={() => window.REACT_APP_NAVIGATE('/contact')}
                className="h-12 px-6 sm:px-8 bg-transparent hover:bg-white/5 text-white text-base font-medium rounded-[14px] border border-white/20 transition-all duration-200 whitespace-nowrap cursor-pointer hero-fade-in-delay-3"
              >
                {t('home.hero.cta.contact')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
