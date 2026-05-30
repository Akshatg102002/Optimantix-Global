import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface BreadcrumbNavProps {
  customBreadcrumbs?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
}

const BREADCRUMB_LABELS: Record<string, string> = {
  services: 'Services',
  'digital-marketing': 'Digital Marketing',
  seo: 'SEO',
  'ppc': 'PPC Ads',
  'smm': 'Social Media',
  blog: 'Blog',
  'case-studies': 'Case Studies',
  'case': 'Case Studies',
  contact: 'Contact',
  about: 'About',
  'google-workspace': 'Google Workspace',
  hosting: 'Hosting Solutions',
  'free-seo-audit': 'Free SEO Audit',
};

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  customBreadcrumbs,
  className = '',
  showHome = true,
  separator = <ChevronRight className="w-4 h-4" />,
}) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '') || '/';

  const breadcrumbs = useMemo(() => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    if (pathname === '/') {
      return [];
    }

    const parts = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Build breadcrumb trail
    let currentPath = '';
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      const label =
        BREADCRUMB_LABELS[part] ||
        part
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

      // Don't add the last item as a link (current page)
      if (index < parts.length - 1) {
        items.push({ label, url: currentPath });
      } else {
        items.push({ label, url: currentPath });
      }
    });

    return items;
  }, [pathname, customBreadcrumbs]);

  // Don't render for home page
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      className={`breadcrumb-nav ${className}`}
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {showHome && (
          <>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                to="/"
                className="text-primary hover:underline"
                itemProp="item"
              >
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            {breadcrumbs.length > 0 && (
              <li className="flex items-center gap-1 text-gray-400">
                {separator}
              </li>
            )}
          </>
        )}

        {breadcrumbs.map((item, index) => {
          const position = showHome ? index + 2 : index + 1;
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={item.url}
              className="flex items-center gap-1"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span className="text-gray-600 font-medium" itemProp="name">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    to={item.url}
                    className="text-primary hover:underline"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <span className="flex items-center gap-1 text-gray-400">
                    {separator}
                  </span>
                </>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
