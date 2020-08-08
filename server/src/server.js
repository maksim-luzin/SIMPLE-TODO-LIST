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

const staticPath = process.env.NODE_ENV === 'production'
  ? './dist/client'
  : '../client/build';
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${staticPath}/index.html`));
  res.end();
});

app.use(errorHandlerMiddleware);

const port = process.env.NODE_ENV === 'production'
  ? process.env.PORT
  : env.app.port

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});
