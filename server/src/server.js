import fs from 'fs';
import express from 'express';
import path from 'path';
import routes from './api/routes/index';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware';
import routesWhiteList from './config/routesWhiteListConfig';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/');

routes(app);

const staticPath = path.resolve('../client/build');
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.write(fs.readFileSync('../client/build/index.html'));
  res.end();
});

app.use(errorHandlerMiddleware);
app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${env.app.port}!`);
});
