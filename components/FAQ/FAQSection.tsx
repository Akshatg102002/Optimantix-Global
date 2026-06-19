import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
  defaultOpen?: number[];
  theme?: 'light' | 'dark';
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title,
  description,
  className = '',
  defaultOpen = [],
  theme = 'light',
}) => {
  const [openItems, setOpenItems] = useState<number[]>(defaultOpen);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const bgClass = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  const itemBgClass = theme === 'dark'
    ? 'bg-gray-800 hover:bg-gray-750 border-gray-700'
    : 'bg-gray-50 hover:bg-gray-100 border-gray-200';

  const answerBgClass = theme === 'dark'
    ? 'bg-gray-750'
    : 'bg-gray-100';

  return (
    <section className={`faq-section py-12 ${className}`}>
      {(title || description) && (
        <div className="mb-12">
          {title && (
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${bgClass}`}>
              {title}
            </h2>
          )}
          {description && (
            <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            itemScope
            itemType="https://schema.org/Question"
            className={`faq-item border rounded-lg transition-colors ${itemBgClass}`}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left ${bgClass}`}
              aria-expanded={openItems.includes(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <span
                itemProp="name"
                className="font-semibold text-lg flex-1"
              >
                {faq.question}
              </span>
              <span className="flex-shrink-0 ml-4">
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </span>
            </button>

            {openItems.includes(index) && (
              <div
                id={`faq-answer-${index}`}
                className={`px-6 py-4 border-t ${answerBgClass}`}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div
                  itemProp="text"
                  className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none text-base`}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
