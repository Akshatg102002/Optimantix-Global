import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Allows safe HTML tags used by TipTap rich text editor
 * Whitelist includes: p, br, strong, em, u, s, h1-h6, ul, ol, li,
 * blockquote, code, pre, a, img, div, span
 */
export function sanitizeHTML(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const config = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'div', 'span',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height', 'class', 'style'
    ],
    KEEP_CONTENT: true,
  } as any;

  return DOMPurify.sanitize(html, config) as unknown as string;
}

/**
 * Validates that HTML content is not excessively large
 * Prevents storage abuse
 */
export function validateHTMLSize(html: string, maxSizeKB: number = 500): boolean {
  if (!html) return true;
  const sizeInKB = new Blob([html]).size / 1024;
  return sizeInKB <= maxSizeKB;
}

/**
 * Extracts plain text from HTML for preview/excerpt purposes
 */
export function extractPlainText(html: string, maxChars: number = 160): string {
  if (!html) return '';

  // Create a temporary div and set innerHTML
  if (typeof window !== 'undefined') {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.substring(0, maxChars).trim();
  }

  // Fallback for server-side rendering
  return html
    .replace(/<[^>]*>/g, ' ')  // Remove HTML tags
    .replace(/\s+/g, ' ')      // Normalize whitespace
    .trim()
    .substring(0, maxChars);
}

export default {
  sanitizeHTML,
  validateHTMLSize,
  extractPlainText,
};
