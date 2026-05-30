# SEO Implementation Guide - Optimantix Global

Complete guide for using the new SEO architecture in your React application.

## Overview

This guide covers:
- Using SEO components
- Implementing structured data
- Best practices for optimization
- Validation and testing
- Google Search Console integration

---

## 1. SEO Component Usage

### Basic Setup (Already done in index.tsx)

```typescript
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

<HelmetProvider>
  <App />
</HelmetProvider>
```

### SEO Component on Pages

```typescript
import { SEO } from '../components/SEO';
import { SchemaOrganization } from '../components/Schema/SchemaOrganization';
import { SchemaBreadcrumb } from '../components/Schema/SchemaBreadcrumb';

export const YourPage = () => {
  return (
    <>
      <SEO
        title="Your Page Title"
        description="Your page description (max 160 chars)"
        keywords="keyword1, keyword2, keyword3"
        type="website"
        image="https://example.com/image.jpg"
        canonicalAuto={true}
      />
      <SchemaOrganization />
      <SchemaBreadcrumb />
      {/* Your page content */}
    </>
  );
};
```

---

## 2. Schema Components Guide

### 2.1 Organization Schema
```typescript
import { SchemaOrganization } from '../components/Schema/SchemaOrganization';

// Use on homepage or contact page
<SchemaOrganization includeLocalBusiness={true} />
```

### 2.2 Breadcrumb Schema & Navigation
```typescript
import { SchemaBreadcrumb } from '../components/Schema/SchemaBreadcrumb';
import { BreadcrumbNav } from '../components/Breadcrumbs/BreadcrumbNav';

// Auto-generates from route
<SchemaBreadcrumb />

// Visual breadcrumb navigation
<BreadcrumbNav showHome={true} />
```

### 2.3 FAQ Components
```typescript
import { SchemaFAQ } from '../components/Schema/SchemaFAQ';
import { FAQSection } from '../components/FAQ/FAQSection';
import { SEO_FAQS } from '../data/faqData';

// Visual FAQ + schema markup
<>
  <SchemaFAQ faqs={SEO_FAQS} />
  <FAQSection
    faqs={SEO_FAQS}
    title="Frequently Asked Questions"
    theme="light"
  />
</>
```

### 2.4 Article/Blog Schema
```typescript
import { SchemaArticle } from '../components/Schema/SchemaArticle';

<SchemaArticle
  headline="Article Title"
  description="Short description"
  image="article-image-url"
  datePublished="2024-05-30"
  dateModified="2024-05-30"
  author={{ name: 'Author Name' }}
/>
```

### 2.5 Web Page Schema
```typescript
import { SchemaWebPage } from '../components/Schema/SchemaWebPage';

<SchemaWebPage
  name="Page Name"
  description="Page description"
  headline="Page Headline"
  image="page-image-url"
  datePublished="2024-05-30"
/>
```

### 2.6 Contact Page Schema
```typescript
import { SchemaContact } from '../components/Schema/SchemaContact';

<SchemaContact url="https://optimantix.com/contact" />
```

### 2.7 About Page Schema
```typescript
import { SchemaAbout } from '../components/Schema/SchemaAbout';

<SchemaAbout url="https://optimantix.com/about" />
```

---

## 3. Optimized Image Component

Use `OptimizedImage` instead of regular `<img>` tags:

```typescript
import { OptimizedImage } from '../components/OptimizedImage';

// Alt text is REQUIRED
<OptimizedImage
  src="image-url"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
  responsive={true}
  schema={true} // Adds ImageObject schema
/>
```

**Alt Text Rules:**
- Be descriptive but concise (under 125 characters)
- Include relevant keywords naturally
- Don't start with "image of..."
- Don't keyword stuff
- Examples:
  - ❌ "image"
  - ❌ "photo.jpg"
  - ✅ "Digital marketing dashboard showing SEO metrics"

---

## 4. SEO Configuration

### Organization Data

Edit `/data/organizationData.ts` to update:
- Organization name, URL, logo
- Contact information
- Office locations
- Social media profiles
- Service areas
- Expertise areas

All schema components use this centralized data.

### SEO Config

Edit `/utils/seoConfig.ts` for:
- Site metadata
- Default images
- Meta tag constraints
- Language settings

---

## 5. Page-by-Page Implementation

### Homepage
```typescript
import { SEO } from '../components/SEO';
import { SchemaOrganization } from '../components/Schema/SchemaOrganization';
import { SchemaBreadcrumb } from '../components/Schema/SchemaBreadcrumb';
import { ORGANIZATION_SCHEMA } from '../data/organizationData';

export const Home = () => {
  return (
    <>
      <SEO
        title="Digital Marketing Agency | SEO, Google Ads, Web Development"
        description="Optimantix Global: Premier digital marketing & web development agency. Expert SEO, Google Ads, Meta Ads, E-commerce. Transform your digital presence today."
        keywords="digital marketing, SEO, Google Ads, web development, digital agency"
        type="website"
        schemaMarkup={[ORGANIZATION_SCHEMA]}
      />
      <SchemaOrganization includeLocalBusiness={true} />
      <SchemaBreadcrumb />
      {/* Content */}
    </>
  );
};
```

### Blog Post
```typescript
import { SchemaArticle } from '../components/Schema/SchemaArticle';

export const BlogPost = () => {
  const post = {/* blog data */};

  return (
    <>
      <SEO
        title={`${post.title} | Blog - Optimantix Global`}
        description={post.excerpt}
        type="article"
        image={post.featuredImage}
        keywords={post.keywords}
        publishedTime={post.publishedDate}
        author={post.author}
      />
      <SchemaBreadcrumb />
      <SchemaArticle
        headline={post.title}
        description={post.excerpt}
        image={post.featuredImage}
        datePublished={post.publishedDate}
        dateModified={post.updatedDate}
        author={{ name: post.author }}
      />
      {/* Content */}
    </>
  );
};
```

### Service Page
```typescript
import { SchemaWebPage } from '../components/Schema/SchemaWebPage';
import { FAQSection } from '../components/FAQ/FAQSection';
import { SchemaFAQ } from '../components/Schema/SchemaFAQ';
import { SEO_FAQS } from '../data/faqData';

export const ServicePage = () => {
  return (
    <>
      <SEO
        title="SEO Services - Optimantix Global"
        description="Professional SEO services to improve rankings and organic traffic..."
        keywords="SEO, search engine optimization, organic traffic"
      />
      <SchemaBreadcrumb />
      <SchemaWebPage
        name="SEO Services"
        description="Professional SEO services..."
      />
      <SchemaFAQ faqs={SEO_FAQS} />
      <FAQSection faqs={SEO_FAQS} title="SEO FAQs" />
      {/* Content */}
    </>
  );
};
```

### Contact Page
```typescript
import { SchemaContact } from '../components/Schema/SchemaContact';

export const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us - Optimantix Global"
        description="Get in touch with Optimantix Global. Call us or fill our contact form..."
        keywords="contact, support, consultation"
      />
      <SchemaBreadcrumb />
      <SchemaContact />
      {/* Contact form */}
    </>
  );
};
```

---

## 6. Technical SEO Checklist

### On Every Page
- [ ] Unique title (50-60 characters)
- [ ] Unique meta description (150-160 characters)
- [ ] Canonical URL (auto-generated or specified)
- [ ] One H1 tag
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] All images have descriptive alt text
- [ ] Internal links to relevant pages
- [ ] Mobile responsive design
- [ ] Fast page load speed
- [ ] HTTPS enabled

### Structured Data
- [ ] Organization schema on homepage
- [ ] Breadcrumb schema on all pages
- [ ] FAQ schema on FAQ pages
- [ ] Article schema on blog posts
- [ ] WebPage schema on standard pages
- [ ] No JSON-LD syntax errors

### Content
- [ ] Unique content (no duplicate pages)
- [ ] Keyword in first 100 words
- [ ] Related keywords throughout
- [ ] Readable (short paragraphs, lists)
- [ ] CTA present
- [ ] Links to authoritative sources
- [ ] Internal linking strategy

---

## 7. Google Rich Results Validation

Test your schemas using Google's tools:

1. **Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test each page's schema markup
   - Ensure no errors or warnings

2. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Alternative validation

3. **Mobile-Friendly Test**
   - URL: https://search.google.com/test/mobile-friendly
   - Test mobile responsiveness

### What to Check
- [ ] Organization schema shows correctly
- [ ] Breadcrumb navigation appears
- [ ] FAQ schema generates rich snippets
- [ ] Article schema displays properly
- [ ] No errors in validation
- [ ] All required fields present

---

## 8. Search Console Best Practices

### Initial Setup
1. Add site to Google Search Console
2. Upload sitemap: https://optimantix.com/sitemap.xml
3. Request indexing for important pages
4. Verify mobile usability

### Ongoing Monitoring
1. Check "Coverage" report for indexing issues
2. Review "Performance" for ranking keywords
3. Fix "Core Web Vitals" issues if any
4. Check for manual actions or issues
5. Monitor mobile usability

### URL Parameters
- Mark internal tracking parameters as NOT user-facing
- Set crawl parameters if needed

---

## 9. Core Web Vitals Optimization

### Metrics to Monitor
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **FID (First Input Delay):** < 100 milliseconds
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimization Tips
1. Optimize images (use modern formats)
2. Minimize JavaScript
3. Implement lazy loading
4. Use CDN for static assets
5. Cache strategy for static content
6. Defer non-critical CSS

### Tools
- Google PageSpeed Insights
- Lighthouse (in DevTools)
- Web Vitals extension

---

## 10. Sitemap & Robots Best Practices

### Sitemap
- Auto-generated in `public/sitemap.xml`
- Includes all important pages
- Updated on each build
- Referenced in robots.txt

### Robots.txt
- Located at `public/robots.txt`
- Disallows admin and API routes
- Sets crawl-delay appropriately
- Lists sitemap URL

### Best Practices
- [ ] Sitemap submitted to Search Console
- [ ] Only include indexable pages
- [ ] Update frequency appropriate
- [ ] Priority set correctly (1.0 = home, 0.8 = main pages, 0.7 = secondary)
- [ ] No redirect loops in sitemap

---

## 11. Troubleshooting

### Pages Not Indexing
1. Check robots.txt - ensure page is allowed
2. Verify canonical URL
3. Check Search Console coverage report
4. Request indexing manually
5. Check for noindex meta tag

### Missing Rich Results
1. Validate JSON-LD structure
2. Ensure all required fields present
3. Use Rich Results Test tool
4. Check for syntax errors in schema
5. Wait 24-48 hours for indexing

### Ranking Not Improving
1. Check keyword relevance
2. Improve content quality
3. Build more backlinks
4. Check for ranking competitors
5. Ensure technical SEO is solid
6. Consider keyword difficulty

---

## 12. Regular Maintenance

### Weekly
- Monitor analytics for new keywords
- Check for indexing errors
- Review click-through rates

### Monthly
- Core Web Vitals check
- Search Console review
- Broken link audit
- Content performance analysis

### Quarterly
- Comprehensive SEO audit
- Competitor analysis
- Backlink profile review
- Technical SEO review
- Content gap analysis

---

## 13. Resources

- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)

---

## 14. Support

For questions or issues:
1. Check this guide first
2. Review code comments in components
3. Check TypeScript types for available props
4. Contact development team

---

**Last Updated:** May 30, 2024
**Version:** 1.0
