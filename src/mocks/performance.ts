export interface PerformanceProject {
  id: number;
  title: string;
  titleEn?: string;
  icon: string;
  iconColor: string;
  photos: string[];
  description?: string;
  descriptionEn?: string;
  year?: number;
  client?: string;
  clientEn?: string;
  result?: string;
  resultEn?: string;
  // Legacy fields for backward compatibility
  category?: string;
  name?: string;
  nameEn?: string;
  image?: string;
}

export const performanceProjects: PerformanceProject[] = [
  {
    id: 1,
    title: '국내 시험로',
    titleEn: 'Domestic Pilot Furnace',
    icon: 'ri-flask-line',
    iconColor: 'bg-teal-100 text-teal-600',
    photos: ['https://readdy.ai/api/search-image?query=industrial%20boiler%20test%20facility%20with%20engineers%20monitoring%20combustion%20equipment%2C%20pilot%20scale%20combustion%20test%20setup%20in%20laboratory%20environment&width=800&height=600&seq=perf-pilot&orientation=landscape'],
    description: '국내 시험 설비에서의 적용 실적',
    descriptionEn: 'Domestic Test Site Application',
    year: 2024,
    client: '국내 시험 설비',
    clientEn: 'Domestic Test Site',
    result: '미연소·배출 저감 실증',
    resultEn: 'Verified unburned fuel and emission reduction',
    // Legacy
    category: 'pilot',
    name: '국내 시험로',
    nameEn: 'Domestic Pilot Furnace',
    image: 'https://readdy.ai/api/search-image?query=industrial%20boiler%20test%20facility%20with%20engineers%20monitoring%20combustion%20equipment%2C%20pilot%20scale%20combustion%20test%20setup%20in%20laboratory%20environment&width=800&height=600&seq=perf-pilot&orientation=landscape'
  },
  {
    id: 2,
    title: '몽골 석탄공장',
    titleEn: 'Mongolia Coal Plant',
    icon: 'ri-building-4-line',
    iconColor: 'bg-blue-100 text-blue-600',
    photos: ['https://readdy.ai/api/search-image?query=coal%20processing%20plant%20in%20Mongolia%20industrial%20site%20with%20conveyors%20and%20stockpiles%2C%20wide%20angle%20view%20of%20coal%20facility%20in%20steppe%20landscape&width=800&height=600&seq=perf-mongolia&orientation=landscape'],
    description: '몽골 현지 석탄공장 적용 사례',
    descriptionEn: 'Mongolia Local Coal Plant Application',
    year: 2023,
    client: '몽골 현지 석탄공장',
    clientEn: 'Local Coal Facility in Mongolia',
    result: '연소 효율 및 연료비 개선',
    resultEn: 'Improved combustion efficiency and fuel cost',
    // Legacy
    category: 'mongolia',
    name: '몽골 석탄공장',
    nameEn: 'Mongolia Coal Plant',
    image: 'https://readdy.ai/api/search-image?query=coal%20processing%20plant%20in%20Mongolia%20industrial%20site%20with%20conveyors%20and%20stockpiles%2C%20wide%20angle%20view%20of%20coal%20facility%20in%20steppe%20landscape&width=800&height=600&seq=perf-mongolia&orientation=landscape'
  },
  {
    id: 3,
    title: '중국·팔라우',
    titleEn: 'China & Palau',
    icon: 'ri-global-line',
    iconColor: 'bg-green-100 text-green-600',
    photos: ['https://readdy.ai/api/search-image?query=industrial%20power%20and%20boiler%20facility%20in%20Southeast%20Asia%20with%20modern%20equipment%20and%20clean%20emission%20stacks%2C%20tropical%20industrial%20setting&width=800&height=600&seq=perf-seasia&orientation=landscape'],
    description: '중국·팔라우 현장 적용 실적',
    descriptionEn: 'China & Palau Field Application',
    year: 2022,
    client: '중국·팔라우 석탄 기반 산업',
    clientEn: 'Coal-based industrial sites in China & Palau',
    result: '배출·분진 저감 및 설비 보호',
    resultEn: 'Lower emissions/dust and better equipment protection',
    // Legacy
    category: 'seasia',
    name: '태국·라오스 산업 현장',
    nameEn: 'Thailand & Laos Industrial Sites',
    image: 'https://readdy.ai/api/search-image?query=industrial%20power%20and%20boiler%20facility%20in%20Southeast%20Asia%20with%20modern%20equipment%20and%20clean%20emission%20stacks%2C%20tropical%20industrial%20setting&width=800&height=600&seq=perf-seasia&orientation=landscape'
  }
];
