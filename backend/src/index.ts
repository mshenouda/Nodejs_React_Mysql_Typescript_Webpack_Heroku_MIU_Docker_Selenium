import express, {Request, Response} from 'express'
import cors from 'cors'
import { routes } from './routes';

const expressPort = 8888;
const app = express();

// use json for API routes
app.use(express.json());
// cors for api address/port
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));

app.get('/', (req: Request, res: Response) => {
    res.send('INFO :: Root route called');
});

app.listen(expressPort, () => {
    console.log('INFO :: Webserver started on port ' + expressPort)
});

routes(app);
