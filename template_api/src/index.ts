import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import OrganizationController from '@/resources/organization/organization.controller';

validateEnv();
const app = new App(
    [new OrganizationController()],
    Number(process.env.MY_SQL_DB_PORT)
);

app.listen();
