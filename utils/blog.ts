import { BlogPost } from '../types';

const ALLOWED_TAGS = new Set([
  'p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'u',
  'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'pre', 'code', 'div', 'span'
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height']),
  p: new Set(['style']),
  div: new Set(['style']),
  span: new Set(['style']),
  h1: new Set(['style']),
  h2: new Set(['style']),
  h3: new Set(['style']),
  h4: new Set(['style']),
  h5: new Set(['style']),
  h6: new Set(['style'])
};

const SAFE_STYLE_REGEX = /^(text-align\s*:\s*(left|right|center|justify)\s*;?\s*)$/i;

export const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

export const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  return html.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (full, rawTag, rawAttrs) => {
    const tag = String(rawTag).toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
      return '';
    }

    const isClosing = full.startsWith('</');
    if (isClosing) return `</${tag}>`;

    const allowedForTag = ALLOWED_ATTRS[tag] ?? new Set<string>();
    const attrs = [...String(rawAttrs).matchAll(/([a-zA-Z:-]+)\s*=\s*"([^"]*)"|([a-zA-Z:-]+)\s*=\s*'([^']*)'/g)]
      .map((match) => {
        const name = (match[1] || match[3] || '').toLowerCase();
        const value = (match[2] || match[4] || '').trim();
        return { name, value };
      })
      .filter(({ name, value }) => {
        if (!allowedForTag.has(name)) return false;
        if (name === 'href' || name === 'src') {
          return /^(https?:|data:image\/|\/)/i.test(value);
        }
        if (name === 'style') {
          return SAFE_STYLE_REGEX.test(value);
        }
        return true;
      })
      .map(({ name, value }) => `${name}="${value.replace(/"/g, '&quot;')}"`)
      .join(' ');

    const forceRel = tag === 'a' ? ' rel="noopener noreferrer"' : '';
    return `<${tag}${attrs ? ` ${attrs}` : ''}${forceRel}>`;
  });
};

export const normalizeBlogPayload = (input: Partial<BlogPost>): Omit<BlogPost, 'id'> => {
  const cleanTitle = (input.title || '').trim();
  const cleanSlug = generateSlug(input.slug || cleanTitle);
  const cleanContent = sanitizeHtml(input.content || '');
  const plainText = stripHtml(cleanContent);

  if (!cleanTitle) throw new Error('Title is required.');
  if (!cleanSlug) throw new Error('Slug is required.');
  if (!cleanContent || plainText.length < 20) throw new Error('Content must be at least 20 characters.');
  if (!input.imageUrl?.trim()) throw new Error('Featured image is required.');

  return {
    title: cleanTitle,
    slug: cleanSlug,
    content: cleanContent,
    excerpt: (input.excerpt || plainText.slice(0, 157)).trim() || `${plainText.slice(0, 157)}...`,
    author: (input.author || 'Admin').trim(),
    date: input.date || new Date().toISOString(),
    imageUrl: input.imageUrl.trim(),
    categoryId: input.categoryId || '',
    metaTitle: (input.metaTitle || cleanTitle).trim(),
    metaDescription: (input.metaDescription || plainText.slice(0, 160)).trim(),
    metaKeywords: (input.metaKeywords || '').trim(),
    tags: input.tags || [],
    isPublished: input.isPublished ?? true
  };
};
