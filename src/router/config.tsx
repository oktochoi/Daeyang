import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const AboutOverviewPage = lazy(() => import('../pages/about/overview/page'));
const AboutHistoryPage = lazy(() => import('../pages/about/history/page'));
const AboutVisionPage = lazy(() => import('../pages/about/vision/page'));
const AboutCeoPage = lazy(() => import('../pages/about/ceo/page'));
const ProductOverviewPage = lazy(() => import('../pages/product/overview/page'));
const ProductProblemsPage = lazy(() => import('../pages/product/problems/page'));
const ProductHowItWorksPage = lazy(() => import('../pages/product/how-it-works/page'));
const ProductApplicationPage = lazy(() => import('../pages/product/application/page'));
const ProductTechPage = lazy(() => import('../pages/product/tech/page'));
const ProductTechnicalPage = lazy(() => import('../pages/product/technical/page'));
const ProductIndustriesPage = lazy(() => import('../pages/product/industries/page'));
const PerformancePage = lazy(() => import('../pages/performance/page'));
const PerformancePilotPage = lazy(() => import('../pages/performance/pilot/page'));
const PerformanceMongoliaPage = lazy(() => import('../pages/performance/mongolia/page'));
const PerformanceSeasiaPage = lazy(() => import('../pages/performance/seasia/page'));
const MediaPage = lazy(() => import('../pages/media/page'));
const MediaPressPage = lazy(() => import('../pages/media/press/page'));
const MediaAwardsPage = lazy(() => import('../pages/media/awards/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about/overview',
    element: <AboutOverviewPage />,
  },
  {
    path: '/about/history',
    element: <AboutHistoryPage />,
  },
  {
    path: '/about/vision',
    element: <AboutVisionPage />,
  },
  {
    path: '/about/ceo',
    element: <AboutCeoPage />,
  },
  {
    path: '/about',
    element: <AboutOverviewPage />,
  },
  {
    path: '/product/overview',
    element: <ProductOverviewPage />,
  },
  {
    path: '/product/problems',
    element: <ProductProblemsPage />,
  },
  {
    path: '/product/how-it-works',
    element: <ProductHowItWorksPage />,
  },
  {
    path: '/product/application',
    element: <ProductApplicationPage />,
  },
  {
    path: '/product/tech',
    element: <ProductTechPage />,
  },
  {
    path: '/product/technical',
    element: <ProductTechnicalPage />,
  },
  {
    path: '/product/industries',
    element: <ProductIndustriesPage />,
  },
  {
    path: '/product',
    element: <ProductOverviewPage />,
  },
  {
    path: '/performance',
    element: <PerformancePage />,
  },
  {
    path: '/performance/pilot',
    element: <PerformancePilotPage />,
  },
  {
    path: '/performance/mongolia',
    element: <PerformanceMongoliaPage />,
  },
  {
    path: '/performance/seasia',
    element: <PerformanceSeasiaPage />,
  },
  {
    path: '/media',
    element: <MediaPage />,
  },
  {
    path: '/media/press',
    element: <MediaPressPage />,
  },
  {
    path: '/media/awards',
    element: <MediaAwardsPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/admin',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
