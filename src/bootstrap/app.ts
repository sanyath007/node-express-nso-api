import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export default class App {
    app: Application;

    constructor(_routes: any[]) {
        this.app = express();
        this.middlewares();
        this.routes(_routes);
    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(cors());
    }

    routes(routes: any[]): void {
        routes.forEach((route: any) => {
            this.app.use(route.path, ...route.middlewares, route.handler);
        });
    }

    async listen(port: number) {
        await this.app.listen(port);
        console.log(`Server is running at http://localhost:${port}`);
    }
}
