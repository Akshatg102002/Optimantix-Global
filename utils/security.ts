
// Client-side security utilities

const RATE_LIMIT_KEY = 'opt_rate_limit';
const MAX_SUBMISSIONS_PER_HOUR = 3;
const COOLDOWN_PERIOD = 60 * 60 * 1000; // 1 Hour

interface RateLimitData {
  count: number;
  firstTimestamp: number;
}

/**
 * Checks if the current user is rate limited for form submissions.
 * Returns true if allowed, false if blocked.
 */
export const checkRateLimit = (): { allowed: boolean; message?: string } => {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  
  let data: RateLimitData = stored ? JSON.parse(stored) : { count: 0, firstTimestamp: now };

  // Reset if cooldown passed
  if (now - data.firstTimestamp > COOLDOWN_PERIOD) {
    data = { count: 0, firstTimestamp: now };
  }

  if (data.count >= MAX_SUBMISSIONS_PER_HOUR) {
    return { 
      allowed: false, 
      message: "Security: Too many submissions. Please try again in an hour." 
    };
  }

  // Increment locally (in a real app, this would be validated backend side too)
  data.count++;
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  return { allowed: true };
};

/**
 * Basic Input Sanitization to prevent XSS in reflected UI areas (like the Chatbot)
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Validates complex patterns (basic firewall logic for inputs)
 */
export const validateSecurity = (input: string): boolean => {
  // Block SQL Injection attempts or Script tags in content
  const maliciousPatterns = [
    /<script\b[^>]*>([\s\S]*?)<\/script>/gm,
    /javascript:/gi,
    /onload=/gi,
    /eval\(/gi
  ];

  return !maliciousPatterns.some(pattern => pattern.test(input));
};
