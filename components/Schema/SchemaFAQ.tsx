import React from 'react';
import { Helmet } from 'react-helmet-async';
import { createFAQPage } from '../../utils/schemaGenerator';
import type { FAQPage } from '../../types/schema';

interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaFAQProps {
  faqs: FAQItem[];
  customSchema?: FAQPage;
}

export const SchemaFAQ: React.FC<SchemaFAQProps> = ({
  faqs,
  customSchema,
}) => {
  const schema = customSchema || createFAQPage(faqs);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
