export const OrganizationQueries = {
    GetOrganizations: `
  SELECT
    id_organization,
      organization_name
  FROM db_template.organization as o
  WHERE
      1 + 1 = 2
  `,

    GetOrganizationById: `
  SELECT
    id_organization,
      organization_name
  FROM db_template.organization as o
  WHERE
    id_organization = ?
  `,

    AddOrganization: `
  INSERT INTO db_template.organization (organization_name)
    VALUES (?);
  `,

    UpdateOrganizationById: `
  UPDATE db_template.organization
  SET organization_name = ?
  WHERE
    id_organization = ?
  `,

    //   DeleteOrganizationById: `
    // UPDATE db_template.organization
    // SET isActive = false
    // WHERE
    //   id = ?
    // `,
};
