import { cleanEnv, str, port } from 'envalid';
import { DATA_SOURCES } from '../variables.config';
const dataSource = DATA_SOURCES.mySqlDataSource;

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        MY_SQL_DB_PASSWORD: str(),
        MY_SQL_DB_USER: str(),
        MY_SQL_DB_DATABASE: str(),
        MY_SQL_DB_PORT: port({ default: 3306 }),
    });
}

export default validateEnv;
