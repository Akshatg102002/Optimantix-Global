
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DataProvider } from './context/DataContext';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
import RouteSEO from './components/RouteSEO';

// Lazy load pages to enable loading animation and code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ServiceTemplate = lazy(() => import('./pages/ServiceTemplate').then(module => ({ default: module.ServiceTemplate })));
const SubServiceTemplate = lazy(() => import('./pages/SubServiceTemplate').then(module => ({ default: module.SubServiceTemplate })));
const BlogList = lazy(() => import('./pages/BlogList').then(module => ({ default: module.BlogList })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(module => ({ default: module.BlogPost })));
const CaseStudyList = lazy(() => import('./pages/CaseStudyList').then(module => ({ default: module.CaseStudyList })));
const CaseStudyTemplate = lazy(() => import('./pages/CaseStudyTemplate').then(module => ({ default: module.CaseStudyTemplate })));
const GoogleWorkspace = lazy(() => import('./pages/GoogleWorkspace').then(module => ({ default: module.GoogleWorkspace })));
const HostingSolutions = lazy(() => import('./pages/HostingSolutions').then(module => ({ default: module.HostingSolutions })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const CaseStudies = lazy(() => import('./pages/CaseStudies').then(module => ({ default: module.CaseStudies })));
const CaseDetails = lazy(() => import('./pages/CaseDetails').then(module => ({ default: module.CaseDetails })));
const SeoPage = lazy(() => import('./pages/SeoPage').then(module => ({ default: module.SeoPage })));
const SeoAudit = lazy(() => import('./pages/SeoAudit').then(module => ({ default: module.SeoAudit })));
const PageTemplate = lazy(() => import('./pages/PageTemplate').then(module => ({ default: module.PageTemplate })));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard').then(module => ({ default: module.AdminDashboard })));
const AdminLogin = lazy(() => import('./pages/Admin/Login').then(module => ({ default: module.AdminLogin })));
const FreeToolsHub = lazy(() => import('./pages/FreeToolsHub').then(module => ({ default: module.FreeToolsHub })));
const ToolPage = lazy(() => import('./pages/ToolPage').then(module => ({ default: module.ToolPage })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <DataProvider>
        <Router>
          <RouteSEO />
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/digital-marketing/seo" element={<SeoPage />} />
              <Route path="/services/:slug" element={<ServiceTemplate />} />
              <Route path="/services/:slug/:subSlug" element={<SubServiceTemplate />} />
              <Route path="/free-seo-audit" element={<SeoAudit />} />
              <Route path="/free-tools" element={<FreeToolsHub />} />
              <Route path="/free-tools/:slug" element={<ToolPage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/pages/:slug" element={<PageTemplate />} />
              <Route path="/case-studies" element={<CaseStudyList />} />
              <Route path="/case-studies/:slug" element={<CaseStudyTemplate />} />
              <Route path="/case" element={<CaseStudies />} />
              <Route path="/case/:slug" element={<CaseDetails />} />
              <Route path="/google-workspace" element={<GoogleWorkspace />} />
              <Route path="/hosting" element={<HostingSolutions />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </DataProvider>
    </ErrorBoundary>
  );
};

export default App;
