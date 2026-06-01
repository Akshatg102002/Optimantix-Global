import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ExternalLink } from 'lucide-react';

type RichContentVariant = 'blog' | 'case-study' | 'page';

interface RichContentProps {
  content: string;
  variant?: RichContentVariant;
  /** Fallback alt text for images that have no alt attribute */
  imageAlt?: string;
}

const SITE_HOST = 'optimantix.com';

/** Recursively extract plain text from a rehype/hast node. */
const getNodeText = (node: any): string => {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (Array.isArray(node.children)) return node.children.map(getNodeText).join('');
  return '';
};

/**
 * Shared renderer for rich-text / markdown content across Blogs, Case Studies
 * and Pages. Visual hierarchy (headings, paragraphs, lists, blockquotes,
 * metrics) is driven by the scoped CSS classes defined in index.html:
 *   .rich-content + one of .blog-content / .case-study-content / .page-content
 *
 * For case studies, consecutive "Label: value" bullet lists are auto-rendered
 * as a responsive stat-card grid.
 */
export const RichContent: React.FC<RichContentProps> = ({ content, variant = 'blog', imageAlt }) => {
  const variantClass =
    variant === 'case-study' ? 'case-study-content' : variant === 'page' ? 'page-content' : 'blog-content';

  return (
    <div className={`rich-content ${variantClass}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          // Anchor styling, external-link detection + safe rel + icon
          a: ({ node, href, children, ...props }) => {
            const url = href || '';
            const isExternal = /^https?:\/\//i.test(url) && !url.toLowerCase().includes(SITE_HOST);
            return (
              <a
                {...props}
                href={url}
                target={isExternal ? '_blank' : props.target}
                rel={isExternal ? 'noopener noreferrer' : props.rel}
              >
                {children}
                {isExternal && <ExternalLink size={14} className="external-link-icon" aria-hidden="true" />}
              </a>
            );
          },
          // Case-study metric lists -> responsive stat-card grid
          ul: ({ node, children, ...props }) => {
            if (variant === 'case-study' && node && Array.isArray((node as any).children)) {
              const liNodes = (node as any).children.filter((c: any) => c.tagName === 'li');
              const parsed = liNodes.map((li: any) => {
                const text = getNodeText(li).trim();
                const idx = text.indexOf(':');
                if (idx === -1) return null;
                const label = text.slice(0, idx).trim();
                const value = text.slice(idx + 1).trim();
                if (!label || !value) return null;
                return { label, value };
              });
              if (parsed.length >= 2 && parsed.every(Boolean)) {
                return (
                  <div className="stat-grid">
                    {parsed.map((p: any, i: number) => (
                      <div className="stat-card" key={i}>
                        <span className="stat-label">{p.label}</span>
                        <span className="stat-value">{p.value}</span>
                      </div>
                    ))}
                  </div>
                );
              }
            }
            return <ul {...props}>{children}</ul>;
          },
          img: ({ node, ...props }) => (
            <img loading="lazy" {...props} alt={props.alt || imageAlt || ''} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default RichContent;
