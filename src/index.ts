import * as dotenv from 'dotenv';
import App from './bootstrap/app';
import { routes } from './routes';

dotenv.config();

function main() {
    const app = new App(routes);
    const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

    app.listen(PORT);
}

main();
