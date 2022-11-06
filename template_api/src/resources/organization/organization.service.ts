import MySQLConnector from '@/utils/mysql.connector';
import { OrganizationQueries } from './organization.queries';
import IOrganization from '@/resources/organization/organization.interface';

class OrganizationService {
    public connector = new MySQLConnector();
    public execute = this.connector.execute;
    /**
     * gets all organizations
     */
    public getOrganizations = async () => {
        return this.execute<IOrganization[]>(
            OrganizationQueries.GetOrganizations,
            []
        );
    };

    /**
     * gets an organization based on id provided
     */
    public getOrganizationById = async (id: IOrganization['id']) => {
        return this.execute<IOrganization>(
            OrganizationQueries.GetOrganizationById,
            [id]
        );
    };

    /**
     * adds a new organization
     */
    public insertOrganization = async (organization: IOrganization) => {
        const result = await this.execute<{ affectedRows: number }>(
            OrganizationQueries.AddOrganization,
            [organization.name]
        );
        return result.affectedRows > 0;
    };

    /**
     * updates organization's name based on the id provided
     */
    public updateOrganization = async (organization: IOrganization) => {
        const result = await this.execute<{ affectedRows: number }>(
            OrganizationQueries.UpdateOrganizationById,
            [organization.name, organization.id]
        );
        return result.affectedRows > 0;
    };
}

export default OrganizationService;
