import express from 'express';
import routes from './shared/infrastructure/http/routes'

const app = express();

app.use(express.json());
app.use('/api', routes);

export default app


