import React from 'react';
import { Helmet } from 'react-helmet-async';
import { createBlogPosting } from '../../utils/schemaGenerator';
import { organizationConfig } from '../../data/organizationData';
import type { BlogPosting } from '../../types/schema';

interface SchemaArticleProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  url?: string;
  inLanguage?: string;
  customSchema?: BlogPosting;
}

export const SchemaArticle: React.FC<SchemaArticleProps> = ({
  headline,
  description,
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
    createBlogPosting({
      headline,
      description,
      image,
      datePublished,
      dateModified,
      author,
      publisher: {
        name: organizationConfig.name,
        url: organizationConfig.url,
        logo: organizationConfig.logo.url,
      },
      url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      inLanguage,
    });

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
