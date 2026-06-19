import React from 'react';
import { Helmet } from 'react-helmet-async';
import { organizationConfig } from '../../data/organizationData';
import type { Organization } from '../../types/schema';

interface SchemaOrganizationProps {
  schema?: Organization;
  includeLocalBusiness?: boolean;
}

export const SchemaOrganization: React.FC<SchemaOrganizationProps> = ({
  schema = organizationConfig.schema,
  includeLocalBusiness = true,
}) => {
  const schemaData = includeLocalBusiness
    ? organizationConfig.extendedSchema
    : schema;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};
