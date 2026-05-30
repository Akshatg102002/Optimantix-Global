import React from 'react';
import { Helmet } from 'react-helmet-async';
import { createAboutPageSchema } from '../../utils/schemaGenerator';
import { organizationConfig } from '../../data/organizationData';
import type { AboutPage } from '../../types/schema';

interface SchemaAboutProps {
  customSchema?: AboutPage;
  url?: string;
}

export const SchemaAbout: React.FC<SchemaAboutProps> = ({
  customSchema,
  url,
}) => {
  const schema =
    customSchema ||
    createAboutPageSchema({
      name: 'About Us',
      description: organizationConfig.description,
      url: url || 'https://optimantix.com/about',
      organization: organizationConfig.schema,
    });

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
