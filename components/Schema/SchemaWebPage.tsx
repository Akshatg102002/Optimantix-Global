import React from 'react';
import { Helmet } from 'react-helmet-async';
import { createWebPageSchema } from '../../utils/schemaGenerator';
import type { WebPage } from '../../types/schema';

interface SchemaWebPageProps {
  name: string;
  description: string;
  headline?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  url?: string;
  inLanguage?: string;
  customSchema?: WebPage;
}

export const SchemaWebPage: React.FC<SchemaWebPageProps> = ({
  name,
  description,
  headline,
  image,
  datePublished,
  dateModified,
  author,
  url,
  inLanguage = 'en-IN',
  customSchema,
}) => {
  const schema =
    customSchema ||
    createWebPageSchema({
      url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      name,
      headline: headline || name,
      description,
      image,
      datePublished,
      dateModified,
      author,
      inLanguage,
    });

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
