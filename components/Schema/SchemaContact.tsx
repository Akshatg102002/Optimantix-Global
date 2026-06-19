import React from 'react';
import { Helmet } from 'react-helmet-async';
import { createContactPageSchema } from '../../utils/schemaGenerator';
import { organizationConfig } from '../../data/organizationData';
import type { ContactPage } from '../../types/schema';

interface SchemaContactProps {
  customSchema?: ContactPage;
  url?: string;
}

export const SchemaContact: React.FC<SchemaContactProps> = ({
  customSchema,
  url,
}) => {
  const schema =
    customSchema ||
    createContactPageSchema({
      name: 'Contact Us',
      description: `Get in touch with ${organizationConfig.name}. We'd love to hear from you.`,
      url: url || 'https://optimantix.com/contact',
      organization: organizationConfig.schema,
    });

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
