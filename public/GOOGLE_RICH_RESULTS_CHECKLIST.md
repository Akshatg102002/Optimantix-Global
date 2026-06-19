# Google Rich Results Validation Checklist

Use this checklist to validate your schema markup for Google Rich Results eligibility.

## Tools & Resources

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [JSON-LD Playground](https://json-ld.org/playground/)

---

## Organization Schema Validation

### Required Fields
- [ ] `@context` = "https://schema.org"
- [ ] `@type` = "Organization"
- [ ] `name` - Organization name (present and non-empty)
- [ ] `url` - Organization website URL
- [ ] `logo` - ImageObject with url, width, height
- [ ] `contactPoint` - At least one contact point

### Recommended Fields
- [ ] `description` - Organization description
- [ ] `email` - Contact email
- [ ] `telephone` - Contact phone
- [ ] `address` - PostalAddress (streetAddress, addressLocality, etc.)
- [ ] `sameAs` - Social media profiles
- [ ] `foundingDate` - In YYYY-MM-DD format
- [ ] `areaServed` - Service areas

### Logo Requirements
- [ ] Logo is ImageObject (not just string URL)
- [ ] ImageObject has `url`, `width`, `height`
- [ ] Width/height are valid numbers
- [ ] Logo is at least 112x112 pixels
- [ ] Logo is clear and professional
- [ ] Logo URL is HTTPS

### Test URL
```
https://search.google.com/test/rich-results?url=https://optimantix.com
```

### Expected Results
- ✅ No errors
- ✅ No warnings
- ✅ Organization markup recognized

**Status:** [ ] Passed

---

## LocalBusiness Schema Validation

### Required Fields
- [ ] `@type` = "ProfessionalService" or "LocalBusiness"
- [ ] `name` - Business name
- [ ] `address` - Complete PostalAddress
- [ ] `telephone` - Contact number

### Recommended Fields
- [ ] `description`
- [ ] `image` - High-quality business image
- [ ] `areaServed`
- [ ] `priceRange` (if applicable)
- [ ] `aggregateRating` (if you have reviews)

### Address Validation
- [ ] `streetAddress` - Full street address
- [ ] `addressLocality` - City
- [ ] `addressRegion` - State/Province
- [ ] `postalCode` - Postal code
- [ ] `addressCountry` - Country code (IN)

**Status:** [ ] Passed

---

## Breadcrumb Schema Validation

### Required Fields
- [ ] `@type` = "BreadcrumbList"
- [ ] `itemListElement` - Array of ListItem objects
- [ ] Each ListItem has:
  - [ ] `@type` = "ListItem"
  - [ ] `position` - Positive integer (1, 2, 3...)
  - [ ] `name` - Breadcrumb label
  - [ ] `item` - URL of the breadcrumb page

### Validation Rules
- [ ] At least 2 items in breadcrumb
- [ ] Positions are sequential (1, 2, 3...)
- [ ] URLs are canonical and HTTPS
- [ ] No duplicate positions
- [ ] Last item position = array length

### Test Each Page
- [ ] Homepage breadcrumb (if any)
- [ ] Category pages
- [ ] Product/Service pages
- [ ] Blog post pages

### Example Test URLs
```
https://search.google.com/test/rich-results?url=https://optimantix.com/services/seo
https://search.google.com/test/rich-results?url=https://optimantix.com/blog/post-title
```

**Status:** [ ] Passed

---

## FAQPage Schema Validation

### Required Fields
- [ ] `@type` = "FAQPage"
- [ ] `mainEntity` - Array of Question objects
- [ ] Each Question has:
  - [ ] `@type` = "Question"
  - [ ] `name` - Question text
  - [ ] `acceptedAnswer` - Answer object with:
    - [ ] `@type` = "Answer"
    - [ ] `text` - Answer text (plain text or HTML)

### Validation Rules
- [ ] Minimum 3 Q&A pairs recommended
- [ ] Maximum 10,000 Q&A pairs
- [ ] Questions are clear and natural
- [ ] Answers are comprehensive
- [ ] No duplicated questions
- [ ] Schema matches visible content

### Content Requirements
- [ ] Questions match visible FAQ headings
- [ ] Answers match visible FAQ content
- [ ] No schema-only content (invisible to users)
- [ ] Questions are user-focused
- [ ] Answers provide real value

### Pages to Check
- [ ] `/` (if FAQ section present)
- [ ] `/services/*` (service FAQs)
- [ ] `/free-seo-audit` (audit FAQs)
- [ ] Dedicated FAQ page (if exists)

### Test URL
```
https://search.google.com/test/rich-results?url=https://optimantix.com/free-seo-audit
```

**Status:** [ ] Passed

---

## BlogPosting/Article Schema Validation

### Required Fields
- [ ] `@type` = "BlogPosting" or "Article"
- [ ] `headline` - Article title
- [ ] `description` - Article description/excerpt
- [ ] `image` - ImageObject (article featured image)
- [ ] `datePublished` - Publication date (ISO 8601)
- [ ] `dateModified` - Last modification date
- [ ] `author` - Person or Organization
- [ ] `publisher` - Organization

### Image Requirements (Headline Image)
- [ ] Valid image URL (HTTPS)
- [ ] At least 696 pixels in width
- [ ] Aspect ratio between 1.0-4.0 (recommended 16:9)
- [ ] ImageObject format (has url, width, height)

### Author Validation
- [ ] `name` is provided
- [ ] If Person: can have `url` property
- [ ] If Organization: should match publisher

### Publisher Validation
- [ ] Organization name
- [ ] Organization logo (ImageObject)
- [ ] Logo URL, width, height

### Test URLs
```
https://search.google.com/test/rich-results?url=https://optimantix.com/blog/post-slug
```

### Expected Rich Results
- ✅ Rich snippet in search results
- ✅ Display of date published
- ✅ Display of author (if included)
- ✅ Display of featured image

**Status:** [ ] Passed

---

## WebPage Schema Validation

### Required Fields
- [ ] `@type` = "WebPage"
- [ ] `url` - Page URL
- [ ] `name` - Page name
- [ ] `description` - Page description

### Recommended Fields
- [ ] `headline` - Page headline
- [ ] `image` - Page image
- [ ] `datePublished` - Publication date
- [ ] `dateModified` - Last modified date
- [ ] `author` - Page author
- [ ] `inLanguage` - Language code

### Pages to Check
- [ ] All service pages
- [ ] All category pages
- [ ] Standard content pages

**Status:** [ ] Passed

---

## ContactPage Schema Validation

### Required Fields
- [ ] `@type` = "ContactPage"
- [ ] `name` - Page name (e.g., "Contact Us")
- [ ] `description` - Page description
- [ ] `url` - Page URL
- [ ] `mainEntity` - Organization with contact details

### Organization in mainEntity
- [ ] Must have all Organization schema fields
- [ ] telephone
- [ ] email
- [ ] address

### Test URL
```
https://search.google.com/test/rich-results?url=https://optimantix.com/contact
```

**Status:** [ ] Passed

---

## AboutPage Schema Validation

### Required Fields
- [ ] `@type` = "AboutPage"
- [ ] `name` - Page name
- [ ] `description` - Page description
- [ ] `url` - Page URL
- [ ] `mainEntity` - Organization

### Test URL
```
https://search.google.com/test/rich-results?url=https://optimantix.com/about
```

**Status:** [ ] Passed

---

## General JSON-LD Validation

### Syntax Rules
- [ ] Valid JSON (use JSON validator)
- [ ] Proper nesting of objects
- [ ] Correct quote usage (double quotes)
- [ ] No trailing commas
- [ ] Arrays properly formatted

### Common Errors to Check
- [ ] Mismatched quotes (' vs ")
- [ ] Missing commas between properties
- [ ] Trailing commas in arrays
- [ ] Unescaped special characters
- [ ] Incorrect property names (case-sensitive)

### Tools
- [JSON Lint](https://jsonlint.com/)
- [Browser DevTools Console](chrome://inspect)

**Status:** [ ] All schemas valid JSON

---

## Rich Results Feature Support

### Organization
- **Status in Google:** ✅ Eligible for rich results
- **Rich Result Types:** Knowledge panel, direct answer boxes
- **Priority:** High (homepage)

### LocalBusiness
- **Status in Google:** ✅ Eligible for rich results
- **Rich Result Types:** Local pack, knowledge panel
- **Priority:** High

### Breadcrumb
- **Status in Google:** ✅ Eligible for rich results
- **Rich Result Types:** Search breadcrumb display
- **Priority:** High

### FAQPage
- **Status in Google:** ✅ Eligible for rich results
- **Rich Result Types:** FAQ rich result block
- **Priority:** Medium-High

### Article/BlogPosting
- **Status in Google:** ✅ Eligible for rich results
- **Rich Result Types:** Rich snippet (title, date, image)
- **Priority:** Medium

### WebPage
- **Status in Google:** ✅ May improve display
- **Rich Result Types:** Potential SERP enhancements
- **Priority:** Medium

---

## Monthly Validation Schedule

### Week 1
- [ ] Run all pages through Rich Results Test
- [ ] Document any errors or warnings
- [ ] Note new validation issues

### Week 2
- [ ] Fix identified issues
- [ ] Re-test changed pages
- [ ] Document fixes

### Week 3
- [ ] Check Search Console for manual actions
- [ ] Review "Rich Results" report (if available)
- [ ] Monitor indexation

### Week 4
- [ ] Comprehensive audit of all major pages
- [ ] Check JSON-LD syntax across site
- [ ] Plan optimizations for next month

---

## Search Console Integration

### Enhancements Report
- Monitor: https://search.google.com/search-console
- Check: "Enhancements" or "Rich results" section
- Look for:
  - [ ] Validation status of each rich result type
  - [ ] Errors requiring attention
  - [ ] Valid items count
  - [ ] Warnings

### Actions
1. Click on rich result type
2. Review affected URLs
3. Fix issues reported
4. Resubmit for crawling if needed
5. Monitor status improvement

---

## Performance Targets

### Goal
- ✅ **0 Errors** in all schemas
- ✅ **0 Warnings** on critical pages
- ✅ **100% Eligible** pages for rich results
- ✅ **All recommended fields** populated

### Current Status
- Errors: _____ (Target: 0)
- Warnings: _____ (Target: 0)
- Eligible schemas: _____% (Target: 100%)
- Recommended fields: _____% (Target: 90%+)

**Last Checked:** _______________
**By:** _______________

---

## Troubleshooting

### Schema Not Recognized
1. Validate JSON syntax
2. Check @context and @type
3. Verify required fields
4. Check field values (non-empty)
5. Wait 24-48 hours for reindexing

### Rich Result Not Showing
1. Ensure schema is valid
2. Check content quality
3. Verify all required fields
4. Check Search Console for blockers
5. Review Google guidelines for type

### Missing Recommended Fields
1. Identify missing fields
2. Add field to schema
3. Populate with accurate data
4. Update component if needed
5. Test and validate

---

## Resources

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central Blog](https://developers.google.com/search/blog)
- [Structured Data Best Practices](https://developers.google.com/search/docs/guides/sd-policies)

---

**Last Updated:** May 30, 2024
**Maintained By:** Optimantix Global
**Review Frequency:** Monthly
