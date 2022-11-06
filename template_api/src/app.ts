import express, { Application } from 'express';
import MySQLConnector from './utils/mysql.connector';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import errorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';

class App {
    public express: Application;
    public port: number;
    public connector: MySQLConnector;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;
        this.connector = new MySQLConnector();

        this.connector.initializeDatabasePool();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App is listening port: ${this.port}`);
        });
    }
}

export default App;
