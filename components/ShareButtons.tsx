
import React from 'react';
import { Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'text-[#1DA1F2] hover:opacity-80'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'text-[#0A66C2] hover:opacity-80'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'text-[#1877F2] hover:opacity-80'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Share:</span>
      <div className="flex items-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-opacity duration-200 ${link.color}`}
            title={`Share on ${link.name}`}
          >
            <link.icon size={20} />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="text-gray-500 hover:text-primary transition-colors duration-200"
          title="Copy Link"
        >
          <LinkIcon size={20} />
        </button>
      </div>
    </div>
  );
};
